import { useEffect } from 'react';

const CreateTask = () => {
  useEffect(() => { }, []);

  return (
    <>
      <div className='relative h-screen overflow-y-auto bg-gradient-to-b from-custom-color-gold to-custom-color-light-gold'>
        <div className='flex min-h-screen flex-col items-center justify-center'>
          <div className='mx-5 my-5 h-auto w-[90%] rounded-lg bg-white p-5 pt-7 shadow-lg md:mx-0 md:my-5 md:h-[700px] md:w-[600px] md:p-6 '>
            <form>
              <h1>formulario para crear una tarea</h1>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTask;