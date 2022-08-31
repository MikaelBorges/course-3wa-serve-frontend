import Layout from './Layout'
import "./fonts/gilroy.css"
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import { useState, useEffect } from 'react'
import { lightIcon, darkIcon, systemIcon, leftHandIcon, rightHandIcon } from './icons/Icons'
import LoginPage from './LoginPage'
import NewAdPage from './NewAdPage'
import RegisterPage from './RegisterPage'
import ProfilPage from './ProfilPage'

function App() {
  const [userId, setUserId] = useState(''),
        [dataUser, setDataUser] = useState(),
        [theme, setTheme] = useState('light'),
        [urlNewAd, setUrlNewAd] = useState(''),
        [urlUserId, setUrlUserId] = useState(''),
        [darkMode, setDarkMode] = useState(false),
        [rightHand, setRightHand] = useState(true)

        function toggleHand(handSelected) {
          switch (handSelected) {
            case leftHandIcon:
              setRightHand(false)
              localStorage.hand = 'left'
              break
            case rightHandIcon:
              setRightHand(true)
              localStorage.hand = 'right'
              break;
            default:
              console.error('Problème dans la sélection de la main');
          }
        }
      
        function toggleTheme(themeSelected) {
          switch (themeSelected) {
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
    if (window.localStorage.getItem('user')) {
      setDataUser(JSON.parse(userDataInLS))
      setUrlUserId(`/user/${JSON.parse(userDataInLS)._id}`)
      setUserId(JSON.parse(userDataInLS)._id)
    }
  }, []);

  return (
    <Layout
      theme={theme}
      darkMode={darkMode}
      toggleTheme={toggleTheme}
      dataUser={dataUser}
      updateUser={updateUser}
      displayUser={displayUser}
      rightHand={rightHand}
    >
      <Routes>
        <Route
          exact
          path='/'
          element={<HomePage toggleHand={toggleHand} toggleTheme={toggleTheme} darkMode={darkMode} updateUser={updateUser} />}
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
          element={<ProfilPage darkMode={darkMode} dataUser={dataUser} />}
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
