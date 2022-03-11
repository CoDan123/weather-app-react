import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faO } from '@fortawesome/free-solid-svg-icons'

const api = {
  key: '646219b45cc66fd0bd8bbf3855272664',
  base: 'https://api.openweathermap.org/data/2.5/'
}



function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [units, setUnits] = useState('imperial');

  const search = (evt) => {
      if(evt.key === "Enter"){
        fetch(`${api.base}weather?q=${query}&units=${units}&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result)
          });
      }
  }

  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className='app'>
      <main> 

          <div className="search-container">

              {(typeof weather.main != "undefined") ? (
                  <div className="location-date-box">
                      <div className="location">{weather.name}, {weather.sys.country}</div>
                      <div className="date">{dateBuilder(new Date())}</div>
                  </div>
              ) : ('')}
              
              <div className='search-box'>
                  <input 
                    type="text" 
                    className='search-bar'
                    placeholder='Search...'
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                    onKeyPress={search}
                  />
              </div>

          </div>
        
          {(typeof weather.main != "undefined") ? (

              <div className="main-temp-container">

                  <div className="today-temp">

                      <div className="today-temp-left-box">
                          <div className="temp-icon-container">
                              <img src={`./images/${weather.weather[0].main}.svg`} alt='Weather Icon'></img>
                          </div>
            
                          <div className="weather-box">
                            <div className="temp">{Math.round(weather.main.temp)}<FontAwesomeIcon className="degree-icon" icon={faO} /></div>
                            <div className="weather">{weather.weather[0].description}</div>
                          </div>
                      </div>

                      <div className="today-temp-right-box">
                        <div className="weather-data-top">

                        </div>
                        <div className="weather-data-bottom">
                        </div>
                      </div>

                  </div>

                  <div className="week-temp">
                  </div>

              </div>

          ) : ('')}
          
      </main>
    </div>
  );
}

export default App;
