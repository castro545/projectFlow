import HeaderCards from '@/src/components/dashboard/HeaderCards';
import Layout from '@/src/components/layout/Layout';
import CustomSelect from '@/src/components/project/CustomSelect';
import NoTask from '@/src/components/project/NoTask';
import TaskCard from '@/src/components/project/TaskCard';
import { ProjectIsAdminInfo, ProjectType } from '@/src/types/Project';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  UserPlusIcon,
  PlusCircleIcon,
  DocumentTextIcon,
  LockClosedIcon
} from '@heroicons/react/24/solid';
import { BodyType, CountTaskInfo, OptionType, TaskType, UsersFilter } from '@/src/types/Task';
import { MultiValue } from 'react-select';
import { useFetchFilterTasks } from '@/src/components/hooks/task/FetchFilterTask';
import useGetCountTaskProject from '@/src/components/hooks/project/fetchCountTaskByProject';
import ModalComponent from '@/src/components/layout/Modal';
import CreateTask from './createtask';
import { useFetchInfoProject } from '@/src/components/hooks/project/fetchInfoPoject';
import { capitalize } from 'lodash';
import { useFetchAdminInfo } from '@/src/components/hooks/project/useFetchAdminInfo';
import Storage from '@/src/utils/storage';
import { InfoUserLogin } from '@/src/types/Login';
import TaskModal from '@/src/components/tasks/TaskModal';
import styles from '@/src/styles/Home.module.css';
import { formatDate } from '@/src/utils/formatDate';
import { useUserFilter } from '@/src/components/hooks/task/useUserFilter';
import { useFinishProject } from '../../components/hooks/project/useFinishProject';
import { ToastUtils } from '@/src/utils/ToastUtils';

