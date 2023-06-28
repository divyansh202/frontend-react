import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  //const url = `http://api.weatherapi.com/v1/current.json?key=28432a34394a4f24aea202609232006&q=${location}`
  const url = `https://spring-wnsx7ioura-uc.a.run.app/temp?city=${location}`
  
  const searchLocation = (event) => {
    
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        //
        console.log(response.data)
      })
      setLocation('')
    }
  }


  return (
    <div className="app">
      <div className="search">
        <h2>Weather App</h2> <br/>
        <b>Input a location</b> <> </>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.location ? data.location.name : data.name}</p>{data.location ? data.location.region : data.name} <b>{data.location ? data.location.country : data.name}</b>
          </div>
          
          <div className="temp">
            {data.current ? <h1>{data.current.temp_f}°F</h1> : null}
          </div>
          
           <div >
              <img 
                src={data.location ? data.current.condition.icon : data.name}
                
              />
            </div>
          <div className="description">
            {data.current ? <p>{data.current.condition.text}</p> : null}
          </div>
          
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
            <div>
              <button id="downloadImage">Download Image</button>
            </div>
            
          </div>
        }



      </div>
    </div>
  );
}

export default App;
