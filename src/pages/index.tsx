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
import Storage from '@/src/utils/storage';
import { InfoUserLogin } from '../types/Login';



const HomePage = () => {

  const [countTask, setCountTask] = useState<CountTaskInfo[]>([]);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [infoUser, setInfoUser] = useState<InfoUserLogin | null>(null);
  const [isOpenCreateProject, setIsOpenCreateProject] = useState<boolean>(false);

  const fethProjectByUser = useGetCountTaskUser();
  const fetchProjectByUser = useProjectByUser();

  const getCountTask = async () => {
    try {
      const bodyCount = {
        'user_code': infoUser!.user_id
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
      const user_id = infoUser!.user_id;
      const reqdata: ProjectType[] = await fetchProjectByUser(user_id!);

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
    const getUserInfo = () => {

      const user_id = Storage.getItem(Storage.USER_ID);
      const full_name = Storage.getItem(Storage.FULL_NAME);
      const email = Storage.getItem(Storage.EMAIL);
      const is_active = Storage.getItem(Storage.IS_ACTIVE);

      if (user_id !== '' || full_name !== '' || email !== '' || is_active !== '') {
        const infoUser: InfoUserLogin = {
          user_id: parseInt(user_id!),
          full_name: full_name!,
          email: email!,
          is_active: is_active!
        };
        setInfoUser(infoUser);
      } else {
        window.location.href = '/login';
      }

    };
    getUserInfo();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (infoUser) {
        await getProjects();
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenCreateProject, infoUser]);

  useEffect(() => {
    const fetchData = async () => {

      await getCountTask();

    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (infoUser) {
        await getCountTask();
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenCreateProject, infoUser]);


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
          {
            infoUser &&
            <Projects
              onCreateProject={onCreatedProject}
              projects={projects}
              user_code={infoUser!.user_id!}
            />
          }
        </div>
      </div>
      {
        isOpenCreateProject && infoUser &&
        < ModalComponent onClose={onCreatedProject} maxWidth='max-w-[45.8125rem]'>
          <CreateProject onClose={onCreatedProject} owner_id={infoUser!.user_id!} />
        </ModalComponent>
      }
    </Layout>
  );
};

export default HomePage;