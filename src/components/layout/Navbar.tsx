import React from 'react';
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import Image from 'next/image';
import Logo from '../../../public/images/png/Logo_Ola.png';

type Props = {
  onMenuButtonClick(): void;
};

const Navbar = (props: Props) => (
  <nav
    className={classNames({
      'text-zinc-500': true, // colors
      'flex items-center': true, // layout
      'w-full fixed px-4 h-[4.375rem] z-10 shadow-none': true, // positioning & styling
      'bg-gradient-to-r from-custom-color-gold to-custom-color-light-gold': true, // gradient colors
    })}
  >
    <div className='flex w-full flex-row justify-between'>
      <div className='flex flex-row items-center pl-4 text-[24px] font-semibold italic'>
        ProyectFlow
        <Image
          src={Logo}
          alt={'Logo ProyectFlow'}
          width={74}
          height={74}
        />
      </div>
      <div className='hidden flex-row items-center md:flex'>
        <div className='flex-col'>
          <p className='text-right text-[16px] font-semibold'>Helmer Torres</p>
          <p className='text-right text-[14px] italic'>Full-stack developer Flutter</p>
        </div>
        <div className='p-4'>
          <UserCircleIcon className='h-[2.8125rem] w-[2.8125rem] text-white' />
        </div>
      </div>
    </div>
    <div className='flex-grow'></div>
    <button className='md:hidden' onClick={props.onMenuButtonClick}>
      <Bars3Icon className='h-6 w-6 text-white' />
    </button>
  </nav>
);

export default Navbar;
