import HeaderCards from '@/src/components/dashboard/HeaderCards';
import Layout from '@/src/components/layout/Layout';
import CustomSelect from '@/src/components/project/CustomSelect';
import NoTask from '@/src/components/project/NoTask';
import TaskCard from '@/src/components/project/TaskCard';
import { ProjectType } from '@/src/types/Project';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  PlusCircleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/solid';
import { TaskType } from '@/src/types/Task';

const CreateProject = () => {

  const project: ProjectType = {
    project_id: '12',
    owner_code: 17,
    name: 'Mi Proyecto',
    description: 'Descripción del proyecto',
    start_date: new Date(1690909380000),
    estimated_date: new Date(1690909380000),
  };

  const router = useRouter();

  const onCreatedTask = () => {

    router.push(`/${12}/createtask`);

  };

  const onViewChart = () => {

    router.push(`/${12}/chart`);

  };

  const tasks: TaskType[] = [
    {
      task_id: 1,
      task_parent_code: null,
      task_parent_name: null,
      task_name: 'nombre tarea',
      task_description: 'description',
      task_priority_id: 1,
      task_priority: 'Alta',
      task_status_id: 1,
      task_status_name: 'Nueva',
      user_id: 17,
      user_full_name: 'Helmer2',
      role_name: 'Administrador',
      role_id: 1,
      updated_by_user_full_name: 'Helmer2',
      task_start_date: '2023-08-02 00:35:50.959',
      task_estimated_date: '2023-08-02 00:35:50.959',
    },
    {
      task_id: 2,
      task_parent_code: null,
      task_parent_name: null,
      task_name: 'otra tarea',
      task_description: 'otra descripción',
      task_priority_id: 2,
      task_priority: 'Media',
      task_status_id: 2,
      task_status_name: 'En progreso',
      user_id: 23,
      user_full_name: 'Jane Doe',
      role_name: 'Analista',
      role_id: 3,
      updated_by_user_full_name: 'John Smith',
      task_start_date: '2023-08-02 12:00:00',
      task_estimated_date: '2023-08-03 16:30:00',
    },
    {
      task_id: 3,
      task_parent_code: null,
      task_parent_name: null,
      task_name: 'tarea importante',
      task_description: 'una descripción importante',
      task_priority_id: 3,
      task_priority: 'Baja',
      task_status_id: 3,
      task_status_name: 'Completada',
      user_id: 10,
      user_full_name: 'Alice Johnson',
      role_name: 'Desarrollador',
      role_id: 2,
      updated_by_user_full_name: 'Bob Williams',
      task_start_date: '2023-08-01 09:15:00',
      task_estimated_date: '2023-08-05 18:00:00',
    },
  ];


  useEffect(() => { }, []);

  return (
    <>
      <Head>
        <title>Proyecto :: {project.name}</title>
      </Head>
      <Layout>
        <div className='space-y-3'>
          <div className='space-y-3 px-[60px] pt-[45px]'>
            <div className='flex w-full flex-row justify-between'>
              <label className='text-[24px] font-[700]'>{project.name}</label>
              <div className='flex flex-row space-x-6'>
                <PlusCircleIcon
                  className='h-[1.875rem] w-[1.875rem] cursor-pointer text-custom-color-gold'
                  onClick={onCreatedTask}
                />
                <DocumentTextIcon
                  className='h-[1.875rem] w-[1.875rem] cursor-pointer text-custom-color-gold'
                  onClick={onViewChart}
                />
              </div>
            </div>
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
                  <TaskCard
                    key={index}
                    task={task}
                  />
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


export const getServerSideProps = async () => {
  let tasks: TaskType[] = [];

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
      tasks = response;
    }
  } catch (e) {
    console.error(e);
  }

  return { props: { tasks } };
};