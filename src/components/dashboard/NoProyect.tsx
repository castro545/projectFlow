
type NoProjectProps = {
  onCreateProject: () => void;
}

const NoProject = ({ onCreateProject }: NoProjectProps) => (
  <>
    <div className='flex h-[250px] w-auto flex-col items-center justify-center space-y-9 rounded-lg bg-[#FFFFFC] px-4 shadow-card'>
      <h5 className='text-custom-color-dark text-[18px] font-semibold'>No tienes un proyecto creado</h5>

      <button
        type='button'
        className='middle none center font-sans mr-3 rounded-lg border border-custom-color-gold px-6 py-3 text-xs font-bold uppercase text-custom-color-gold transition-all hover:opacity-75 focus:ring focus:ring-custom-color-light-gold active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
        onClick={onCreateProject}
      >Crear</button>
    </div>
  </>
);

export default NoProject;