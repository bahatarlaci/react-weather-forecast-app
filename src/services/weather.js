import { get } from "./request";

export const getForecast = (lat, lon) => get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=tr&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);