const CreateProject = () => {
  const [tasksResult, setTaskResult] = useState<TaskType[]>([]);
  const [countTask, setCountTask] = useState<CountTaskInfo[]>([]);
  const [usersFilter, setUsersFilter] = useState<UsersFilter[]>([]);
  const [projectInfo, setProjectInfo] = useState<ProjectType[] | null>(null);
  const [isOpenCreateTask, setIsOpenCreateTask] = useState<boolean>(false);
  const [isAddUserProject, setIsAddUserProject] = useState<boolean>(false);
  const [projectInfoAdmin, setProjectInfoAdmin] = useState<ProjectIsAdminInfo | null>(null);
  const [infoUser, setInfoUser] = useState<InfoUserLogin | null>(null);
  const [isOpenModalTask, setIsOpenModalTask] = useState<boolean>(false);
  const [infoTask, setIinfoTask] = useState<TaskType | null>(null);


  const fethProjectByUser = useGetCountTaskProject();
  const fetchTasks = useFetchFilterTasks();
  const fetchProject = useFetchInfoProject();
  const fetchisAdmin = useFetchAdminInfo();
  const fetchUsersFilter = useUserFilter();
  const fetchFinishProject = useFinishProject();

  const router = useRouter();
  const { id } = router.query;

  const onCreatedTask = () => {

    setIsOpenCreateTask(!isOpenCreateTask);

  };

  const onAddUserProject = () => {

    setIsAddUserProject(!isAddUserProject);

  };

  const onFinishProject = async () => {
    const finishedCode = await fetchFinishProject(id);

    if(finishedCode > 0){
      ToastUtils.successMessage('¡Proyecto finalizado!');
    } else {
      ToastUtils.errorMessage('¡Error! El proyecto tiene tareas en proceso');
    }
  };

  const onViewChart = () => {

    router.push(`/${id}/chart`);

  };

  const openTask = () => {
    setIsOpenModalTask(!isOpenModalTask);
  };

  function transformFiltersToBody(filters: OptionType[]) {
    const body = filters.reduce((acc, filter) => {
      if (filter.type === 'user') {
        acc.users.push(filter.id);
      } else if (filter.type === 'priority') {
        acc.priorities.push(filter.id);
      } else if (filter.type === 'state') {
        acc.status.push(filter.id);
      }
      return acc;
    }, { users: [], priorities: [], status: [], project_id: id as unknown as number } as BodyType);

    return body;
  }

  const handleFilter = async (filtersProp: MultiValue<OptionType>) => {
    const mutableFilters = [...filtersProp];


    const body = transformFiltersToBody(mutableFilters);

    const fetchedTasks: TaskType[] | undefined = await fetchTasks(body);

    if (fetchedTasks !== undefined) {
      const tasks: TaskType[] = fetchedTasks;

      setTaskResult(tasks);
    }
  };

  const getUserFilter = async () => {
    try {
      const numericId = typeof id === 'string' ? parseInt(id) : -1;
      const reqdata: UsersFilter[] = await fetchUsersFilter(numericId);

      if (reqdata) {
        setUsersFilter(reqdata);
      }
    } catch {
      return false;
    }
  };

  const getCountTask = async () => {
    try {
      const bodyCount = {
        'user_code': infoUser?.user_id,
        'project_id': id,
      };
      const reqdata: CountTaskInfo[] = await fethProjectByUser(bodyCount);

      if (reqdata) {
        setCountTask(reqdata);
      }
    } catch {
      return false;
    }
  };

  const getFilterTask = async () => {
    try {
      const bodyFilter: BodyType = {
        'users': [],
        'project_id': +id!,
        'priorities': [],
        'status': []
      };
      const fetchedTasks: TaskType[] | undefined = await fetchTasks(bodyFilter);
      if (fetchedTasks !== undefined) {
        const tasks: TaskType[] = fetchedTasks;

        setTaskResult(tasks);
      }
    } catch {
      return false;
    }
  };

  const getInfoProject = async () => {

    try {
      const body = {
        'project_id': +id!
      };
      const response: ProjectType[] | null = await fetchProject(body);

      setProjectInfo(response);

    } catch {
      return false;
    }
  };


  const getIsAdmin = async () => {

    try {
      const body = {
        'project_id': +id!,
        'user_id': infoUser?.user_id,
      };
      const response: ProjectIsAdminInfo | null = await fetchisAdmin(body);

      if (response !== null) {
        setProjectInfoAdmin(response);
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
    const fetchIsAdmin = async () => {
      if (infoUser) {
        await getIsAdmin();
      }
    };

    fetchIsAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoUser]);

  useEffect(() => {
    const fetchUsersFilter = async () => {
      if (infoUser) {
        await getUserFilter();
      }
    };

    fetchUsersFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoUser]);

  useEffect(() => {
    const fetchFilterTask = async () => {
      if (infoUser) {
        await getFilterTask();
      }

    };

    fetchFilterTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenCreateTask, infoUser, isOpenModalTask]);

  useEffect(() => {
    const fetchProjectInfo = async () => {
      if (infoUser) {
        await getInfoProject();
      }
    };

    fetchProjectInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (infoUser) {
        await getCountTask();
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenCreateTask, infoUser]);

  return (
    <>
      <Head>
        {
          projectInfo &&
          <title>Proyecto :: {capitalize(projectInfo[0].name)} {isOpenCreateTask ? ':: Creando Tarea' : ''} {isOpenModalTask ? ` :: ${capitalize(infoTask?.task_name)}` : ''}</title>
        }
      </Head>
      <Layout>
        <div className='space-y-3'>
          <div className='space-y-8 px-[60px] pt-[45px]'>
            <div className='flex w-full flex-row justify-between'>
              <label className='text-[26px] font-[700]'>
                {
                  projectInfo &&
                  capitalize(projectInfo[0].name)
                }
              </label>
              <div className='flex flex-row space-x-6'>
                {
                  projectInfoAdmin?.role_name === 'Administrador'  &&
                  <span className={styles.tooltip} title='Finalizar proyecto'>
                    <LockClosedIcon
                      className='h-[1.875rem] w-[1.875rem] cursor-pointer text-custom-color-gold'
                      onClick={() => onFinishProject()}
                    />
                  </span>
                }
                <span className={styles.tooltip} title='Añadir contribuidor'>
                  <UserPlusIcon
                    className='h-[1.875rem] w-[1.875rem] cursor-pointer text-custom-color-gold'
                    onClick={onAddUserProject}
                  />
                </span>
                <span className={styles.tooltip} title='Crear nueva tarea'>
                  <PlusCircleIcon
                    className='h-[1.875rem] w-[1.875rem] cursor-pointer text-custom-color-gold'
                    onClick={onCreatedTask}
                  />
                </span>
                <span className={styles.tooltip} title='Ver reporte'>
                  <DocumentTextIcon
                    className='h-[1.875rem] w-[1.875rem] cursor-pointer text-custom-color-gold'
                    onClick={onViewChart}
                  />
                </span>
              </div>
            </div>
            {
              projectInfo &&
              <div className='flex flex-row'>
                <div className='flex w-1/2 flex-col space-y-3'>
                  <label className='text-[18px] font-bold text-custom-color-dark-blue'>
                    Descripción:
                  </label>
                  <label className='text-[14px] font-normal text-custom-color-dark-blue'>
                    {capitalize(projectInfo[0].description)}
                  </label>
                </div>
                <div className='flex w-1/2 flex-row space-x-3'>
                  <div className='flex w-1/2 flex-col'>
                    <label className='text-[18px] font-bold text-custom-color-dark-blue'>
                      Fecha creación:
                    </label>
                    <label className='text-[14px] font-normal text-custom-color-dark-blue'>
                      {formatDate(projectInfo[0].start_date)}
                    </label>
                  </div>
                  <div className='flex w-1/2 flex-col'>
                    <label className='text-[18px] font-bold text-custom-color-dark-blue'>
                      Fecha estimada de finalización:
                    </label>
                    <label className='text-[14px] font-normal text-custom-color-dark-blue'>
                      {formatDate(projectInfo[0].estimated_date)}
                    </label>
                  </div>
                  { projectInfo &&
                      (projectInfo[0]?.end_date != null && projectInfo[0]?.end_date != undefined) &&
                    <div className='flex w-1/2 flex-col'>
                    <label className='text-[18px] font-bold text-custom-color-dark-blue'>
                      Fecha de finalización:
                    </label>
                    <label className='text-[14px] font-normal text-custom-color-dark-blue'>
                      {formatDate(projectInfo[0].end_date)}
                    </label>
                  </div>
                  }
                </div>
              </div>
            }
            {
              countTask.length > 0 && projectInfoAdmin &&
              <HeaderCards
                counterTask={countTask}
                isAdmin={projectInfoAdmin.role_name === 'Administrador'}
              />
            }
          </div>
          <div className='flex flex-col space-y-6 px-[60px] pt-[45px]'>
            <label className='text-[20px] font-[700]'>Filtro</label>
            <div className='w-[400px]'>
              {
                usersFilter.length > 0 &&
                <CustomSelect
                  onChange={handleFilter}
                  users={usersFilter}
                />
              }
            </div>
          </div>
          <div className='flex flex-col space-y-6 px-[60px] pt-[45px]'>
            <label className='text-[20px] font-[700]'>Tareas</label>
            <div className='grid grid-cols-2 gap-6 md:grid-cols-3'>
              {
                tasksResult.length > 0 &&
                tasksResult.map((task, index) => (
                  <TaskCard
                    key={index}
                    task={task}
                    isFinishedProject={
                      projectInfo &&
                      (projectInfo[0]?.end_date != null && projectInfo[0]?.end_date != undefined)
                    }
                    openTask={openTask}
                    setIinfoTask={setIinfoTask}
                  />
                ))
              }
              {
                tasksResult.length === 0 &&
                <NoTask
                  onCreateTask={onCreatedTask}
                />
              }
            </div>
          </div>
        </div>
        {
          isOpenCreateTask &&
          < ModalComponent onClose={onCreatedTask} maxWidth='max-w-[45.8125rem]'>
            <CreateTask />
          </ModalComponent>
        }
        {
          isAddUserProject && infoUser !== null &&
          < ModalComponent onClose={onAddUserProject} maxWidth='max-w-[45.8125rem]'>

          </ModalComponent>
        }
        {
          isOpenModalTask && infoUser && infoTask !== null &&
          <ModalComponent onClose={openTask} maxWidth='max-w-[45.8125rem]'>
            <TaskModal task={infoTask} onClose={openTask} user_id={infoUser.user_id!} />
          </ModalComponent>
        }
      </Layout >
    </>
  );
};

export default CreateProject;


export const getServerSideProps = async ({ query }: any) => {

  const { id } = query;

  let tasks: TaskType[] = [];
  let countTask: CountTaskInfo[] = [];

  const bodyFilter = {
    'users': [17], // Obtener el ID del usuario!
    'project_id': id,
    'priorities': [],
    'status': []
  };

  const bodyCount = {
    'user_code': 17, // Obtener el ID del usuario!
    'project_id': id,
  };

  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    // FetchFilterTask
    const statusReq = await fetch('http://localhost:3000/api/tasks/getFilterTask', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(bodyFilter),
    });
    const response: any = await statusReq.json();
    if (response) {
      tasks = response;
    }

    // FetchCountTask
    const statusCountTask = await fetch('http://localhost:3000/api/tasks/getCountTaskByProject', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(bodyCount),
    });
    const responseCountTask: any = await statusCountTask.json();
    if (responseCountTask) {
      countTask = responseCountTask;
    }

  } catch (e) {
    console.error(e);
  }

  return { props: { tasks, countTask } };
};