import { loadUserAds } from './api/ads'
import { useState, useEffect } from 'react'
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react'
import { lightIcon, goodEveningIcon, pencilIcon, binIcon } from './icons/Icons'

function ProfilPage(props) {
  const hour = new Date().getHours(),
        [ads, setAds] = useState([]),
        [imgUrl, setImgUrl] = useState(''),
        [showDraft, setShowDraft] = useState(false),
        user = JSON.parse(window.localStorage.getItem('user')),

        wayToGreet = () => {
          return hour > 6 && hour < 20 ?
            `Bonjour ${user.firstname} ${lightIcon}`
            :
            `Bonsoir ${user.firstname} ${goodEveningIcon}`
        },

        handleDeleteAd = e => {
          console.log('supprimer')
          // console.log('e', e)
          // deleteAd(userId, adId)
          /* .then((res)=>{
              // console.log('res', res)
              setAds(res)
          })
          .catch(err => console.log('err', err)) */
        },

        handleModifyAd = e => {
          // console.log('e', e)
          console.log('modifier')
        }

  useEffect(() => {
    setImgUrl(user.imageUser)
    loadUserAds(props.dataUser._id)
    .then(res => {
        setAds(res)
    })
    .catch(err => console.log('err', err))
  }, []);

  return (
    <section className='pt-28 px-8 pb-24 dark:bg-slate-900'>
      {props.dataUser &&
        <>
          <CloudinaryContext className='rounded-full overflow-hidden' cloudName='mika4ever'>
            <Image publicId={imgUrl}>
              <Transformation quality='auto' fetchFormat='auto' />
            </Image>
          </CloudinaryContext>
          <h1 className='py-4 text-4xl dark:text-white'>{wayToGreet()}</h1>
          <div className='py-4 flex justify-between'>
            <div className='flex flex-col justify-center'>
              <h2 className='text-3xl dark:text-white'>
                {ads.length > 0 ? 'Vos annonces' : "Vous n'avez aucune annonce"}
              </h2>
            </div>
              <div className='flex flex-col justify-center'>
                <div className='flex'>
                  <button
                    className={`
                      mr-2
                      px-4
                      py-3
                      text-2xl
                      rounded-full
                      bg-gray-100
                      dark:bg-gray-800
                    `}
                    onClick={e => handleDeleteAd(e)}
                  >
                    {binIcon}
                  </button>
                  {showDraft &&
                    <div
                      className={`
                        flex
                        flex-col
                        justify-center
                      `}
                    >
                      <input
                        className='w-8 h-8 rounded-full'
                        type='checkbox'
                        id='check-all'
                        name='check-all'
                        value='yes'
                      />
                    </div>
                  }
                </div>
              </div>
          </div>
          {ads.length > 0 &&
            <ul className=''>
              {ads.map((ad)=>{
                return (
                  <li key={ad._id} className='flex last:mb-0 mb-8'>
                    <div className='dark:bg-slate-700 dark:text-white bg-slate-200 rounded-3xl p-4'>
                      <h3 className='text-3xl pb-3'>{ad.title}</h3>
                      <p className='text-2xl pb-3'>{ad.description}</p>
                      <div className='flex justify-between'>
                        <div className='flex flex-col justify-center'>
                          <p className='text-xl dark:text-yellow-100'>{ad.price} / h</p>
                        </div>
                        <div className='flex items-center'>
                          <button
                            className={`
                              ml-2
                              px-4
                              py-3
                              text-2xl
                              rounded-full
                              bg-gray-100
                              dark:bg-gray-600
                            `}
                            onClick={e => handleModifyAd(e)}
                          >
                            {pencilIcon}
                          </button>
                          {showDraft &&
                            <div className='flex flex-col justify-center'>
                              <input
                                className='border border-transparent rounded-full w-8 h-8'
                                type='checkbox'
                                id={ad._id}
                                name={ad._id}
                                value='yes'
                              />
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          }
        </>
      }
    </section>
  )
}

export default ProfilPage;
