import React from 'react';
import { getWeatherIcon } from '../utils/weatherUtils';

const ForecastNextDays = ({ proximosDiasData }) => (
    <div className='w-full max-w-lg md:max-w-4xl bg-white p-6 rounded-3xl shadow-lg'>
        <div className='flex flex-col items-center mt-6'>
            <h4 className='text-xl font-semibold text-gray-700 mb-4'>Pronóstico de los próximos días</h4>
            <div className='w-full grid grid-cols-1 gap-4'>
                {proximosDiasData.map((dia, index) => {
                    const date = new Date(dia['@attributes'].fecha);
                    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
                    const dayOfWeek = dayNames[date.getDay()];
console.log(proximosDiasData);

                    return (
                        <div key={index} className='grid grid-cols-1 md:grid-cols-4 items-center bg-gray-100 rounded-lg p-4 shadow-sm gap-6'>
                            <div className='flex justify-evenly items-center gap-5'>
                                <img
                                    src={
                                        Array.isArray(dia.estado_cielo)
                                            ? getWeatherIcon(dia.estado_cielo[0])
                                            : getWeatherIcon(dia.estado_cielo)
                                    }
                                    alt={dia.estado_cielo_descripcion[0]}
                                    className='w-24'
                                />

                                <div className='flex flex-col justify-center items-start'>
                                    <p className='text-lg font-semibold'>{dayOfWeek}</p>
                                    <p className='text-sm text-gray-500'>
                                        {date.getDate()}/{date.getMonth() + 1}
                                    </p>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 justify-center '>
                                <div className='flex flex-col justify-center items-center'>
                                    <p className='w-fit text-lg font-medium'>
                                        Max
                                    </p>
                                    <p className='w-fit text-lg font-medium whitespace-nowrap'>
                                        {dia.temperatura.maxima} °C
                                    </p>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <p className='w-fit text-lg font-medium'>
                                        Min
                                    </p>
                                    <p className='w-fit text-lg font-medium whitespace-nowrap'>
                                        {dia.temperatura.minima} °C
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);

export default ForecastNextDays;
