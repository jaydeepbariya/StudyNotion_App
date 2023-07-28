import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading : false
}

export const profileSlice = createSlice({
    name : "profile",
    initialState,
    reducers : {
        setUser(state,value){
            state.user = value.payload;
            localStorage.setItem('user',JSON.stringify(state.user));
        },
        logoutUser(state,value){
            state.user = null;
            localStorage.removeItem('user');
        },
        setLoading(state,value){
            state.loading = value.payload;
        },
        setNewDisplayPicture(state,value){
            state.user.image = null;
            state.user.image = value.payload;
            localStorage.removeItem('user');
            localStorage.setItem('user', state.user);
        }
    }
});

export const {setUser,logoutUser, setLoading, setNewDisplayPicture} = profileSlice.actions;
export default profileSlice.reducer;