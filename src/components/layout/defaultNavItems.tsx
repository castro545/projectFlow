import React from 'react';
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';
import { NavItem } from './Sidebar';


export const defaultNavItems: NavItem[] = [
  {
    href: '/',
    icon: <HomeIcon className='h-[1.875rem] w-[1.875rem]' />,
  },
  {
    href: '/team',
    icon: <UserGroupIcon className='h-[1.875rem] w-[1.875rem]' />,
  },
  {
    href: '/projects',
    icon: <FolderIcon className='h-[1.875rem] w-[1.875rem]' />,
  },
  {
    href: '/calendar',
    icon: <CalendarIcon className='h-[1.875rem] w-[1.875rem]' />,
  },
];
