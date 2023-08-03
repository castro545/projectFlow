import Image from 'next/image';

import PendingImage from '../../../public/images/png/pending_task.png';
import CreatedImage from '../../../public/images/png/created_task.png';
import CompleteImage from '../../../public/images/png/completed_task.png';
import { CountTaskInfo } from '@/src/types/Task';


type HeaderCardsProps = {
  counterTask: CountTaskInfo[];
}
const HeaderCards = ({ counterTask }: HeaderCardsProps) => (
  <>
    <div className='flex flex-row items-start space-x-6'>
      <div className='flex h-[111px] w-[300px] flex-row items-center justify-center space-x-6 rounded-lg bg-[#FFFFFC] px-4 shadow-card'>
        <div className='flex flex-col space-y-1'>
          <label className='text-[22px] font-bold'>
            {counterTask[0].pending_tasks!.toString()}
          </label>
          <label className='text-[16px] font-extralight'>Tareas pendientes</label>
        </div>
        <Image
          src={PendingImage}
          alt={'Ilustración de tareas pendientes'}
          width={74}
          height={74}
        />
      </div>
      <div className='flex h-[111px] w-[300px] flex-row items-center justify-center space-x-6 rounded-lg bg-[#FFFFFC] px-4 shadow-card'>
        <div className='flex flex-col space-y-1'>
          <label className='text-[22px] font-bold'>
            {counterTask[0].completed_tasks!.toString()}
          </label>
          <label className='text-[16px] font-extralight'>Tareas terminadas</label>
        </div>
        <Image
          src={CompleteImage}
          alt={'Ilustración de tareas terminadas'}
          width={74}
          height={74}
        />
      </div>
      <div className='flex h-[111px] w-[300px] flex-row items-center justify-center space-x-6 rounded-lg bg-[#FFFFFC] px-4 shadow-card'>
        <div className='flex flex-col space-y-1'>
          <label className='text-[22px] font-bold'>
            {counterTask[0].created_by_me!.toString()}
          </label>
          <label className='text-[16px] font-extralight'>Creadas por ti</label>
        </div>
        <Image
          src={CreatedImage}
          alt={'Ilustración de tareas creadas'}
          width={74}
          height={74}
        />
      </div>
    </div>
  </>
);

export default HeaderCards;