import { TaskColorPriority, TaskColorState, TaskType, UpdateTask } from '@/src/types/Task';
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
import { useDeleteTask } from '../hooks/task/useDeleteTask';
import { ToastUtils } from '@/src/utils/ToastUtils';
import { useUpdateTask } from '../hooks/task/useUpdateTask';

type TaskModalProps = {
  task: TaskType;
  onClose: () => void;
  user_id: number;
}

const TaskModal = ({ task, onClose, user_id }: TaskModalProps) => {
  const [colorsPriority, setColorPriority] = useState<TaskColorPriority | null>(null);
  const [colorsState, setColorsStates] = useState<TaskColorState | null>(null);
  const [isDropdownOpenTrash, setIsDropdownOpenTrash] = useState<boolean>(false);
  const [isDropdownOpenPriority, setIsDropdownOpenPriority] = useState<boolean>(false);
  const [isDropdownOpenState, setIsDropdownOpenState] = useState<boolean>(false);
  const [isEdditingDesc, setIsEdditingDesc] = useState<boolean>(false);


  const toggleDropdownTrash = () => {
    setIsDropdownOpenTrash(!isDropdownOpenTrash);
  };

  const toggleDropdownPriority = () => {
    setIsDropdownOpenPriority(!isDropdownOpenPriority);
  };

  const toggleDropdownState = () => {
    setIsDropdownOpenState(!isDropdownOpenState);
  };

  const deleteTaskHook = useDeleteTask();
  const updateTaskHook = useUpdateTask();

  const { register, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      description: task.task_description,
      task_priority_id: task.task_priority_id,
      task_status_id: task.task_status_id
    },
    shouldUseNativeValidation: false
  });

  const deleteTask = async (task_id: number) => {
    try {
      const reqdata: number = await deleteTaskHook(task_id);

      if (reqdata >= 1) {
        ToastUtils.successMessage('¡Tarea eliminada exitosamente!');
        onClose();
      } else {
        ToastUtils.warnMessage('Hubo un error eliminando la tarea, vuelve a intentarlo');
        onClose();
      }
    } catch {
      return false;
    }
  };

  const updateTask = async () => {
    try {

      const updateBody: UpdateTask = {
        description: getValues('description') === task.task_description ? task.task_description : getValues('description'),
        priority_code: getValues('task_priority_id'),
        status_code: getValues('task_status_id'),
        updated_by: user_id,
        task_id: task.task_id
      };

      const reqdata: number = await updateTaskHook(updateBody);

      console.log(reqdata);

      if (reqdata >= 1) {
        ToastUtils.successMessage('¡Tarea actualizada exitosamente!');
        onClose();
      } else {
        ToastUtils.warnMessage('Hubo un error actualizando la tarea, vuelve a intentarlo');
        onClose();
      }
    } catch {
      return false;
    }
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

  const onSubmit = async (data: any) => {
    console.log(data);

    await updateTask();


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
            <div className='relative'>
              <div
                className={`h-[43.62px] w-auto rounded-[10px] border-[2px] ${borderColor} ${bgColor} flex cursor-pointer select-none items-center justify-center p-2 text-[12px] font-normal ${textColor} hover:${borderColor}'`}
                onClick={toggleDropdownPriority}
              >
                Prioridad {task.task_priority}
              </div>
              {isDropdownOpenPriority && (
                <div className='absolute right-0 mt-2 w-auto cursor-auto rounded-lg bg-transparent'>
                  <div className='flex flex-row'>
                    <div className='w-[92px] space-y-2 p-0'>
                      <div
                        className='flex cursor-pointer justify-center rounded-lg bg-red-200 p-2 hover:bg-red-300'
                        onClick={async () => {
                          setValue('task_priority_id', 1);
                          await updateTask();
                          toggleDropdownPriority();
                        }}
                      >
                        <label className='cursor-pointer text-[10px] font-normal text-red-800'
                          onClick={async () => {
                            setValue('task_priority_id', 1);
                            await updateTask();
                            toggleDropdownPriority();
                          }}
                        >
                          Prioridad Alta
                        </label>
                      </div>
                      <div
                        className='flex cursor-pointer justify-center rounded-lg bg-yellow-200 p-2 hover:bg-yellow-300'
                        onClick={async () => {
                          setValue('task_priority_id', 2);
                          await updateTask();
                          toggleDropdownPriority();
                        }}
                      >
                        <label className='cursor-pointer text-[10px] font-normal text-red-800'
                          onClick={async () => {
                            setValue('task_priority_id', 2);
                            await updateTask();
                            toggleDropdownPriority();
                          }}
                        >
                          Prioridad Media
                        </label>
                      </div>
                      <div
                        className='flex cursor-pointer justify-center rounded-lg bg-green-200 p-2 hover:bg-green-300'
                        onClick={async () => {
                          setValue('task_priority_id', 3);
                          await updateTask();
                          toggleDropdownPriority();
                        }}
                      >
                        <label className='cursor-pointer text-[10px] font-normal text-red-800'
                          onClick={async () => {
                            setValue('task_priority_id', 3);
                            await updateTask();
                            toggleDropdownPriority();
                          }}
                        >
                          Prioridad Baja
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className='relative'>
              <div
                className={'w-auto cursor-pointer rounded-[10px] border-[2px] border-red-400 bg-red-100 p-2 text-[12px] font-normal text-red-800 hover:bg-red-200'}
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
                          onClick={() => onClose()}
                        >
                          <XMarkIcon
                            className='h-[1.5rem] w-[1.5rem] text-red-700'
                          />
                        </div>
                      </div>
                      <div className='w-20 p-5'>
                        <div
                          className='cursor-pointer rounded-lg bg-green-200 p-2'
                          onClick={() => deleteTask(task.task_id)}
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
                  className='h-[1.5rem] w-[1.5rem] cursor-pointer text-[#3f3f3f] hover:text-[#242424]'
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
              <button
                type='submit'
                className='flex w-full cursor-pointer select-none flex-row justify-center rounded-lg bg-slate-200 p-2 text-slate-500 hover:bg-slate-300'
              >
                Guardar
              </button>
              <div
                className='flex w-full cursor-pointer select-none flex-row justify-center rounded-lg bg-slate-200 p-2 text-slate-500 hover:bg-slate-300'
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
        </div>
        <div className='flex w-full flex-row space-x-3'>
          <ClockIcon
            className='h-[1.875rem] w-[1.875rem] cursor-pointer text-custom-color-gold text-opacity-50'
          />
          <h4 className='flex items-center text-[14px]'>Terminará el {formatDate(task.task_estimated_date)}</h4>
        </div>
        <div className='relative w-full'>
          <div className={`flex w-full cursor-pointer flex-col rounded-[10px] border ${stateBorderColor} ${stateBgColor} p-2 text-center ${stateTextColor} select-none`}
            onClick={toggleDropdownState}
          >
            {task.task_status_name}
          </div>
          {isDropdownOpenState && (
            <div className='absolute right-[42.5%] mt-2 w-auto cursor-auto rounded-lg bg-transparent'>
              <div className='flex flex-row'>
                <div className='w-[92px] space-y-2 p-0'>
                  <div
                    className='flex cursor-pointer justify-center rounded-lg bg-yellow-100 p-2 hover:bg-yellow-200'
                    onClick={async () => {
                      setValue('task_status_id', 1);
                      await updateTask();
                      toggleDropdownState();
                    }}
                  >
                    <label className='cursor-pointer select-none text-[12px] font-normal text-yellow-800'
                      onClick={async () => {
                        setValue('task_status_id', 1);
                        await updateTask();
                        toggleDropdownState();
                      }}
                    >
                      Nueva
                    </label>
                  </div>
                  <div
                    className='flex cursor-pointer justify-center rounded-lg bg-blue-100 p-2 hover:bg-blue-200'
                    onClick={async () => {
                      setValue('task_status_id', 2);
                      await updateTask();
                      toggleDropdownState();
                    }}
                  >
                    <label className='cursor-pointer select-none text-[12px] font-normal text-blue-800'
                      onClick={async () => {
                        setValue('task_status_id', 2);
                        await updateTask();
                        toggleDropdownState();
                      }}
                    >
                      En Proceso
                    </label>
                  </div>
                  <div
                    className='flex cursor-pointer justify-center rounded-lg bg-green-100 p-2 hover:bg-green-200'
                    onClick={async () => {
                      setValue('task_status_id', 3);
                      await updateTask();
                      toggleDropdownState();
                    }}
                  >
                    <label className='cursor-pointer select-none text-[12px] font-normal text-green-800'
                      onClick={async () => {
                        setValue('task_status_id', 3);
                        await updateTask();
                        toggleDropdownState();
                      }}
                    >
                      Resuelta
                    </label>
                  </div>
                  <div
                    className='flex cursor-pointer justify-center rounded-lg bg-pink-100 p-2 hover:bg-pink-200'
                    onClick={async () => {
                      setValue('task_status_id', 4);
                      await updateTask();
                      toggleDropdownState();
                    }}
                  >
                    <label className='cursor-pointer select-none text-[12px] font-normal text-red-800'
                      onClick={async () => {
                        setValue('task_status_id', 4);
                        await updateTask();
                        toggleDropdownState();
                      }}
                    >
                      En Espera
                    </label>
                  </div>
                  <div
                    className='flex cursor-pointer justify-center rounded-lg bg-red-100 p-2 hover:bg-red-200'
                    onClick={async () => {
                      setValue('task_status_id', 5);

                      await updateTask();
                      toggleDropdownState();
                    }}
                  >
                    <label className='cursor-pointer select-none text-[12px] font-normal text-red-800'
                      onClick={async () => {
                        setValue('task_status_id', 5);
                        await updateTask();
                        toggleDropdownState();
                      }}
                    >
                      Cancelada
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
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