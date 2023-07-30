import { useEffect } from 'react';

const tasks = [
  'Llamar a lolazo',
  'Tomar tinto',
  'Terminar el informe joder >:v',
  'Preparar la farra de grado',
  'Hacer ejercicio o morir panzon',
  'Comprar moto xD',
  'Leer un libro 🥸',
];

const Projects = () => {
  useEffect(() => { }, []);
  return (
    <>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {tasks.map((task, index) => (
          <div
            key={index}
            className='flex h-[250px] w-auto cursor-pointer flex-row items-center justify-center rounded-lg bg-[#FFFFFC] px-4 shadow-card'
          >
            {task}
          </div>
        ))}
      </div>
    </>
  );
};

export default Projects;