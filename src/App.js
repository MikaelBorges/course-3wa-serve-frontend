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
    <section className="App">
      <header className="App-header">
      {ads.length > 0 && <ul>
                {ads.map((ad)=>{
                    return (
                        <li key={ad._id}>
                            {ad.name}
                        </li>
                    )
                })}
            </ul>}
      </header>
    </section>
  );
}

export default App;
