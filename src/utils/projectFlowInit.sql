/* ----------- TABLES  ----------- */

CREATE TABLE users
(
    user_id integer NOT NULL,
    full_name character varying(200) NOT NULL,
    email character varying(80) NOT NULL,
    password character varying(500) NOT NULL,
    is_active character(1) NOT NULL DEFAULT '1',
    PRIMARY KEY (user_id)
);

CREATE TABLE roles
(
    role_id integer NOT NULL,
    name character varying(100) NOT NULL,
    PRIMARY KEY (role_id)
);

CREATE TABLE projects
(
    project_id integer NOT NULL,
    owner_code integer NOT NULL,
    name character varying(50) NOT NULL,
    description text DEFAULT 'No hay descripción.',
    start_date timestamp NOT NULL,
    estimated_date timestamp NOT NULL,
    end_date timestamp DEFAULT NULL,
    is_active character(1) NOT NULL DEFAULT '1',
    PRIMARY KEY (project_id)
);

CREATE TABLE task_status
(
    task_status_id integer NOT NULL,
    name character varying(30) NOT NULL,
    PRIMARY KEY (task_status_id)
);

CREATE TABLE tasks
(
    task_id integer NOT NULL,
    project_code integer NOT NULL,
    task_parent_code integer DEFAULT NULL,
    status_code integer NOT NULL,
    priority_code integer NOT NULL,
    user_code integer NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL,
    start_date timestamp NOT NULL,
    estimated_date timestamp NOT NULL,
    end_date timestamp DEFAULT NULL,
    updated_by integer NOT NULL,
    updated_at timestamp NOT NULL,
    is_active character(1) NOT NULL DEFAULT '1',
    PRIMARY KEY (task_id)
);

CREATE TABLE priorities
(
    priority_id integer NOT NULL,
    name character varying(10) NOT NULL,
    PRIMARY KEY (priority_id)
);

CREATE TABLE task_history
(
    task_history_id integer NOT NULL,
    user_code integer NOT NULL,
    task_code integer NOT NULL,
    description text NOT NULL,
    date timestamp NOT NULL,
    PRIMARY KEY (task_history_id)
);

CREATE TABLE project_user
(
    project_user_id integer NOT NULL,
    project_code integer NOT NULL,
    user_code integer NOT NULL,
    role_code integer NOT NULL,
    is_active character(1) NOT NULL DEFAULT '1',
    PRIMARY KEY (project_user_id)
);

CREATE TABLE comments
(
    comment_id integer NOT NULL,
    task_code integer NOT NULL,
    user_code integer NOT NULL,
    description text NOT NULL,
    date timestamp NOT NULL,
    is_active character(1) NOT NULL DEFAULT '1',
    PRIMARY KEY (comment_id)
);


/* ----------- CONSTRAINTS  ----------- */

