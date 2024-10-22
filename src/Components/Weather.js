import React, { useEffect, useRef, useState } from 'react';
import AutocompleteFields from './AutocompleteFields';
import WeatherInfo from './WeatherInfo';
import ForecastToday from './ForecastToday';
import ForecastNextDays from './ForecastNextDays';
import { fetchProvincias, fetchMunicipios, fetchWeatherData, fetchGeocodingData } from '../services/apiService';
import { CircularProgress } from '@mui/material';

const Weather = () => {
    const [comunidades, setComunidades] = useState([]);
    const [provinciasPorComunidad, setProvinciasPorComunidad] = useState({});
    const [provinciasFiltradas, setProvinciasFiltradas] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [selectedProvincia, setSelectedProvincia] = useState(null);
    const [selectedMunicipio, setSelectedMunicipio] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [proximosDiasData, setProximosDiasData] = useState(null);
    const [pronosticoHoyData, setPronosticoHoyData] = useState(null);
    const [pronosticoMananaData, setPronosticoMananaData] = useState(null);
    const [municipio, setMunicipio] = useState(null);
    const [provincia, setProvincia] = useState(null);
    const [comunidad, setComunidad] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const isFirstRender = useRef(true);

    useEffect(() => {
        const fetchProvinciasData = async () => {
            setIsLoading(true);
            try {
                const response = await fetchProvincias();
                const provinciasPorComunidad = response.provincias.reduce((acc, provincia) => {
                    const comunidad = provincia.COMUNIDAD_CIUDAD_AUTONOMA;
                    if (!acc[comunidad]) {
                        acc[comunidad] = [];
                    }
                    acc[comunidad].push(provincia);
                    return acc;
                }, {});
                setComunidades(Object.keys(provinciasPorComunidad));
                setProvinciasPorComunidad(provinciasPorComunidad);

                obtenerUbicacionUsuario(provinciasPorComunidad);
            } catch (error) {
                console.error('Error al cargar provincias', error);
            }
        };

        const obtenerUbicacionUsuario = (provinciasPorComunidad) => {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const geocodingResponse = await fetchGeocodingData(latitude, longitude);
                    const userLocation = geocodingResponse.results[0].components;
                    const municipioName = userLocation.city || userLocation.town || userLocation._normalized_city;
                    const provinciaName = userLocation.city;
                    const comunidadName = userLocation.state;

                    const provinciasEnComunidad = provinciasPorComunidad[comunidadName];
                    if (provinciasEnComunidad) {
                        const provincia = provinciasEnComunidad.find(prov => prov.NOMBRE_PROVINCIA === provinciaName);
                        setProvincia(provincia.NOMBRE_PROVINCIA);
                        setComunidad(provincia.COMUNIDAD_CIUDAD_AUTONOMA);

                        if (provincia) {
                            const codProvincia = provincia.CODPROV;
                            const municipiosResponse = await fetchMunicipios(codProvincia);

                            const municipio = municipiosResponse.municipios.find(mun => mun.NOMBRE === municipioName);

                            if (municipio) {
                                const weatherResponse = await fetchWeatherData(codProvincia, municipio.CODIGOINE.slice(0, 5));
                                setWeatherData(weatherResponse);
                                setMunicipio(weatherResponse.municipio.NOMBRE);
                                setProximosDiasData(weatherResponse.proximos_dias);
                                setPronosticoHoyData(weatherResponse.pronostico.hoy);
                                setPronosticoMananaData(weatherResponse.pronostico.manana);

                                setSelectedMunicipio(municipio);
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error al obtener la ubicación o clima', error);
                } finally {
                    setIsLoading(false);
                }
            }, (error) => {
                console.error('Error al obtener la ubicación del usuario', error);
            });
        };

        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetchProvinciasData();
        }
    }, [selectedProvincia]);

    const handleComunidadChange = (event, value) => {
        setIsLoading(true);        
        setProgress(33.33);
        setProvinciasFiltradas([]);
        setMunicipios([]);
        setProvinciasFiltradas(provinciasPorComunidad[value] || []);  
    };     

    const handleProvinciaChange = async (event, value) => {
        setIsLoading(true);
        setMunicipios([]);
        if (value) {
            const codProvincia = value.CODPROV;
            setProvincia(value.NOMBRE_PROVINCIA);
            setComunidad(value.COMUNIDAD_CIUDAD_AUTONOMA);
            setSelectedProvincia(codProvincia);
            try {
                const response = await fetchMunicipios(codProvincia);
                setMunicipios(response.municipios);
            } catch (error) {
                console.error('Error al cargar municipios', error);
            } finally {
                setProgress(33.33 * 2);
            }
        }
    };

    const handleMunicipioChange = async (event, value) => {
        setIsLoading(true);
        if (value) {
            setSelectedMunicipio(value);
            setMunicipio(value.NOMBRE);
            try {
                const response = await fetchWeatherData(selectedProvincia, value.CODIGOINE.slice(0, 5));
                setWeatherData(response);
                setProximosDiasData(response.proximos_dias);
                setPronosticoHoyData(response.pronostico.hoy);
                setPronosticoMananaData(response.pronostico.manana);
            } catch (error) {
                console.error('Error al cargar la información meteorológica', error);
            } finally {
                setProgress(33.33 * 3);
                setIsLoading(false);
            }
        }
    };
    // console.log(weatherData);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-100 p-6 gap-5'>
            <img src='/logo/The_Time_App_Logo_Con_Texto.svg' alt='Estado del cielo' className='max-w-lg md:max-w-xl ' />

            <div className='flex flex-col justify-center items-center w-full max-w-lg md:max-w-4xl bg-white p-6 rounded-3xl shadow-lg gap-5'>
                {/* <h2 className='text-2xl font-bold w-fit'>El tiempo </h2> */}

                <AutocompleteFields
                    comunidades={comunidades}
                    provinciasFiltradas={provinciasFiltradas}
                    municipios={municipios}
                    handleComunidadChange={handleComunidadChange}
                    handleProvinciaChange={handleProvinciaChange}
                    handleMunicipioChange={handleMunicipioChange}
                    selectedProvincia={selectedProvincia}
                    selectedMunicipio={selectedMunicipio}
                />
            </div>
            {!isLoading ? (
                <>

                    <div className='w-full max-w-lg md:max-w-4xl bg-white p-6 rounded-3xl shadow-lg'>
                        {weatherData && (
                            <WeatherInfo
                                municipio={municipio}
                                provincia={provincia}
                                comunidad={comunidad}
                                weatherData={weatherData}
                                pronosticoHoyData={pronosticoHoyData}
                            />
                        )}
                    </div>

                    {pronosticoHoyData && (
                        <div className='w-full flex flex-col max-w-lg md:max-w-4xl bg-white p-6 rounded-3xl shadow-lg gap-4'>
                            <div className="flex overflow-x-auto md:h-[600px] pb-4 custom-scrollbar">

                                <ForecastToday dia={'Hoy'} pronosticoData={pronosticoHoyData} />
                                <ForecastToday dia={'Mañana'} pronosticoData={pronosticoMananaData} />
                            </div>
                        </div>
                    )}

                    {proximosDiasData && <ForecastNextDays proximosDiasData={proximosDiasData} />}
                </>
            ) : (
                <div>
                    {/* <CircularProgress variant='determinate' value={progress}
                        sx={{
                            color: 'white', // Define tu color personalizado aquí
                        }}
                    />                     */}
                    <div className='flex flex-col justify-center items-center gap-4'>
                        <span>Esperando seleccion</span>
                        <CircularProgress variant='indeterminate' value={progress}
                            sx={{
                                color: 'white', // Define tu color personalizado aquí
                            }}
                        />
                    </div>
                </div>
            )}


        </div>
    );
};

export default Weather;


