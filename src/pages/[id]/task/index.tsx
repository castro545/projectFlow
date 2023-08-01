import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Ejemplo = () => {

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => { }, []);

  return (
    <>
      hola {id}
    </>
  );
};

export default Ejemplo;