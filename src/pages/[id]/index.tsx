import HeaderCards from '@/src/components/dashboard/HeaderCards';
import Layout from '@/src/components/layout/Layout';
import CustomSelect from '@/src/components/project/CustomSelect';
import NoTask from '@/src/components/project/NoTask';
import TaskCard from '@/src/components/project/TaskCard';
import { ProjectType } from '@/src/types/Project';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CreateProject = () => {

  const project: ProjectType = {
    project_id: '123',
    owner_code: 123,
    name: 'Mi Proyecto',
    description: 'Descripción del proyecto',
    start_date: new Date(1690909380000),
    estimated_date: new Date(1690909380000),
  };

  const router = useRouter();

  const onCreatedTask = () => {

    router.push(`/${12}/createtask`);

  };

  const tasks: any[] = [];

  useEffect(() => { }, []);

  return (
    <>
      <Head>
        <title>Proyecto :: {project.name}</title>
      </Head>
      <Layout>
        <div className='space-y-3'>
          <div className='space-y-3 px-[60px] pt-[45px]'>
            <label className='text-[24px] font-[700]'>{project.name}</label>
            <HeaderCards />
          </div>
          <div className='flex flex-col space-y-6 px-[60px] pt-[45px]'>
            <label className='text-[20px] font-[700]'>Filtro</label>
            <div className='w-[400px]'>
              <CustomSelect />
            </div>
          </div>
          <div className='flex flex-col space-y-6 px-[60px] pt-[45px]'>
            <label className='text-[20px] font-[700]'>Tareas</label>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              {
                tasks &&
                tasks.map((task, index) => (
                  <TaskCard key={index} />
                ))
              }
              {
                tasks.length === 0 &&
                <NoTask
                  onCreateTask={onCreatedTask}
                />
              }
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProject;