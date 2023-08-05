import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import {
  ArrowDownTrayIcon
} from '@heroicons/react/24/solid';
import { useChartInfoByProject } from '../../../components/hooks/chart/fetchChartInfoByProject';
import { ChartInfo } from '@/src/types/Chart';
import Storage from '@/src/utils/storage';
import { InfoUserLogin } from '@/src/types/Login';

const CreateChartInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  const [chartInfo, setChartInfo] = useState<ChartInfo | null>(null);
  const [infoUser, setInfoUser] = useState<InfoUserLogin | null>(null);

  const fetchChartInfoByProject = useChartInfoByProject();

  const getChartInfoByProject = async () => {
    try {
      const reqdata: ChartInfo = await fetchChartInfoByProject(id);

      if (reqdata) {
        setChartInfo(reqdata);
      }
    } catch {
      return false;
    }
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
      if (infoUser && router.isReady) {
        await getChartInfoByProject();
      }
    };


    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoUser, router.isReady]);

  const dataDona = [
    ['Tarea', 'Tareas por estados'],
    ['Nueva', 0],
    ['En progreso', 0],
    ['Resuelta', 0],
    ['En espera', 0],
    ['Cancelada', 0],
  ];

  chartInfo?.TasksByStatus.forEach(e => {
    dataDona.forEach(data => {
      if(data[0] == e.task_status_name){
        data[1] = +e.total_tasks;
      }
    });
  });

  const optionsDona = {
    title: 'Tareas por estados',
    pieHole: 0.4,
    is3D: true,
  };

  const dataStacked = [
    ['Status', 'Nueva', 'En progreso', 'Resuelta', 'En espera', 'Cancelada'],
    ['New York City, NY', 8175000, 8008000, 0, 0, 0],
    ['Los Angeles, CA', 3792000, 3694000, 0, 0, 0],
    ['Chicago, IL', 2695000, 2896000, 0, 0, 0],
    ['Houston, TX', 2099000, 1953000, 0, 0, 0],
    ['Philadelphia, PA', 1526000, 1517000, 0, 0, 0],
  ];

  const optionsStacked = {
    title: 'Tareas por usuario',
    chartArea: { width: '50%' },
    // isStacked: true
    isStacked: true
  };

  const onBackPage = () => {
    router.back();
  };

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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateChartInfo;