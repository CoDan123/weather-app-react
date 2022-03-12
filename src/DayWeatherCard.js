import react from 'react';

const DayWeatherCard = (props) => {
    return (
        <div className='day-weather-card'>
            {props.temperature}
            <img src={`./images/${props.weatherIcon}.svg`} alt="" />
        </div>
    )
}

export default DayWeatherCard;