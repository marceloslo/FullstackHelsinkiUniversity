import axios from "axios"

const url ='https://api.openweathermap.org/data/2.5/weather?'
const api_key = process.env.REACT_APP_API_KEY
const getWeather = (lat,lon) => {
    return axios.get(`${url}lat=${lat}&lon=${lon}&appid=${api_key}`).then(response => response.data)
}

export default {getWeather}
