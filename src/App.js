import React, { useState, useEffect } from "react";
import DateBuilder from "./HandlerFunctions/DateBuilder";
import TodayTempSection from "./Components/TodayTempSection";
import WeekTempSection from "./Components/WeekTempSection";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';

const api = {
  key: '894dd5823ad63f4e26577e6e24a332dd',
  base: 'https://api.openweathermap.org/data/2.5/onecall?'
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [geoCodeData, setGeoCodeData] = useState();
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  
      
  const getLatLon = async (evt) => {
      if(evt.key === "Enter"){
          setIsLoading(true);
          const response = await fetch(`/.netlify/functions/fetchWeather?search=${query}`);
          const coords = await response.json();
          setGeoCodeData(coords)
          getWeather(coords);
      }
  }
        
  const getWeather = async (coords) => {
    const response = await fetch(`${api.base}lat=${coords.data[0].latitude}&lon=${coords.data[0].longitude}&units=imperial&appid=${api.key}`);
    const data = await response.json();
    setWeather(data);
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
                        <div className="location">{geoCodeData.data[0].label}</div>
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
                      onKeyPress={getLatLon}
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
