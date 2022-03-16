import React, { useState, useEffect, useRef } from "react";
import DateBuilder from "./HandlerFunctions/DateBuilder";
import TodayTempSection from "./Components/TodayTempSection";
import WeekTempSection from "./Components/WeekTempSection";

const api = {
  key: '894dd5823ad63f4e26577e6e24a332dd',
  geoKey: '0196f96a9f24ea0adf56618d34aff66d',
  base: 'https://api.openweathermap.org/data/2.5/onecall?',
  geocode: 'http://api.positionstack.com/v1/forward?'
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [units, setUnits] = useState('imperial');
  const [geoCodeData, setGeoCodeData] = useState();
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const getLatLon = async (evt) => {
      if(evt.key === "Enter"){
        setIsLoading(true);
        const response = await fetch(`${api.geocode}access_key=${api.geoKey}&query=${query}`);
        const coords = await response.json();
        console.log(coords)
        setGeoCodeData(coords);
        getWeather(coords);
    }    
  }

  const getWeather = async (coords) => {
    const response = await fetch(`${api.base}lat=${coords.data[0].latitude}&lon=${coords.data[0].longitude}&units=${units}&appid=${api.key}`);
    const data = await response.json();
    console.log(data)
    setWeather(data);
    setHasSearched(true);
    setIsLoading(false);
  }

  return (
    <div className='app'>
        <main> 

            <div className={hasSearched === true && isLoading === false ? "has-searched-container" : "search-container-home"}>

                {(hasSearched === true && isLoading === false) ? (
                    <div className="location-date-box">
                        <div className="location">{geoCodeData.data[0].label}</div>
                        <div className="date">{DateBuilder(new Date())}</div>
                    </div>
                ) : ('')}
                
                {(hasSearched === false && isLoading === false) ? (<div className="home-logo">LOGO</div>) : ('')}

                {(isLoading === false) ? (
                  <div className={hasSearched === false ? 'search-box-has-searched' : 'search-box'}>
                  <input 
                      type="text" 
                      className='search-bar'
                      placeholder='Search...'
                      onChange={e => setQuery(e.target.value)}
                      value={query}
                      onKeyPress={getLatLon}
                  />
              </div>
              ) : ('')}

            </div>

            
            {(isLoading === true) ? (

            <div className="main-temp-container-loading">

                <div class="lds-ripple">
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
