import { loadAds } from './api/ads'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function HomePage(props) {
  const [ads, setAds] = useState([])
  /* const [isLogged, setIsLogged] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState() */
  // Read values passed on state
  // setUser(state.user);

  useEffect(() => {
    loadAds()
    .then((res)=>{
        /* console.log('RES (HOMEPAGE) :')
        console.log(res)  */
        setAds(res)
    })
    .catch(err=>console.log(err))

    /* console.log('STATE', state)

    if(state === null) {
        props.updateUser(undefined)
    }
    else {
        props.updateUser(state.user)
    } */
  }, []);

  return (
    <>
      {/* <header className="bg-slate-200 dark:bg-slate-800 h-screen flex flex-col justify-end px-8 pb-8">
        <div className="relative max-w-5xl text-left">
          <h1 className="text-slate-700 font-extrabold text-4xl sm:text-5xl lg:text-6xl dark:text-white">Mikaël Borges</h1>
          <p className={`${styles.description} uppercase mt-6 text-base text-slate-500 max-w-3xl dark:text-pink-600`}>
            ui & ux designer - front-end developer. Lille
          </p>
        </div>
      </header> */}

      <section className='pt-28 pb-24 dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
        {/* <h2 className='dark:text-white text-6xl text-slate-700 break-words'>Toutes les annonces</h2>
        <p className='leading-10 text-gray-400'>Je créé des applications et des sites aux ergonomies intuitives et aux design épurés. J'interviens sur l'expérience utilisateur globale, le design d'interfaces et le développement front-end de marques ou de produits. Chaque étape du processus de création est importante, depuis le brief jusqu'au déploiement, c'est pourquoi j'aime penser et développer les projets dans leur globalité.</p> */}


        {ads.length > 0 &&
          <ul className=''>
            {ads.map((ad)=>{
              return (
                <li key={ad._id} className='dark:bg-slate-700 dark:text-white bg-slate-200 rounded-3xl p-4 last:mb-0 mb-8'>
                  <h3 className='text-2xl'>{ad.name}</h3>
                  <p className='text-2xl'>{ad.description}</p>
                  <p className='text-2xl dark:text-yellow-100'>{ad.price} / heure</p>
                </li>
              )
            })}
          </ul>
        }
      
      
      
      </section>

      {/* <section className='py-32 relative px-12'>
        <div className={`absolute inset-0 bg-bottom bg-no-repeat ${styles.indexBeams} ${props.darkMode ? styles.dark : ''}`}>
          <div className={`${styles.grid} absolute inset-0 ${props.darkMode ? styles.bgGridSlate400 : styles.bgGridSlate900} bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5`}></div>
        </div>
      </section>

      <section className='py-32 dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
        <h4 className='dark:text-white'>Allier une ergonomie efficace...</h4>
        <p className='leading-10 text-gray-400'>L'ergonomie d'un site ou d'une application est l'un des points les plus importants pour moi. Je passe beaucoup de temps à imaginer comment faciliter la navigation pour les utilisateurs.</p>
        <Lien
          url={'/projects'}
          target='_self'
          className={`
            hover:dark:bg-black
            hover:bg-black
            hover:dark:text-pink-600
            dark:bg-slate-700
            dark:text-yellow-100
            block
            w-fit
            p-6
            rounded-full
            shadow-xl
          `}
        >
          Je découvre les projets
        </Lien>
        <h4 className='dark:text-white'>... à une interface et un développement de qualité</h4>
        <p className='leading-10 text-gray-400'>La phase de création d'un projet est un autre point très important. Elle passe par un design et un développement minutieux. En alliant une interface esthétique, ergonomique et intuitive à un développement solide, je produis des applications et des sites efficaces.</p>
      </section>

      <section className='py-32 dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
      </section> */}
    </>
  );
}

export default HomePage;
