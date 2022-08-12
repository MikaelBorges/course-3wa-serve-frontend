// import './App.css';
import Layout from './Layout';
import "./fonts/gilroy.css";
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import { useState, useEffect } from 'react';
import { lightIcon, darkIcon, systemIcon } from './icons/Icons';
import LoginPage from './LoginPage';
// import LogoutPage from './LogoutPage';

function App() {
  const [dataUser, setDataUser] = useState()
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState('light');

  /* function checkIfApplyTheme(hours) {
    if (hours > 7 && hours < 23) {
      document.body.classList.remove('dark');
      setDarkMode(false);
      console.warn('lightmode');
    }
    else {
      document.body.classList.add('dark');
      setDarkMode(true);
      console.warn('darkmode');
    }
  }

  function checkIfHourChanged() {
    const newHour = new Date().getHours();
    console.log('newHour', newHour);
    console.log('hours', hours);
    if (hours !== newHour) {
      hours = newHour;
      checkIfApplyTheme(hours);
    }
  }

  useEffect(() => {
    checkIfApplyTheme(hours);
    setInterval(checkIfHourChanged, 1000);
  }, []); */

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

    //console.log('dataUser', dataUser)
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
    //console.log('DATA', data)
    setDataUser(data)
    //console.log('DATA USER', dataUser)
  }

  return (
    <Layout
      theme={theme}
      darkMode={darkMode}
      toggleTheme={toggleTheme}
      dataUser={dataUser}
      updateUser={updateUser}
    >
      <Routes>
        <Route
          exact
          path='/'
          element={<HomePage updateUser={updateUser} darkMode={darkMode} />} />
        <Route
          exact
          path='/user/login'
          element={<LoginPage darkMode={darkMode} />} />
      </Routes>
    </Layout>
  );
}

export default App;
