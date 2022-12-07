import Card from './components/Card'
import { loadUserAds } from './api/ads'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { userIsLogged } from './functions/user'
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react'
import { lightIcon, goodEveningIcon, binIcon, validIcon } from './constants/icons'

function ProfilPage(props) {

  const { userIdPage } = useParams(),
        hour = new Date().getHours(),
        [ads, setAds] = useState([]),
        [imgUrl, setImgUrl] = useState(''),
        [isVisitor, setIsVisitor] = useState(false),
        [showDraft, setShowDraft] = useState(false),
        [isPopupOpen, setIsPopupOpen] = useState(false),
        [liteInfosOfUser, setLiteInfosOfUser]= useState({}),
        [allCardsChecked, setAllCardsChecked] = useState(false),
        [responseMessageFromCard, setResponseMessageFromCard] = useState(''),

        wayToGreet = () => {
          return hour > 6 && hour < 20 ?
            `Bonjour ${props.dataUser.firstname} ${lightIcon}`
            :
            `Bonsoir ${props.dataUser.firstname} ${goodEveningIcon}`
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
          console.log('uncheckAllCheckboxes')
          setAllCardsChecked(false)
        },

        openPopup = message => {
          setIsPopupOpen(true)
          setResponseMessageFromCard(message)
          window.location.reload(false)
        }

  useEffect(() => {
    console.log('(PROFIL) useEffect props.dataUser', props.dataUser)
    if(userIsLogged(props.dataUser) && (props.dataUser._id === userIdPage)) {
      console.log('(PROFIL) utiliser les props ')
      setIsVisitor(false)
      loadUserAds(userIdPage, false)
      .then(res => {
        setAds(res.adsOfUser)
      })
      .catch(err => console.log('err', err))
    } else {
      console.log('(PROFIL) utiliser les datas du serveur')
      setIsVisitor(true)
      loadUserAds(userIdPage, true)
      .then(res => {
        setAds(res.adsOfUser)
        setLiteInfosOfUser(res.liteInfos)
      })
      .catch(err => console.log('err', err))
    }
  }, [props.dataUser]);

  useEffect(() => {
    if(Object.keys(props.clickedAd).length > 0) {
      console.log('mettre à jour le coeur', props.clickedAd)

      // Phase de recherche :
      let item = {},
          items = [],
          indexSaved = 0,
          favoritesToUpdate = 0

      console.log('ads', ads)

      ads.forEach((ad, index, arr) => {
        console.log('ad._id', ad._id)
        console.log('props.clickedAd.adId', props.clickedAd.adId)
        if(ad._id === props.clickedAd.adId) {
          indexSaved = index
          console.log('ad trouvé', index)
          items = [...ads]
          item = {...items[index]}
          favoritesToUpdate = props.clickedAd.newFavNumber
          // console.log('item', item)
          console.log('favoritesToUpdate', favoritesToUpdate)
          arr.length = index + 1 // sortir de la boucle
        }
        else {
          console.log('pas trouvé')
        }
      })

      // Phase de remplacement de toutes les annonces :
      item.favoritesNb = favoritesToUpdate
      items[indexSaved] = item
      console.log('item', item)
      console.log('items', items)
      setAds(items)
      props.resetClickedAd()
    }
  }, [props.clickedAd]);

  /* useEffect(() => {
    // console.log('isVisitor', isVisitor)

    // loadUserAds(userIdPage, isVisitor)
    // .then(res => {
    //   setAds(res.adsOfUser)
    //   if(!liteInfosLoaded) setLiteInfosOfUser(res.liteInfos)
    //   setLiteInfosLoaded(true)
    // })
    // .catch(err => console.log('err', err))

  }, [isVisitor]); */

  /* if(isVisitor) {
    setImgUrl(user.imageUser)
  } else {
    setImgUrl(user.imageUser)
  } */

  /* <CloudinaryContext className='rounded-full overflow-hidden' cloudName='mika4ever'>
    <Image publicId={imgUrl}>
      <Transformation quality='auto' fetchFormat='auto' />
    </Image>
  </CloudinaryContext> */

  return (
    <section className='pt-28 px-8 pb-24 dark:bg-slate-900'>
      {!isVisitor &&
        <>
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
        </>
      }
      <div className='py-4 flex justify-between'>
        <div className='flex flex-col justify-center'>
          <h2 className='text-3xl dark:text-white'>
            {isVisitor && Object.keys(liteInfosOfUser).length > 0 ?
              `Annonces de ${liteInfosOfUser.firstname}` : ''
            }
            {!isVisitor && Object.keys(props.dataUser).length > 0 ?
              `Annonces de ${props.dataUser.firstname}` : ''
            }
          </h2>
        </div>
        {!isVisitor &&
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
        }
      </div>
      {ads.length > 0 ?
        <ul>
          {ads.map(ad => {
            return (
              <Card
                ad={ad}
                key={ad._id}
                isVisitor={isVisitor}
                openPopup={openPopup}
                showDraft={showDraft}
                allCardsChecked={allCardsChecked}
                horizontalCard={props.horizontalCard}
                layoutOneColumn={props.layoutOneColumn}
                uncheckAllCheckboxes={uncheckAllCheckboxes}
                handleAddToFavorites={props.handleAddToFavorites}
              />
            )
          })}
        </ul>
        :
        <img className='w-20' src='https://i.stack.imgur.com/y3Hm3.gif' />
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
    </section>
  )
}

export default ProfilPage;
