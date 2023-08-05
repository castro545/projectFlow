/* eslint-disable no-unused-vars */

import { CountTaskInfo, TaskType, UsersFilter } from '../types/Task';

export interface TaskInterface {
  selectTaskById(id: string[] | string | undefined): Promise<any | null>;
  updateTaskById(id: string[] | string | undefined, title: string, description: string): Promise<any | null>;
  deleteTaskById(id: string[] | string | undefined): Promise<Number | null>;

  fetchFilterTask(users: number[], project_id: number, priorities: number[], status: number[]): Promise<TaskType[]>;
  fetchCountTaskByProject(user_code: number, project_code: number | null): Promise<CountTaskInfo[]>;
  fetchCountTaskByUser(user_code: number): Promise<CountTaskInfo[]>;

  fetchUserFilter(project_id: number): Promise<UsersFilter[]>;
  deleteTask(task_id: number): Promise<number>;
  updateTask(task_id: number, priority_code: number, status_code: number, description: string, updated_by: number): Promise<number>;
  createTask(project_id: number, colaborator: string, task_name: string, task_description: string, owner_code: number):Promise<number>
}
