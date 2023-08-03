import React, { useEffect, useRef } from 'react';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { useOnClickOutside } from 'usehooks-ts';

type ModalProps = {
  onClose: () => void;
  children: any;
  maxWidth?: string
};

const ModalComponent: React.FC<ModalProps> = ({ onClose, children, maxWidth }) => {

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, (_e) => {
    onClose();
  });

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [onClose]);

  return (
    <div>
      <div className='modal fixed inset-0 z-50 flex cursor-pointer items-center justify-center overflow-y-auto bg-black bg-opacity-10 backdrop-blur'>
        <div className='my-auto flex w-full items-center justify-center'>
          <div className={`modal-content m-4 w-full max-w-[30rem] rounded-lg bg-white ${maxWidth ? maxWidth : 'max-w-[30rem]'} cursor-auto`} ref={ref}>
            <div className='flex flex-col items-center justify-center'>
              <div className=' flex w-full justify-end pr-4 pt-4'>
                <XMarkIcon
                  className='h-6 w-6 cursor-pointer stroke-1'
                  onClick={onClose}
                />
              </div>
              <div className='flex w-full'>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;