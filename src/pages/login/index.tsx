import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Logo from '../../../public/images/png/Logo_Ola.png';
import LoginImg from '../../../public/images/png/Login.png';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

import { useForm } from 'react-hook-form';
import CircularProgressIndicator from '@/src/components/CircularProgressIndicator';
import { ToastUtils } from '@/src/utils/ToastUtils';
import { InfoUserLogin, LoginType } from '@/src/types/Login';
import { useLogin } from '@/src/components/hooks/user/login/login';
import Storage from '@/src/utils/storage';
import { verifyToken } from '@/src/utils/jwt';
import { useRouter } from 'next/router';
import ModalComponent from '@/src/components/layout/Modal';
import RegisterUser from '@/src/components/register/RegisterUser';

const ModalLayout = ({ children }: any) => (
  <>
    <div className='relative h-screen overflow-y-auto bg-gradient-to-b from-custom-color-gold to-custom-color-light-gold'>
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <div className='mx-5 my-5 h-auto w-auto rounded-lg bg-white p-5 pt-7 shadow-lg md:m-0 md:h-[450px] md:w-[520px] md:p-0 '>
          <div className='grid place-items-center'>
            {children}
          </div>
        </div>
        <div className='absolute hidden h-[1px] w-auto md:block'>
          <Image
            src={LoginImg}
            alt='Img ilustrativa de Proyecto Flow'
            className=''
            style={{
              transform: 'translate(-90%, 50%)', // Ajusta los valores para posicionar adecuadamente la imagen.
            }}
            width={350}
            height={264}
          />
        </div>
      </div>
    </div>
  </>
);

const Login = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const login = useLogin();

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev: boolean) => !prev); // Especificar el tipo de 'prev' como 'boolean'
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      pass: ''
    },
    shouldUseNativeValidation: false
  });

  const onSubmit = async (data: any) => {

    setLoading(true);

    const validateLoginInput = () => {
      if (!data.email && data.email.trim() === '') {
        ToastUtils.errorMessage('Ingresa un correo electrónico');
        setLoading(false);
        return false;
      }
      if (!data.pass && data.pass.trim() === '') {
        ToastUtils.errorMessage('Ingresa la contraseña');
        setLoading(false);
        return false;
      }
      return true;
    };

    const validate = validateLoginInput();

    if (validate) {
      const loginUser: LoginType = {
        email: data.email,
        password: data.pass
      };

      const regResponse: { token: string, message: string } = await login(loginUser);

      // Validación de login
      if (regResponse === null || regResponse.message === 'Invalid credentials') {
        setLoading(false);
        ToastUtils.errorMessage('Credenciales incorrectas, vuelve a intentarlo');
      }
      else {

        let decodedToken = verifyToken(regResponse.token) as { user: {}, iat: string; exp: string };

        const infoUser: InfoUserLogin = decodedToken.user as InfoUserLogin;

        // Guardado de la info de sesion a LocalStorage
        Storage.setItem(Storage.USER_ID, infoUser.user_id!.toString());
        Storage.setItem(Storage.FULL_NAME, infoUser.full_name!);
        Storage.setItem(Storage.EMAIL, infoUser.email!);
        Storage.setItem(Storage.IS_ACTIVE, infoUser.is_active!);
        setLoading(false);

        router.push('/');
      }
    }

  };

  const openRegister = () => {
    setIsOpenModal(!isOpenModal);
  };


  return (
    <>
      <Head>
        <title>{isOpenModal ? 'Registro :: ProjectFlow' : 'Inicio Sesión :: ProjectFlow'}</title>
      </Head>
      <ModalLayout>
        <div className='flex flex-row items-center pl-4 text-[24px] font-semibold italic'>
          ProyectFlow
          <Image
            src={Logo}
            alt={'Logo ProyectFlow'}
            width={74}
            height={74}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 flex w-full flex-col items-center justify-center space-y-14 md:w-[80%]'>
          <div className='w-full space-y-7'>
            <div className='flex flex-col'>
              <label className='text-[16px] font-semibold italic'>Email</label>
              <input
                type='text'
                className='m-0 h-[35px] rounded-[15px] border-[#D9D9D9] bg-[#D9D9D9] p-3 text-gray-400 placeholder-gray-400 outline-none'
                required={true}
                autoComplete='email'
                {...register('email')}
              />
            </div>
            <div className='relative flex flex-col'>
              <label className='text-[16px] font-semibold italic'>Contraseña</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className='m-0 h-[35px] rounded-[15px] border-[#D9D9D9] bg-[#D9D9D9] p-3 text-gray-400 placeholder-gray-400 outline-none'
                {...register('pass')}
              />
              <button
                type='button'
                className='absolute right-2 top-[50%] mt-3 -translate-y-1/2 transform focus:outline-none '
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeSlashIcon className='h-6 w-6 text-gray-400' /> : <EyeIcon className='h-6 w-6 text-gray-400' />}
              </button>
            </div>
          </div>
          <button
            type='submit'
            className='text-22px m-0 flex h-[35px] w-[153px] items-center justify-center rounded-[30px] bg-[#FF9F24] p-0 font-normal text-white'
          >
            {loading ? <CircularProgressIndicator /> : <h1>Iniciar Sesión</h1>}
          </button>
          <label className='text-center text-[12px] font-semibold italic'>No tienes una cuenta?
            <label
              className='cursor-pointer not-italic text-blue-500'
              onClick={openRegister}
            > puedes crear una aquí</label>
          </label>
        </form>

        {
          isOpenModal &&
          <ModalComponent onClose={openRegister} maxWidth='max-w-[45.8125rem]'>
            <RegisterUser onClose={openRegister} />
          </ModalComponent>
        }

      </ModalLayout>
      <style jsx>{`
        input::-ms-reveal,
        input::-ms-clear {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Login;
