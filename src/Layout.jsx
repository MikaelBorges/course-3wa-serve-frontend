import styleOf from './Layout.module.scss'
import { useState } from 'react'
import { Ul, Li } from './components/Ul'
import { Lien } from './components/Lien'
import { Link, useNavigate } from 'react-router-dom'
import { lightIcon, darkIcon, systemIcon, userIcon, keyIcon, disconnectIcon, plusIcon } from './icons/Icons'
import logo from './images/logos/gitlab_tile_logo_icon_170092.png'
import { logoutUser } from './api/user'
import { config } from './config'

function Layout(props) {
  const navigate = useNavigate(),
        [menu, setMenu] = useState(false),
        [error, setError] = useState(null),
        [isMenuOpen, setIsMenuOpen] = useState(false),
        [dbLocationIsOnline, setDbLocationIsOnline] = useState(false)

  function handleDbLocationIsOnline() {
    /* if(goOnline) {
      changeConfig('https://mikaelborges-serve.herokuapp.com')
      setDbLocationIsOnline(goOnline)
    }
    else {
      changeConfig('http://localhost:3306')
      setDbLocationIsOnline(!goOnline)
    }

    setDbLocationIsOnline(goOnline)
    console.log('NEW CONFIG :')
    console.log(config.api_url) */

    props.displayUser()
  }

  function initState () {
    if (config.api_url === 'http://localhost:3306') {
      return false
    }
    else {
      return true
    }
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  let themeButtonIcon;
  switch (props.theme) {
    case 'light':
      themeButtonIcon = lightIcon;
      break;
    case 'dark':
      themeButtonIcon = darkIcon;
      break;
    case 'system':
      themeButtonIcon = systemIcon;
      break;
    default:
      console.error("Problème dans props.theme et du coup dans le state theme de l'app");
  }

  function handleLogout() {
    window.localStorage.removeItem('user');
    /* console.log('handleLogout')
    props.dataUser === undefined ? '/user/login' : '/logout'
    navigate("/", { state: { user: undefined } });
    props.updateUser(undefined) */
    let data = {
      _id: props.dataUser._id
    };
    logoutUser(data)
    .then((res) => {
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

            props.updateUser(undefined)

            if(window.location.pathname !== '/') {
              navigate('/')
            }
        }
        else {
            console.log('res.msg')
            console.log(res.msg)
            setError(res.msg);
        }
    })
    .catch((err) => {
        console.log('erreur: rentre dans le catch du Layout')
        console.log(err)
        //setError(err);
    });
  }

  //if (props.dataUser) console.log('in layout',props.dataUser._id)

  return (
    <div className={`min-h-screen ${menu ? 'dark:bg-black bg-gray-100 py-40 px-5' : ''}`}>
      <header className='fixed p-6 w-full h-28 flex justify-between'>

        <Link
          to='/'
        >
          <img src={logo} alt="logo" className={styleOf.logo} />
        </Link>

        {config.api_url === 'http://localhost:3306' && (
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
        )}
      </header>


      <main className="min-h-screen dark:bg-slate-800">
        {props.children}
        <nav className='p-4 fixed bottom-0 w-full space-x-3 flex justify-end'>

            {isMenuOpen && (
              <>
                {props.dataUser === undefined ?
                  <Link
                    to='user/login'
                    className={`
                      ${menu ? 'dark:border-white hover:bg-slate-200' : 'dark:border-black'}
                      dark:border
                      hover:dark:border-pink-600
                      dark:bg-black
                      bg-white
                      px-4
                      py-3
                      text-2xl
                      rounded-full
                      shadow-xl
                      hover:bg-gray-100
                    `}
                  >
                    {keyIcon} 
                  </Link>
                  :
                  <button
                    className={`
                      ${menu ? 'dark:border-white hover:bg-slate-200' : 'dark:border-black'}
                      dark:border
                      hover:dark:border-pink-600
                      dark:bg-black
                      bg-white
                      px-4
                      py-3
                      text-2xl
                      rounded-full
                      shadow-xl
                      hover:bg-gray-100
                    `}
                    onClick={handleLogout}
                  >
                    {disconnectIcon}
                  </button>
                }

                <Link
                  to={props.dataUser === undefined ? '/user/register' : `/user/${props.dataUser._id}`}
                  className={`
                    ${menu ? 'dark:border-white hover:bg-slate-200' : 'dark:border-black'}
                    dark:border
                    hover:dark:border-pink-600
                    dark:bg-black
                    bg-white
                    px-4
                    py-3
                    text-2xl
                    rounded-full
                    shadow-xl
                    hover:bg-gray-100
                  `}
                >
                  {userIcon}
                </Link>

                {props.dataUser && (
                  <Link
                    to={`user/${props.dataUser._id}/new`}
                    className={`
                      dark:bg-black
                      bg-white
                      px-4
                      py-3
                      text-2xl
                      rounded-full
                      shadow-xl
                    `}
                  >
                    {plusIcon} 
                  </Link>
                )}
              </>
            )}

            <button
              className={`
                py-4
                px-2
                rounded-full
                bg-white
                text-black
                border
                border-transparent
                dark:bg-black
                dark:text-white
                dark:border-white
                shadow-xl
              `}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              menu
            </button>

          {menu && (
            <Ul className='dark:text-white text-black'>
              <Li>
                <Lien
                  url={'/projects'}
                  target='_self'
                  className={`
                    hover:bg-slate-200
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
                  /* className={`
                    block
                    w-fit
                    shadow-xl
                  `} */
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
          )}
        </nav>
      </main>

      {/* <footer className="m-16 text-center">
        {footerLists.map((footerList, index) =>
          <FooterList footerList={footerList} key={index} />
        )}
      </footer> */}

    </div>
  );
}

export default Layout;
