import React from 'react';
import { getWeatherIcon } from '../utils/weatherUtils';
import { FiSunset } from "react-icons/fi";

const WeatherInfo = ({ municipio, provincia, comunidad, weatherData, pronosticoHoyData }) => (
    <div className='weather-info mt-6 text-center'>
        <h3 className='text-2xl font-semibold text-gray-800'>{municipio}, {provincia}, {comunidad}</h3>
        <div className='flex justify-center items-center mt-4'>
            <img src={getWeatherIcon(weatherData.stateSky.id)} alt='Estado del cielo' className='w-24' />
            <p className='text-3xl font-bold text-gray-800'>{weatherData.temperatura_actual}°C</p>
        </div>
        <p className='text-lg text-gray-600 mt-2'>{weatherData.stateSky.description}</p>
        <div className='mt-6 grid grid-cols-2 gap-4 text-gray-700'>
            <div>
                <p className='text-lg font-medium'>Max</p>
                <p className='text-2xl'>{weatherData.temperaturas.max ?? 'N/A'}°C</p>
            </div>
            <div>
                <p className='text-lg font-medium'>Min</p>
                <p className='text-2xl'>{weatherData.temperaturas.min ?? 'N/A'} °C</p>
            </div>
            <div>
                <p className='text-lg font-medium'>Humedad</p>
                <p className='text-2xl'>{weatherData.humedad ?? 'N/A'}%</p>
            </div>
            <div>
                <p className='text-lg font-medium'>Viento</p>
                <p className='text-2xl'>{weatherData.viento ?? 'N/A'} km/h</p>
            </div>
            <div>
                <p className='text-lg font-medium'>Amanecer</p>
                <p className='text-xl'>{pronosticoHoyData['@attributes'].orto}</p>
            </div>
            <div>
                <p className='text-lg font-medium'>Atardecer</p>
                <p className='text-xl'>{pronosticoHoyData['@attributes'].ocaso}</p>
            </div>
        </div>
    </div>
);

export default WeatherInfo;
