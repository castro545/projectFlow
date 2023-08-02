ALTER TABLE projects DROP CONSTRAINT unique_project_name_by_owner;

CREATE UNIQUE INDEX unique_project_name_by_owner ON projects (name, owner_code) WHERE (is_active != '0');

CREATE OR REPLACE FUNCTION asign_contributor(c_user_id int, c_project_code int)
    RETURNS int
	LANGUAGE plpgsql
	AS $$
		-- temp user id
		DECLARE new_project_user_id int;
	BEGIN	
		-- creates contributor
		INSERT 
			INTO project_user (project_code, user_code, role_code)
			VALUES (c_project_code, c_user_id, (SELECT role_id FROM roles WHERE name = 'Contribuidor'))
		RETURNING project_user_id INTO new_project_user_id;
		
        RETURN new_project_user_id;
		COMMIT;
	END;$$;


CREATE OR REPLACE FUNCTION create_task(
		t_project_code integer,
		t_priority_code integer,
		t_user_code integer,
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
				t_user_code,
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
		
		RETURN 0;
	END;$$;

CREATE OR REPLACE FUNCTION finish_task(t_id int, user_code int)
	RETURNS int
	LANGUAGE plpgsql
	AS $$
		
	BEGIN
        -- verify sub-tasks are done
        IF NOT EXISTS(
		    SELECT FROM tasks 
            INNER JOIN task_status ON task_status.task_status_id = tasks.status_code
			WHERE tasks.task_parent_code = t_id
            AND task_status.name IN ('Nueva', 'En proceso', 'En espera')
            AND tasks.is_active = '1'
		 )
		 THEN
			UPDATE tasks SET end_date = now() WHERE task_id = t_id;

            -- asign task history
			PERFORM task_updated(user_code, t_id, 'Tarea finalizada.');

			RETURN t_id;
			COMMIT;
        END IF;

        RETURN 0;
	END;$$;

CREATE OR REPLACE FUNCTION delete_task(t_id int)
	RETURNS int
	LANGUAGE plpgsql
	AS $$
		
	BEGIN
        -- verify sub-tasks are done
        IF NOT EXISTS(
		    SELECT FROM tasks 
            INNER JOIN task_status ON task_status.task_status_id = tasks.status_code
			WHERE tasks.task_parent_code = t_id
            AND task_status.name IN ('Nueva', 'En proceso', 'En espera')
            AND tasks.is_active = '1'
		 )
		 THEN
			UPDATE tasks SET is_active = '0' WHERE task_id = t_id;

            -- asign task history
			PERFORM task_updated(user_code, t_id, 'Tarea eliminada.');

			RETURN t_id;
			COMMIT;
        END IF;

        RETURN 0;
	END;$$;	

-- Crear comentarios

CREATE OR REPLACE FUNCTION create_comment(c_task_id int, c_user_id int, c_description text)
    RETURNS int
	LANGUAGE plpgsql
	AS $$
		-- temp comment id
		DECLARE new_comment_id int;
	BEGIN	
		-- creates comment
		INSERT 
			INTO comments (task_code, user_code, description, date)
			VALUES (c_task_id, c_user_id, c_description, now())
		RETURNING comment_id INTO new_comment_id;
		
        RETURN new_comment_id;
		COMMIT;
	END;$$;

	-- Ejemplo de uso:  SELECT create_comment(5, 1, 'Nuevo comentario');

-- Editar un comentario
CREATE OR REPLACE FUNCTION edit_comment(c_comment_id int, c_description text)
    RETURNS int
	LANGUAGE plpgsql
	AS $$
	BEGIN	
		-- creates comment
		UPDATE comments SET description = c_description WHERE comment_id = c_comment_id;
		
        RETURN c_comment_id;
		COMMIT;
		
		RETURN 0;
	END;$$;
	
	-- Ejemplo de uso: SELECT edit_comment(2, 'Ajuste a comentario');

-- Eliminar un comentario
CREATE OR REPLACE FUNCTION delete_comment(c_comment_id int)
    RETURNS int
	LANGUAGE plpgsql
	AS $$
	BEGIN	
		-- creates comment
		UPDATE comments SET is_active = '0' WHERE comment_id = c_comment_id;
		
        RETURN c_comment_id;
		COMMIT;
		
		RETURN 0;
	END;$$;
	
	-- Ejemplo de uso: SELECT delete_comment(2);