import { loadAds } from './api/ads'
import { useState, useEffect } from 'react'
import { heartIcon, starIcon, crownIcon, lightIcon, darkIcon, systemIcon, leftHandIcon, rightHandIcon } from './icons/Icons'
import styleOf from './HomePage.module.scss'

function HomePage(props) {
  const [ads, setAds] = useState([]),
        [users, setUsers] = useState([]),
        [oddAds, setoddAds] = useState([]),
        [evenAds, setevenAds] = useState([]),
        [horizontalCard, setHorizontalCard] = useState(false),
        [areAdsArranged, setAreAdsArranged] = useState(false),
        [layoutOneColumn, setLayoutOneColumn] = useState(false),

        handleAddToFavorites = e => {
          console.log('ajouter aux favoris')
        },

        arrangeAds = () => {
          ads.forEach((ad, index) => {
            const isAdEven = (index % 2 === 0) ? true : false
            if (isAdEven) {
              evenAds.push(ad)
            }
            else {
              oddAds.push(ad)
            }
            /* console.log('arrangeAds inside forEach :')
            console.log(ad.title, index) */
          })
          /* console.log('arrangeAds END :')
          console.log('evenAds', evenAds)
          console.log('oddAds', oddAds) */
          if(evenAds.length > 0 || oddAds.length > 0) setAreAdsArranged(true)
        },

        getStarIconNb = (ad) => {
          console.log('typeOf stars', typeof(ad.starsNb))
          let stars = ''
          switch (ad.starsNb) {
            case 0:
              stars = ''
              break;
            case 1:
              stars = '⭐️'
              break;
            case 2:
              stars = '⭐️⭐️'
              break;
            case 3:
              stars = '⭐️⭐️⭐️'
              break;
            case 4:
              stars = '⭐️⭐️⭐️⭐️'
              break;
            case 5:
              stars = '⭐️⭐️⭐️⭐️⭐️'
              break;
            default:
              stars = ''
          }
          return stars
        },

        handleLayoutOfCards = () => {
          if(layoutOneColumn) {
            window.localStorage.setItem('horizontalCard', false)
            setHorizontalCard(false)
          }
          window.localStorage.setItem('layoutOneColumn', !layoutOneColumn)
          setLayoutOneColumn(!layoutOneColumn)
        },

        handleStyleOfCards = () => {
          window.localStorage.setItem('horizontalCard', !horizontalCard)
          setHorizontalCard(!horizontalCard)
        }

  // useEffect( async () => {
  useEffect(() => {
    const layoutOneColumnInLS = window.localStorage.getItem('layoutOneColumn'),
          horizontalCardInLS = window.localStorage.getItem('horizontalCard')

    if(layoutOneColumnInLS === 'true') setLayoutOneColumn(true)
    if(horizontalCardInLS === 'true') setHorizontalCard(true)

    // await loadAds()
    loadAds()
    .then(res => {
      setAds(res.ads)
      setUsers(res.users)
    })
    .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    // console.log('ads', ads)
    arrangeAds()
  }, [ads]);

  if(areAdsArranged) {
    return (
      <section className='pt-28 pb-24 dark:bg-slate-900 bg-white flex flex-col space-y-12 px-6'>
        <article
          className={`
            mt-px
            flex
            ${layoutOneColumn ? 'flex-col' : 'justify-between'}
        `}>
          <ul className={`${layoutOneColumn ? 'w-auto' : styleOf.adsColumnContainer}`}>
            <li
              className={`
                ${layoutOneColumn ? 'w-auto' : ''}
                ${styleOf.filters}
                bg-slate-200
                rounded-3xl
                p-3
                mb-6
                dark:bg-slate-700
                dark:text-white
              `}
            >
              <button
                className={`
                  ${styleOf.uiButtons}
                  border
                  border-solid
                  border-black
                  rounded-3xl
                  px-2
                  dark:border-white
                `}
                onClick={() => handleLayoutOfCards()}
              >
                {layoutOneColumn ? 'horizontal mode' : 'vertical mode'}
              </button>
              <button
                className={`
                  ${styleOf.uiButtons}
                  border
                  border-solid
                  border-black
                  rounded-3xl
                  px-2
                  dark:border-white
                `}
                onClick={e => props.toggleTheme(e.target.innerText)}
              >
                {lightIcon}
              </button>
              <button
                className={`
                  ${styleOf.uiButtons}
                  border
                  border-solid
                  border-black
                  rounded-3xl
                  px-2
                  dark:border-white
                `}
                onClick={e => props.toggleTheme(e.target.innerText)}
              >
                {darkIcon}
              </button>
              <button
                className={`
                  ${styleOf.uiButtons}
                  border
                  border-solid
                  border-black
                  rounded-3xl
                  px-2
                  dark:border-white
                `}
                onClick={e => props.toggleTheme(e.target.innerText)}
              >
                {systemIcon}
              </button>
              <button
                className={`
                  ${styleOf.uiButtons}
                  border
                  border-solid
                  border-black
                  rounded-3xl
                  px-2
                  ${layoutOneColumn ? '' : 'bg-gray-300 text-gray-100 border-gray-300 dark:border-gray-300'}
                  dark:border-white
                `}
                onClick={() => handleStyleOfCards()}
                disabled={layoutOneColumn ? false : true}
              >
                {horizontalCard ? 'horizontal card' : 'vertical card'}
              </button>
              <button
                className={`
                  ${styleOf.uiButtons}
                  border
                  border-solid
                  border-black
                  rounded-3xl
                  px-2
                  dark:border-white
                `}
                onClick={e => props.toggleHand(e.target.innerText)}
              >
                {leftHandIcon}
              </button>
              <button
                className={`
                  ${styleOf.uiButtons}
                  border
                  border-solid
                  border-black
                  rounded-3xl
                  px-2
                  dark:border-white
                `}
                onClick={e => props.toggleHand(e.target.innerText)}
              >
                {rightHandIcon}
              </button>
            </li>
            {oddAds.map(ad => {
              return (
                <li
                  key={ad._id}
                  className={`
                    mb-6
                    rounded-3xl
                    overflow-hidden
                    ${horizontalCard ? '' : 'flex-col'}
                    ${layoutOneColumn ? 'flex' : ''}
                    ${layoutOneColumn && horizontalCard ? 'h-56' : ''}
                  `}
                >
                  <div
                    className={`
                      ${layoutOneColumn && horizontalCard ? styleOf.imagePartHorizontalAd : ''}
                      flex
                      justify-center
                      items-center
                    `}
                  >
                    <img src={ad.imageUser} className={`${layoutOneColumn ? 'max-w-none h-full' : ''}`} />
                  </div>
                  <div
                    className={`
                      ${layoutOneColumn && horizontalCard ? styleOf.textPartHorizontalAd : 'h-56'}
                      flex
                      flex-col
                      justify-between
                      relative
                      p-3
                      bg-slate-200
                      dark:bg-slate-700
                      dark:text-white
                    `}
                  >
                    {ad.superUser && (
                      <span className={styleOf.superUserBadge}>{crownIcon}</span>
                    )}

                    <div>
                      <h3 className={`${styleOf.limitTextOnMultipleLines} ${styleOf.titleUser} font-bold`}>{ad.title}</h3>
                      <h4 className='text-sm text-ellipsis whitespace-nowrap overflow-hidden'>{ad.firstname} {ad.lastname}</h4>
                    </div>

                    {/*<p>{ad.starsNb} {ad.reviewsNb}</p>
                    {ad.reviewsNb || ad.starsNb && (
                      <p className='mb-3'>
                        coucou
                      </p>
                    )} */}

                    <p className={`${styleOf.limitTextOnMultipleLines} ${styleOf.descriptionUser}`}>{ad.description}</p>
                    <div className='flex justify-between'>
                      <div>
                        <p>
                          <span>{starIcon}{starIcon}{starIcon}</span>
                          <span className='ml-1 text-gray-400'>({ad.reviewsNb})</span>
                        </p>
                        <p className='dark:text-yellow-100 text-sm'>{ad.price} / heure</p>
                      </div>
                      <div className='flex items-center'>
                        <button
                          className={`
                            text-xl
                            ml-2
                            bg-gray-100
                            px-2
                            py-1
                            rounded-full
                            dark:bg-slate-600
                          `}
                          onClick={e => handleAddToFavorites(e)}
                        >
                          {heartIcon}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <ul className={`${layoutOneColumn ? 'w-auto' : styleOf.adsColumnContainer}`}>
            {evenAds.map(ad => {
              return (
                <li
                  key={ad._id}
                  className={`
                    mb-6
                    rounded-3xl
                    overflow-hidden
                    ${horizontalCard ? '' : 'flex-col'}
                    ${layoutOneColumn ? 'flex' : ''}
                    ${layoutOneColumn && horizontalCard ? 'h-56' : ''}
                  `}
                >
                  <div
                    className={`
                      ${layoutOneColumn && horizontalCard ? styleOf.imagePartHorizontalAd : ''}
                      flex
                      justify-center
                      items-center
                    `}
                  >
                    <img src={ad.imageUser} className={`${layoutOneColumn ? 'max-w-none h-full' : ''}`} />
                  </div>
                  <div
                    className={`
                      ${layoutOneColumn && horizontalCard ? styleOf.textPartHorizontalAd : 'h-56'}
                      flex
                      flex-col
                      justify-between
                      relative
                      p-3
                      bg-slate-200
                      dark:bg-slate-700
                      dark:text-white
                    `}
                  >
                    {ad.superUser && (
                      <span className={styleOf.superUserBadge}>{crownIcon}</span>
                    )}

                    <div>
                      <h3 className={`${styleOf.limitTextOnMultipleLines} ${styleOf.titleUser} font-bold`}>{ad.title}</h3>
                      <h4 className='text-sm text-ellipsis whitespace-nowrap overflow-hidden'>{ad.firstname} {ad.lastname}</h4>
                    </div>

                    {/* {ad.reviewsNb || ad.starsNb && (
                      <p className='mb-3'>
                        {ad.starsNb && (
                          <span>{getStarIconNb(ad)}</span>
                        )}
                        {ad.reviewsNb && (
                          <span className='ml-1 text-gray-400'>({ad.reviewsNb})</span>
                        )}
                      </p>
                    )} */}

                    <p className={`${styleOf.limitTextOnMultipleLines} ${styleOf.descriptionUser}`}>{ad.description}</p>
                    <div className='flex justify-between'>
                      <div>
                        <p>
                          <span>{starIcon}{starIcon}{starIcon}</span>
                          <span className='ml-1 text-gray-400'>({ad.reviewsNb})</span>
                        </p>
                        <p className='dark:text-yellow-100 text-sm'>{ad.price} / heure</p>
                      </div>
                      <div className='flex items-center'>
                        <button
                          className={`
                            text-xl
                            ml-2
                            bg-gray-100
                            px-2
                            py-1
                            rounded-full
                            dark:bg-slate-600
                          `}
                          onClick={e => handleAddToFavorites(e)}
                        >
                          {heartIcon}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </article>
      </section>
    )
  }

}

export default HomePage;
