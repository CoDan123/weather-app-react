import react from 'react';

const DayWeatherCard = (props) => {
    return (
        <div className='day-weather-card'>
            Weekday
            <img src={`./images/${props.weatherIcon}.svg`} alt="" />
            {props.temperature}
        </div>
    )
}

export default DayWeatherCard;