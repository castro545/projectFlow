import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Chart } from 'react-google-charts';
import {
  ArrowDownTrayIcon
} from '@heroicons/react/24/solid';

const CreateProject = () => {

  const router = useRouter();

  const dataLine = [
    [
      'Day',
      'Guardians of the Galaxy',
      'The Avengers',
      'Transformers: Age of Extinction',
    ],
    [1, 37.8, 80.8, 41.8],
    [2, 30.9, 69.5, 32.4],
    [3, 25.4, 57, 25.7],
    [4, 11.7, 18.8, 10.5],
    [5, 11.9, 17.6, 10.4],
    [6, 8.8, 13.6, 7.7],
    [7, 7.6, 12.3, 9.6],
    [8, 12.3, 29.2, 10.6],
    [9, 16.9, 42.9, 14.8],
    [10, 12.8, 30.9, 11.6],
    [11, 5.3, 7.9, 4.7],
    [12, 6.6, 8.4, 5.2],
    [13, 4.8, 6.3, 3.6],
    [14, 4.2, 6.2, 3.4],
  ];

  const optionsLine = {
    chart: {
      title: 'Box Office Earnings in First Two Weeks of Opening',
      subtitle: 'in millions of dollars (USD)',
    },
  };

  const dataStacked = [
    ['City', '2010 Population', '2000 Population'],
    ['New York City, NY', 8175000, 8008000],
    ['Los Angeles, CA', 3792000, 3694000],
    ['Chicago, IL', 2695000, 2896000],
    ['Houston, TX', 2099000, 1953000],
    ['Philadelphia, PA', 1526000, 1517000],
  ];

  const optionsStacked = {
    title: 'Population of Largest U.S. Cities',
    chartArea: { width: '50%' },
    isStacked: true,
    hAxis: {
      title: 'Total Population',
      minValue: 0,
    },
    vAxis: {
      title: 'City',
    },
  };

  const dataDona = [
    ['Tarea', 'Tareas Terminadas'],
    ['Helmer Torres', 11],
    ['Hacer Login', 2],
    ['Hacer registro', 2],
    ['Watch TV', 2],
    ['Sleep', 7],
  ];

  const optionsDona = {
    title: 'Tareas realizadas',
    pieHole: 0.4,
    is3D: true,
  };

  const onBackPage = () => {
    router.back();
  };


  useEffect(() => { }, []);

  return (
    <>
      <div className='relative h-screen overflow-y-auto bg-gradient-to-b from-custom-color-gold to-custom-color-light-gold'>
        <div className='flex min-h-screen flex-col items-center justify-center'>
          <div className='mx-5 my-5 h-auto w-[90%] rounded-lg bg-white p-5 pt-7 shadow-lg md:mx-0 md:my-5 md:h-auto md:w-[80%] md:p-6 '>
            <form className='px-4 py-6'>
              <div className='flex flex-row justify-between'>
                <h1 className='text-[16px] font-bold text-custom-color-dark-blue md:text-[26px]'>Vista para ver graficos y resumen del proyecto</h1>
                <div className='flex flex-row justify-center space-x-6'>
                  <button
                    type='button'
                    className='middle none center mr-3 rounded-lg border border-custom-color-gold bg-custom-color-gold px-6 py-3 text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-custom-color-light-gold active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                    onClick={onBackPage}
                  >Volver</button>
                  <button
                    type='button'
                    className='middle none center mr-3 flex flex-row items-center rounded-lg border border-custom-color-gold bg-custom-color-gold px-6 py-3 text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-custom-color-light-gold active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                    onClick={onBackPage}
                  >
                    <div className='flex flex-row items-start justify-center space-x-3'>
                      <h1 className='pt-2'>Descargar Reporte</h1>
                      <ArrowDownTrayIcon
                        className='h-[1.875rem] w-[1.875rem] cursor-pointer text-white'
                      />
                    </div>
                  </button>
                </div>
              </div>
              <Chart
                chartType='PieChart'
                width='100%'
                height='400px'
                data={dataDona}
                options={optionsDona}
              />
              <Chart
                chartType='BarChart'
                width='100%'
                height='400px'
                data={dataStacked}
                options={optionsStacked}
              />
              <Chart
                chartType='Line'
                width='100%'
                height='400px'
                data={dataLine}
                options={optionsLine}
              />
              <div className='mt-14 flex flex-row justify-center space-x-6'>
                <button
                  type='button'
                  className='middle none center mr-3 rounded-lg border border-custom-color-gold bg-custom-color-gold px-6 py-3 text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-custom-color-light-gold active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  onClick={onBackPage}
                >Volver</button>
                <button
                  type='button'
                  className='middle none center mr-3 rounded-lg border border-custom-color-gold bg-custom-color-gold px-6 py-3 text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-custom-color-light-gold active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  onClick={onBackPage}
                >Descargar Reporte</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProject;