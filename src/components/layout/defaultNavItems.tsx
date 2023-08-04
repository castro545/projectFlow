import React from 'react';
import {
  UserGroupIcon,
  //PencilSquareIcon,
  HomeIcon,
} from '@heroicons/react/24/solid';
import { NavItem } from './Sidebar';


export const defaultNavItems: NavItem[] = [
  {
    href: '/',
    icon: <HomeIcon className='h-[1.875rem] w-[1.875rem]' />,
  },
  // {
  //   href: '/createtaskgeneral',
  //   icon: <PencilSquareIcon className='h-[1.875rem] w-[1.875rem]' />,
  // },
  {
    href: '/contributors',
    icon: <UserGroupIcon className='h-[1.875rem] w-[1.875rem]' />,
  },
];
