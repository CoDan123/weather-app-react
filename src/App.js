import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faO } from '@fortawesome/free-solid-svg-icons'

const api = {
  key: '894dd5823ad63f4e26577e6e24a332dd',
  base: 'https://api.openweathermap.org/data/2.5/onecall?',
  geocode: 'http://api.openweathermap.org/geo/1.0/direct?'
}



function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [units, setUnits] = useState('imperial');

  

  const getLatLon = async (evt) => {
      if(evt.key === "Enter"){
        const response = await fetch(`${api.geocode}q=${query}&APPID=${api.key}`);
        const coords = await response.json();
        getWeather(coords);
    }    
  }

  const getWeather = async (coords) => {
    const response = await fetch(`${api.base}lat=${coords[0].lat}&lon=${coords[0].lon}&units=${units}&appid=${api.key}`);
    const data = await response.json();
    setWeather(data);
  }

  console.log(weather);

  
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

              {/* {(typeof weather.main != "undefined") ? (
                  <div className="location-date-box">
                      <div className="location">{weather.name}, {weather.sys.country}</div>
                      <div className="date">{dateBuilder(new Date())}</div>
                  </div>
              ) : ('')} */}
              
              <div className='search-box'>
                  <input 
                    type="text" 
                    className='search-bar'
                    placeholder='Search...'
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                    onKeyPress={getLatLon}
                  />
              </div>

          </div>
        
          {/* {(typeof weather.main != "undefined") ? (

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
                              <div className="weather-data-box">
                                  <div className="display-box-top">top</div>
                                  <div className="display-box-bottom">bottom</div>
                              </div>
                              <div className="weather-data-box">
                                  <div className="display-box-top">top</div>
                                  <div className="display-box-bottom">bottom</div>
                              </div>
                              <div className="weather-data-box">
                                  <div className="display-box-top">top</div>
                                  <div className="display-box-bottom">bottom</div>
                              </div>
                          </div>

                          <div className="weather-data-bottom">
                              <div className="weather-data-box">
                                  <div className="display-box-top">top</div>
                                  <div className="display-box-bottom">bottom</div>
                              </div>
                              <div className="weather-data-box">
                                  <div className="display-box-top">top</div>
                                  <div className="display-box-bottom">bottom</div>
                              </div>
                              <div className="weather-data-box">
                                  <div className="display-box-top">top</div>
                                  <div className="display-box-bottom">bottom</div>
                              </div>
                          </div>
                          
                      </div>

                  </div>

                  <div className="week-temp">

                        <div className="todays-weather-header">Today's Weather</div>
                        <div className="forecast-container">

                        </div>

                  </div>

              </div>

          ) : ('')} */}
          
      </main>
    </div>
  );
}

export default App;
