import axios from "axios"

const URL = '/api/persons'

const getAll = () =>{
    return axios.get(URL).then(response => response.data)
}

const create = (newPerson) => {
    return axios.post(URL,newPerson).then(response => response.data)
}

const remove = (id) =>{
    return axios.delete(`${URL}/${id}`).then(response => response.data)
}

const update = (id,updatedPerson) =>{
    return axios.put(`${URL}/${id}`,updatedPerson).then(response=>response.data)
}

export default {getAll, create, remove, update}