import { ProjectType } from '@/src/types/Project';
import { useEffect, useState } from 'react';
import NoProject from './NoProyect';
import { useRouter } from 'next/router';
import ProjectCard from './ProjectCard';


type ProjectProps = {
  projects?: ProjectType[]
}

const Projects = ({ projects }: ProjectProps) => {

  const [userId, setUserId] = useState<number>();

  const router = useRouter();

  const onCreatedProject = () => {

    router.push(`/${userId}/createproject`);

  };

  useEffect(() => {
    setUserId(7);
  }, []);
  return (
    <>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {/* {
          projects &&
          projects.map((project, index) => (
            <ProjectCard
              key={index}
              projectData={project}
            />
          ))
        } */}

        {
          !projects &&
          <NoProject
            onCreateProject={onCreatedProject}
          />
        }
      </div>
    </>
  );
};

export default Projects;


export const getServerSideProps = async () => {
  let projects: ProjectType[] = [];

  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const statusReq = await fetch('http://localhost:3000/api/project/getProjectsByUserId?id=17', {
      method: 'GET',
      headers: headers,
    });

    const response: any = await statusReq.json();

    if (response) {
      projects = response;
    }
  } catch (e) {
    console.error(e);
  }

  return { props: { projects } };
};