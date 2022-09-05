import styleOf from './SettingsCard.module.scss'
import { heartIcon, starIcon, crownIcon, paperPencilIcon, pinIcon } from '../icons/Icons'

function SettingsCard(props) {
  const displayStars = (starsNb) => {
          let stringOfStars = ''
          while(starsNb) {
            stringOfStars += starIcon
            --starsNb
          }
          return stringOfStars
        },

        handleAddToFavorites = e => {
          e.stopPropagation()
          console.log('ajouter aux favoris')
        },

        handleViewReviews = e => {
          e.stopPropagation()
          console.log('voir les avis')
        },

        handleShowAd = () => {
          console.log("afficher l'annonce")
        },

        handleShowLocation = e => {
          e.stopPropagation()
          console.log('afficher la carte')
        },

        handleShowPriceDetails = e => {
          e.stopPropagation()
          console.log('proposer un prix de prestation')
        },

        handleRateUser = e => {
          e.stopPropagation()
          console.log('noter')
        },

        handleShowUserProfile = e => {
          e.stopPropagation()
          console.log("afficher la page de l'utilisateur")
        }

  return (
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
  )
}

export default SettingsCard;
