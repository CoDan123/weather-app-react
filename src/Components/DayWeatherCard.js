
const DayWeatherCard = (props) => {
    return (
        <div className='day-weather-card'>
            {props.dayOfWeek}
            <img src={`./images/${props.weatherIcon}.svg`} alt="" />
            {props.temperature}
        </div>
    )
}

export default DayWeatherCard;