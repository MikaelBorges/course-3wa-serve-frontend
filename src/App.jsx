import './fonts/gilroy.css'
import Layout from './Layout'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import NewAdPage from './NewAdPage'
import ProfilPage from './ProfilPage'
import RegisterPage from './RegisterPage'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { lightIcon, darkIcon, systemIcon, leftHandIcon, rightHandIcon } from './icons/Icons'

function App() {
  const [userId, setUserId] = useState(''),
        [dataUser, setDataUser] = useState(),
        [theme, setTheme] = useState('light'),
        [urlNewAd, setUrlNewAd] = useState(''),
        [urlUserId, setUrlUserId] = useState(''),
        [darkMode, setDarkMode] = useState(false),
        [rightHand, setRightHand] = useState(true),
        [horizontalCard, setHorizontalCard] = useState(false),
        [layoutOneColumn, setLayoutOneColumn] = useState(false)

        function toggleDirectionCard(horizontalDirection) {
          window.localStorage.setItem('horizontalCard', !horizontalCard)
          switch(horizontalDirection) {
            case 'toggle':
              setHorizontalCard(!horizontalCard)
              break
            case true:
              setHorizontalCard(true)
              break
            case false:
              setHorizontalCard(false)
              break
            default:
              console.error('Problème dans la sélection du style des annonces');
          }
        }

        function toggleLayout(layoutSelected) {
          switch(layoutSelected) {
            case 'toggle':
              setLayoutOneColumn(!layoutOneColumn)
              window.localStorage.setItem('layoutOneColumn', !layoutOneColumn)
              break
            case true:
              setLayoutOneColumn(true)
              break
            case false:
              setLayoutOneColumn(false)
              break
            default:
              console.error("Problème dans la sélection du layout de l'app");
          }
        }

        function toggleHand() {
          setRightHand(!rightHand)
        }

        function toggleTheme(themeSelected) {
          switch(themeSelected) {
            case lightIcon:
              setTheme('light');
              localStorage.theme = 'light';
              setDarkMode(false);
              document.documentElement.classList.remove('dark');
              break;
            case darkIcon:
              setTheme('dark');
              localStorage.theme = 'dark';
              setDarkMode(true);
              document.documentElement.classList.add('dark');
              break;
            case systemIcon:
              setTheme('system');
              localStorage.removeItem('theme');
              if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setDarkMode(true);
                document.documentElement.classList.add('dark');
              }
              else {
                setDarkMode(false);
                document.documentElement.classList.remove('dark');
              }
              break;
            default:
              console.error('Problème dans la sélection du thème');
          }
        }

        function updateUser(data) {
          setDataUser(data)
          //console.log('DATA', data)
          if (data) {
            setUrlUserId(`/user/${data._id}`)
            setUrlNewAd(`/user/${data._id}/new`)
          }
        }

        function displayUser() {
          console.log('dataUser', dataUser)
        }

  useEffect(() => {
    const horizontalCardInLS = window.localStorage.getItem('horizontalCard'),
          layoutOneColumnInLS = window.localStorage.getItem('layoutOneColumn')

    if(layoutOneColumnInLS === 'true') setLayoutOneColumn(true)
    if(horizontalCardInLS === 'true') setHorizontalCard(true)

    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if(localStorage.theme) {
      if(localStorage.theme === 'light') {
        setTheme('light')
        document.documentElement.classList.remove('dark')
        setDarkMode(false)
      }
      if(localStorage.theme === 'dark') {
        setTheme('dark')
        document.documentElement.classList.add('dark')
        setDarkMode(true)
      }
    }
    else {
      setTheme('system')
      if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
        setDarkMode(true)
      }
      else {
        document.documentElement.classList.remove('dark')
        setDarkMode(false)
      }
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    mql.onchange = e => {
      if (!localStorage.theme) {
        setTheme('system')
        if (e.matches) {
          document.documentElement.classList.add('dark')
          setDarkMode(true)
        }
        else {
          document.documentElement.classList.remove('dark')
          setDarkMode(false)
        }
      }
    }

    const userDataInLS = window.localStorage.getItem('user')
    if (userDataInLS) {
      setDataUser(JSON.parse(userDataInLS))
      setUserId(JSON.parse(userDataInLS)._id)
      setUrlUserId(`/user/${JSON.parse(userDataInLS)._id}`)
      setUrlNewAd(`/user/${JSON.parse(userDataInLS)._id}/new`)
    }
  }, []);

  return (
    <Layout
      theme={theme}
      darkMode={darkMode}
      dataUser={dataUser}
      rightHand={rightHand}
      toggleHand={toggleHand}
      updateUser={updateUser}
      displayUser={displayUser}
      toggleTheme={toggleTheme}
      toggleLayout={toggleLayout}
      horizontalCard={horizontalCard}
      layoutOneColumn={layoutOneColumn}
      toggleDirectionCard={toggleDirectionCard}
    >
      <Routes>
        <Route
          exact
          path='/'
          element={
            <HomePage
              darkMode={darkMode}
              updateUser={updateUser}
              horizontalCard={horizontalCard}
              layoutOneColumn={layoutOneColumn}
            />
          }
        />
        <Route
          exact
          path='/user/login'
          element={<LoginPage darkMode={darkMode} updateUser={updateUser} />}
        />
        <Route
          exact
          path='/user/register'
          element={<RegisterPage darkMode={darkMode} />}
        />
        <Route
          exact
          path={urlUserId}
          element={
            <ProfilPage
              darkMode={darkMode}
              dataUser={dataUser}
              toggleLayout={toggleLayout}
              horizontalCard={horizontalCard}
              layoutOneColumn={layoutOneColumn}
              toggleDirectionCard={toggleDirectionCard}
            />
          }
        />
        <Route
          exact
          path={urlNewAd}
          element={<NewAdPage darkMode={darkMode} dataUser={dataUser} />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
