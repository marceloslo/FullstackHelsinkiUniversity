import axios from "axios"

const url ='https://restcountries.com/v3.1/all'

const getAll = () => {
    
    return axios.get(url).then(response => response.data)
}

export default {getAll}