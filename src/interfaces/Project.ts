/* eslint-disable no-unused-vars */

import { ProjectType } from '../types/Project';

export interface ProjectInterface {
  createProject(projectData: ProjectType): Promise<ProjectType | null>;
}
