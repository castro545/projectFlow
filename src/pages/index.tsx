import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import HeaderCards from '../components/dashboard/HeaderCards';
import Projects from '../components/dashboard/Projects';
import { CountTaskInfo } from '../types/Task';
import { ProjectType } from '../types/Project';
import useGetCountTaskUser from '../components/hooks/project/fetchCountTaskByUser';
import {
  PlusCircleIcon
} from '@heroicons/react/24/solid';
import ModalComponent from '../components/layout/Modal';
import CreateProject from '../components/project/CreateProject';
import { useProjectByUser } from '../components/hooks/project/useProjectByUser';



const HomePage = () => {

  const [countTask, setCountTask] = useState<CountTaskInfo[]>([]);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isOpenCreateProject, setIsOpenCreateProject] = useState<boolean>(false);

  const fethProjectByUser = useGetCountTaskUser();
  const fetchProjectByUser = useProjectByUser();

  const getCountTask = async () => {
    try {
      const bodyCount = {
        'user_code': 17
      };
      const reqdata: CountTaskInfo[] = await fethProjectByUser(bodyCount);

      if (reqdata[0].completed_tasks === null) {
        reqdata[0] = {
          pending_tasks: 0,
          completed_tasks: 0,
          created_by_me: 0
        };
      }
      if (reqdata) {
        setCountTask(reqdata);
      }
    } catch {
      return false;
    }
  };


  const getProjects = async () => {
    try {
      const user_id = 17;
      const reqdata: ProjectType[] = await fetchProjectByUser(user_id);

      if (reqdata) {
        setProjects(reqdata);
      }
    } catch {
      return false;
    }
  };

  const onCreatedProject = () => {

    setIsOpenCreateProject(!isOpenCreateProject);

  };

  useEffect(() => {
    const fetchData = async () => {

      await getProjects();

    };

    fetchData();c
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenCreateProject]);

  useEffect(() => {
    const fetchData = async () => {

      await getCountTask();

    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <Head>
        <title>Inicio</title>
      </Head>
      <div className='space-y-3'>
        <div className='space-y-3 px-[60px] pt-[45px]'>
          <div className='flex w-full flex-row justify-between'>
            <label className='text-[24px] font-[700]'>Inicio</label>
            <div className='flex flex-row space-x-6'>
              <PlusCircleIcon
                className='h-[1.875rem] w-[1.875rem] cursor-pointer text-custom-color-gold'
                onClick={onCreatedProject}
              />
            </div>
          </div>
          {
            countTask.length > 0 &&
            <HeaderCards
              counterTask={countTask}
              isAdmin={true}
            />
          }
        </div>
        <div className='space-y-3 px-[60px] pt-[45px]'>
          <label className='text-[20px] font-[700]'>Proyectos</label>
          <Projects
            onCreateProject={onCreatedProject}
            projects={projects}
            user_code={17}
          />
        </div>
      </div>
      {
        isOpenCreateProject &&
        < ModalComponent onClose={onCreatedProject} maxWidth='max-w-[45.8125rem]'>
          <CreateProject onClose={onCreatedProject} owner_id={17} />
        </ModalComponent>
      }
    </Layout>
  );
};

export default HomePage;

// export const getServerSideProps = async () => {

//   let projects: ProjectType[] = [];

//   try {
//     const headers = {
//       'Content-Type': 'application/json',
//     };

//     // FetchProjectsByUser
//     const statusProjects = await fetch(`http://localhost:3000/api/project/getProjectsByUserId?id=${17}`, {
//       method: 'GET',
//       headers: headers,
//     });
//     const responseProjects: any = await statusProjects.json();
//     if (responseProjects) {
//       projects = responseProjects;
//     }

//   } catch (e) {
//     console.error(e);
//   }

//   return { props: { projects } };
// };
