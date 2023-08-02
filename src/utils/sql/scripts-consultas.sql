-- FILTRADO DE TAREAS

SELECT 
	tasks.task_id task_id,
	tasks.task_parent_code task_parent_code,
	task_parent.name task_parent_name,
	tasks.name task_name,
	tasks.description task_description,
	priorities.priority_id task_priority_id,
	priorities.name task_priority,
	task_status.task_status_id task_status_id,
	task_status.name task_status_name,
	users.user_id user_id,
	users.full_name user_full_name,
	roles.name role_name,
	roles.role_id role_id,
	updated_by_user.full_name updated_by_user_full_name,
	tasks.start_date task_start_date,
	tasks.estimated_date task_estimated_date
FROM project_user
INNER JOIN projects ON project_user.project_code = projects.project_id
INNER JOIN users ON project_user.user_code = users.user_id
INNER JOIN roles ON project_user.role_code = roles.role_id
INNER JOIN tasks ON tasks.user_code = users.user_id
FULL OUTER JOIN tasks task_parent ON tasks.task_parent_code = task_parent.task_id
INNER JOIN users updated_by_user ON tasks.updated_by = updated_by_user.user_id
INNER JOIN priorities ON tasks.priority_code = priorities.priority_id
INNER JOIN task_status ON tasks.status_code = task_status.task_status_id
WHERE tasks.is_active = '1'
AND projects.is_active = '1'
AND project_user.is_active = '1'
AND projects.project_id = 1
-- Filtro por usuario
AND users.user_id = 1
-- Filtro por prioridad
AND tasks.priority_code = 1
-- Filtro por estado de tarea
AND tasks.status_code = 1;

-- RESUMEN / CONTADOR DE TAREAS POR USUARIO Y PROYECTO

SELECT 
	SUM(CASE WHEN status_code IN(1, 2, 4) THEN 1 ELSE 0 END) AS pending_tasks,
	SUM(CASE WHEN status_code IN(3, 5) THEN 1 ELSE 0 END) AS completed_tasks,
	SUM(CASE WHEN user_code = 1 THEN 1 ELSE 0 END) AS created_by_me
FROM tasks
INNER JOIN projects ON projects.project_id = tasks.project_code
WHERE tasks.user_code = 1
AND tasks.is_active = '1'
AND projects.is_active = '1'
AND tasks.project_code = 1;

-- Resumen de proyecto por usuario
SELECT 
		projects.name project_name,
		projects.start_date project_start_date,
		users.full_name user_full_name,
		SUM(CASE WHEN tasks.project_code = 1 THEN 1 ELSE 0 END) AS total_tasks
	FROM project_user
	INNER JOIN projects ON project_user.project_code = projects.project_id
	INNER JOIN users ON project_user.user_code = users.user_id
	INNER JOIN tasks ON tasks.user_code = users.user_id
	WHERE project_user.is_active = '1'
	AND projects.is_active = '1'
	AND tasks.is_active = '1'
	AND users.user_id = 1
	AND projects.project_id = 1
	GROUP BY(projects.name, projects.start_date, users.full_name);