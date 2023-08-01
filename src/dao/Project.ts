import { pool } from '@/src/utils/conn';
import { ProjectInterface } from '../interfaces/Project';
import { ProjectType } from '../types/Project';

export class ProjectDAO implements ProjectInterface {

  async createProject(projectData: ProjectType): Promise<ProjectType | null> {
    //SELECT create_project(name, description', now()::date, now()::date, owner_code)
    const query = 'INSERT INTO projects (owner_code,shared_code,name,description,start_date,end_date,state) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

    const values = [
      projectData.owner_code,
      projectData.shared_code,
      projectData.name,
      projectData.description,
      projectData.start_date,
      projectData.end_date,
      projectData.state
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
    const { name, description, start_date, end_date } = projectData;
  
    const query = `
      UPDATE projects
      SET name = $1, description = $2, start_date = $3, end_date = $4
      WHERE project_id = $5
      RETURNING *;
    `;
  
    const values = [name, description, start_date, end_date, project_id];
  
    try {
      const { rows } = await pool.query(query, values);
      return rows[0] || null;
    } catch (error) {
      console.error('Error al actualizar el Proyecto:', error);
      return null;
    }
  }
  
  async deleteProject(project_id: number): Promise<boolean> {
    const query = 'DELETE FROM projects WHERE project_id = $1';
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
      WHERE user_id = $1;
    `;

    const values = [userId];

    try {
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      console.error('Error al obtener los proyectos por usuario:', error);
      return [];
    }
  }
  
}

