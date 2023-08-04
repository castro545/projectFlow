import React, { useRef } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { defaultNavItems } from './defaultNavItems';
import { useOnClickOutside } from 'usehooks-ts';
import Storage from '@/src/utils/storage';
import {
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
// define a NavItem prop
export type NavItem = {
  href: string;
  icon: React.ReactNode;
};
// add NavItem prop to component prop
type Props = {
  open: boolean;
  navItems?: NavItem[];
  setOpen(_open: boolean): void;
};

const Sidebar = ({ open, navItems = defaultNavItems, setOpen }: Props) => {

  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, (_e) => {
    setOpen(false);
  });

  const logout = () => {

    Storage.setItem(Storage.USER_ID, '');
    Storage.setItem(Storage.FULL_NAME, '');
    Storage.setItem(Storage.EMAIL, '');
    Storage.setItem(Storage.IS_ACTIVE, '');

    router.push('/login');

  };

  return (
    <div
      className={classNames({
        'flex flex-col justify-between': true, // layout
        'bg-custom-color-gold text-custom-color-icon-no-selected': true, // colors
        'md:w-[140px] md:fixed md:top-16 top-0 z-0 fixed': true, // positioning
        'md:h-[100%] h-full w-[140px]': true, // for height and width
        'transition-transform .3s ease-in-out md:-translate-x-0': true, //animations
        '-translate-x-full ': !open, //hide sidebar to the left when closed
      })}
      ref={ref}
    >
      <nav className='top-0 md:sticky md:top-16'>
        {/* nav items */}
        <ul className='mt-16 flex flex-col gap-2 py-2 md:mt-0'>
          {navItems.map((item, index) => (
            <Link key={index} href={item.href} className='flex items-center justify-around'>
              <li
                className={classNames({
                  'hover:bg-white hover:text-custom-color-gold': true, //colors
                  'flex gap-4 items-center justify-center w-[50px] h-[50px]': true, //layout
                  'transition-colors duration-300': true, //animation
                  'rounded-md p-2 mx-2': true, //self style
                  //'bg-white text-custom-color-gold': true
                })}
              >
                {item.icon}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <div className='flex items-center justify-around pb-20'>
        <li
          className={classNames({
            'hover:bg-white hover:text-custom-color-gold cursor-pointer': true, //colors
            'flex gap-4 items-center justify-center w-[50px] h-[50px]': true, //layout
            'transition-colors duration-300': true, //animation
            'rounded-md p-2 mx-2': true, //self style
          })}
          onClick={logout}
        >
          <ArrowLeftOnRectangleIcon className='h-[1.875rem] w-[1.875rem] cursor-pointer'
            onClick={logout}
          />
        </li>
      </div>
    </div>
  );
};
export default Sidebar;