import React, { PropsWithChildren, useState } from 'react';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = (props: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className='grid min-h-screen w-full grid-rows-header'>
      <div>
        <Navbar onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} />
      </div>

      <div className='flex w-full'>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className='mx-0 w-full md:ml-[140px]'>
          <div className='mt-[70px] h-full w-full'>
            <div className='h-full bg-custom-color-bg-page'>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
