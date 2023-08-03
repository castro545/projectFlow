import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import HeaderCards from '../components/dashboard/HeaderCards';
import Projects from '../components/dashboard/Projects';
import { CountTaskInfo } from '../types/Task';
import { ProjectType } from '../types/Project';
import useGetCountTaskUser from '../components/hooks/project/fetchProjectByUser';

type HomePageProps = {
  projects: ProjectType[];
}

const HomePage: NextPage<HomePageProps> = ({ projects }) => {

  const [countTask, setCountTask] = useState<CountTaskInfo[]>([]);

  const fethProjectByUser = useGetCountTaskUser();

  const getCountTask = async () => {
    try {
      const bodyCount = {
        'user_code': 17
      };
      const reqdata: CountTaskInfo[] = await fethProjectByUser(bodyCount);
      if (reqdata) {
        setCountTask(reqdata);
      }
    } catch {
      return false;
    }
  };

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
          <label className='text-[20px] font-[700]'>Inicio</label>
          {
            countTask.length > 0 &&
            <HeaderCards
              counterTask={countTask}
            />
          }
        </div>
        <div className='space-y-3 px-[60px] pt-[45px]'>
          <label className='text-[20px] font-[700]'>Proyectos</label>
          {
            projects.length > 0 &&
            <Projects
              projects={projects}
            />
          }
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

export const getServerSideProps = async () => {

  let projects: ProjectType[] = [];

  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    // FetchProjectsByUser
    const statusProjects = await fetch(`http://localhost:3000/api/project/getProjectsByUserId?id=${17}`, {
      method: 'GET',
      headers: headers,
    });
    const responseProjects: any = await statusProjects.json();
    if (responseProjects) {
      projects = responseProjects;
    }

  } catch (e) {
    console.error(e);
  }

  console.log({ projects });

  return { props: {  projects } };
};
