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
  redirectTo?: string;
};

export interface OptionType {
  value: number;
  label: string;
  id: number;
  type: string;
}

export interface BodyType {
  users: number[];
  priorities: number[];
  status: number[];
  project_id: number;
}

export type CountTaskInfo = {
  pending_tasks?: number;
  completed_tasks?: number;
  created_by_me?: number;
  redirectTo?: string;
};

export type TaskColorPriority = {
  alta: {
    borde: string;
    bg: string;
    text: string;
  };
  media: {
    borde: string;
    bg: string;
    text: string;
  };
  baja: {
    borde: string;
    bg: string;
    text: string;
  };
}

export type TaskColorState = {
  nueva: {
    borde: string;
    bg: string;
    text: string;
  };
  enProceso: {
    borde: string;
    bg: string;
    text: string;
  };
  resuelta: {
    borde: string;
    bg: string;
    text: string;
  };
  enEspera: {
    borde: string;
    bg: string;
    text: string;
  };
  cancelada: {
    borde: string;
    bg: string;
    text: string;
  };
}