import * as Icon from 'react-bootstrap-icons';
import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'


const Weather = () => {
    const inputRef = useRef()
    const[weatherData, setWeatherData] = useState(false);
    const allIcons ={
        "01d": Icon.SunFill,
        "02d": Icon.SunsetFill,
        "03d": Icon.SunFill,
        "04d": Icon.SunFill,
        "05d": Icon.SunFill,
        "06d": Icon.SunFill,
        "06d": Icon.SunFill,
    }
    }
    const search = async (city) =>{
        try {
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();   
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || Icon.SunFill;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        } catch (error) {
            
        }

    }
    useEffect(() =>{
        search("London");
    },[])
{ 
    return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder=' Search . . .'/>
            <Icon.Search size={30} color='wihte'/>
        </div>
        <Icon.SunFill  size={80} color='yellow' className='weather-icon'/>
        <p className='temperature'>{{weatherData.temperature}}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
            <div className='col'>
                <Icon.DropletFill size={30} color="gray" className='icons' />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
                <div className='col'>
                    <Icon.Wind size={40} color='gray' className='icons'/>
                    <div>
                        <p>{weatherData.windSpeed}km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather