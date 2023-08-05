export interface ProjectType {
  project_id?: string;
  owner_code: number;
  name: string;
  description: string;
  start_date: string;
  estimated_date: string;
  emails: string[];
  role_name?: string;
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

export type ProjectCardType = {
  project_name: string;
  project_start_date: string;
  users_full_name: string;
  total_tasks: number;
  users?: string[]
}