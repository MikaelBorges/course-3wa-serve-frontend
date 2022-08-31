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
      }

  return (
    <li
      key={props.ad._id}
      className={`
        mb-6
        rounded-3xl
        overflow-hidden
        ${props.horizontalCard ? '' : 'flex-col'}
        ${props.layoutOneColumn ? 'flex' : ''}
        ${props.layoutOneColumn && props.horizontalCard ? 'h-56' : ''}
      `}
    >
      <div
        className={`
          ${props.layoutOneColumn && props.horizontalCard ? styleOf.imagePartHorizontalAd : ''}
          flex
          justify-center
          items-center
        `}
      >
        <img src={props.ad.imageUser} className={`${props.layoutOneColumn ? 'max-w-none h-full' : ''}`} />
      </div>
      <div
        className={`
          ${props.layoutOneColumn && props.horizontalCard ? styleOf.textPartHorizontalAd : 'h-72'}
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
        {props.ad.superUser && (
          <span className={styleOf.superUserBadge}>{crownIcon}</span>
        )}

        <div>
          <h3
            className={`
              ${styleOf.limitText}
              ${styleOf.titleUser}
              font-bold
              leading-5
            `}
          >
            {props.ad.title}
          </h3>
          <h4 className='text-sm text-ellipsis whitespace-nowrap overflow-hidden'>{props.ad.firstname} {props.ad.lastname}</h4>
          <span>{displayStars(props.ad.starsNb)}</span>
        </div>

        <p className={`${styleOf.limitText} ${styleOf.descriptionUser}`}>{props.ad.description}</p>

        <p className='text-fuchsia-800 text-sm dark:text-yellow-100'>{props.ad.price} / h</p>

        <div className='flex justify-between'>
          <button
            className={`
              text-xl
              bg-gray-100
              px-3
              py-2
              flex
              items-center
              rounded-full
              dark:bg-slate-600
            `}
            onClick={e => handleAddToFavorites(e)}
          >
            <div className='text-xs'>{paperPencilIcon}</div>
            {props.ad.reviewsNb > 0 && <div className='text-gray-400 text-base ml-2'>{props.ad.favoritesNb}</div>}
          </button>

          <button
            className={`
              text-xl
              bg-gray-100
              px-2
              py-2
              flex
              items-center
              rounded-full
              dark:bg-slate-600
            `}
            onClick={e => handleAddToFavorites(e)}
          >
            <div>{heartIcon}</div>
            {props.ad.favoritesNb > 0 && <div className='text-red-600 text-base ml-1'>{props.ad.favoritesNb}</div>}
          </button>
        </div>
      </div>
    </li>
  );
}

export default Card;
