const skyStateToIcon = {
    "11": 1,  // Despejado
    "11n": 33, // Despejado nocturno
    "12": 2,  // Poco nuboso
    "12n": 34, // Poco nuboso nocturno
    "13": 3,  // Nuboso
    "13n": 35, // Nuboso nocturno
    "14": 4,  // Muy nuboso
    "14n": 36, // Muy nuboso nocturno
    "15": 5,  // Cubierto
    "15n": 37, // Cubierto nocturno
    "16": 6,  // Nubes bajas
    "16n": 38, // Nubes bajas nocturno
    "17": 7,  // Nubes altas
    "17n": 39, // Nubes altas nocturno
    "18": 8,  // Chubascos
    "18n": 40, // Chubascos nocturno
    "23": 12, // Lluvia
    "23n": 41, // Lluvia nocturno
    "24": 13, // Lluvia nocturnoffffffffffffffffffffffff
    "24n": 40, // Lluvia nocturno
    "25": 13, // Lluvia nocturno
    "25n": 40, // Lluvia nocturno
    "26": 41, // Lluvia nocturno
    "43": 14, // Tormenta
    "43n": 39, // Tormenta
    "44": 13, // Tormenta
    "44n": 40, // Tormenta
    "45": 15, // Tormenta
    "45n": 42, // Tormenta nocturno
    "46": 16, // Nieve
    "46n": 43, // Nieve nocturno
    "81": 11,  // Niebla
    "81n": 11,  // Niebla
    "82": 5,  // Bruma dia
    "82n": 37,  // Bruma noche
};

export const getWeatherIcon = (skyStateCode) => {
    const iconNumber = skyStateToIcon[skyStateCode] ; // Valor por defecto
    return getIconUrl(iconNumber);
};

const getIconUrl = (iconNumber) => {
    const formattedIconNumber = iconNumber < 10 ? `0${iconNumber}` : iconNumber;
    return `https://developer.accuweather.com/sites/default/files/${formattedIconNumber}-s.png`;
};
