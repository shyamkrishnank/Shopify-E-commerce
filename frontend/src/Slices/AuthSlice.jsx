import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token : localStorage.getItem('auth_token')?JSON.parse(localStorage.getItem('auth_token')):null,
    isLogged: localStorage.getItem('auth_token')?true:false
}


const AuthSlice = createSlice({
    name:'Auth',
    initialState,
    reducers: {
        logged : (state)=>{
            state.token = localStorage.getItem('auth_token')?JSON.parse(localStorage.getItem('auth_token')):null,
            state.isLogged = localStorage.getItem('auth_token')?true:false
        },
        logout : (state)=>{
            return {
                ...state,
                token: null,
                isLogged: false
            };
        }
    }

})

export default AuthSlice.reducer
export const { logged,logout } = AuthSlice.actions