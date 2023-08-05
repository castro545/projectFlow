import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CreateProjectImage from '../../../public/images/png/create_project.png';
import { ToastUtils } from '@/src/utils/ToastUtils';
import CircularProgressIndicator from '../CircularProgressIndicator';
import { useCreateTask } from '../hooks/task/useCreateTask';

type CreateTaskProps = {
  onClose: () => void;
  owner_id: number;
  project_id: number;
}

const CreateTask = ({ onClose, owner_id, project_id }: CreateTaskProps) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<number | null>(null);

  const createTask = useCreateTask();


  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      task_name: '',
      description: '',
      colaborator: '',
      startDate: '',
    },
    shouldUseNativeValidation: false
  });

  const onSubmit = async (data: any) => {

    console.log(data);

    setLoading(true);

    const startDateObject = new Date(data.startDate);
    setStartDate(startDateObject.getTime());

    // Formateo de fecha 2023/08/08 a un timestamp
    if (startDate) {
      data.startDate = new Date(startDate).toISOString();
    }

    console.log(project_id, data.colaborator, data.task_name, data.description, owner_id);

    const response = await createTask(project_id, data.colaborator, data.task_name, data.description, owner_id);

    console.log(response);

    if (response.create_task) {
      ToastUtils.successMessage('¡Tarea Creado!');
      onClose();
      setLoading(false);
    } else {
      ToastUtils.infoMessage('Hubo un error, intenta de nuevo.');
    }
  };

  useEffect(() => {

  }, []);

  return (
    <>
      <div className='w-full px-10 pb-10 pt-5'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-10'
        >
          <label className='text-[24px] font-[600] text-custom-color-dark-blue'>Nueva Tarea</label>
          <div className='flex flex-row'>
            <div className='w-1/2 space-y-6'>
              <div className='flex flex-col space-y-3'>
                <label className='text-[16px] font-[300] text-custom-color-dark-blue'>Nombre de la tarea</label>
                <input
                  type='text'
                  className='m-0 h-[35px] rounded-[10px] border-[#D9D9D9] bg-[#E9E9E9] p-3 text-[14px] text-gray-400 placeholder-gray-400 outline-none focus:ring focus:ring-custom-color-light-gray'
                  required={true}
                  autoComplete='company'
                  {...register('task_name')}
                />
              </div>
              <div className='flex flex-col space-y-3'>
                <label className='text-[16px] font-[300] text-custom-color-dark-blue'>Descripción</label>
                <textarea
                  className='m-0 h-[80px] w-full resize-none rounded-[10px] border-[#D9D9D9] bg-[#E9E9E9] p-3 text-[14px] text-gray-400 placeholder-gray-400 outline-none focus:ring focus:ring-custom-color-light-gray'
                  rows={5}
                  required={true}
                  placeholder=''
                  {...register('description')}
                />
              </div>
              <div className='flex flex-col space-y-3'>
                <label className='text-[16px] font-[300] text-custom-color-dark-blue'>Inicio de la tarea</label>
                <input
                  type='date'
                  defaultValue={getValues('startDate') || ''}
                  className='mt-1 block w-full rounded-lg border bg-[#E9E9E9] px-4 py-3 text-[14px] text-gray-900 outline-none focus:border-custom-color-light-gray focus:ring focus:ring-custom-color-light-gray'
                  placeholder='Selecciona una fecha'
                  required={true}
                  min={new Date().toISOString().split('T')[0]}
                  {...register('startDate')}
                />
              </div>
              <div className='flex flex-col space-y-3'>
                <label className='text-[16px] font-[300] text-custom-color-dark-blue'>Colaborador</label>
                <div className='flex flex-col justify-between'>
                  <div className='flex flex-row justify-between space-x-2'>
                    <input
                      type='text'
                      className='m-0 h-[35px] w-full rounded-[10px] border-[#D9D9D9] bg-[#E9E9E9] p-3 text-[14px] text-gray-400 placeholder-gray-400 outline-none focus:ring focus:ring-custom-color-light-gray'
                      autoComplete='email'
                      {...register('colaborator')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex w-1/2 flex-col items-center  justify-center'>

              <Image
                src={CreateProjectImage}
                alt={'Ilustración de crear proyecto'}
                width={205}
                height={138}
              />
            </div>


          </div>
          <button
            type='submit'
            className='middle none center font-sans mr-3 rounded-lg border border-custom-color-gold bg-custom-color-gold px-6 py-3 text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-custom-color-light-gray active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          >
            {loading ? <CircularProgressIndicator /> : <h1>Crear proyecto</h1>}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateTask;