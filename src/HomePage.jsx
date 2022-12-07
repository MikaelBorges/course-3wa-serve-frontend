import { loadAds } from './api/ads'
import Card from './components/Card'

import { useState, useEffect } from 'react'
import styleOf from './HomePage.module.scss'
import { useNavigate } from 'react-router-dom'

function HomePage(props) {
  const navigate = useNavigate(),
        [ads, setAds] = useState([]),
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
          if(evenAds.length > 0 || oddAds.length > 0) {
            setOddAds(oddAds)
            setEvenAds(evenAds)
            setAreAdsArranged(true)
          }
          console.log('(HOME) ads rangé')
        }

  /* useEffect(() => {
    // console.log('useEffect favs')
    // console.log('favs', favs)
    if(favs) arrangeAds()
  }, [favs]); */

  useEffect(() => {
    console.log('(HOME) useEffect props.clickedAd', props.clickedAd)
    if(Object.keys(props.clickedAd).length > 0) {
      console.log('rentre ici car clickedAd.length > 0 ')
      // console.log('props.clickedAd', props.clickedAd)

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
      console.log('items', items)
      setAreAdsArranged(false)
      setAds(items)
      props.resetClickedAd()
    }
  }, [props.clickedAd]);

  useEffect(() => {
    if(props.refreshUrl) navigate('/')
    // await loadAds()
    loadAds()
    .then(res => {
      setAds(res.ads)
    })
    .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    console.log('(HOME) useEffect ads', ads)
    //console.log('(HOME) areAdsArranged', areAdsArranged)
    if(!areAdsArranged && Object.keys(ads).length > 0) {
      //console.log('(HOME) arrangement ads')
      arrangeAds()
    }
  }, [ads]);

  // ancien return : balise article vidée
  /* if(areAdsArranged) {
    return (
      <section className='pt-28 pb-24 dark:bg-slate-900 bg-white flex flex-col space-y-12 px-6'>
        <article
          className={`
            flex
            mt-px
            ${props.layoutOneColumn ? 'flex-col' : 'justify-between'}
          `}
        >
        </article>
      </section>
    )
  } else {
    return (
      <section className='min-h-screen flex justify-center items-center'>
        <img className='w-20' src='https://i.stack.imgur.com/y3Hm3.gif' />
      </section>
    )
  } */

  return (
    <section className='pt-28 pb-24 dark:bg-slate-900 bg-white flex flex-col space-y-12 px-6'>
      {areAdsArranged ?
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
                  horizontalCard={props.horizontalCard}
                  layoutOneColumn={props.layoutOneColumn}
                  checkIfAddToFavorites={props.checkIfAddToFavorites}
                  handleAddToFavorites={props.handleAddToFavorites}
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
                    horizontalCard={props.horizontalCard}
                    layoutOneColumn={props.layoutOneColumn}
                    checkIfAddToFavorites={props.checkIfAddToFavorites}
                    handleAddToFavorites={props.handleAddToFavorites}
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
                    horizontalCard={props.horizontalCard}
                    layoutOneColumn={props.layoutOneColumn}
                    checkIfAddToFavorites={props.checkIfAddToFavorites}
                    handleAddToFavorites={props.handleAddToFavorites}
                  />
                )
              })}
            </ul>
          </>
        }
      </article>
      :
      <img className='w-20' src='https://i.stack.imgur.com/y3Hm3.gif' />
      }
    </section>
  )
}

export default HomePage;
