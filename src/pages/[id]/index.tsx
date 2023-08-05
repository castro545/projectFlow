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
  PlusCircleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/solid';
import { BodyType, CountTaskInfo, OptionType, TaskType } from '@/src/types/Task';
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

const CreateProject = () => {
  const [tasksResult, setTaskResult] = useState<TaskType[]>([]);
  const [countTask, setCountTask] = useState<CountTaskInfo[]>([]);
  const [projectInfo, setProjectInfo] = useState<ProjectType[] | null>(null);
  const [isOpenCreateTask, setIsOpenCreateTask] = useState<boolean>(false);
  const [projectInfoAdmin, setProjectInfoAdmin] = useState<ProjectIsAdminInfo | null>(null);
  const [infoUser, setInfoUser] = useState<InfoUserLogin | null>(null);
  const [isOpenModalTask, setIsOpenModalTask] = useState<boolean>(false);
  const [infoTask, setIinfoTask] = useState<TaskType | null>(null);


  const fethProjectByUser = useGetCountTaskProject();
  const fetchTasks = useFetchFilterTasks();
  const fetchProject = useFetchInfoProject();
  const fetchisAdmin = useFetchAdminInfo();

  const router = useRouter();
  const { id } = router.query;

  const onCreatedTask = () => {

    setIsOpenCreateTask(!isOpenCreateTask);

  };

  const onViewChart = () => {

    router.push(`/${12}/chart`);

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

  const getCountTask = async () => {
    try {
      const bodyCount = {
        'user_code': 17,
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
        'user_id': 17,
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
    const fetchFilterTask = async () => {
      if (infoUser) {
        await getFilterTask();
      }

    };

    fetchFilterTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenCreateTask, infoUser]);

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
          <title>Proyecto :: {capitalize(projectInfo[0].name)} {isOpenCreateTask ? ':: Creando Tarea' : ''}</title>
        }
      </Head>
      <Layout>
        <div className='space-y-3'>
          <div className='space-y-3 px-[60px] pt-[45px]'>
            <div className='flex w-full flex-row justify-between'>
              <label className='text-[24px] font-[700]'>
                {
                  projectInfo &&
                  capitalize(projectInfo[0].name)
                }
              </label>
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
              <CustomSelect
                onChange={handleFilter}
              />
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
          isOpenModalTask && infoUser && infoTask !== null &&
          <ModalComponent onClose={openTask} maxWidth='max-w-[45.8125rem]'>
            <TaskModal task={infoTask} _onClose={openTask} />
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
    'users': [17],
    'project_id': id,
    'priorities': [],
    'status': []
  };

  const bodyCount = {
    'user_code': 17,
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