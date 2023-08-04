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