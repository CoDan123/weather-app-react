import react , { useState } from "react";
import DayWeatherCard from "./DayWeatherCard";



const WeekTempSection = (props) => {
    

    return(
        <div className="week-temp">

                        <div className="title-and-week-cards">
                            <div className="week-weather-header">Over The Next <span id="seven-days">7</span><span id="five-days">5</span><span id="three-days">3</span> Days</div>
                            <div className="forecast-container">
                                {props.weather.data.daily.map((value, index) => {
                                    if(index > 0){
                                        let weekDay = new Date(value.dt * 1000).toLocaleDateString("default", {weekday: "long"});

                                            return (
                                                <DayWeatherCard
                                                key={index}
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