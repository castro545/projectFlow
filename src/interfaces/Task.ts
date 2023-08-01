/* eslint-disable no-unused-vars */

export interface TaskInterface {
  selectTaskById(id: string[] | string | undefined): Promise<any | null>;
  updateTaskById(id: string[] | string | undefined, title: string, description: string): Promise<any | null>;
  deleteTaskById(id: string[] | string | undefined): Promise<Number | null>;
}
