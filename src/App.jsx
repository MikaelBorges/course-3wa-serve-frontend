import './fonts/gilroy.css'
import Layout from './Layout'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import NewAdPage from './NewAdPage'
import ProfilPage from './ProfilPage'
import RegisterPage from './RegisterPage'
import { addToFavorites } from './api/user'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { userIsLogout, userIsLogged } from './functions/user'
import { lightIcon, darkIcon, systemIcon } from './constants/icons'

function App() {
  const [userId, setUserId] = useState(''),
        [theme, setTheme] = useState('light'),
        [dataUser, setDataUser] = useState({}),
        [urlNewAd, setUrlNewAd] = useState(''),
        [clickedAd, setClickedAd] = useState({}),
        [urlUserId, setUrlUserId] = useState(''),
        [darkMode, setDarkMode] = useState(false),
        [rightHand, setRightHand] = useState(true),
        [horizontalCard, setHorizontalCard] = useState(false),
        [layoutOneColumn, setLayoutOneColumn] = useState(false),
        [authorizedToAdd, setAuthorizedToAdd] = useState(false),
        [localStorageChecked, setLocalStorageChecked] = useState(false)

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
          if (data) {
            setUrlUserId(`/user/${data._id}`)
            setUrlNewAd(`/user/${data._id}/new`)
          }
        }

        function displayUser() {
          console.log('dataUser', dataUser)
        }

        function handleAuthorizedToAdd() {
          setAuthorizedToAdd(true)
        }

        function checkIfAddToFavorites(adId) {
          const ad = {
            adId: adId,
            userId: dataUser._id,
          }
          addToFavorites(ad)
          .then(res => {
            // console.log('res', res)

            if(res.status === 200) {
              // console.log('200')
              setClickedAd({adId: adId, newFavNumber: res.data.newFavNumber})
              console.log('setClickedAd setted')
              console.log('res.data.newFavNumber', res.data.newFavNumber)
              console.log('adId', adId)
              // loadAds()
              // .then(res => {
                // console.log('RES :', res)
                // setAds(res.ads)
                // setAreAdsArranged(false)
                // setFavs(true)
              // })
              // .catch(err => console.log(err))
            }

          })
          .catch(err => console.log(err))
        }

        function handleAddToFavorites(e, ad) {
          e.stopPropagation()
          // console.log('ad', ad)
          // console.log('dataUser._id', dataUser._id)

          if(dataUser._id !== ad.userId) {
            // console.log('fav éligible !')
            checkIfAddToFavorites(ad._id)
          }/* 
          else{
            console.log('fav not ok...')
          } */



          // if((props.dataUser._id !== undefined) && (props.dataUser._id !== props.ad.userId)) {
            // console.log('ajouter !')
            // props.checkIfAddToFavorites(props.ad._id)
            // console.log('props.dataUser._id', props.dataUser._id)
            // console.log('props.ad.userId', props.ad.userId)
            // if(props.dataUser._id !== props.ad.userId) {
              // const ad = {
                // adId: props.ad._id,
                // userId: props.dataUser._id,
              // }
              // addToFavorites(ad)
              // .then(res => {
                // console.log('res', res)
              // })
              // .catch(err => console.log(err))
            // }
          // } else {
            // console.log("déco ou c'est ma propre annonce")
          // }
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
    console.log('check si le local storage a des infos')
    if (userDataInLS) {
      setDataUser(JSON.parse(userDataInLS))
      setUserId(JSON.parse(userDataInLS)._id)
      setUrlUserId(`/user/${JSON.parse(userDataInLS)._id}`)
      setUrlNewAd(`/user/${JSON.parse(userDataInLS)._id}/new`)
      console.log('le local storage a alimenté le state dataUser')
    } else {
      console.log('pas de user data dans le local storage')
    }
    setLocalStorageChecked(true)
  }, []);

  useEffect(() => {
    if((window.location.pathname.indexOf('new') !== -1) && (window.location.pathname.indexOf(dataUser._id) !== -1)) setAuthorizedToAdd(true)
  }, [dataUser]);

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
      handleAuthorizedToAdd={handleAuthorizedToAdd}
    >
      <Routes>
        <Route
          exact
          path='/'
          element={
            <HomePage
              darkMode={darkMode}
              dataUser={dataUser}
              clickedAd={clickedAd}
              updateUser={updateUser}
              horizontalCard={horizontalCard}
              layoutOneColumn={layoutOneColumn}
              handleAddToFavorites={handleAddToFavorites}
            />
          }
        />
        <Route
          exact
          path='/user/login'
          element={localStorageChecked && userIsLogout(dataUser) ?
            <LoginPage
              darkMode={darkMode}
              dataUser={dataUser}
              updateUser={updateUser}
            />
            :
            <HomePage
              darkMode={darkMode}
              dataUser={dataUser}
              updateUser={updateUser}
              horizontalCard={horizontalCard}
              layoutOneColumn={layoutOneColumn}
              refreshUrl
            />
          }
        />
        <Route
          exact
          path='/user/register'
          element={localStorageChecked && userIsLogout(dataUser) ?
            <RegisterPage
              dataUser={dataUser}
              darkMode={darkMode}
            />
            :
            <HomePage
              darkMode={darkMode}
              dataUser={dataUser}
              updateUser={updateUser}
              horizontalCard={horizontalCard}
              layoutOneColumn={layoutOneColumn}
              refreshUrl
            />
          }
        />

        <Route
          exact
          path='/user/:userIdPage'
          element={localStorageChecked ?
            <ProfilPage
              darkMode={darkMode}
              dataUser={dataUser}
              toggleLayout={toggleLayout}
              horizontalCard={horizontalCard}
              layoutOneColumn={layoutOneColumn}
              toggleDirectionCard={toggleDirectionCard}
              handleAddToFavorites={handleAddToFavorites}
            />
            :
            <section className='min-h-screen flex justify-center items-center'>
              <img className='w-20' src='https://i.stack.imgur.com/y3Hm3.gif' />
            </section>
          }
        />
        <Route
          exact
          path='/user/:id/new'
          element={localStorageChecked && authorizedToAdd ?
            <NewAdPage
              darkMode={darkMode}
              dataUser={dataUser}
            />
            :
            <HomePage
              darkMode={darkMode}
              dataUser={dataUser}
              updateUser={updateUser}
              horizontalCard={horizontalCard}
              layoutOneColumn={layoutOneColumn}
              refreshUrl
            />
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
