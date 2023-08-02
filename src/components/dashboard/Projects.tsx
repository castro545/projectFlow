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

  const project: ProjectType = {
    project_id: '123',
    owner_code: 123, // Código del propietario del proyecto (reemplaza con el valor correcto)
    name: 'Mi Proyecto', // Nombre del proyecto (reemplaza con el valor correcto)
    description: 'Descripción del proyecto', // Descripción del proyecto (reemplaza con el valor correcto)
    start_date: new Date(1690909380000), // Fecha de inicio (timestamp convertido a objeto Date)
    estimated_date: new Date(1690909380000), // Fecha estimada (timestamp convertido a objeto Date)
  };

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
        {
          projects &&
          projects.map((project, index) => (
            <div
              key={index}
              className='flex h-[250px] w-auto cursor-pointer flex-row items-center justify-center rounded-lg bg-[#FFFFFC] px-4 shadow-card'
            >
              {project.name}
            </div>
          ))
        }

        {
          !projects &&
          <NoProject
            onCreateProject={onCreatedProject}
          />
        }

        {<ProjectCard
          projectData={project}
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