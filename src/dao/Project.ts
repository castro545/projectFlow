import { pool } from '@/src/utils/conn';
import { ProjectInterface } from '../interfaces/Project';
import { ProjectType } from '../types/Project';

export class ProjectDAO implements ProjectInterface {

  async createProject(projectData: ProjectType): Promise<ProjectType | null> {

    const query = 'INSERT INTO projects (owner_code,shared_code,name,description,start_date,end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

    const values = [
      projectData.owner_code,
      projectData.shared_code,
      projectData.name,
      projectData.description,
      projectData.start_date,
      projectData.end_date
    ];

    try {

      const { rows } = await pool.query(query, values);
      return rows[0] || null;

    } catch (error) {

      console.error('Error al crear el Proyecto:', error);
      return null;

    }
  }

}

