import React, { useState, useEffect, useRef } from "react";
import ConvertUnix from "./HandlerFunctions/ConvertUnix";
import DateBuilder from "./HandlerFunctions/DateBuilder";
import GetDayOfWeek from "./HandlerFunctions/GetDayOfWeek";
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
  const [dayOfWeek, setDayOfWeek] = useState('');
  
  const getLatLon = async (evt) => {
      if(evt.key === "Enter"){
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
  }



  return (
    <div className='app'>
        <main> 

            <div className="search-container">

                {(hasSearched === true) ? (
                    <div className="location-date-box">
                        <div className="location">{geoCodeData.data[0].name}, {geoCodeData.data[0].country}</div>
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
