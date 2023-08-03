import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import HeaderCards from '../components/dashboard/HeaderCards';
import Projects from '../components/dashboard/Projects';
import { CountTaskInfo } from '../types/Task';
import { ProjectType } from '../types/Project';
import { validateTokenMiddleware } from '../utils/validateToken';

type HomePageProps = {
  countTask: CountTaskInfo[];
  projects: ProjectType[];
}

const HomePage: NextPage<HomePageProps> = ({ countTask, projects }) => {

  useEffect(()=>{
    validateTokenMiddleware

  },[]);
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
          <Projects
            projects={projects}
          />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

export const getServerSideProps = async () => {

  let countTask: CountTaskInfo[] = [];
  let projects: ProjectType[] = [];


  const bodyCount = {
    'user_code': 17,
  };

  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    // FetchCountTask
    const statusCountTask = await fetch('http://localhost:3000/api/tasks/getCountTaskByUser', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(bodyCount),
    });
    const responseCountTask: any = await statusCountTask.json();
    if (responseCountTask) {
      countTask = responseCountTask;
    }

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

  return { props: { countTask, projects } };
};
