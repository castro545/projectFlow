import { ProjectType } from '@/src/types/Project';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type ProjectCardProps = {
  projectData: ProjectType;
}

const ProjectCard = ({ projectData }: ProjectCardProps) => {

  const router = useRouter();

  const openProject = () => {

    router.push(`/${projectData.project_id}`);

  };

  useEffect(() => { }, []);
  return (
    <>
      <div
        className='flex h-[250px] w-auto cursor-pointer flex-row items-center justify-center rounded-lg bg-[#FFFFFC] px-4 shadow-card'
        onClick={openProject}
      >
        hola
      </div>
    </>
  );
};

export default ProjectCard;