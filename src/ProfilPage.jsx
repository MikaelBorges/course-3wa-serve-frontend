import { useState, useEffect } from 'react'
import { loadAds } from './api/ads'
import { lightIcon, goodEveningIcon } from './icons/Icons'

function ProfilPage(props) {
  const [ads, setAds] = useState([])

  useEffect(() => {
    loadAds()
    .then((res)=>{
        setAds(res)
    })
    .catch(err => console.log('err', err))
  }, []);

  const user = JSON.parse(window.localStorage.getItem('user')),
        hour = new Date().getHours()
  /* console.log('user', user.firstname)
  console.log('props.dataUser', props.dataUser) */

  function wayToGreet() {
    return hour > 6 && hour < 18 ? `Bonjour ${user.firstname} ${lightIcon}` : `Bonsoir ${user.firstname} ${goodEveningIcon}`
  }

  return (
      <section className='pt-28 px-8 pb-24 dark:bg-slate-900'>
        <h1 className='py-4 text-4xl dark:text-white'>{wayToGreet()}</h1>
        <h2 className='py-4 text-3xl dark:text-white'>Annonces :</h2>
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
  );
}

export default ProfilPage;
