/* eslint-disable no-unused-vars */

import { CreateProject, InfoProjectHome, ProjectIsAdminInfo, ProjectType } from '../types/Project';

export interface ProjectInterface {

  createProject(projectData: ProjectType): Promise<ProjectType | null>;

  getAllProjects(): Promise<ProjectType[]>;

  updateProject(project_id: number, projectData: Partial<ProjectType>): Promise<ProjectType | null>;

  deleteProject(project_id: number): Promise<boolean>;

  finishProject(project_id: number): Promise<boolean>;

  getProjectsByUserId(userId: string[] | string | undefined): Promise<ProjectType[]>;

  getProjectById(userId: string[] | string | undefined): Promise<ProjectType[]>;

  getProjectInfo(project_id: number, user_id:number): Promise<ProjectIsAdminInfo | null>

  fetchInfoProject(project_id: number): Promise<InfoProjectHome[]>

  createProject(data_create_project: CreateProject) : Promise<>;

}
