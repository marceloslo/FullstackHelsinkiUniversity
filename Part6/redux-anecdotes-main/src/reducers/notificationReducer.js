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
export default notificationSlice.reducer