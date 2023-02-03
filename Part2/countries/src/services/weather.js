import axios from "axios"

const url ='https://api.openweathermap.org/data/2.5/weather?'
const api_key = '16e95345e3c4e71904f616ed81679048'
const getWeather = (lat,lon) => {
    return axios.get(`${url}lat=${lat}&lon=${lon}&appid=${api_key}`).then(response => response.data)
}

export default {getWeather}