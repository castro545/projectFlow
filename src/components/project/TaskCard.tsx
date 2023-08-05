import { TaskColorPriority, TaskColorState, TaskType } from '@/src/types/Task';
import { useEffect, useState } from 'react';
import { capitalize } from 'lodash';
import {
  UserGroupIcon,
  ClockIcon,
  ArrowPathIcon,
  CalendarIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/solid';
import { formatDate } from '@/src/utils/formatDate';

type TaskCardProps = {
  task: TaskType;
  openTask: () => void;
  setIinfoTask: (_task: TaskType) => void;
  isFinishedProject: boolean | null;
}

const TaskCard = ({ task, openTask, setIinfoTask, isFinishedProject }: TaskCardProps) => {

  const [colorsPriority, setColorPriority] = useState<TaskColorPriority | null>(null);
  const [colorsState, setColorsStates] = useState<TaskColorState | null>(null);

  const handleOpenModal = () => {
    openTask();
    setIinfoTask(task);
  };

  const setColorsPriority = () => {
    const colors: TaskColorPriority = {
      alta: {
        borde: 'border-red-400',
        bg: 'bg-red-100',
        text: 'text-red-800',
      },
      media: {
        borde: 'border-yellow-400',
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
      },
      baja: {
        borde: 'border-green-400',
        bg: 'bg-green-100',
        text: 'text-green-800',
      },
    };
    setColorPriority(colors);
  };

  const setColorsState = () => {
    const colors: TaskColorState = {
      nueva: {
        borde: 'border-yellow-400',
        bg: 'bg-yellow-50',
        text: 'text-yellow-800',
      },
      enProceso: {
        borde: 'border-blue-400',
        bg: 'bg-blue-100',
        text: 'text-blue-800',
      },
      resuelta: {
        borde: 'border-green-400',
        bg: 'bg-green-100',
        text: 'text-green-800',
      },
      enEspera: {
        borde: 'border-pink-400',
        bg: 'bg-pink-100',
        text: 'text-pink-800',
      },
      cancelada: {
        borde: 'border-red-400',
        bg: 'bg-red-100',
        text: 'text-red-800',
      }
    };
    setColorsStates(colors);
  };


  useEffect(() => {
    setColorsPriority();
    setColorsState();
  }, []);

  let borderColor = '';
  let bgColor = '';
  let textColor = '';

  let stateBorderColor = '';
  let stateBgColor = '';
  let stateTextColor = '';

  switch (task.task_priority) {
    case 'Alta':
      borderColor = colorsPriority?.alta?.borde || '';
      bgColor = colorsPriority?.alta?.bg || '';
      textColor = colorsPriority?.alta?.text || '';
      break;
    case 'Media':
      borderColor = colorsPriority?.media?.borde || '';
      bgColor = colorsPriority?.media?.bg || '';
      textColor = colorsPriority?.media?.text || '';
      break;
    case 'Baja':
      borderColor = colorsPriority?.baja?.borde || '';
      bgColor = colorsPriority?.baja?.bg || '';
      textColor = colorsPriority?.baja?.text || '';
      break;
    default:
      break;
  }

  switch (task.task_status_name) {
    case 'Nueva':
      stateBorderColor = colorsState?.nueva?.borde || '';
      stateBgColor = colorsState?.nueva?.bg || '';
      stateTextColor = colorsState?.nueva?.text || '';
      break;
    case 'En Proceso':
      stateBorderColor = colorsState?.enProceso?.borde || '';
      stateBgColor = colorsState?.enProceso?.bg || '';
      stateTextColor = colorsState?.enProceso?.text || '';
      break;
    case 'Resuelta':
      stateBorderColor = colorsState?.resuelta?.borde || '';
      stateBgColor = colorsState?.resuelta?.bg || '';
      stateTextColor = colorsState?.resuelta?.text || '';
      break;
    case 'En Espera':
      stateBorderColor = colorsState?.enEspera?.borde || '';
      stateBgColor = colorsState?.enEspera?.bg || '';
      stateTextColor = colorsState?.enEspera?.text || '';
      break;
    case 'Cancelada':
      stateBorderColor = colorsState?.cancelada?.borde || '';
      stateBgColor = colorsState?.cancelada?.bg || '';
      stateTextColor = colorsState?.cancelada?.text || '';
      break;
    default:
      break;
  }

  return (
    <div
      className='flex h-auto w-auto flex-col items-center justify-center space-y-8 rounded-lg bg-[#FFFFFC] p-5 shadow-card'
    >
      <div className='relative w-full'>
        <div className='absolute right-[-15px] top-[-10px]'>
          { !isFinishedProject &&
            <EllipsisVerticalIcon
            className='h-[2rem] w-[2rem] cursor-pointer text-custom-color-gold text-opacity-50'
            onClick={handleOpenModal}
          />
          }
        </div>
      </div>
      <div className='flex w-full flex-row justify-between'>
        <label className='flex items-center text-[20px] font-semibold text-custom-color-dark-blue'>{capitalize(task.task_name)}</label>
        <div className={`w-auto rounded-[10px] border-[2px] ${borderColor} ${bgColor} p-2 text-[12px] font-normal ${textColor}`}>
          Prioridad {task.task_priority}
        </div>
      </div>
      <div className='flex w-full flex-col rounded-lg border border-[#afafafaf] bg-[#f8f8f8] p-4 text-[#3f3f3f]'>
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
      <div className={`flex w-full flex-col rounded-[10px] border ${stateBorderColor} ${stateBgColor} p-2 text-center ${stateTextColor}`}>
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