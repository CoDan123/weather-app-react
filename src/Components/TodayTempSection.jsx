import react from "react";
import ConvertUnix from "../HandlerFunctions/ConvertUnix";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faO } from '@fortawesome/free-solid-svg-icons';

const capitalize = (word) => {
    return word.charAt(0).toUpperCase() +
    word.slice(1);
  }

const findWeatherIcon = (ico) => {
 const iconTypes = ['Clear', 'Clouds','Drizzle','Rain','Snow','Thunderstorm'];
   return iconTypes.includes(ico) ? ico : 'Clouds';
}

const TodayTempSection = (props) => {
    return (
        <div className="today-temp">

                      <div className="today-temp-left-box">
                          <div className="temp-icon-container">
                              <img src={`./images/${findWeatherIcon(props.weather.data.current.weather[0].main)}.svg`} alt='Weather Icon'></img>
                          </div>
            
                          <div className="weather-box">
                            <div className="temp">{Math.round(props.weather.data.current.temp)}<FontAwesomeIcon className="degree-icon" icon={faO}/></div>
                            <div className="weather">{capitalize(props.weather.data.current.weather[0].description)}</div>
                          </div>
                      </div>

                      <div className="today-temp-right-box">

                          <div className="weather-data-top">
                              <div className="weather-data-box">
                                  <div className="display-box-top">{Math.round(props.weather.data.daily[0].temp.max)}<FontAwesomeIcon className="degree-icon-small" icon={faO}/></div>
                                  <div className="display-box-bottom">High</div>
                              </div>
                              <div className="weather-data-box">
                                  <div className="display-box-top">{Math.round(props.weather.data.current.wind_speed)}<span>mph</span></div>
                                  <div className="display-box-bottom">Wind</div>
                              </div>
                              <div className="weather-data-box">
                                  <div className="display-box-top">{ConvertUnix(props.weather.data.current.sunrise)}</div>
                                  <div className="display-box-bottom">Sunrise</div>
                              </div>
                          </div>

                          <div className="weather-data-bottom">
                              <div className="weather-data-box">
                                  <div className="display-box-top">{Math.round(props.weather.data.daily[0].temp.min)}<FontAwesomeIcon className="degree-icon-small" icon={faO} /></div>
                                  <div className="display-box-bottom">Low</div>
                              </div>
                              <div className="weather-data-box">
                                  <div className="display-box-top">{props.weather.data.current.humidity}%</div>
                                  <div className="display-box-bottom">Humidity</div>
                              </div>
                              <div className="weather-data-box">
                                  <div className="display-box-top">{ConvertUnix(props.weather.data.current.sunset)}</div>
                                  <div className="display-box-bottom">Sunset</div>
                              </div>
                          </div>
                          
                      </div>

                  </div>
    )
}

export default TodayTempSection;