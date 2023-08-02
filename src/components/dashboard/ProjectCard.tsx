import { ProjectType } from '@/src/types/Project';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  CalendarIcon
} from '@heroicons/react/24/solid';
import { formatDate } from '@/src/utils/formatDate';

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
        <div className='w-full space-y-10'>
          <label className='text-[24px] font-normal text-custom-color-dark-blue'>
            {capitalize(projectData.name)}
          </label>
          <div className='flex flex-row items-center space-x-3'>
            <CalendarIcon
              className='h-[1.5rem] w-[1.5rem] cursor-pointer text-custom-color-gold text-opacity-50'
            />
            <h4 className='flex items-center text-[14x]'>Iniciado el {formatDate(projectData.start_date.toString())}</h4>
          </div>
          <div className='flex flex-row items-center space-x-3'>
            <CalendarIcon
              className='h-[1.5rem] w-[1.5rem] cursor-pointer text-custom-color-gold text-opacity-50'
            />
            <h4 className='flex items-center text-[14x]'>Fin estimado {formatDate(projectData.estimated_date.toString())}</h4>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProjectCard;