import { ProjectType } from '@/src/types/Project';
import { useEffect, useState } from 'react';
import NoProject from './NoProyect';
import { useRouter } from 'next/router';
import ProjectCard from './ProjectCard';


type ProjectProps = {
  projects?: ProjectType[],
  onCreateProject: () => void,
  user_code: number,
}

const Projects = ({ projects, onCreateProject, user_code }: ProjectProps) => {


  useEffect(() => {
  }, []);
  return (
    <>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {
          projects &&
          projects.map((project, index) => (
            <ProjectCard
              key={index}
              projectData={project}
            />
          ))
        }

        {
          !projects &&
          <NoProject
            onCreateProject={onCreateProject}
          />
        }
      </div>
    </>
  );
};

export default Projects;