import { useEffect, useState } from 'react';
import Image from 'next/image';

import CreateUserImage from '../../../public/images/png/create_user.png';
import { useForm } from 'react-hook-form';
import CircularProgressIndicator from '../CircularProgressIndicator';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { CreateUserResponse, CreateUserType } from '@/src/types/Login';
import { useCreateUser } from '../hooks/user/usecreateUser';
import { ToastUtils } from '@/src/utils/ToastUtils';

const RegisterUser = ({ onClose }: any) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const createUser = useCreateUser();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      pass: '',
      rePass: ''
    },
    shouldUseNativeValidation: false
  });

  const onSubmit = async (data: any) => {

    if (data.pass !== data.rePass) {
      setError('No coinciden las constraseñas');
      return;
    }

    setLoading(true);
    setError('');

    const dataBody: CreateUserType = {
      full_name: data.name,
      email: data.email,
      password: data.pass
    };

    const response: CreateUserResponse = await createUser(dataBody);

    if (response.user.error !== '') {
      if (response.user.error.includes('The user already exists')) {
        ToastUtils.errorMessage('El correo ya está en uso, intenta otro');
      } else {
        ToastUtils.warnMessage('Ocurrió un error, vuelve a intentarlo');
      }
      setLoading(false);
      return;
    } else {
      ToastUtils.successMessage('¡Usuario creado exitosamente!');
    }

    setLoading(false);
    onClose();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev: boolean) => !prev); // Especificar el tipo de 'prev' como 'boolean'
  };

  useEffect(() => { }, []);

  return (
    <>
      <div className='flex w-full flex-col space-y-4 px-12 py-8'>
        <label className='text-[26px] font-[700] text-custom-color-dark-blue'>
          Nueva Cuenta
        </label>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-full flex-col'
        >
          <div className='flex w-full flex-row'>
            <div className='flex w-1/2 flex-col items-center justify-center space-y-12'>
              <div className='w-full space-y-4'>
                <div className='flex flex-col space-y-3'>
                  <label className='text-[16px] font-[300] text-custom-color-dark-blue'>Nombre Completo</label>
                  <input
                    type='text'
                    className='m-0 h-[35px] rounded-[15px] border-[#D9D9D9] bg-[#E9E9E9] p-3 text-[14px] text-gray-400 placeholder-gray-400 outline-none '
                    required={true}
                    autoComplete='name'
                    {...register('name')}
                  />
                </div>
                <div className='flex flex-col space-y-3'>
                  <label className='text-[16px] font-[300] text-custom-color-dark-blue'>Email</label>
                  <input
                    type='email'
                    className='m-0 h-[35px] rounded-[15px] border-[#D9D9D9] bg-[#E9E9E9] p-3 text-[14px] text-gray-400 placeholder-gray-400 outline-none '
                    required={true}
                    autoComplete='email'
                    {...register('email')}
                  />
                </div>
                <div className='relative flex flex-col space-y-3'>
                  <label className='text-[16px] font-[300] text-custom-color-dark-blue'>Contraseña</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className='m-0 h-[35px] rounded-[15px] border-[#D9D9D9] bg-[#E9E9E9] p-3 text-gray-400 placeholder-gray-400 outline-none'
                    {...register('pass')}
                  />
                  <button
                    type='button'
                    className='absolute right-2 top-[50%] mt-3 -translate-y-1/3 transform text-gray-800 focus:outline-none'
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeSlashIcon className='h-6 w-6 text-gray-400' /> : <EyeIcon className='h-6 w-6 text-gray-400' />}
                  </button>
                </div>
                <div className='relative flex flex-col space-y-4'>
                  <label className='text-[16px] font-[300] text-custom-color-dark-blue'>Repetir Contraseña</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className='m-0 h-[35px] rounded-[15px] border-[#D9D9D9] bg-[#E9E9E9] p-3 text-gray-400 placeholder-gray-400 outline-none'
                    {...register('rePass')}
                  />
                  <button
                    type='button'
                    className='b-3 absolute right-2 top-[50%] -translate-y-1/3 transform focus:outline-none'
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeSlashIcon className='h-6 w-6 text-gray-400' /> : <EyeIcon className='h-6 w-6 text-gray-400' />}
                  </button>
                </div>
                <h6 className='text-[12px] text-red-400'>{error}</h6>
              </div>
              <button
                type='submit'
                className=' mr-3 w-[150px] rounded-[15px] border border-custom-color-gold bg-custom-color-gold px-6 py-2 text-xs font-bold text-white transition-all hover:opacity-75 focus:ring focus:ring-custom-color-light-gray active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              >
                {loading ? <div className='flex items-center justify-center'><CircularProgressIndicator /></div> : <h1>Ingresa</h1>}
              </button>

            </div>
            <div className='flex w-1/2 items-center justify-center px-6'>
              <Image
                src={CreateUserImage}
                alt={'Ilustración de crear un usuario'}
                width={308}
                height={340}
              />
            </div>
          </div>

        </form>
      </div>
      <style jsx>{`
        input::-ms-reveal,
        input::-ms-clear {
          display: none;
        }
      `}</style>
    </>
  );
};


export default RegisterUser;