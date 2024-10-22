import React from 'react';
import { getWeatherIcon } from '../utils/weatherUtils';
import WindDirection from './WindDirection';
import { FaDroplet, FaWater, FaCloudShowersHeavy } from 'react-icons/fa6';
import { WiHumidity } from "react-icons/wi";
import { GiWindsock } from "react-icons/gi";
import { TbWind } from "react-icons/tb";
import { MdOutlineWindPower } from "react-icons/md";

const ForecastToday = ({ dia, pronosticoData }) => {
    const hoursData = pronosticoData.temperatura.map((temp, index) => {
        const amanecerHoraStr = pronosticoData['@attributes'].orto.split(':');
        const amanecerHora = parseInt(amanecerHoraStr[0], 10);
        const amanecerMinutos = parseInt(amanecerHoraStr[1], 10);
        const amanecerRedondeado = amanecerMinutos >= 30 ? amanecerHora + 1 : amanecerHora;
        const sunriseIndex = pronosticoData.estado_cielo.findIndex((estado) => !estado.includes('n')) + 1;
        let hour = amanecerRedondeado + (index - sunriseIndex);

        if (hour < 0) {
            hour = 24 + hour;
        }

        hour = hour % 24;
        const maxTemp = 56;
        const marginTop = `${(maxTemp - temp * 2) * 8}px`;
        // console.log(pronosticoData);

        return {
            hour,
            temp,
            estadoCielo: pronosticoData.estado_cielo[index],
            estadoCieloDescripcion: pronosticoData.estado_cielo_descripcion[index],
            precipitacion: pronosticoData.precipitacion[index],
            humedad: pronosticoData.humedad_relativa[index],
            viento: pronosticoData.viento[index].direccion,
            racha: pronosticoData.racha_max[index],
            marginTop,
        };
    });

    const hoursOrdered = [...hoursData].sort((a, b) => a.hour - b.hour);
    const date = new Date(pronosticoData['@attributes'].fecha);   
    // console.log(hoursOrdered);
    return hoursOrdered.map((data, index) => (
        <div key={index} className={`flex flex-col gap-4 ${index === 0 && dia != 'Hoy' ? 'border-l-2 border-black ' : ''}`}>

            <div className={`flex flex-col ${index === 0 ? '' : 'invisible'}`}>
                <p className={`flex justify-center font-bold ${index === 0 ? '' : 'invisible'}`}>{dia == 'Hoy' ? 'Hoy' : dia}</p>
                <p className={`flex justify-center items-center font-semibold text-sm text-gray-500 h-[24px] ${index === 0 ? '' : 'invisible'}`}>{date.getDate()}/{date.getMonth() + 1}</p>
            </div>

            <div  className={`flex flex-col gap-4 flex-grow`}>
                <div key={index} className={`flex flex-col items-center flex-grow px-4 ${index === 23 ? '' : 'border-r-2'}`}>
                    <p className='font-semibold'>{`${data.hour}:00`}</p>
                    <div className='flex-grow'>
                        <div className='flex items-end' style={{ marginTop: data.marginTop }}>
                            <div className='flex flex-col justify-center items-center'>
                                <img
                                    src={getWeatherIcon(data.estadoCielo)}
                                    alt='Estado del cielo'
                                    className='w-32'
                                />
                                <p className='font-bold'>{data.temp}°C</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center whitespace-nowrap gap-2'>
                        <div className='w-full flex justify-between items-center gap-1'>
                            <div className='w-6 flex justify-center'>
                                <FaCloudShowersHeavy className='text-xs text-gray-400' />
                            </div>
                            <div className='flex justify-center flex-grow'>
                                <span className='text-sm'> {data.precipitacion} mm</span>
                            </div>
                        </div>
                        <div className='w-full flex justify-between items-center gap-1'>
                            <div className='w-6 flex justify-center'>
                                <FaDroplet className='text-xs text-blue-400' />
                            </div>
                            <div className='flex justify-center flex-grow'>
                                <span className='text-sm'>{data.humedad} %</span>
                            </div>
                        </div>
                        <div className='w-full flex justify-between items-center gap-1'>
                            <div className='w-6 flex justify-center'>
                                <GiWindsock className='text-xs text-red-600' />
                            </div>
                            <div className='flex justify-center flex-grow'>
                                <WindDirection direction={data.viento} />
                            </div>

                        </div>
                        <div className='w-full flex justify-between items-center gap-1'>
                            <div className='w-6 flex justify-center'>
                                <MdOutlineWindPower className='text-xs text-gray-400' />
                            </div>
                            <div className='flex justify-center flex-grow'>

                                <p className='text-sm'>{data.racha} km/h</p>
                            </div>

                        </div>


                    </div>



                </div>
            </div>
        </div>
    ));
};

export default ForecastToday;
