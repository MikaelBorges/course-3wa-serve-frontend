import {
  keyIcon,
  darkIcon,
  userIcon,
  cardIcon,
  plusIcon,
  wheelIcon,
  lightIcon,
  systemIcon,
  leftHandIcon,
  rightHandIcon,
  rowLayoutIcon,
  disconnectIcon,
  columnLayoutIcon
} from './constants/icons'
import { useState } from 'react'
import { config } from './config'
import { logoutUser } from './api/user'
import { Ul, Li } from './components/Ul'
import { Lien } from './components/Lien'
import styleOf from './Layout.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { userIsLogout, userIsLogged } from './functions/user'
import logo3D from './images/logos/gitlab-5562373-4642718.png'
import logo from './images/logos/gitlab_tile_logo_icon_170092.png'

function Layout(props) {
  const navigate = useNavigate(),
        [error, setError] = useState(null),
        //[menu, setMenu] = useState(false),
        [isMenuOpen, setIsMenuOpen] = useState(false),
        [dbLocationIsOnline, setDbLocationIsOnline] = useState(false)

        // console.log('props.dataUser', props.dataUser)

  /* function handleDbLocationIsOnline() {
    if(goOnline) {
      changeConfig('https://mikaelborges-serve.herokuapp.com')
      setDbLocationIsOnline(goOnline)
    }
    else {
      changeConfig('http://localhost:3306')
      setDbLocationIsOnline(!goOnline)
    }

    setDbLocationIsOnline(goOnline)
    console.log('NEW CONFIG :')
    console.log(config.api_url)

    props.displayUser()
  } */

  /* function initState () {
    if (config.api_url === 'http://localhost:3306') {
      return false
    }
    else {
      return true
    }
  } */

  /* function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  } */

  let themeButtonIcon
  switch(props.theme) {
    case 'light':
      themeButtonIcon = lightIcon
      break
    case 'dark':
      themeButtonIcon = darkIcon
      break
    case 'system':
      themeButtonIcon = systemIcon
      break
    default:
      console.error("Problème dans props.theme et du coup dans le state theme de l'app")
  }

  function handleLogout() {
    /* console.log('handleLogout')
    props.dataUser === undefined ? '/user/login' : '/logout'
    navigate("/", { state: { user: undefined } }) */
    let data = { _id : props.dataUser._id }
    logoutUser(data)
    .then(res => {
      /* console.log('RES (LAYOUT) :')
      console.log(res) */
      if (res.status === 200) {
        /* console.log('res.status === 200')
        window.localStorage.setItem("saas-token", res.token);
        let user = res.data.user
        console.log('user LoginPage', user)
        user.token = res.token
        dispatch(setUser(user))
        setRedirect(true);
        navigate("/", { state: { user: user } }); */

        // props.updateCorrectDataUser({})

        window.localStorage.removeItem('user')
        props.updateUser({})
        if(window.location.pathname !== '/') navigate('/')
      }
      else {
        console.log('res.msg')
        console.log(res.msg)
        setError(res.msg)
      }
    })
    .catch(err => {
      console.log('erreur: rentre dans le catch du Layout')
      console.log(err)
      // setError(err)
    })
  }

  // if(props.dataUser) console.log('in layout',props.dataUser._id)

  return (
    <div className='min-h-screen'>
      <header className='fixed p-6 w-full h-28 flex z-10'>
        <Link to='/' className='contents'>
          <img src={logo3D} alt='logo' className='max-w-none h-full' />
        </Link>
        <div
          className={`
            p-2
            ml-6
            flex
            w-full
            flex-wrap
            rounded-2xl
            content-start
            bg-orange-200
            overflow-hidden
            dark:text-white
            dark:bg-orange-700
          `}
        >
            <button
              className={`
                px-2
                border
                text-xs
                rounded-3xl
                border-solid
                border-black
                dark:border-white
                ${styleOf.filtersButtons}
              `}
              onClick={() => console.log('clic on filters')}
            >
              Prix
            </button>
            <button
              className={`
                px-2
                border
                text-xs
                rounded-3xl
                border-solid
                border-black
                dark:border-white
                ${styleOf.filtersButtons}
              `}
              onClick={() => console.log('clic on filters')}
            >
              Filtres
              <span
                className={`
                  px-1
                  ml-1
                  rounded-full
                  bg-orange-400
                  ${styleOf.filtersNb}
                `}
              >
                2
              </span>
            </button>
            <button
              className={`
                px-2
                border
                text-xs
                rounded-3xl
                border-solid
                border-black
                dark:border-white
                ${styleOf.filtersButtons}
              `}
              onClick={() => console.log('clic on filters')}
            >
              Lieu
            </button>
            <button
              className={`
                px-2
                border
                text-xs
                rounded-3xl
                border-solid
                border-black
                dark:border-white
                ${styleOf.filtersButtons}
              `}
              onClick={() => console.log('clic on filters')}
            >
              Tri : Pertinence
            </button>
            {/* <button
              className={`
                px-2
                border
                text-xs
                rounded-3xl
                border-solid
                border-black
                dark:border-white
                ${styleOf.filtersButtons}
              `}
              onClick={() => console.log('clic on filters')}
            >
              Sans livraison
            </button>
            <button
              className={`
                px-2
                border
                text-xs
                rounded-3xl
                border-solid
                border-black
                dark:border-white
                ${styleOf.filtersButtons}
              `}
              onClick={() => console.log('clic on filters')}
            >
              Vue : Liste
            </button> */}
        </div>

        {/* {config.api_url === 'http://localhost:3306' && (
          <div className=''>
            <button
              className={`
                bg-white
                px-4
                rounded-full
                shadow-xl

                dark:text-yellow-100
                dark:bg-black
              `}
              onClick={handleDbLocationIsOnline}
            >
              {dbLocationIsOnline ? 'online' : 'local'}
            </button>
          </div>
        )} */}

      </header>
      <main className='min-h-screen dark:bg-slate-800'>
        {props.children}
        <nav
          className={`
            p-4
            flex
            fixed
            bottom-4
            space-x-2
            bg-white
            shadow-2xl
            rounded-full
            dark:bg-black
            ${props.rightHand ? 'justify-end right-4' : 'left-4'}
          `}
        >
          {isMenuOpen &&
            <>
              <button
                className={`
                  h-8
                  px-2
                  text-xs
                  rounded-full
                  ${props.layoutOneColumn ? 'bg-slate-200 dark:bg-slate-400' : ' dark:bg-black'}
                `}
                onClick={() => props.toggleDirectionCard('toggle')}
                disabled={props.layoutOneColumn ? false : true}
              >
                {cardIcon}
              </button>
              <button
                className={`
                  h-8
                  px-2
                  text-xs
                  rounded-full
                  bg-slate-200
                  dark:bg-slate-400
                `}
                onClick={() => props.toggleLayout('toggle')}
              >
                {props.layoutOneColumn ? rowLayoutIcon : columnLayoutIcon}
              </button>
              <button
                className={`
                  h-8
                  px-2
                  text-xs
                  rounded-full
                  bg-slate-200
                  dark:bg-slate-400
                `}
                onClick={() => props.toggleHand()}
              >
                {props.rightHand ? leftHandIcon : rightHandIcon}
              </button>
              <button
                className={`
                  h-8
                  px-2
                  text-xs
                  rounded-full
                  bg-slate-200
                  dark:bg-slate-400
                `}
                onClick={e => props.toggleTheme(e.target.innerText)}
              >
                {systemIcon}
              </button>

              {userIsLogout(props.dataUser) ?
                <Link
                  to='user/login'
                  className={`
                    h-8
                    pt-2
                    px-2
                    text-xs
                    rounded-full
                    bg-slate-200
                    dark:bg-slate-400
                  `}
                >
                  {keyIcon} 
                </Link>
                :
                <button
                  className={`
                    h-8
                    px-2
                    text-xs
                    rounded-full
                    bg-slate-200
                    dark:bg-slate-400
                  `}
                  onClick={() => handleLogout()}
                >
                  {disconnectIcon}
                </button>
              }
              <Link
                to={userIsLogout(props.dataUser) ? '/user/register' : `/user/${props.dataUser._id}`}
                className={`
                  pl-2
                  pt-2
                  pr-2.5
                  text-xs
                  rounded-full
                  bg-slate-200
                  dark:bg-slate-400
                `}
              >
                {userIcon}
              </Link>
              {userIsLogged(props.dataUser) &&
                <Link
                  onClick={() => props.handleAuthorizedToAdd()}
                  to={`/user/${props.dataUser._id}/new`}
                  className={`
                    h-8
                    pt-2
                    px-2
                    text-xs
                    rounded-full
                    bg-slate-200
                    dark:bg-slate-400
                  `}
                >
                  {plusIcon}
                </Link>
              }
            </>
          }
          <button
            className={`
              h-8
              pl-2
              pr-3
              text-xs
              rounded-full
              bg-slate-200
              dark:bg-slate-400
            `}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {wheelIcon}
          </button>
          {/* {menu &&
            <Ul className='dark:text-white text-black'>
              <Li>
                <Lien
                  url={'/projects'}
                  target='_self'
                  className={`
                    hover:bg-slate-100
                    dark:bg-slate-1000
                    hover:dark:bg-black
                    dark:border-white
                    dark:border
                    hover:dark:border-pink-600
                    hover:dark:text-pink-600
                    rounded-full
                    focus:outline-none
                    p-4
                    shadow-xl
                  `}
                  // className={`
                    // block
                    // w-fit
                    // shadow-xl
                  // `}
                >
                  Projets
                </Lien>
              </Li>
              <Li className='text-gray-400'>
                Contact
              </Li>
              <Li className='text-gray-400'>
                À propos
              </Li>
            </Ul>
          } */}
        </nav>
      </main>
      <footer className='text-center dark:bg-slate-900 dark:text-white'>© 2022 serve.ac</footer>

      {/* <footer className="m-1 6 text-center">
        {footerLists.map((footerList, index) =>
          <FooterList footerList={footerList} key={index} />
        )}
      </footer> */}

    </div>
  );
}

export default Layout;