ALTER TABLE IF EXISTS public.projects
    ADD CONSTRAINT user_owner FOREIGN KEY (owner_code)
    REFERENCES public.users (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.project_user
    ADD CONSTRAINT project_user_project_owner FOREIGN KEY (project_code)
    REFERENCES public.projects (project_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.project_user
    ADD CONSTRAINT project_user_user_owner FOREIGN KEY (user_code)
    REFERENCES public.users (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.project_user
    ADD CONSTRAINT project_user_user_admin FOREIGN KEY (role_code)
    REFERENCES public.roles (role_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.comments
    ADD CONSTRAINT comments_task_owner FOREIGN KEY (task_code)
    REFERENCES public.tasks (task_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.comments
    ADD CONSTRAINT comments_user_owner FOREIGN KEY (user_code)
    REFERENCES public.users (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.task_history
    ADD CONSTRAINT task_history_user_owner FOREIGN KEY (user_code)
    REFERENCES public.users (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.task_history
    ADD CONSTRAINT task_history_task_owner FOREIGN KEY (task_code)
    REFERENCES public.tasks (task_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.tasks
    ADD CONSTRAINT tasks_project_owner FOREIGN KEY (project_code)
    REFERENCES public.projects (project_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.tasks
    ADD CONSTRAINT tasks_owner FOREIGN KEY (task_parent_code)
    REFERENCES public.tasks (task_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.tasks
    ADD CONSTRAINT tasks_status_owner FOREIGN KEY (status_code)
    REFERENCES public.task_status (task_status_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.tasks
    ADD CONSTRAINT tasks_priority_owner FOREIGN KEY (priority_code)
    REFERENCES public.priorities (priority_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.tasks
    ADD CONSTRAINT tasks_user_owner FOREIGN KEY (user_code)
    REFERENCES public.users (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

-- Nombre de proyecto único por owner
ALTER TABLE projects ADD CONSTRAINT unique_project_name_by_owner UNIQUE (name, owner_code);

-- Email de sesión único
ALTER TABLE users ADD CONSTRAINT unique_user_email UNIQUE (email);

-- Único admin por proyecto
ALTER TABLE project_user ADD CONSTRAINT unique_project_admin UNIQUE (user_code, project_code, role_code);

-- Secuencias para Ids de tablas

-- comments
ALTER TABLE comments ALTER COLUMN comment_id ADD GENERATED ALWAYS AS IDENTITY;

-- priorities
ALTER TABLE priorities ALTER COLUMN priority_id ADD GENERATED ALWAYS AS IDENTITY;

-- project_user
ALTER TABLE project_user ALTER COLUMN project_user_id ADD GENERATED ALWAYS AS IDENTITY;

-- projects
ALTER TABLE projects ALTER COLUMN project_id ADD GENERATED ALWAYS AS IDENTITY;

-- roles
ALTER TABLE roles ALTER COLUMN role_id ADD GENERATED ALWAYS AS IDENTITY;

-- task_history
ALTER TABLE task_history ALTER COLUMN task_history_id ADD GENERATED ALWAYS AS IDENTITY;

-- task_status
ALTER TABLE task_status ALTER COLUMN task_status_id ADD GENERATED ALWAYS AS IDENTITY;

-- tasks
ALTER TABLE tasks ALTER COLUMN task_id ADD GENERATED ALWAYS AS IDENTITY;

-- users
ALTER TABLE users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY;


/* ----------- INSERTS / SEEDERS  ----------- */

-- priorities
INSERT INTO priorities (name)
VALUES
    ('Alta'),
    ('Media'),
    ('Baja');

-- task_status
INSERT INTO task_status (name)
VALUES
    ('Nueva'),
    ('En proceso'),
    ('Resuelta'),
    ('En espera'),
    ('Cancelada');

-- roles
INSERT INTO roles (name)
VALUES
    ('Administrador'),
    ('Contribuidor');


/* ----------- STORE PROCEDURES / PROCEDIMIENTOS ALMACENADOS  ----------- */

-- Crear proyectos
CREATE OR REPLACE FUNCTION create_project(p_name varchar, p_description text, p_startdate timestamp, p_estimated_date timestamp, p_owner_code integer)
	RETURNS int
	LANGUAGE plpgsql
	AS $$
		-- temp project id
		DECLARE new_project_id int;
		
	BEGIN
			-- creates project
			INSERT 
				INTO projects (name, description, start_date, estimated_date, owner_code)
				VALUES (p_name, p_description, p_startdate, p_estimated_date, p_owner_code)
				RETURNING project_id INTO new_project_id;

			-- asign admin to project
			INSERT 
				INTO project_user (project_code, user_code, role_code)
				VALUES (new_project_id, p_owner_code, (SELECT role_id FROM roles WHERE name = 'Administrador'));

			RETURN new_project_id;
			COMMIT;
	END;$$;

    -- EJEMPLO DE USO: 	SELECT create_project('ProjectFlow', '"Manejo de productividad y eficiencia.".', now()::timestamp, now()::timestamp, 1);

-- Eliminar proyectos
CREATE OR REPLACE FUNCTION delete_project(p_id int)
	RETURNS int
	LANGUAGE plpgsql
	AS $$
		
	BEGIN
        -- verify tasks are done
        IF NOT EXISTS(
		    SELECT FROM tasks 
            INNER JOIN task_status ON task_status.task_status_id = tasks.status_code
			WHERE tasks.project_code = p_id
            AND task_status.name IN ('Nueva', 'En proceso', 'En espera')
            AND tasks.is_active = '1'
		 )
		 THEN
			UPDATE projects SET is_active = '0' WHERE project_id = p_id;

			RETURN p_id;
			COMMIT;
        END IF;

        RETURN 0;
	END;$$;

    -- EJEMPLO DE USO: 	SELECT delete_project(1);

-- Finalizar proyectos
CREATE OR REPLACE FUNCTION finish_project(p_id int)
	RETURNS int
	LANGUAGE plpgsql
	AS $$
		
	BEGIN
        -- verify tasks are done
        IF NOT EXISTS(
		    SELECT FROM tasks 
            INNER JOIN task_status ON task_status.task_status_id = tasks.status_code
			WHERE tasks.project_code = p_id
            AND task_status.name IN ('Nueva', 'En proceso', 'En espera')
            AND tasks.is_active = '1'
		 )
		 THEN
			UPDATE projects SET end_date = now() WHERE project_id = p_id;

			RETURN p_id;
			COMMIT;
        END IF;

        RETURN 0;
	END;$$;

    -- EJEMPLO DE USO: 	SELECT finish_project(1);    

-- Crear usuarios

CREATE OR REPLACE FUNCTION create_user(c_fullname varchar, c_email varchar, c_password varchar)
    RETURNS int
	LANGUAGE plpgsql
	AS $$
		-- temp user id
		DECLARE new_user_id int;
	BEGIN	
		-- creates contributor
		INSERT 
			INTO users (full_name, email, password)
			VALUES (c_fullname, c_email, c_password)
		RETURNING user_id INTO new_user_id;
		
        RETURN new_user_id;
		COMMIT;
	END;$$;

    -- EJEMPLO DE USO: 	SELECT create_user('Miguel Fernandez', 'miguel@gmail.com', '123');

CREATE OR REPLACE FUNCTION asign_contributor(c_user_id int, c_project_code int)
    RETURNS int
	LANGUAGE plpgsql
	AS $$
		-- temp user id
		DECLARE project_user_id int;
	BEGIN	
		-- creates contributor
		INSERT 
			INTO project_user (project_code, user_code, role_code)
			VALUES (c_project_code, c_user_id, (SELECT role_id FROM roles WHERE name = 'Contribuidor'))
		RETURNING project_user_id INTO project_user_id;
		
        RETURN project_user_id;
		COMMIT;
	END;$$;

    -- EJEMPLO DE USO: 	SELECT asign_contributor(1, 1);

CREATE OR REPLACE FUNCTION delete_contributor(d_user_id int, d_project_code int)
    RETURNS int
	LANGUAGE plpgsql
	AS $$
	BEGIN
        -- verify user don't have any task in progress
        IF NOT EXISTS(
		    SELECT FROM tasks 
            INNER JOIN task_status ON task_status.task_status_id = tasks.status_code
			WHERE tasks.user_code = d_user_id
            AND tasks.project_code = d_project_code
            AND task_status.name IN ('Nueva', 'En proceso', 'En espera')
            AND tasks.is_active = '1'
		 )
		 THEN	
            -- desactivate contributor
            UPDATE project_user SET is_active = '0'
                WHERE project_code = d_project_code
                AND user_code = d_user_id;
            
            RETURN 1;
            COMMIT;
        END IF;

        RETURN 0;
	END;$$;

    -- EJEMPLO DE USO: 	SELECT delete_contributor(1, 1);

CREATE OR REPLACE FUNCTION task_updated(
	t_user_code integer,
	t_task_code integer,
	t_description text
)
RETURNS void
LANGUAGE plpgsql
AS $$
	BEGIN
		INSERT 
			INTO task_history (user_code, task_code, description, date)
			VALUES (t_user_code, t_task_code, t_description, now());
	
END;$$;

-- Ejemplo de uso: SELECT task_updated(1, 1, 'Tarea ajustada');

-- Crear tareas
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
			WHERE users.user_id = t_project_owner_code AND roles.name = 'Administrador';
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
			select task_updated(t_project_owner_code, new_task_id, CONCAT('Tarea creada por: ', project_owner_name));
			
			RETURN new_task_id;
			COMMIT;
		END IF;
		
		RETURN 0;
	END;$$;

    -- Ejemplo de uso
    -- SELECT create_task(
		-- 1::int,
		-- 1::int,
		-- 3::int,
		-- 'Creación de base de datos'::varchar,
		-- 'Se busca crear la base de datos de projectFlow'::text,
		-- now()::timestamp,
		-- now()::timestamp,
		-- 1::int
	-- );

-- Eliminar tarea
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
			select task_updated(user_code, t_id, 'Tarea eliminada.');

			RETURN t_id;
			COMMIT;
        END IF;

        RETURN 0;
	END;$$;

    -- Ejemplo de uso: SELECT delete_task(1);

-- Finalizar tarea
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
			select task_updated(user_code, t_id, 'Tarea finalizada.');

			RETURN t_id;
			COMMIT;
        END IF;

        RETURN 0;
	END;$$;

    -- Ejemplo de uso: SELECT finish_task(1, 1);
