export interface ProjectType {
  project_id?: string;
  owner_code: number;
  shared_code: string;
  name: string;
  description: number;
  start_date: Date;
  end_date: Date;
  state: string;
}