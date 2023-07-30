import { pool } from '@/src/utils/conn'; // Importa la conexión a la base de datos desde tu archivo anterior.
import {Project} from '@/src/interfaces/Project';


/* export async function getProjectByProjectname(email: string): Promise<Project | null> {
  const query = 'SELECT * FROM projects WHERE email = $1';
  const values = [email];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return null;
  }
}
 */
export async function createProject(owner_code: number, shared_code: string, name: string, description: number, start_date: Date, end_date: Date): Promise<Project | null> {
  const query = 'INSERT INTO projects (owner_code,shared_code,name,description,start_date,end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  
  const values = [owner_code,shared_code,name,description,start_date,end_date];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  } catch (error) {
    console.error('Error al crear el Proyecto:', error);

    return null;
  }
}
