import { pool } from '@/src/utils/conn';
import { IChart } from "../interfaces/IChart";
import { ChartInfo, TasksByStatusResults } from "../types/Chart";

export class ChartDAO implements IChart {

    async getChartInfoByProject(project_id: string[] | string | undefined): Promise<ChartInfo | null> {
        
        const res = await Promise.all([
            this.getTasksByStatus(project_id)
        ]);

        return {
            TasksByStatus: res[0]
        };
    }
    
    async getTasksByStatus(project_id: string[] | string | undefined): Promise<TasksByStatusResults[]> {
        const query = `
            SELECT
                task_status.name task_status_name,
                count(task_id) total_tasks
            FROM tasks
            JOIN task_status ON tasks.status_code = task_status.task_status_id
            WHERE tasks.is_active = '1'
            AND tasks.project_code = ${project_id}
            GROUP BY task_status.name
        `;

        try {
            const { rows } = await pool.query<TasksByStatusResults>(query);

            return rows;

            const results = new Map<string, string | number>();
            results.set('Tarea', 'Tareas por estados');
            rows.forEach(e => {
                results.set(e.task_status_name, e.total_tasks);
            });

            // return results;
          } catch (error) {
            console.error('Error al obtener data chart por proyecto:', error);
            // return new Map<string, string | number>();
            return [];
          };
    }
}