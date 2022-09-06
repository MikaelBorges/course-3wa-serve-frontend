import { loadAds } from './api/ads'
import Card from './components/Card'
import { addToFavorites } from './api/user'
import { useState, useEffect } from 'react'
import styleOf from './HomePage.module.scss'

let newAds = {}

function HomePage(props) {
  const [ads, setAds] = useState([]),
        [favs, setFavs] = useState(false),
        [oddAds, setOddAds] = useState([]),
        [evenAds, setEvenAds] = useState([]),
        [areAdsArranged, setAreAdsArranged] = useState(false),

        arrangeAds = () => {
          oddAds.length = 0
          evenAds.length = 0
          /* setOddAds([])
          setEvenAds([]) */
          // console.log('début du classement')
          ads.forEach((ad, index) => {
            const isAdEven = (index % 2 === 0) ? true : false
            if (isAdEven) {
              evenAds.push(ad)
            }
            else {
              oddAds.push(ad)
            }
          })
          if(evenAds.length > 0 || oddAds.length > 0) setAreAdsArranged(true)
          // console.log('fin du classement')
        },

        checkIfAddToFavorites = adId => {
          const ad = {
            adId: adId,
            userId: props.dataUser._id,
          }
          addToFavorites(ad)
          .then(res => {
            // console.log('res.data.message', res.data.message)

            if(res.status === 200) {
              // console.log('200')
              loadAds()
              .then(res => {
                // console.log('RES :', res)
                setAds(res.ads)
                setAreAdsArranged(false)
                setFavs(true)
              })
              .catch(err => console.log(err))
            }

          })
          .catch(err => console.log(err))
        }

  useEffect(() => {
    /* console.log('useEffect favs')
    console.log('favs', favs) */
    if(favs) arrangeAds()
  }, [favs]);

  useEffect(() => {
    // console.log('useEffect')
    // await loadAds()
    loadAds()
    .then(res => {
      setAds(res.ads)
    })
    .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    /* console.log('useEffect ads')
    console.log('ads', ads) */
    if(!areAdsArranged) arrangeAds()
  }, [ads]);

  if(areAdsArranged) {
    return (
      <section className='pt-28 pb-24 dark:bg-slate-900 bg-white flex flex-col space-y-12 px-6'>
        <article
          className={`
            flex
            mt-px
            ${props.layoutOneColumn ? 'flex-col' : 'justify-between'}
          `}
        >
          {props.layoutOneColumn &&
            <ul>
              <li
                className={`
                  ${props.layoutOneColumn ? 'w-auto' : ''}
                  ${styleOf.filters}
                  flex
                  flex-col
                  justify-between
                  bg-slate-200
                  rounded-3xl
                  p-3
                  mb-6
                  dark:bg-slate-700
                  dark:text-white
                `}
              >
                {/* <button
                  className={`
                    ${styleOf.uiButtons}
                    border
                    border-solid
                    border-black
                    rounded-3xl
                    px-2
                    w-fit
                    text-sm
                    dark:border-white
                  `}
                  onClick={() => props.toggleLayout('toggle')}
                >
                  {props.layoutOneColumn ? 'horizontal mode' : 'vertical mode'}
                </button>
                <div>
                  <button
                    className={`
                      ${styleOf.uiButtons}
                      border
                      border-solid
                      border-black
                      rounded-3xl
                      py-1
                      px-1
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
                      px-1
                      py-1
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
                      px-1
                      py-1
                      dark:border-white
                    `}
                    onClick={e => props.toggleTheme(e.target.innerText)}
                  >
                    {systemIcon}
                  </button>
                </div>
                <button
                  className={`
                    ${styleOf.uiButtons}
                    border
                    border-solid
                    border-black
                    rounded-3xl
                    px-2
                    w-fit
                    text-sm
                    ${props.layoutOneColumn ? '' : 'bg-gray-300 text-gray-100 border-gray-300 dark:border-gray-300'}
                    dark:border-white
                  `}
                  onClick={() => props.toggleDirectionCard('toggle')}
                  disabled={props.layoutOneColumn ? false : true}
                >
                  {props.horizontalCard ? 'horizontal card' : 'vertical card'}
                </button>
                <div>
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
                </div> */}
              </li>
              {ads.map(ad => {
                return (
                  <Card
                    ad={ad}
                    key={ad._id}
                    dataUser={props.dataUser}
                    horizontalCard={props.horizontalCard}
                    layoutOneColumn={props.layoutOneColumn}
                    checkIfAddToFavorites={checkIfAddToFavorites}
                  />
                )
              })}
            </ul>
          }
          {!props.layoutOneColumn &&
            <>
              <ul className={styleOf.adsColumnContainer}>
                <li
                  className={`
                    ${props.layoutOneColumn ? 'w-auto' : ''}
                    ${styleOf.filters}
                    flex
                    flex-col
                    justify-between
                    bg-slate-200
                    rounded-3xl
                    p-3
                    mb-6
                    dark:bg-slate-700
                    dark:text-white
                  `}
                >
                  {/* <button
                    className={`
                      ${styleOf.uiButtons}
                      border
                      border-solid
                      border-black
                      rounded-3xl
                      px-2
                      w-fit
                      text-sm
                      dark:border-white
                    `}
                    onClick={() => props.toggleLayout('toggle')}
                  >
                    {props.layoutOneColumn ? 'horizontal mode' : 'vertical mode'}
                  </button>
                  <div>
                    <button
                      className={`
                        ${styleOf.uiButtons}
                        border
                        border-solid
                        border-black
                        rounded-3xl
                        py-1
                        px-1
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
                        px-1
                        py-1
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
                        px-1
                        py-1
                        dark:border-white
                      `}
                      onClick={e => props.toggleTheme(e.target.innerText)}
                    >
                      {systemIcon}
                    </button>
                  </div>
                  <button
                    className={`
                      ${styleOf.uiButtons}
                      border
                      border-solid
                      border-black
                      rounded-3xl
                      px-2
                      w-fit
                      text-sm
                      ${props.layoutOneColumn ? '' : 'bg-gray-300 text-gray-100 border-gray-300 dark:border-gray-300'}
                      dark:border-white
                    `}
                    onClick={() => props.toggleDirectionCard('toggle')}
                    disabled={props.layoutOneColumn ? false : true}
                  >
                    {props.horizontalCard ? 'horizontal card' : 'vertical card'}
                  </button>
                  <div>
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
                  </div> */}
                </li>
                {oddAds.map(ad => {
                  return (
                    <Card
                      ad={ad}
                      key={ad._id}
                      dataUser={props.dataUser}
                      horizontalCard={props.horizontalCard}
                      layoutOneColumn={props.layoutOneColumn}
                      checkIfAddToFavorites={checkIfAddToFavorites}
                    />
                  )
                })}
              </ul>
              <ul className={styleOf.adsColumnContainer}>
                {evenAds.map(ad => {
                  return (
                    <Card
                      ad={ad}
                      key={ad._id}
                      dataUser={props.dataUser}
                      horizontalCard={props.horizontalCard}
                      layoutOneColumn={props.layoutOneColumn}
                      checkIfAddToFavorites={checkIfAddToFavorites}
                    />
                  )
                })}
              </ul>
            </>
          }
        </article>
      </section>
    )
  } else {
    return (
      <section className='min-h-screen flex justify-center items-center'>
        <img
          className='max-w-xs'
          src="https://i.stack.imgur.com/y3Hm3.gif"
        />
      </section>
    )
  }
}

export default HomePage;
