export interface ProjectType {
  project_id?: string;
  owner_code: number;
  name: string;
  description: string;
  start_date: Date;
  estimated_date: Date;
}

export type InfoProjectHome = {
  start_date: Date;
  user_full_name: string;
  total_tasks: number;
  project_name: string;
}

export type ProjectIsAdminInfo = {
  project_name: string;
  user_full_name: string;
  role_id: number;
  role_name: string;
}