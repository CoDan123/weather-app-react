import React, { useState, useEffect } from "react";
import DateBuilder from "./HandlerFunctions/DateBuilder";
import TodayTempSection from "./Components/TodayTempSection";
import WeekTempSection from "./Components/WeekTempSection";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";



function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [geoCodeData, setGeoCodeData] = useState();
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
     
  const getLatLon = async () => {
          setIsLoading(true);
          const coords = await axios.get(`/.netlify/functions/fetchGeoCode?search=${query}`);
          setGeoCodeData(coords)
          getWeather(coords);
  }
        
  const getWeather = async (coords) => {
    const {latitude, longitude} = coords.data.data[0];
    const weatherData = await axios.get(`/.netlify/functions/fetchWeather?latitude=${latitude}&longitude=${longitude}`);
    
    setWeather(weatherData);
    setHasSearched(true);
    setIsLoading(false);
  }

  return (
    <div className='app'>
    
        <main> 

            <div className={hasSearched === true && isLoading === false ? "has-searched-container" : "search-container-home"}>

                {(hasSearched === false && isLoading === false) ? (<div className="home-logo"><FontAwesomeIcon className="weather-logo" icon={faCloudSun} />WeatherFinder</div>) : ('')}

                {(hasSearched === true && isLoading === false) ? (
                    <div className="location-date-box">
                        <div className="location">{geoCodeData.data.data[0].label}</div>
                        <div className="date">{DateBuilder(new Date())}</div>
                    </div>
                ) : ('')}
                
                {(isLoading === false) ? (
                  <div className={hasSearched === false ? 'search-box' : 'search-box-has-searched'}>
                  <input 
                      type="text" 
                      className='search-bar'
                      placeholder='Search...'
                      onChange={e => setQuery(e.target.value)}
                      value={query}
                      onKeyPress={(evt) =>{
                          if (evt.key === 'Enter'){
                              getLatLon();
                          }
                      }}
                  />
                  <button onClick={getLatLon} className="search-button">Search</button>
              </div>
              ) : ('')}

            </div>

            
            {(isLoading === true) ? (

            <div className="main-temp-container-loading">

                <div className="lds-ripple">
                    <div></div>
                  
                    <div></div>
                </div>

            </div>): ('')}


            {(hasSearched === true && isLoading === false) ? (

                <div className="main-temp-container">

                    <TodayTempSection
                    weather={weather}
                    />
                    <WeekTempSection
                    weather={weather}
                    />

                    </div>

            ) : ('')}
            
        </main>
    </div>
  );
}

export default App;
