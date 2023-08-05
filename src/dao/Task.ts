import { pool } from '@/src/utils/conn';
import { TaskInterface } from '../interfaces/Task';
import { CountTaskInfo, TaskType, UsersFilter } from '../types/Task';

export class TaskDAO implements TaskInterface {

  async fetchUserFilter(project_id: number): Promise<UsersFilter[]> {
    const query = `
      select
          users.user_id user_id,
        users.full_name user_full_name,
        roles.role_id role_id,
        roles.name role_name
      from
        project_user
      inner join projects on
        project_user.project_code = projects.project_id
      inner join users on
        project_user.user_code = users.user_id
      inner join roles on
        project_user.role_code = roles.role_id
      where
        project_user.is_active = '1'
        and projects.is_active = '1'
        and users.is_active = '1'
        and projects.project_id = $1
    `;

    console.log(project_id);

    const values = [project_id];

    try {

      const { rows } = await pool.query(query, values);

      console.log(rows);

      return rows || [];

    } catch (error) {

      console.log('Error in count the tasks:', error);
      return [];

    }
  }

  async fetchCountTaskByProject(user_code: number, project_code: number | null): Promise<CountTaskInfo[]> {
    const query = `
      SELECT
        SUM(CASE WHEN status_code IN(1, 2, 4) THEN 1 ELSE 0 END) AS pending_tasks,
        SUM(CASE WHEN status_code IN(3, 5) THEN 1 ELSE 0 END) AS completed_tasks,
        SUM(CASE WHEN user_code = 17 THEN 1 ELSE 0 END) AS created_by_me
      FROM tasks
      INNER JOIN projects ON projects.project_id = tasks.project_code
      WHERE tasks.user_code = ${user_code}
        AND tasks.is_active = '1'
        AND projects.is_active = '1'
        and tasks.project_code = $1;
    `;

    const values = [project_code];

    try {

      const { rows } = await pool.query(query, values);

      return rows || [];

    } catch (error) {

      console.error('Error in count the tasks:', error);
      return [];

    }
  }

  async fetchCountTaskByUser(user_code: number): Promise<CountTaskInfo[]> {
    const query = `
      SELECT
        SUM(CASE WHEN status_code IN(1, 2, 4) THEN 1 ELSE 0 END) AS pending_tasks,
        SUM(CASE WHEN status_code IN(3, 5) THEN 1 ELSE 0 END) AS completed_tasks,
        SUM(CASE WHEN user_code = $1 THEN 1 ELSE 0 END) AS created_by_me
      FROM tasks
      INNER JOIN projects ON projects.project_id = tasks.project_code
      WHERE tasks.user_code = $2
        AND tasks.is_active = '1'
        AND projects.is_active = '1'
    `;

    const values = [user_code, user_code];

    try {

      const { rows } = await pool.query(query, values);

      return rows || [];

    } catch (error) {

      console.error('Error in count the tasks:', error);
      return [];

    }
  }

  async fetchFilterTask(users: number[], project_id: number, priorities: number[], status: number[]): Promise<TaskType[]> {
    const query = `
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
        AND users.is_active = '1'
        AND projects.project_id =$1
        AND tasks.project_code = $1
        ${users.length > 0 ? `AND users.user_id IN (${users.toString().replaceAll("'", '')})` : ''}
        ${priorities.length > 0 ? `AND tasks.priority_code IN (${priorities.toString().replaceAll("'", '')})` : ''}
        ${status.length > 0 ? `AND tasks.status_code IN (${status.toString().replaceAll("'", '')})` : ''}
    `;

    try {

      const { rows } = await pool.query(query, [project_id]);

      return rows || [];

    } catch (error) {

      console.error('Error in obtaining the tasks:', error);
      return [];

    }
  }

  async deleteTaskById(id: string[] | string | undefined): Promise<Number | null> {

    const query = 'UPDATE tasks SET state = \'INACTIVE\' WHERE id=$1;';

    const values = [id];

    try {

      const { rowCount } = await pool.query(query, values);
      return rowCount || null;

    } catch (error) {

      console.error('Error updating the task:', error);
      return null;

    }
  }

  async updateTaskById(id: string[] | string | undefined, title: string, description: string): Promise<any> {

    const query = 'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *';

    const values = [title, description, id];

    try {

      const { rows } = await pool.query(query, values);
      return rows[0] || null;

    } catch (error) {

      console.error('Error updating the task:', error);
      return null;

    }
  }

  async selectTaskById(id: string[] | string | undefined): Promise<any | null> {

    const query = 'SELECT * FROM tasks WHERE id = $1';

    const values = [id];

    try {

      const { rows } = await pool.query(query, values);
      return rows[0] || null;

    } catch (error) {

      console.error('Error in obtaining the task:', error);
      return null;

    }
  }

}
