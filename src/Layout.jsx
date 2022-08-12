import styles from './Layout.module.scss';
// import FooterList from './FooterList';
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Ul, Li } from './components/Ul';
import { Lien } from './components/Lien';
//import { Notification } from './components/Notification';
import { Link } from 'react-router-dom';
import { lightIcon, darkIcon, systemIcon, userIcon, keyIcon, disconnectIcon } from './icons/Icons';

// import { logo } from './images/logos/Logos';
import logo from './images/logos/1566920703749.webp';

import { useNavigate } from "react-router-dom";

/* const footerLists = [
  {
    name: 'Mikaël Borges',
    name: 'À propos',
    name: 'Contact',
    name: 'Mentions légales',
  },
  {
    name: 'Projets',
    name: 'Monoprix Online',
    name: 'Sarenza',
    name: 'Le Service Civique',
  },
  {
    name: 'Coordonnées',
    name: '06 07 08 09 10',
    name: 'mail@mail.com',
  },
  {
    name: 'Connect',
    name: 'Facebook',
    name: 'Twitter',
    name: 'Instagram',
    name: 'Snapchat',
    name: 'GitHub',
    name: 'LinkedIn',
  },
]; */

function Layout(props) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

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

  function handleMenu() {
    setMenu(!menu);
  }

  function handleLogout() {
    //console.log('handleLogout')
    // props.dataUser === undefined ? '/user/login' : '/logout'
    // navigate("/", { state: { user: undefined } });
    props.updateUser(undefined)
  }

  //console.log('props.dataUser', props.dataUser)

  return (
    <div className={`min-h-screen ${menu ? 'dark:bg-black bg-gray-100 py-40 px-5' : ''}`}>
      <header>
        <nav className={`${menu ? 'dark:bg-black bg-gray-100' : ''} fixed left-0 right-0 top-0 z-10 p-6 space-y-6`}>
          <div className='flex justify-between items-center'>
            <a title='accueil' href="/" id='home' className="w-12 mr-4">
              {/* <span className='dark:text-white'>logo</span> */}
              <img src={logo} alt="logo" />
            </a>

            <div className='space-x-4 flex justify-center'>
              <Menu as="div" className="text-2xl relative inline-block">
                {({ open }) => (
                  <>
                    <Menu.Button
                      title='thèmes'
                      className={`
                        ${open ? `
                          dark:border-yellow-100
                          hover:dark:border-yellow-100
                          bg-gray-100
                          dark:text-yellow-100
                          hover:dark:text-yellow-100
                          ` : ``}
                        ${menu ? `
                          dark:border-white
                          hover:dark:border-pink-600
                          hover:bg-slate-200
                          ` : ``}
                        ${open && menu ? `bg-slate-200` : ``}
                        ${!open && !menu ? `dark:border-black` : ``}
                        hover:dark:border-pink-600
                        dark:bg-black
                        bg-white
                        dark:border
                        inline-flex
                        items-center
                        justify-center
                        w-full
                        rounded-full
                        shadow-xl
                        px-4
                        py-3
                        font-medium
                        text-gray-700
                        hover:dark:text-pink-600
                        dark:text-white
                        focus:outline-none
                        hover:bg-gray-100
                      `}
                    >
                      {themeButtonIcon}
                      <ChevronDownIcon className={`${open ? '' : 'rotate-270'} ml-2 h-5`} aria-hidden="true" />
                    </Menu.Button>

                    {open && (
                      <Transition
                        as={Fragment}
                        /* enter="transition ease-out duration-100" */
                        enter="transition ease-out duration-500"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        /* leave="transition ease-in duration-75" */
                        leave="transition ease-in duration-575"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          as="ul"
                          className={`
                            ${menu ? `dark:border-yellow-100` : `dark:border-black`}
                            border
                            border-white
                            origin-top-right
                            absolute
                            right-0
                            mt-2
                            rounded-full
                            shadow-lg
                            dark:bg-black
                            bg-white
                            focus:outline-none
                          `}
                        >
                          <Menu.Item as="li">
                            {({ active }) => (
                              <button
                                onClick={(e) => props.toggleTheme(e.target.innerText)}
                                className={classNames(
                                  active ? 'bg-gray-100 dark:bg-pink-700' : '',
                                  'block px-4 py-3 rounded-full'
                                )}
                              >
                                {lightIcon}
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item as="li">
                            {({ active }) => (
                              <button
                                onClick={(e) => props.toggleTheme(e.target.innerText)}
                                className={classNames(
                                  active ? 'bg-gray-100 dark:bg-pink-700' : '',
                                  'block px-4 py-3 rounded-full'
                                )}
                              >
                                {darkIcon}
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item as="li">
                            {({ active }) => (
                              <button
                                onClick={(e) => props.toggleTheme(e.target.innerText)}
                                className={classNames(
                                  active ? 'bg-gray-100 dark:bg-pink-700' : '',
                                  'block px-4 py-3 rounded-full'
                                )}
                              >
                                {systemIcon}
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    )}
                  </>
                )}
              </Menu>
              <Link
                to='/user/register'
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

                {/* <Link
                to='/user/login'
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
                <Notification
                  className={`
                    relative
                    after:content-['1']
                    after:text-white
                    after:bg-blue-500
                    after:text-xs
                    after:rounded-full
                    after:absolute
                    after:top-0
                    after:left-3
                    after:px-1
                    after:min-w-10
                  `}
                >
                </Notification>
              </Link> */}
              {/* <Lien
                url={'/projects'}
                target='_self'
                title='projets'
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
                <Notification
                  className={`
                    relative
                    after:content-['1']
                    after:text-white
                    after:bg-blue-500
                    after:text-xs
                    after:rounded-full
                    after:absolute
                    after:top-0
                    after:left-3
                    after:px-1
                    after:min-w-10
                  `}
                >
                  {projectsIcon}
                </Notification>
              </Lien> */}
              {/* <button
                className={`
                  ${menu ? `
                    dark:border
                    dark:border-yellow-100
                    dark:text-yellow-100
                    hover:bg-slate-200
                    ` : `
                    hover:dark:text-pink-600
                    border
                    dark:border-black
                    hover:dark:border-pink-600
                    hover:bg-gray-100
                    `}
                  p-2
                  rounded-full
                  bg-white
                  text-black
                  dark:bg-black
                  dark:text-white
                  shadow-xl
                `}
                onClick={handleMenu}
              >
                menu
              </button> */}
            </div>
          </div>

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
      </header>
      {/* <header className="bg-slate-200 dark:bg-slate-800 h-screen flex flex-col justify-end px-8 pb-8"> */}

        {/* <canvas id="projector" width="646" height="800"></canvas> */}

        {/* <div className={`absolute inset-0 bg-bottom bg-no-repeat ${styles.indexBeams}`}>
          <div className={`absolute inset-0 ${props.darkMode ? styles.bgGridSlate400 : styles.bgGridSlate900} bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5`}></div>
        </div> */}
        {/* <div className="relative max-w-5xl text-left">
          <h1 className="text-slate-700 font-extrabold text-4xl sm:text-5xl lg:text-6xl dark:text-white">Mikaël Borges</h1>
          <p className={`${styles.description} uppercase mt-6 text-base text-slate-500 max-w-3xl dark:text-pink-600`}>
            ui & ux designer - front-end developer. Lille
          </p>
        </div>
      </header> */}

      <main className="min-h-screen dark:bg-slate-800">
        {props.children}
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
