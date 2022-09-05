import Card from './components/Card'
import { loadUserAds } from './api/ads'
import { useState, useEffect } from 'react'
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react'
import { lightIcon, goodEveningIcon, binIcon, validIcon } from './icons/Icons'

function ProfilPage(props) {
  const hour = new Date().getHours(),
        [ads, setAds] = useState([]),
        [imgUrl, setImgUrl] = useState(''),
        [showDraft, setShowDraft] = useState(false),
        [isPopupOpen, setIsPopupOpen] = useState(false),
        user = JSON.parse(window.localStorage.getItem('user')),
        [allCardsChecked, setAllCardsChecked] = useState(false),
        [responseMessageFromCard, setResponseMessageFromCard] = useState(''),

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
        },

        handleChange = e => {
          e.stopPropagation()
          setAllCardsChecked(e.target.checked)
        },

        uncheckAllCheckboxes = () => {
          console.log('first')
          setAllCardsChecked(false)
        },

        openPopup = message => {
          setIsPopupOpen(true)
          setResponseMessageFromCard(message)
          window.location.reload(false)
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
          <div className='flex'>
            <button
              className={`
                p-2
                rounded-3xl
                text-white
                bg-gray-300
                dark:text-white
              `}
              onClick={() => console.log('Changer mon mot de passe')}
            >
              Changer mon mot de passe
            </button>
            <button
              className={`
                p-3
                mx-3
                rounded-3xl
                text-white
                bg-gray-300
                dark:text-white
              `}
              onClick={() => console.log('Changer mon e-mail')}
            >
              Changer mon e-mail
            </button>
            <button
              className={`
                p-2
                rounded-3xl
                text-white
                bg-gray-300
                dark:text-white
              `}
              onClick={() => console.log('Supprimer mon compte')}
            >
              Supprimer mon compte
            </button>
          </div>
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
                        name='check-all'
                        value='yes'
                        onClick={e => handleChange(e)}
                        onChange={e => handleChange(e)}
                      />
                    </div>
                  }
                </div>
              </div>
          </div>
          {ads.length > 0 &&
            <ul>
              {ads.map(ad => {
                return (
                  <Card
                    ad={ad}
                    key={ad._id}
                    openPopup={openPopup}
                    showDraft={showDraft}
                    allCardsChecked={allCardsChecked}
                    horizontalCard={props.horizontalCard}
                    layoutOneColumn={props.layoutOneColumn}
                    uncheckAllCheckboxes={uncheckAllCheckboxes}
                  />
                )
              })}
            </ul>
          }
          {isPopupOpen &&
            <div
              className={`
                flex
                fixed
                inset-0
                text-center
                items-center
                justify-center
              `}
            >
              <div
                className={`
                  p-4
                  bg-white
                  rounded-3xl
                  text-green-500
                `}
              >
                <div className='text-7xl'>{validIcon}</div>
                <div>{responseMessageFromCard}</div>
              </div>
            </div>
          }
        </>
      }
    </section>
  )
}

export default ProfilPage;
