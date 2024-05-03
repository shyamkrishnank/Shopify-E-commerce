import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token : localStorage.getItem('auth_token')?JSON.parse(localStorage.getItem('auth_token')):null,
    isLogged: localStorage.getItem('auth_token')?true:false,
    is_admin : localStorage.getItem('is_admin')?localStorage.getItem('is_admin'):null
}


const AuthSlice = createSlice({
    name:'Auth',
    initialState,
    reducers: {
        logged : (state)=>{
            state.token = localStorage.getItem('auth_token')?JSON.parse(localStorage.getItem('auth_token')):null,
            state.isLogged = localStorage.getItem('auth_token')?true:false,
            state.is_admin = localStorage.getItem('is_admin')?localStorage.getItem('is_admin'):null

        },
        logout : (state)=>{
            return {
                ...state,
                token: null,
                isLogged: false,
                is_admin :false
            };
        }
    }

})

export default AuthSlice.reducer
export const { logged,logout } = AuthSlice.actions