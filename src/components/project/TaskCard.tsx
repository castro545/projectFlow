import { TaskType } from '@/src/types/Task';
import { useEffect } from 'react';
import { capitalize } from 'lodash';
import {
  UserGroupIcon,
  ClockIcon,
  ArrowPathIcon,
  CalendarIcon
} from '@heroicons/react/24/solid';
import { formatDate } from '@/src/utils/formatDate';

type TaskCardProps = {
  task: TaskType;
}

const TaskCard = ({ task }: TaskCardProps) => {
  useEffect(() => { }, []);

  return (
    <div
      className='flex h-auto w-auto cursor-pointer flex-col items-center justify-center space-y-8 rounded-lg bg-[#FFFFFC] p-5 shadow-card'
    >
      <div className='flex w-full flex-row justify-between'>
        <label className='flex items-center text-[18px] font-semibold text-custom-color-dark-blue'>{capitalize(task.task_name)}</label>
        <div className='w-auto rounded-[10px] border-[2px] border-red-600 bg-red-300 p-2 text-[12px] font-normal text-white'>Prioridad {task.task_priority}</div>
      </div>
      <div className='flex w-full flex-col rounded-lg border border-[#7497FE] bg-[#7497fe3d] p-4'>
        {task.task_description}
      </div>
      <div className='flex w-full flex-row space-x-3'>
        <UserGroupIcon
          className='h-[1.875rem] w-[1.875rem] cursor-pointer text-custom-color-gold text-opacity-50'
        />
        <h4 className='flex items-center text-[14px]'><b>{capitalize(task.user_full_name)}&nbsp;</b>{'es el responsable de esta tarea'}</h4>
      </div>
      <div className='flex w-full flex-row space-x-3'>
        <ClockIcon
          className='h-[1.875rem] w-[1.875rem] cursor-pointer text-custom-color-gold text-opacity-50'
        />
        <h4 className='flex items-center text-[14px]'>Terminará el {formatDate(task.task_estimated_date)}</h4>
      </div>
      <div className='flex w-full flex-col rounded-[10px] border border-green-500 bg-green-200 p-2 text-center text-green-600'>
        {task.task_status_name}
      </div>
      <div className='flex w-full flex-row justify-between'>
        <div className='flex flex-row items-center space-x-3'>
          <ArrowPathIcon
            className='h-[1.5rem] w-[1.5rem] cursor-pointer text-custom-color-gold text-opacity-50'
          />
          <h4 className='flex items-center text-[11px]'>Actualizada por {capitalize(task.updated_by_user_full_name)}</h4>
        </div>
        <div className='flex flex-row items-center space-x-3'>
          <CalendarIcon
            className='h-[1.5rem] w-[1.5rem] cursor-pointer text-custom-color-gold text-opacity-50'
          />
          <h4 className='flex items-center text-[11px]'>Iniciada el {formatDate(task.task_start_date)}</h4>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;