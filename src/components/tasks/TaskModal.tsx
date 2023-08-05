import { useEffect } from 'react';

type TaskModalProps = {
  infoTask: { task_id: number };
  onClose: () => void;
}

const TaskModal = ({ infoTask, onClose }: TaskModalProps) => {
  useEffect(() => {
    console.log(infoTask);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {infoTask}
      <button onClick={onClose}>
        onClose
      </button>
    </>
  );
};


export default TaskModal;