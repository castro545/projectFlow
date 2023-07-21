
/* ----------- TABLES  ----------- */

CREATE TABLE users
(
    user_id integer NOT NULL,
    full_name character varying(200) NOT NULL,
    email character varying(80) NOT NULL,
    password character varying(500) NOT NULL,
    role_code integer NOT NULL,
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
    shared_code character varying(100) NOT NULL,
    name character varying(50) NOT NULL,
    description text DEFAULT 'No hay descripción.',
    start_date date NOT NULL,
    end_date date NOT NULL,
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
    task_parent_code integer,
    status_code integer NOT NULL,
    priority_code integer NOT NULL,
    name character varying(30) NOT NULL,
    description text NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    updated_by integer NOT NULL,
    updated_at date NOT NULL,
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
    date date NOT NULL,
    PRIMARY KEY (task_history_id)
);

CREATE TABLE project_user
(
    project_user_id integer NOT NULL,
    project_code integer NOT NULL,
    user_code integer NOT NULL,
    PRIMARY KEY (project_user_id)
);

CREATE TABLE comments
(
    comment_id integer NOT NULL,
    task_code integer NOT NULL,
    user_code integer NOT NULL,
    description text NOT NULL,
    date date NOT NULL,
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

ALTER TABLE IF EXISTS public.users
    ADD CONSTRAINT users_code_owner FOREIGN KEY (role_code)
    REFERENCES public.roles (role_id) MATCH SIMPLE
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

-- Nombre de proyecto único por owner
ALTER TABLE projects ADD CONSTRAINT unique_project_name_by_owner UNIQUE (name, owner_code);

-- Email de sesión único
ALTER TABLE users ADD CONSTRAINT unique_user_email UNIQUE (email);

-- Secuencias para Ids de tablas

-- comments
CREATE SEQUENCE comments_id_seq OWNED BY public.comments.comment_id;
ALTER TABLE public.comments ALTER COLUMN comment_id SET DEFAULT nextval('comments_id_seq');

-- priorities
CREATE SEQUENCE priorities_id_seq OWNED BY public.priorities.priority_id;
ALTER TABLE public.priorities ALTER COLUMN priority_id SET DEFAULT nextval('priorities_id_seq');

-- project_user
CREATE SEQUENCE project_user_id_seq OWNED BY public.project_user.project_user_id;
ALTER TABLE public.project_user ALTER COLUMN project_user_id SET DEFAULT nextval('project_user_id_seq');

-- projects
CREATE SEQUENCE projects_id_seq OWNED BY public.projects.project_id;
ALTER TABLE public.projects ALTER COLUMN project_id SET DEFAULT nextval('projects_id_seq');

-- roles
CREATE SEQUENCE roles_id_seq OWNED BY public.roles.role_id;
ALTER TABLE public.roles ALTER COLUMN role_id SET DEFAULT nextval('roles_id_seq');

-- task_history
CREATE SEQUENCE task_history_id_seq OWNED BY public.task_history.task_history_id;
ALTER TABLE public.task_history ALTER COLUMN task_history_id SET DEFAULT nextval('task_history_id_seq');

-- task_status
CREATE SEQUENCE task_status_id_seq OWNED BY public.task_status.task_status_id;
ALTER TABLE public.task_status ALTER COLUMN task_status_id SET DEFAULT nextval('task_status_id_seq');

-- tasks
CREATE SEQUENCE tasks_id_seq OWNED BY public.tasks.task_id;
ALTER TABLE public.tasks ALTER COLUMN task_id SET DEFAULT nextval('tasks_id_seq');

-- users
CREATE SEQUENCE users_id_seq OWNED BY public.users.user_id;
ALTER TABLE public.users ALTER COLUMN user_id SET DEFAULT nextval('users_id_seq');


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

-- Crear project manager
CREATE OR REPLACE FUNCTION create_pms_admin_option(pm_fullname varchar, pm_email varchar, pm_password varchar)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    -- creates PM
    INSERT INTO users (full_name, email, password, role_code)
    VALUES (pm_fullname, pm_email, pm_password, (SELECT role_id FROM roles WHERE name = 'Administrador'));
END;
$$;

-- EJEMPLO DE USO: SELECT create_pms_admin_option('Usuario nuevo', 'mail@gmail.com', 'password');

-- Crear proyectos
CREATE OR REPLACE FUNCTION create_project(p_name varchar, p_description text, p_startdate date, p_enddate date, owner_code integer)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    -- temp project id
    new_project_id int;
BEGIN
    -- creates project
    INSERT INTO projects (name, description, start_date, end_date, owner_code, shared_code)
    VALUES (p_name, p_description, p_startdate, p_enddate, owner_code, encode(uuid_send(uuid_in(md5(CONCAT (p_name, '-', owner_code))::cstring)::uuid),'base64'))
    RETURNING project_id INTO new_project_id;

    -- asign admin to project
    INSERT INTO project_user (project_code, user_code)
    VALUES (new_project_id, owner_code);
END;
$$;

-- EJEMPLO DE USO: SELECT create_project('ProjectFlow', 'Manejo de productividad y eficiencia.', now()::date, now()::date, 1);

-- Crear usuarios contribuidores
CREATE OR REPLACE FUNCTION create_contributor(c_fullname varchar, c_email varchar, c_password varchar, project_shared_code varchar)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    -- temp user id
    new_user_id int;
BEGIN
    -- creates contributor
    INSERT INTO users (full_name, email, password, role_code)
    VALUES (c_fullname, c_email, c_password, (SELECT role_id FROM roles WHERE name = 'Contribuidor'))
    RETURNING user_id INTO new_user_id;

    -- asign contributor to project using project_shared_code
    INSERT INTO project_user (project_code, user_code)
    VALUES ((SELECT project_id FROM projects WHERE shared_code = project_shared_code), new_user_id);
END;
$$;

-- EJEMPLO DE USO: SELECT create_contributor('Miguel Fernandez', 'miguel@gmail.com', '123', '1rTEJ/PztxhQx1FreJhiGg==');

