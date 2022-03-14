import React, { useState, useEffect, useRef } from "react";
import ConvertUnix from "./HandlerFunctions/ConvertUnix";
import DateBuilder from "./HandlerFunctions/DateBuilder";
import GetDayOfWeek from "./HandlerFunctions/GetDayOfWeek";
import TodayTempSection from "./Components/TodayTempSection";
import WeekTempSection from "./Components/WeekTempSection";

const api = {
  key: '894dd5823ad63f4e26577e6e24a332dd',
  base: 'https://api.openweathermap.org/data/2.5/onecall?',
  geocode: 'http://api.openweathermap.org/geo/1.0/direct?'
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [units, setUnits] = useState('imperial');
  const [geoCodeData, setGeoCodeData] = useState();
  const [hasSearched, setHasSearched] = useState(false);
  const [dayOfWeek, setDayOfWeek] = useState('');
  
  const getLatLon = async (evt) => {
      if(evt.key === "Enter"){
        const response = await fetch(`${api.geocode}q=${query}&APPID=${api.key}`);
        const coords = await response.json();
        setGeoCodeData(coords);
        getWeather(coords);
    }    
  }

  const getWeather = async (coords) => {
    const response = await fetch(`${api.base}lat=${coords[0].lat}&lon=${coords[0].lon}&units=${units}&appid=${api.key}`);
    const data = await response.json();
    setWeather(data);
    setHasSearched(true);
  }

  return (
    <div className='app'>
        <main> 

            <div className="search-container">

                {(hasSearched === true) ? (
                    <div className="location-date-box">
                        <div className="location">{geoCodeData[0].name}, {geoCodeData[0].country}</div>
                        <div className="date">{DateBuilder(new Date())}</div>
                    </div>
                ) : ('')}
                
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
            
            {(hasSearched === true) ? (

                <div className="main-temp-container">

                    <TodayTempSection
                    weather={weather}
                    />
                    <WeekTempSection
                    weather={weather}
                    dayOfWeek
                    />

                    </div>

            ) : ('')}
            
        </main>
    </div>
  );
}

export default App;
