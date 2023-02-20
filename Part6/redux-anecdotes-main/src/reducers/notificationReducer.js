import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name:'notification',
    initialState:null,
    reducers:{
        changeNotification(state,action){
            return action.payload
        },
        hideNotification(state,action){
            return null
        }
    }
})
  

export const { changeNotification,hideNotification } = notificationSlice.actions

export const setNotification = (message,seconds) => {
    return async dispatch => {
        dispatch(changeNotification(message))
        setTimeout(() =>{
            dispatch(hideNotification())
        },seconds*1000)
    }
}

export default notificationSlice.reducer