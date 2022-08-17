// import './App.css';
import Layout from './Layout';
import "./fonts/gilroy.css";
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import { useState, useEffect } from 'react';
import { lightIcon, darkIcon, systemIcon } from './icons/Icons';
import LoginPage from './LoginPage';
import { checkIfDataUserIsAccessible } from './api/user'
import RegisterPage from './RegisterPage'
import ProfilPage from './ProfilPage';

function App() {
  const [dataUser, setDataUser] = useState()
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if(localStorage.theme) {
      if(localStorage.theme === 'light') {
        setTheme('light');
        document.documentElement.classList.remove('dark');
        setDarkMode(false);
      }
      if(localStorage.theme === 'dark') {
        setTheme('dark');
        document.documentElement.classList.add('dark');
        setDarkMode(true);
      }
    }
    else {
      setTheme('system');
      if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        setDarkMode(true);
      }
      else {
        document.documentElement.classList.remove('dark');
        setDarkMode(false);
      }
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.onchange = (e) => {
      if (!localStorage.theme) {
        setTheme('system');
        if (e.matches) {
          document.documentElement.classList.add('dark');
          setDarkMode(true);
        }
        else {
          document.documentElement.classList.remove('dark');
          setDarkMode(false);
        }
      }
    }

    const userDataRetrieved = checkIfDataUserIsAccessible()
    if (userDataRetrieved) {
      setDataUser(userDataRetrieved)
    }
  }, []);

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
    /* console.log('DATA', data)
    console.log('DATA USER (APP PAGE)', dataUser) */
  }

  function displayUser() {
    console.log('dataUser', dataUser)
  }

  return (
    <Layout
      theme={theme}
      darkMode={darkMode}
      toggleTheme={toggleTheme}
      dataUser={dataUser}
      updateUser={updateUser}
      displayUser={displayUser}
    >
      <Routes>
        <Route
          exact
          path='/'
          element={<HomePage darkMode={darkMode} updateUser={updateUser} />}
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
          path='/user/profil'
          element={<ProfilPage darkMode={darkMode} dataUser={dataUser} />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
