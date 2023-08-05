CREATE OR REPLACE FUNCTION create_project_with_contributors(
		p_name varchar,
		p_description text,
		p_startdate timestamp,
		p_estimated_date timestamp,
		p_owner_code integer,
		c_mails varchar[]
	)
	RETURNS int
	LANGUAGE plpgsql
	AS $$
		-- temp user id
		DECLARE new_project_id int;
		DECLARE reg RECORD;
		
		-- get contributors by mail
    	cur_users CURSOR FOR SELECT user_id, full_name 
			FROM users WHERE email = ANY (c_mails) AND is_active = '1';
	BEGIN
		SELECT create_project(
			p_name,
			p_description,
			p_startdate,
			p_estimated_date,
			p_owner_code
		)
		INTO new_project_id;
		
		OPEN cur_users;
	   	FETCH cur_users INTO reg;
	   	WHILE( FOUND ) LOOP
	   		IF NOT EXISTS(
				SELECT * FROM project_user 
				WHERE project_code = new_project_id
				AND user_code = reg.user_id
				AND is_active = '1'
			 )
		 	THEN
				-- creates contributor
				PERFORM asign_contributor(reg.user_id, new_project_id);
			END IF;
		   FETCH cur_users INTO reg;
	   	END LOOP;
		
	   	RETURN new_project_id;
		
		COMMIT;
	END;$$;
	
    -- Ejemplo caso de uso:
        -- SELECT create_project_with_contributors(
           -- 'Nuevo proyecto',
           -- 'Descripción test',
           -- now()::timestamp,
           -- now()::timestamp,
           -- 1,
           -- array['miguel@gmail.com']
        -- );





		CREATE OR REPLACE FUNCTION create_task(
		t_project_code integer,
		t_priority_code integer,
		t_user_mail varchar,
		t_name varchar,
		t_description text,
		t_start_date timestamp,
		t_estimated_date timestamp,
		t_project_owner_code integer,
		t_parent_code integer default NULL
	)
	RETURNS int
	LANGUAGE plpgsql
	AS $$
		-- temp task id
		DECLARE new_task_id int;
		-- temp project owner name
		DECLARE project_owner_name varchar;
		-- temp user id
		DECLARE temp_user_id int;
		
	BEGIN
		SELECT users.full_name
			INTO project_owner_name
			FROM users 
            INNER JOIN project_user ON project_user.user_code = users.user_id
            INNER JOIN roles ON roles.role_id = project_user.role_code
			WHERE users.user_id = t_project_owner_code
            AND project_user.project_code = t_project_code
            AND roles.name = 'Administrador';
		-- creates task
		IF project_owner_name IS NOT NULL
		THEN
		
			SELECT user_id INTO temp_user_id FROM users WHERE email = t_user_mail AND is_active = '1';
			
			IF temp_user_id IS NOT NULL
			THEN
			
				INSERT 
				INTO tasks (
					project_code,
					task_parent_code,
					status_code,
					priority_code,
					user_code,
					name,
					description,
					start_date,
					estimated_date,
					updated_by,
					updated_at
				)
				VALUES (
					t_project_code,
					t_parent_code,
					(SELECT task_status_id FROM task_status WHERE name = 'Nueva'),
					t_priority_code,
					temp_user_id,
					t_name,
					t_description,
					t_start_date,
					t_estimated_date,
					t_project_owner_code,
					now()
				)
				RETURNING task_id INTO new_task_id;

				-- asign task history
				PERFORM task_updated(t_project_owner_code, new_task_id, CONCAT('Tarea creada por: ', project_owner_name));

				RETURN new_task_id;
				COMMIT;
			
			END IF;
			
		END IF;
		
		RETURN 0;
	END;$$;


	-- Ejemplo de uso
    -- SELECT create_task(
		-- 1::int,
		-- 1::int,
		-- 'mail@mail.com',
		-- 'Creación de base de datos'::varchar,
		-- 'Se busca crear la base de datos de projectFlow'::text,
		-- now()::timestamp,
		-- now()::timestamp,
		-- 1::int
	-- );