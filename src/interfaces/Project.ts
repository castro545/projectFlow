/* eslint-disable no-unused-vars */

import { ProjectType } from '../types/Project';

export interface ProjectInterface {
  createProject(projectData: ProjectType): Promise<ProjectType | null>;
  getAllProjects(): Promise<ProjectType[]>;
  updateProject(project_id: number, projectData: Partial<ProjectType>): Promise<ProjectType | null>;
  deleteProject(project_id: number): Promise<boolean>;
  getProjectsByUserId(userId: string[] | string | undefined): Promise<ProjectType[]>;
}
