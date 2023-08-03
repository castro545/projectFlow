import React, { useRef, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import Image from 'next/image';
import Logo from '../../../public/images/png/Logo_Ola.png';
import Avatar from '../../../public/images/png/avatar_default.png';
import { useOnClickOutside } from 'usehooks-ts';

type Props = {
  onMenuButtonClick(): void;
};

const Navbar = ({ onMenuButtonClick }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, (_e) => {
    setIsDropdownOpen(false);
  });

  const handleMenuButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
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
          <Image src={Logo} alt={'Logo ProyectFlow'} width={74} height={74} />
        </div>
        <div className='hidden flex-row items-center md:flex'>
          <div className='flex-col'>
            <p className='text-right text-[16px] font-semibold'>Helmer Torres</p>
          </div>
          <div className='p-4'>
            <Image
              className='relative inline-block h-12 w-12 rounded-full object-cover object-center'
              alt='Image placeholder'
              src={Avatar}
              width={40}
              height={40}
              onClick={handleMenuButtonClick}
            />
          </div>
        </div>
      </div>
      <div className='flex-grow'></div>
      <button className='md:hidden' onClick={onMenuButtonClick}>
        <Bars3Icon className='h-6 w-6 text-white' />
      </button>
    </nav>
  );
};

export default Navbar;
