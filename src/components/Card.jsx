import styleOf from './Card.module.scss'
import { heartIcon, starIcon, crownIcon, paperPencilIcon } from '../icons/Icons'

function Card(props) {
  const displayStars = (starsNb) => {
          let stringOfStars = ''
          while(starsNb) {
            stringOfStars += starIcon
            --starsNb
          }
          return stringOfStars
        },

        handleAddToFavorites = e => {
          console.log('ajouter aux favoris')
        },

        handleViewReviews = e => {
          console.log('voir les avis')
        }

  return (
    <li
      className={`
        mb-6
        rounded-3xl
        overflow-hidden
        ${props.layoutOneColumn ? 'flex' : ''}
        ${props.horizontalCard ? '' : 'flex-col'}
        ${props.layoutOneColumn && props.horizontalCard ?
          styleOf.horizontalCard : ''
        }
      `}
    >
      <div
        className={`
          flex
          items-center
          justify-center
          ${props.layoutOneColumn && props.horizontalCard ?
            styleOf.imagePartHorizontalAd : ''
          }
        `}
      >
        <img
          src={props.ad.imageUser}
          className={`${props.layoutOneColumn ? 'max-w-none h-full' : ''}`}
        />
      </div>
      <div
        className={`
          p-3
          flex
          flex-col
          relative
          bg-slate-200
          justify-between
          dark:text-white
          dark:bg-slate-700
          ${props.layoutOneColumn && !props.horizontalCard ?
            'text-2xl p-5 h-96' : ''
          }
          ${props.layoutOneColumn && props.horizontalCard ?
            styleOf.textPartHorizontalAd : 'h-72'
          }
        `}
      >
        <div
          className={`
            absolute
          bg-slate-600
            dark:bg-slate-500
            ${styleOf.badgeContainer}
            ${props.layoutOneColumn && props.horizontalCard ?
              'rounded-bl-xl' : 'rounded-bl-2xl'
            }
          `}
        >
          {props.ad.superUser && (
            <div className={`mt-1 mx-2 mb-2 ${styleOf.superUserBadge}`}>{crownIcon}</div>
          )}
        </div>
        <div>
          <h3
            className={`
              font-bold
              leading-5
              ${styleOf.limitText}
              ${styleOf.titleUser}
              ${props.layoutOneColumn && !props.horizontalCard ?
                'leading-7' : ''
              }
            `}
          >
            {props.ad.title}
          </h3>
          <h4
            className={`
              text-ellipsis
              overflow-hidden
              whitespace-nowrap
              ${props.layoutOneColumn && !props.horizontalCard ?
                'text-lg mt-1' : 'text-sm'
              }
            `}
          >
            {props.ad.firstname} {props.ad.lastname}
          </h4>
          <span>{displayStars(props.ad.starsNb)}</span>
        </div>
        <p className={`${styleOf.limitText} ${styleOf.descriptionUser}`}>{props.ad.description}</p>
        <p
          className={`
            text-fuchsia-800
            dark:text-yellow-100
            ${props.layoutOneColumn && !props.horizontalCard ?
              'text-lg' : 'text-sm'
            }
          `}
        >
          {props.ad.price} / h
        </p>
        <div className='flex justify-between'>
          <button
            className={`
              px-3
              py-2
              flex
              text-xl
              items-center
              rounded-full
              bg-gray-100
              dark:bg-slate-600
            `}
            onClick={e => handleViewReviews(e)}
          >
            <div className='text-xs'>{paperPencilIcon}</div>
            {props.ad.reviewsNb > 0 && (
              <div
                className={`
                  ml-2
                  text-gray-400
                  ${props.layoutOneColumn && !props.horizontalCard ?
                    'text-xl' : 'text-base'
                  }
                `}
              >
                {props.ad.reviewsNb}</div>
            )}
          </button>
          <button
            className={`
              px-2
              py-2
              flex
              text-xl
              items-center
              rounded-full
              bg-gray-100
              dark:bg-slate-600
            `}
            onClick={e => handleAddToFavorites(e)}
          >
            <div>{heartIcon}</div>
            {props.ad.favoritesNb > 0 && (
              <div
                className={`
                  ml-1
                  text-red-600 
                  ${props.layoutOneColumn && !props.horizontalCard ?
                    'text-xl' : 'text-base'
                  }
                `}
              >
                {props.ad.favoritesNb}
              </div>
            )}
          </button>
        </div>
      </div>
    </li>
  )
}

export default Card;
