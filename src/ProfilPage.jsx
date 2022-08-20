import { useState, useEffect } from 'react'
import { loadUserAds } from './api/ads'
import { lightIcon, goodEveningIcon, pencilIcon, binIcon } from './icons/Icons'

function ProfilPage(props) {
  const [ads, setAds] = useState([]),
        hour = new Date().getHours(),
        user = JSON.parse(window.localStorage.getItem('user'))

  // console.log('user', user.firstname)
  // console.log('props.dataUser (PROFIL PAGE)', props.dataUser)

  useEffect(() => {
    // console.log('props.dataUser', props.dataUser)
    // if (props.dataUser) console.log('props.dataUser', props.dataUser)
    loadUserAds(props.dataUser._id)
    .then((res)=>{
        // console.log('res', res)
        setAds(res)
    })
    .catch(err => console.log('err', err))
  }, []);

  const wayToGreet = () => {
    return hour > 6 && hour < 20 ? `Bonjour ${user.firstname} ${lightIcon}` : `Bonsoir ${user.firstname} ${goodEveningIcon}`
  }

  const handleDeleteAd = e => {
    console.log('supprimer')
    // console.log('e', e)
    // deleteAd(userId, adId)
    /* .then((res)=>{
        // console.log('res', res)
        setAds(res)
    })
    .catch(err => console.log('err', err)) */
  }

  const handleModifyAd = e => {
    // console.log('e', e)
    console.log('modifier')
  }

  return (
    <section className='pt-28 px-8 pb-24 dark:bg-slate-900'>
      {props.dataUser && (
        <>
          <h1 className='py-4 text-4xl dark:text-white'>{wayToGreet()}</h1>
          <div className='py-4 flex justify-between'>
            <div className='flex flex-col justify-center'>
              <h2 className='text-3xl dark:text-white'>
                {ads.length > 0 ? 'Vos annonces' : "Vous n'avez aucune annonce"}
              </h2>
            </div>
            <div>
              <div className='flex'>
                <button
                  className={`
                    dark:bg-gray-800
                    bg-gray-100
                    px-4
                    py-3
                    text-2xl
                    rounded-full
                    mr-2
                  `}
                  onClick={e => handleDeleteAd(e)}
                >
                  {binIcon}
                </button>
                <div
                  className={`
                    flex
                    flex-col
                    justify-center
                  `}
                >
                  <input className='w-8 h-8 rounded-full' type="checkbox" id="check-all" name="check-all" value="yes" />
                </div>
              </div>
            </div>
          </div>
          {ads.length > 0 &&
            <>
              <ul className=''>
                {ads.map((ad)=>{
                  return (
                    <li key={ad._id} className='flex last:mb-0 mb-8'>
                      <div className='dark:bg-slate-700 dark:text-white bg-slate-200 rounded-3xl p-4'>
                        <h3 className='text-2xl'>{ad.name}</h3>
                        <p className='text-2xl mb-2'>{ad.description}</p>
                        <div className='flex justify-between'>
                          <div className='flex flex-col justify-center'>
                            <p className='text-2xl dark:text-yellow-100'>{ad.price} / heure</p>
                          </div>
                          <div className='flex'>
                            <button
                              className={`
                                dark:bg-gray-600
                                bg-gray-100
                                px-4
                                py-3
                                text-2xl
                                rounded-full
                                mr-2
                              `}
                              onClick={e => handleModifyAd(e)}
                            >
                              {pencilIcon}
                            </button>
                            <div
                              className={`
                                flex
                                flex-col
                                justify-center
                              `}
                            >
                            <input
                              className='w-8 h-8 rounded-full'
                              type="checkbox"
                              id={ad._id}
                              name={ad._id}
                              value="yes"
                            />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </>
          }
        </>
      )}
    </section>
  );
}

export default ProfilPage;
