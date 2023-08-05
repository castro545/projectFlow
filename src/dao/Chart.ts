import { pool } from '@/src/utils/conn';
import { IChart } from "../interfaces/IChart";
import { ChartInfo, TasksByStatusResults, TasksByUser } from "../types/Chart";

enum ChartResults {
    TasksByStatus,
    TasksByUsers
};

export class ChartDAO implements IChart {

    async getChartInfoByProject(project_id: string[] | string | undefined): Promise<ChartInfo | null> {
        
        const res = await Promise.all([
            this.getTasksByStatus(project_id),
            this.getTasksByUsers(project_id)
        ]);

        return {
            TasksByStatus: res[ChartResults.TasksByStatus],
            TasksByUser: res[ChartResults.TasksByUsers]
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
          } catch (error) {
            console.error('Error al obtener data chart por proyecto:', error);
            // return new Map<string, string | number>();
            return [];
          };
    }

    async getTasksByUsers(project_id: string[] | string | undefined): Promise<TasksByUser[]> {
        const query = `
            SELECT
                users.full_name user_full_name,
                COUNT(CASE WHEN task_status.name = 'Nueva' THEN tasks.task_id ELSE NULL END) AS new_tasks,
                COUNT(CASE WHEN task_status.name = 'En proceso' THEN tasks.task_id ELSE NULL END) AS in_progress_tasks,
                COUNT(CASE WHEN task_status.name = 'Resuelta' THEN tasks.task_id ELSE NULL END) AS resolved_tasks,
                COUNT(CASE WHEN task_status.name = 'En espera' THEN tasks.task_id ELSE NULL END) AS on_hold_tasks,	
                COUNT(CASE WHEN task_status.name = 'Cancelada' THEN tasks.task_id ELSE NULL END) AS canceled_tasks
            FROM projects
            LEFT JOIN project_user ON projects.project_id = project_user.project_code
            LEFT JOIN users ON project_user.user_code = users.user_id
            LEFT JOIN tasks ON users.user_id = tasks.user_code
            LEFT JOIN task_status ON tasks.status_code = task_status.task_status_id
            WHERE projects.project_id = ${project_id}
            AND project_user.is_active = '1'
            AND tasks.is_active = '1'
            GROUP BY users.full_name;
        `;

        try {
            const { rows } = await pool.query<TasksByUser>(query);

            return rows;
          } catch (error) {
            console.error('Error al obtener data chart por proyecto:', error);
            // return new Map<string, string | number>();
            return [];
          };
    }
}