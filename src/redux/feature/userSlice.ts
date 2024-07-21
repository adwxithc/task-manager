import { createSlice } from "@reduxjs/toolkit";
import { userInitialState as initialState } from "./initialState";
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setCridentials:(state, action)=>{
            const data ={...state.userData,isAuth:true,...action.payload}
            state.userData=data;
            state.isAuth=true
            localStorage.setItem('userData',JSON.stringify(data))
        },
        removeCridentials: (state) => {
            state.isAuth = false;
            state.userData = null;
            localStorage.removeItem('userData')
        },
      
    }
})

export const {removeCridentials,setCridentials} =userSlice.actions
export default userSlice.reducer