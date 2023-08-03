import HeaderCards from '@/src/components/dashboard/HeaderCards';
import Layout from '@/src/components/layout/Layout';
import CustomSelect from '@/src/components/project/CustomSelect';
import NoTask from '@/src/components/project/NoTask';
import TaskCard from '@/src/components/project/TaskCard';
import { ProjectType } from '@/src/types/Project';
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
import useGetProjectByUser from '@/src/components/hooks/project/fetchProjectByUser';

const CreateProject = () => {
  const [tasksResult, setTaskResult] = useState<TaskType[]>([]);
  const [countTask, setCountTask] = useState<CountTaskInfo[]>([]);

  const project: ProjectType = {
    project_id: '12',
    owner_code: 17,
    name: 'Mi Proyecto',
    description: 'Descripción del proyecto',
    start_date: new Date(1690909380000),
    estimated_date: new Date(1690909380000),
  };

  const fetchTasks = useFetchFilterTasks();

  const router = useRouter();
  const { id } = router.query;

  const onCreatedTask = () => {

    router.push(`/${12}/createtask`);

  };

  const onViewChart = () => {

    router.push(`/${12}/chart`);

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

  const fethProjectByUser = useGetProjectByUser();

  const getProjects = async () => {
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
        'users': [17],
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

  useEffect(() => {
    const fetchFilterTask = async () => {

      await getFilterTask();

    };

    fetchFilterTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {

      await getProjects();

    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {
              countTask.length > 0 &&
              <HeaderCards
                counterTask={countTask}
              />}
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
      </Layout>
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