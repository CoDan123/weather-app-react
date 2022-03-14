import react from "react";
import DayWeatherCard from "./DayWeatherCard";

const WeekTempSection = (props) => {
    return(
        <div className="week-temp">

                        <div className="title-and-week-cards">
                            <div className="week-weather-header">Weather This Week</div>
                            <div className="forecast-container">
                                {props.weather.daily.map((index) => (<DayWeatherCard
                                // weekDay={getDayOfWeek(index)}
                                key={''}
                                weatherIcon={index.weather[0].main}
                                temperature={index.temp.day}
                                />))}
                            </div>
                        </div>

                  </div>
    )
}

export default WeekTempSection;