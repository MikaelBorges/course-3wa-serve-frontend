import './App.css';
import {useState, useEffect} from "react"
import {loadAds} from './api/ads'

function App() {
  const [ads, setAds] = useState([])
  const [isLogged, setIsLogged] = useState([false])
  const [isAdmin, setIsAdmin] = useState([false])

  useEffect(()=>{
      loadAds()
      .then((res)=>{
          //console.log('res', res) 
          setAds(res)
      })
      .catch(err=>console.log(err))
  },[])

  return (
    <>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          {!isLogged && 
            <>
              <li><a href="/user/register">S'inscrire</a></li>
              <li><a href="/user/login">Connexion</a></li>
            </>
          }

          {isLogged && 
            <>
              <li><a href="/profil">Profil</a></li>
              <li><a href="/user/logout">Logout</a></li>
              {isLogged && isAdmin &&
                  <li><a href="/admin">Administration</a></li>
              }
            </>
          }
        </ul>
      </nav>
      <section className="annonces">
        <h2>Toutes les annonces</h2>
        {ads.length > 0 &&
          <ul>
            {ads.map((ad)=>{
              return (
                <li key={ad._id}>
                  <h3>{ad.name}</h3>
                  <p>{ad.description}</p>
                  <p>{ad.price}</p>
                </li>
              )
            })}
          </ul>
        }
      </section>
    </>
  );
}

export default App;
