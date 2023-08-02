export type TaskType = {
  task_id: number;
  task_parent_code: string | null;
  task_parent_name: string | null;
  task_name: string;
  task_description: string;
  task_priority_id: number;
  task_priority: string;
  task_status_id: number;
  task_status_name: string;
  user_id: number;
  user_full_name: string;
  role_name: string;
  role_id: number;
  updated_by_user_full_name: string;
  task_start_date: string;
  task_estimated_date: string;
};