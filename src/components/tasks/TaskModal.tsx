import { TaskColorPriority, TaskColorState, TaskType } from '@/src/types/Task';
import { useEffect, useState } from 'react';
import {
  UserGroupIcon,
  ClockIcon,
  ArrowPathIcon,
  CalendarIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  PencilSquareIcon
} from '@heroicons/react/24/solid';
import { capitalize } from 'lodash';
import { formatDate } from '@/src/utils/formatDate';
import { useForm } from 'react-hook-form';

type TaskModalProps = {
  task: TaskType;
  onClose: () => void;
}

const TaskModal = ({ task, onClose }: TaskModalProps) => {
  const [colorsPriority, setColorPriority] = useState<TaskColorPriority | null>(null);
  const [colorsState, setColorsStates] = useState<TaskColorState | null>(null);
  const [isDropdownOpenTrash, setIsDropdownOpenTrash] = useState<boolean>(false);
  const [isEdditingDesc, setIsEdditingDesc] = useState<boolean>(false);


  const toggleDropdownTrash = () => {
    setIsDropdownOpenTrash(!isDropdownOpenTrash);
  };

  useEffect(() => {
    console.log(task.task_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const { register, handleSubmit } = useForm({
    defaultValues: {
      description: task.task_description,
    },
    shouldUseNativeValidation: false
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form
        className='flex h-auto w-full flex-col items-center justify-center space-y-8 rounded-lg p-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex w-full flex-row justify-between'>
          <label className='flex items-center text-[20px] font-semibold text-custom-color-dark-blue'>{capitalize(task.task_name)}</label>
          <div className='flex flex-row space-x-2'>
            <div className={`w-auto rounded-[10px] border-[2px] ${borderColor} ${bgColor} flex items-center justify-center p-2 text-[12px] font-normal ${textColor}`}>
              Prioridad {task.task_priority}
            </div>
            <div className='relative'>
              <div
                className={'w-auto cursor-pointer rounded-[10px] border-[2px] border-red-400 bg-red-100 p-2 text-[12px] font-normal text-red-800'}
                onClick={toggleDropdownTrash}
              >
                <TrashIcon
                  className='h-[1.5rem] w-[1.5rem] text-red-700'
                />
                {isDropdownOpenTrash && (
                  <div className='absolute right-0 mt-2 w-auto cursor-auto rounded-lg border border-gray-300 bg-white shadow'>
                    <div className='flex flex-row'>
                      <div className='w-20 p-5'>
                        <div
                          className='cursor-pointer rounded-lg bg-red-200 p-2'
                          onClick={() => console.log('se elimina')}
                        >
                          <XMarkIcon
                            className='h-[1.5rem] w-[1.5rem] text-red-700'
                          />
                        </div>
                      </div>
                      <div className='w-20 p-5'>
                        <div
                          className='cursor-pointer rounded-lg bg-green-200 p-2'
                          onClick={() => console.log('no se elimina')}
                        >
                          <CheckIcon
                            className='h-[1.5rem] w-[1.5rem] text-green-700'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {
          !isEdditingDesc &&
          <div className='flex w-full flex-col rounded-lg border border-[#afafafaf] bg-[#f8f8f8] p-4 text-[#3f3f3f]'>
            <div className='flex flex-row'>
              <div className='w-11/12'>
                {task.task_description}
              </div>
              <div className='flex w-1/12 justify-end'>
                <PencilSquareIcon
                  className='h-[1.5rem] w-[1.5rem] cursor-pointer text-[#3f3f3f]'
                  onClick={() => setIsEdditingDesc(!isEdditingDesc)}
                />
              </div>
            </div>
          </div>
        }
        {
          isEdditingDesc &&
          <div className='w-full space-y-1'>
            <textarea
              className='m-0 h-[80px] w-full resize-none rounded-[10px] border border-[#afafafaf] bg-[#f8f8f8] p-3 text-[14px] text-[#3f3f3f] placeholder-gray-400 outline-none focus:ring focus:ring-custom-color-light-gray'
              rows={5}
              required={true}
              placeholder=''
              {...register('description')}
            />
            <div className='flex w-full flex-row space-x-2'>
              <div
                className='flex w-full cursor-pointer flex-row justify-center rounded-lg bg-slate-300 p-2'
                onClick={onClose}
              >
                Guardar
              </div>
              <div
                className='flex w-full cursor-pointer flex-row justify-center rounded-lg bg-slate-300 p-2'
                onClick={() => setIsEdditingDesc(!isEdditingDesc)}
              >
                Cancelar
              </div>
            </div>
          </div>
        }
        <div className='flex w-full flex-row space-x-3'>
          <UserGroupIcon
            className='h-[1.875rem] w-[1.875rem] cursor-pointer text-custom-color-gold text-opacity-50'
          />
          <h4 className='flex items-center text-[14px]'><b>{capitalize(task.user_full_name)}&nbsp;</b>{'es el responsable de esta tarea'}</h4>
          d</div>
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
      </form>
    </>
  );
};


export default TaskModal;