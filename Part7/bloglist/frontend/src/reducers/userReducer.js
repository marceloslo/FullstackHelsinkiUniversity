const userReducer = (state,action) => {
    switch(action.type){
        case 'LOGIN':
            return action.payload
        default:
            return state
    }
}

export const login = (user) => {
    return {payload:user,type:"LOGIN"}
}

export default userReducer