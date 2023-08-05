export type ChartInfo = {
    TasksByStatus: TasksByStatusResults[];
    TasksByUser: TasksByUser[];
};

export type TasksByStatusResults = {
    task_status_name: string;
    total_tasks: number;
};

export type TasksByUser = {
    user_full_name: string;
    new_tasks: number;
    in_progress_tasks: number;
    resolved_tasks: number;
    on_hold_tasks: number;
    canceled_tasks: number;
};