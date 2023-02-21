
const notificationReducer = (state,action) => {
    switch(action.type){
        case 'ERROR':
            return {content:action.payload,className:'error'}
        case 'SUCCESS':
            return {content:action.payload,className:'success'}
        case 'RESET':
            return null
        default:
            return state
    }
}

export const error = (message) => {
    return {payload:message,type:"ERROR"}
}

export const success = (message) => {
    return {payload:message,type:"SUCCESS"}
}

export const reset = () => {
    return {type:"RESET"}
}

export default notificationReducer