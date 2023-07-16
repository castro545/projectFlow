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
    icon: <HomeIcon className='h-[2.8125rem] w-[2.8125rem]' />,
  },
  {
    href: '/team',
    icon: <UserGroupIcon className='h-[2.8125rem] w-[2.8125rem]' />,
  },
  {
    href: '/projects',
    icon: <FolderIcon className='h-[2.8125rem] w-[2.8125rem]' />,
  },
  {
    href: '/calendar',
    icon: <CalendarIcon className='h-[2.8125rem] w-[2.8125rem]' />,
  },
];
