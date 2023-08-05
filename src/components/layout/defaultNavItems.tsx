import React from 'react';
import {
  HomeIcon,
} from '@heroicons/react/24/solid';
import { NavItem } from './Sidebar';


export const defaultNavItems: NavItem[] = [
  {
    href: '/',
    icon: <HomeIcon className='h-[1.875rem] w-[1.875rem]' />,
  }
];
