import { pool } from '@/src/utils/conn';
import { ProjectInterface } from '../interfaces/Project';
import { InfoProjectHome, ProjectIsAdminInfo, ProjectType } from '../types/Project';

export class ProjectDAO implements ProjectInterface {

  async getProjectInfo(project_id: number, user_id: number): Promise<ProjectIsAdminInfo | null> {

    const query = `
      SELECT
        projects.name project_name,
        users.full_name user_full_name,
      roles.role_id role_id,
      roles.name role_name
        FROM project_user
        INNER JOIN projects ON project_user.project_code = projects.project_id
        INNER JOIN users ON project_user.user_code = users.user_id
        INNER JOIN roles ON project_user.role_code = roles.role_id
        WHERE project_user.is_active = '1'
        AND projects.is_active = '1'
        AND users.user_id = ${user_id}
        AND users.is_active = '1'
        AND projects.project_id = ${project_id}
    `;

    try {
      const { rows } = await pool.query(query);
      console.log(rows);

      return rows[0];
    } catch (error) {
      console.error('Error al obtener los proyectos por usuario:', error);
      return null;
    }
  }

  async getProjectById(project_id: string | string[] | undefined): Promise<ProjectType[]> {
    const query = `
        SELECT *
        FROM projects
        WHERE project_id  = ${project_id}
    `;

    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error('Error al obtener los proyectos por usuario:', error);
      return [];
    }
  }


  async fetchInfoProject(project_id: number): Promise<InfoProjectHome[]> {
    const query = `
    select
      projects.name project_name,
      projects.start_date project_start_date,
      string_agg(users.full_name, ', ') users_full_name,
      (
      select
        count(task_id)
      from
        tasks
      where
        project_code = 1
        and is_active = '1') total_tasks
    from
      project_user
    inner join projects on
      project_user.project_code = projects.project_id
    inner join users on
      project_user.user_code = users.user_id
    where
      project_user.is_active = '1'
      and projects.is_active = '1'
      and users.is_active = '1'
      and projects.project_id = 6
      and project_user.project_code = 1
    group by
      (projects.name,
      projects.start_date)
    `;

    const values = [project_id];

    try {

      const { rows } = await pool.query(query, values);

      return rows || [];

    } catch (error) {

      console.error('Error in count the tasks:', error);
      return [];

    }
  }

  async createProject(projectData: ProjectType): Promise<ProjectType | null> {
    //SELECT create_project(name, description', now()::date, now()::date, owner_code)
    const query = `
    SELECT create_project($1, $2, $3, $4, $5) AS project_id;
  `;

    const values = [
      projectData.name,
      projectData.description,
      projectData.start_date,
      projectData.estimated_date,
      projectData.owner_code,
    ];

    try {

      const { rows } = await pool.query(query, values);
      return rows[0] || null;

    } catch (error) {

      console.error('Error al crear el Proyecto:', error);
      return null;

    }
  }
  async getAllProjects(): Promise<ProjectType[]> {
    const query = 'SELECT * FROM projects';

    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
      return [];
    }
  }

  async updateProject(project_id: number, projectData: Partial<ProjectType>): Promise<ProjectType | null> {
    const { name, description, start_date, estimated_date } = projectData;

    const query = `
      UPDATE projects
      SET name = $1, description = $2, start_date = $3, estimated_date = $4
      WHERE project_id = $5
      RETURNING *;
    `;

    const values = [name, description, start_date, estimated_date, project_id];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0] || null;
    } catch (error) {
      console.error('Error al actualizar el Proyecto:', error);
      return null;
    }
  }

  async deleteProject(project_id: number): Promise<boolean> {
    const query = `
    SELECT delete_project($1)
    `;
    const values = [project_id];

    try {
      const result = await pool.query(query, values);
      return result.rowCount > 0; // Retorna true si se eliminó al menos un registro.
    } catch (error) {
      console.error('Error al eliminar el Proyecto:', error);
      return false;
    }
  }

  async finishProject(project_id: number): Promise<boolean> {
    const query = `
    SELECT finish_project($1)
    `;
    const values = [project_id];

    try {
      const result = await pool.query(query, values);
      return result.rowCount > 0; // Retorna true si se eliminó al menos un registro.
    } catch (error) {
      console.error('Error al eliminar el Proyecto:', error);
      return false;
    }
  }
  async getProjectsByUserId(userId: string[] | string | undefined): Promise<ProjectType[]> {
    const query = `
      SELECT *
      FROM projects
      WHERE owner_code = ${userId}
    `;

    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error('Error al obtener los proyectos por usuario:', error);
      return [];
    }
  }

}

