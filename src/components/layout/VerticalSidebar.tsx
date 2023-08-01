import { useState } from 'react';

const VerticalLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className='flex'>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen w-16 bg-gray-200 transition-all duration-300 md:w-48 ${isOpen ? 'md:w-48' : 'md:w-16'}`}>
        {/* Iconos arriba */}
        <div className='hidden flex-col items-center pt-4 md:flex'>
          <span className='mb-4 text-2xl'>Icono 1</span>
          <span className='mb-4 text-2xl'>Icono 2</span>
          <span className='text-2xl'>Icono 3</span>
        </div>

        {/* Icono abajo */}
        <div className='absolute bottom-4 left-0 right-0 flex justify-center md:hidden'>
          <span className='text-2xl'>Icono abajo</span>
        </div>
      </div>

      {/* Contenido principal */}
      <div className='ml-0 flex-1 p-4 md:ml-16'>
        <button
          className='absolute right-4 top-4 block text-2xl md:hidden'
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <h1 className='mb-4 text-3xl font-bold'>Contenido Principal</h1>
        <p>
          Aquí va el contenido principal de tu página. Este contenido se ajustará
          automáticamente cuando se muestre o se oculte la barra lateral.
        </p>
      </div>
    </div>
  );
};

export default VerticalLayout;