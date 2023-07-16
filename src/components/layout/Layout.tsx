import React, { PropsWithChildren, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';



const Layout = (props: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className='grid min-h-screen w-full grid-rows-header bg-zinc-100'>
      <div>
        <Navbar onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} />
      </div>

      <div className='grid w-full md:grid-cols-sidebar'>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className='w-full bg-custom-color-gold'>
          <div className='h-full w-full rounded-none bg-custom-color-bg-page md:rounded-tl-lg'>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
