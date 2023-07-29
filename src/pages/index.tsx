import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Layout from '../components/layout/Layout';
import HeaderCards from '../components/dashboard/HeaderCards';
import Projects from '../components/dashboard/Projects';

const HomePage: NextPage = () => (
  <Layout>
    <Head>
      <title>Inicio</title>
    </Head>
    <div className='space-y-3'>
      <div className='space-y-3 px-[60px] pt-[45px]'>
        <label className='text-[20px] font-[700]'>Inicio</label>
        <HeaderCards />
      </div>
      <div className='space-y-3 px-[60px] pt-[45px]'>
        <label className='text-[20px] font-[700]'>Proyectos</label>
        <Projects />
      </div>
    </div>
  </Layout>
);

export default HomePage;
