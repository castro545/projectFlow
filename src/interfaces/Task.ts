/* eslint-disable no-unused-vars */

import { CountTaskInfo, TaskType } from '../types/Task';

export interface TaskInterface {
  selectTaskById(id: string[] | string | undefined): Promise<any | null>;
  updateTaskById(id: string[] | string | undefined, title: string, description: string): Promise<any | null>;
  deleteTaskById(id: string[] | string | undefined): Promise<Number | null>;

  fetchFilterTask(users: number[], project_id: number, priorities: number[], status: number[]): Promise<TaskType[]>;
  fetchCountTaskByProject(project_code: number | null): Promise<CountTaskInfo[]>;
}
