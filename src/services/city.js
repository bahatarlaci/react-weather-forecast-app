import { get } from "./request";

export const getCitys = () => get('/data/cities.json')
export const getCitysFilterForSearch = (search) => get('/data/cities.json').then((data) => data.filter((city) => city.name.toLowerCase().includes(search.toLowerCase())))