import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusIcon } from '@heroicons/react/24/solid';
import CreateProjectImage from '../../../public/images/png/create_project.png';
import { ToastUtils } from '@/src/utils/ToastUtils';
import CircularProgressIndicator from '../CircularProgressIndicator';
import { useCreateProject } from '../hooks/project/useCreateProject';
import { ProjectType } from '@/src/types/Project';

type ColaboratorsType = {
  email: string;
};

type CreateProjectProps = {
  onClose: () => void;
  owner_id: number;
}

type InputData = {
  projectName: string;
  colaborator: string;
  description: string;
  startDate: string;
  estimatedDate: string;
};

type ColaboratorData = {
  email: string;
};

const CreateProject = ({ onClose, owner_id }: CreateProjectProps) => {

  const [colaborators, setColaborators] = useState<ColaboratorsType[]>([]);
  const [manyContributors, setManyContributors] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<number | null>(null);
  const [estimatedDate, setEstimatedDate] = useState<number | null>(null);

  const createProject = useCreateProject();


  const { register, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      projectName: '',
      description: '',
      colaborator: '',
      startDate: '',
      estimatedDate: '',
    },
    shouldUseNativeValidation: false
  });

  const convertData = (data: InputData, colaborators: ColaboratorData[], owner_id: number): ProjectType => {
    const { projectName, description, startDate, estimatedDate } = data;
    const emails = colaborators.map((colaborator) => colaborator.email);
    return {
      name: projectName,
      description,
      start_date: startDate,
      estimated_date: estimatedDate,
      emails,
      owner_code: owner_id
    };
  };

  const onSubmit = async (data: any) => {
    if (colaborators.length === 0) {
      setManyContributors('Debes ingresar un colaborador');
      return;
    }

    setLoading(true);

    const startDateObject = new Date(data.startDate);
    setStartDate(startDateObject.getTime());

    const estimatedDateObject = new Date(data.startDate);
    setEstimatedDate(estimatedDateObject.getTime());


    // Formateo de fecha 2023/08/08 a un timestamp
    if (startDate) {
      data.startDate = new Date(startDate).toISOString();
    }

    if (estimatedDate) {
      data.estimatedDate = new Date(estimatedDate).toISOString();
    }

    const outputData: ProjectType = convertData(data, colaborators, owner_id);

    const response = await createProject(outputData);

    if (response.project.create_project_with_contributors === -1) {

      ToastUtils.infoMessage('Ya hay un Proyecto con ese nombre, intenta otro.');
    } else {
      ToastUtils.successMessage('¡Proyecto Creado!');
      onClose();
      setLoading(false);
    }
  };

  const addColaborator = (email: string) => {

    if (colaborators.length > 9) {
      setManyContributors('Máximo 10 colaboradores');
      return;
    }

    const patron = /^[\w.-]+@[\w.-]+\.\w+$/;

    if (email.trim() === '') {
      setManyContributors('Ingresa un email');
      return;
    }

    if (!patron.test(email)) {
      setManyContributors('No es un email');
      return;
    }

    if (email.trim() === '') {
      return;
    }

    const isEmailExist = colaborators.some((colaborator) => colaborator.email === email);
    if (isEmailExist) {
      setManyContributors('Ya está agregado');
      return;
    }

    setManyContributors('');
    const newColaborator = { email };
    setColaborators([...colaborators, newColaborator]);

    setValue('colaborator', '');
  };

  useEffect(() => { }, []);

  return (
    <>
      <div className='w-full px-10 pb-10 pt-5'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-10'
        >
          <label className='text-[24px] font-[600] text-custom-color-dark-blue'>Nuevo Proyecto</label>
          <div className='flex flex-row'>
            <div className='w-1/2 space-y-6'>
              <div className='flex flex-col space-y-3'>
                <label className='text-[16px] font-[300] text-custom-color-dark-blue'>Nombre Proyecto</label>
                <input
                  type='text'
                  className='m-0 h-[35px] rounded-[10px] border-[#D9D9D9] bg-[#E9E9E9] p-3 text-[14px] text-gray-400 placeholder-gray-400 outline-none focus:ring focus:ring-custom-color-light-gray'
                  required={true}
                  autoComplete='company'
                  {...register('projectName')}
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
                <label className='text-[16px] font-[300] text-custom-color-dark-blue'>Inicio del proyecto</label>
                <input
                  type='date'
                  defaultValue={getValues('startDate') || ''}
                  className='mt-1 block w-full rounded-lg border bg-[#E9E9E9] px-4 py-3 text-[14px] text-gray-900 outline-none focus:border-custom-color-light-gray focus:ring focus:ring-custom-color-light-gray'
                  placeholder='Selecciona una fecha'
                  required={true}
                  {...register('startDate')}
                />
              </div>
              <div className='flex flex-col space-y-3'>
                <label className='text-[16px] font-[300] text-custom-color-dark-blue'>Fin del proyecto estimado</label>
                <input
                  type='date'
                  defaultValue={getValues('estimatedDate') || ''}
                  className='mt-1 block w-full rounded-lg border bg-[#E9E9E9] px-4 py-3 text-[14px] text-gray-900 outline-none focus:border-custom-color-light-gray focus:ring focus:ring-custom-color-light-gray'
                  placeholder='Selecciona una fecha'
                  required={true}
                  {...register('estimatedDate')}
                />
              </div>
              <div className='flex flex-col space-y-3'>
                <label className='text-[16px] font-[300] text-custom-color-dark-blue'>Colaboradores</label>
                <div className='flex flex-col justify-between'>
                  <div className='flex flex-row justify-between space-x-2'>
                    <input
                      type='text'
                      className='m-0 h-[35px] w-full rounded-[10px] border-[#D9D9D9] bg-[#E9E9E9] p-3 text-[14px] text-gray-400 placeholder-gray-400 outline-none focus:ring focus:ring-custom-color-light-gray'
                      autoComplete='email'
                      {...register('colaborator')}
                    />
                    <button
                      type='button'
                      className='middle none center font-sans rounded-lg border-2 border-custom-color-gold px-6 py-1.5 text-sm font-bold text-custom-color-gold transition-all hover:opacity-75 focus:ring focus:ring-custom-color-light-gray active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                      onClick={() => addColaborator(getValues('colaborator'))}
                    >
                      <PlusIcon
                        className='h-6 w-6 cursor-pointer stroke-1'
                      />
                    </button>
                  </div>
                  <h6 className='text-[12px] text-red-500'>{manyContributors}</h6>
                </div>
              </div>
            </div>
            <div className='flex w-1/2 flex-col items-center  justify-between'>

              <div className='mt-8 flex flex-col items-center justify-center'>
                <Image
                  src={CreateProjectImage}
                  alt={'Ilustración de crear proyecto'}
                  width={205}
                  height={138}
                />
              </div>
              <div className={`${colaborators.length > 0 ? 'mt-6 rounded-lg border border-custom-color-gold bg-white p-3 text-center shadow-lg' : ''} `}>
                {
                  colaborators.length > 0 &&
                  colaborators.map((colaborator, index) => (
                    <h1 key={index}>{colaborator.email}</h1>
                  ))
                }
              </div>
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

export default CreateProject;