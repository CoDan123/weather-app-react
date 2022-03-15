import react , { useState } from "react";
import DayWeatherCard from "./DayWeatherCard";



const WeekTempSection = (props) => {
    

    return(
        <div className="week-temp">

                        <div className="title-and-week-cards">
                            <div className="week-weather-header">Weather This Week</div>
                            <div className="forecast-container">
                                {props.weather.daily.map((value, index) => {
                                    if(index > 0){
                                        let weekDay = new Date(value.dt * 1000).toLocaleDateString("default", {weekday: "long"});

                                            return (
                                                <DayWeatherCard
                                                dayOfWeek={weekDay}
                                                weatherIcon={value.weather[0].main}
                                                temperature={value.temp.day}
                                                />
                                            )
                                            
                                    }
                                })}
                            </div>
                        </div>

                  </div>
    )
}

export default WeekTempSection;