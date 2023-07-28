import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading : false,
    token : localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    signupData : localStorage.getItem('signupData') ? JSON.parse(localStorage.getItem('signupData')) : null
}

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setLoading(state,value){
            state.loading = value.payload
        },
        setToken(state,value){
            localStorage.setItem('token', JSON.stringify(value.payload));
            state.token = value.payload;
        },
        logoutToken(state,value){
            state.token = null;
            localStorage.removeItem('token');
        },
        addSignupData(state,value){
            state.signupData = value.payload;
            localStorage.setItem('signupData', JSON.stringify(state.signupData));
        },
        removeSignupData(state,value){
            state.signupData = null;
            localStorage.removeItem('signupData');
        }
        
    }
});

export const {setLoading, setToken, logoutToken, addSignupData, removeSignupData} = authSlice.actions;
export default authSlice.reducer;