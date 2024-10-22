import axios from 'axios';

const API_BASE_URL = 'https://www.el-tiempo.net/api/json/v2';

export const fetchProvincias = async () => {
    const response = await axios.get(`${API_BASE_URL}/provincias`);
    return response.data;
};

export const fetchMunicipios = async (codProvincia) => {
    const response = await axios.get(`${API_BASE_URL}/provincias/${codProvincia}/municipios`);
    return response.data;
};

export const fetchWeatherData = async (codProvincia, codMunicipio) => {
    const response = await axios.get(`${API_BASE_URL}/provincias/${codProvincia}/municipios/${codMunicipio}`);
    return response.data;
};

export const fetchGeocodingData = async (latitude, longitude) => {
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: {
            q: `${latitude},${longitude}`,
            key: 'f21cb10ca1b4432f8c60e58cfac288b9',
        },
    });
    return response.data;
};
