import { useState, useEffect } from 'react';

function ProfilPage(props) {
  const [userState, setUserState] = useState()

  useEffect(() => {
    //console.log(props.dataUser)
    console.log(window.localStorage.getItem('user').firstname)
  }, []);

  return (
      <section className='pt-32'>
        <h1 className='text-6xl'>Bonjour {props.dataUser}</h1>
      </section>
  );
}

export default ProfilPage;
