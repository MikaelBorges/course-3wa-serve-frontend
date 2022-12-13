import { deleteAd } from '../api/ads'
import styleOf from './Card.module.scss'
import { useState, useEffect } from 'react'
//import { addToFavorites } from '../api/user'
import { useNavigate } from 'react-router-dom'
import {
  binIcon,
  pinIcon,
  eyeIcon,
  heartIcon,
  starIcon,
  crownIcon,
  pencilIcon,
  paperPencilIcon
} from '../constants/icons'

function Card(props) {
  const navigate = useNavigate(),
        urlOnBrowser = window.location.pathname,
        [isItChecked, setIsItChecked] = useState(false),
        [isSubscribed, setIsSubscribed] = useState(false),
        userPage = `/projects/serve/user/${props.ad.userId}`,
        [weAreOnUserPage, setWeAreOnUserPage] = useState(false),
        userPageWithSlash = `/projects/serve/user/${props.ad.userId}/`,

        handleChange = e => {
          e.stopPropagation()

          if(props.allCardsChecked) {
            props.uncheckAllCheckboxes()
          }

          setIsSubscribed(e.target.checked)

          //props.allCardsChecked && (isSubscribed || props.allCardsChecked)
        },

        displayStars = starsNb => {
          let stringOfStars = ''
          while(starsNb) {
            stringOfStars += starIcon
            --starsNb
          }
          return stringOfStars
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

        handleModifyAd = e => {
          e.stopPropagation()
          console.log('modifier annonce')
        },

        handleShowUserProfile = e => {
          e.stopPropagation()
          if (!weAreOnUserPage) {
            if (urlOnBrowser !== userPage) {
              navigate(`/user/${props.ad.userId}`)
            }
            if (urlOnBrowser !== userPageWithSlash) {
              navigate(`user/${props.ad.userId}`)
            }
          }
        },

        handleDeleteAd = (e, id) => {
          e.stopPropagation()

          const adToDelete = {
            id: id
          }

          deleteAd(adToDelete)
          .then(res => {
            if(res.status === 200) {
              //console.log('res.data.message', res.data.message)
              props.openPopup(res.data.message)
              //window.location.reload(false)
            }
            else {
              console.log('res.response.data.message', res.response.data.message)
            }
          })
          .catch(err => {
            console.log('err', err)
          })

        },

        showStatistics = e => {
          e.stopPropagation()
          console.log('montrer les stats')
        }

  useEffect(() => {
    if (urlOnBrowser === userPage || urlOnBrowser === userPageWithSlash) {
      setWeAreOnUserPage(true)
    }
  }, []);

  return (
    <li
      className={`
        rounded-3xl
        cursor-pointer
        overflow-hidden
        ${props.layoutOneColumn ? 'flex' : ''}
        ${props.horizontalCard ? '' : 'flex-col'}
        ${props.layoutOneColumn && props.horizontalCard ?
          styleOf.horizontalCard : ''
        }
      `}
      onClick={() => handleShowAd()}
    >
      <div
        className={`
          flex
          relative
          items-center
          justify-center
          ${props.layoutOneColumn && props.horizontalCard ?
            styleOf.imagePartHorizontalAd : ''
          }
        `}
      >
        <img
          alt='images du service'
          src={props.ad.imageWork}
          className={`${props.layoutOneColumn ? 'max-w-none h-full' : ''}`}
        />
        {/* <div
          className={`
            px-2
            py-1
            border
            absolute
            text-2xl
            leading-3
            rounded-full
            text-white
            border-solid
            border-white
            ${styleOf.bulletPoints}
          `}
        >
          • • • •
        </div> */}
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
            styleOf.textPartHorizontalAd : ''
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
          {props.ad.superUser &&
            <div className={`mt-1 mx-2 mb-2 ${styleOf.superUserBadge}`}>{crownIcon}</div>
          }
        </div>
        <div className='pb-3'>
          <h3
            className={`
              pb-1
              font-bold
              leading-5
              ${styleOf.limitTextTo}
              ${styleOf.twoLinesMax}
              ${styleOf.letterSpacingThinner}
              ${props.layoutOneColumn && !props.horizontalCard ?
                'leading-7' : ''
              }
            `}
          >
            {props.ad.title}
          </h3>
          <div
            className={`
              flex
              flex-1
              min-w-0
            `}
          >
            <button
              className={`
                flex
                py-0.5
                text-sm
                text-left
                rounded-3xl
                items-center
                text-ellipsis
                bg-gray-100
                overflow-hidden
                whitespace-nowrap
                dark:bg-slate-600
                ${styleOf.userButton}
              `}
              onClick={e => handleShowUserProfile(e)}
            >
              <div className='w-9 flex flex-col justify-center mr-2'>
                <img
                  src={props.ad.imageUser}
                  alt="image de l'utilisateur"
                  className={`
                    ${props.layoutOneColumn ?
                      'max-w-none h-full rounded-full' : 'rounded-full'
                    }
                  `}
                />
              </div>
              <h4
                className={`
                  flex
                  flex-1
                  min-w-0
                  flex-col
                  ${props.layoutOneColumn && !props.horizontalCard ?
                    'text-lg mt-1' : 'text-sm'
                  }
                `}
              >
                <div
                  className={`
                    text-ellipsis
                    overflow-hidden
                    whitespace-nowrap
                  `}
                >
                  {props.ad.firstname}
                </div>
                <div
                  className={`
                    text-ellipsis
                    overflow-hidden
                    whitespace-nowrap
                  `}
                >
                  {props.ad.lastname}
                </div>
              </h4>

            </button>
          </div>
          <span className='text-sm'>{displayStars(props.ad.starsNb)}</span>
          <button
            className={`
              px-2
              ml-1
              text-xs
              font-bold
              rounded-3xl
              bg-gray-100
              dark:bg-slate-600
              dark:text-yellow-100
              ${styleOf.letterSpacingThinner}
            `}
            onClick={e => handleRateUser(e)}
          >
            noter
          </button>
          <div
            className={`
              flex
              flex-1
              min-w-0
            `}
          >
            <button
              className={`
                mt-1
                pl-2
                pr-3
                py-0.5
                text-sm
                rounded-2xl
                text-ellipsis
                bg-gray-100
                text-rose-500
                overflow-hidden
                whitespace-nowrap
                dark:bg-slate-600
              `}
              onClick={e => handleShowLocation(e)}
            >
              <span className='mr-1'>{pinIcon}</span>{props.ad.location}
            </button>
          </div>
        </div>
        <p
          className={`
            mb-3
            ${styleOf.limitTextTo}
            ${styleOf.descriptionUser}
          `}
        >
          {props.ad.description}
        </p>
        <p
          className={`
            pb-1
            text-gray-400
            ${props.layoutOneColumn && !props.horizontalCard ?
              'text-lg' : 'text-xs'
            }
          `}
        >
          le {props.ad.dateOfPublication}
        </p>
        <div
          className={`
            pb-3
            flex
            justify-between
            ${props.layoutOneColumn && !props.horizontalCard ?
              'text-lg' : 'text-xs'
            }
          `}
        >
          <div className='text-right text-gray-400'>
            à {props.ad.timeOfPublication}
          </div>
          <button
            className={`
              px-2
              text-xs
              font-bold
              rounded-3xl
              text-white
              bg-fuchsia-500
              dark:bg-slate-600
              dark:text-yellow-100
              ${styleOf.letterSpacingThinner}
            `}
            onClick={e => handleShowPriceDetails(e)}
          >
            {props.ad.price}/h
          </button>
          
        </div>
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
            <div
              className={`
                ml-2
                text-gray-400
                ${props.layoutOneColumn && !props.horizontalCard ?
                  'text-xl' : 'text-base'
                }
              `}
            >
              {props.ad.reviewsNb}
            </div>
          </button>
          {weAreOnUserPage && !props.isVisitor &&
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
              onClick={e => showStatistics(e)}
            >
              <div>{eyeIcon}</div>
              <div
                className={`
                  ml-1
                  text-green-500 
                  ${props.layoutOneColumn && !props.horizontalCard ?
                    'text-xl' : 'text-base'
                  }
                `}
              >
                {props.ad.views}
              </div>
            </button>
          }
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
            onClick={e => props.handleAddToFavorites(e, props.ad)}
          >
            <div>{heartIcon}</div>
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
          </button>
        </div>
        {weAreOnUserPage && !props.isVisitor &&
          <div className='flex justify-between'>
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
              onClick={e => handleDeleteAd(e, props.ad._id)}
            >
              {binIcon}
            </button>
            {props.showDraft &&
              <input
                value='yes'
                name='check'
                type='checkbox'
                id={props.ad._id}
                className='w-8 h-8 rounded-full'
                //checked={props.allCardsChecked ? true : false}
                //defaultChecked
                //onChange={}
                onClick={e => handleChange(e)}
                onChange={e => handleChange(e)}
                checked={isSubscribed || props.allCardsChecked}
              />
            }
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
              onClick={e => handleModifyAd(e)}
            >
              {pencilIcon}
            </button>
          </div>
        }
      </div>
    </li>
  )
}

export default Card;
