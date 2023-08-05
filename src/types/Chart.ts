export type ChartInfo = {
    // TasksByStatus: Map<string, string | number>;
    TasksByStatus: TasksByStatusResults[];
    // TasksByUser: TasksByUser[];
    // TasksInTime: TasksInTime[];
}

export type TasksByStatusResults = {
    task_status_name: string,
    total_tasks: number
};