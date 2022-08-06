import './App.css';
import {useState, useEffect} from "react"
import {loadAds} from './api/ads'

function App() {
  const [ads, setAds] = useState([])

  useEffect(()=>{
      loadAds()
      .then((res)=>{
          //console.log('res', res) 
          setAds(res)
      })
      .catch(err=>console.log(err))
  },[])

  return (
    <section className="annonces">
      <h2>Toutes les annonces</h2>
          {ads.length > 0 && <ul>
              {ads.map((ad)=>{
                  return (
                      <article key={ad._id}>
                          <h3>{ad.name}</h3>
                          <p>{ad.description}</p>
                          <p>{ad.price}</p>
                      </article>
                  )
              })}
          </ul>}
    </section>
  );
}

export default App;
