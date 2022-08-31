import { loadAds } from './api/ads'
import { useState, useEffect } from 'react'
import {
  lightIcon,
  darkIcon,
  systemIcon,
  leftHandIcon,
  rightHandIcon
} from './icons/Icons'
import styleOf from './HomePage.module.scss'
import Card from './components/Card'

function HomePage(props) {
  const [ads, setAds] = useState([]),
        [users, setUsers] = useState([]),
        [oddAds, setoddAds] = useState([]),
        [evenAds, setevenAds] = useState([]),
        [horizontalCard, setHorizontalCard] = useState(false),
        [areAdsArranged, setAreAdsArranged] = useState(false),
        [layoutOneColumn, setLayoutOneColumn] = useState(false),

        arrangeAds = () => {
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
        },

        handleLayoutOfCards = () => {
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
            flex
            mt-px
            ${layoutOneColumn ? 'flex-col' : 'justify-between'}
        `}>
          <ul className={`${layoutOneColumn ? 'w-auto' : styleOf.adsColumnContainer}`}>
            <li
              className={`
                ${layoutOneColumn ? 'w-auto' : ''}
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
                  dark:border-white
                `}
                onClick={() => handleLayoutOfCards()}
              >
                {layoutOneColumn ? 'horizontal mode' : 'vertical mode'}
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
                  ${layoutOneColumn ? '' : 'bg-gray-300 text-gray-100 border-gray-300 dark:border-gray-300'}
                  dark:border-white
                `}
                onClick={() => handleStyleOfCards()}
                disabled={layoutOneColumn ? false : true}
              >
                {horizontalCard ? 'horizontal card' : 'vertical card'}
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
              </div>
            </li>
            {oddAds.map(ad => {
              return (
                <Card
                  ad={ad}
                  horizontalCard={horizontalCard}
                  layoutOneColumn={layoutOneColumn}
                />
              )
            })}
          </ul>
          <ul className={`${layoutOneColumn ? 'w-auto' : styleOf.adsColumnContainer}`}>
            {evenAds.map(ad => {
              return (
                <Card
                  ad={ad}
                  horizontalCard={horizontalCard}
                  layoutOneColumn={layoutOneColumn}
                />
              )
            })}
          </ul>
        </article>
      </section>
    )
  }

}

export default HomePage;
