import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginFormType } from "../../features/login/loginSchema";
import { api } from "../../api/services/apiInstance";
import { PUBLIC } from "../../api/services/endPoints";
import type { RootState } from "../store";
export type TokenType = {
    accessToken : string,
    refreshToken : string
};

const initialState:TokenType = {
    accessToken :"",
    refreshToken:""
};

export const loginUser = createAsyncThunk<TokenType,LoginFormType,{rejectValue : string}>(
    'login/User',
    async (loginCredentials,{rejectWithValue})=>{
        try
        {
            var response = await api.post(PUBLIC.LOGIN,loginCredentials);
            return response.data.data;
        }
        catch(error : any)
        {
            return rejectWithValue(error.response.data.message || "Unable to login a user");
        }
    }
);


const loginSlice = createSlice({
    name:"login",
    initialState: initialState,
    reducers:{
        updateToken : (state,action:PayloadAction<TokenType>)=>{
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout : (state)=>{
            state.accessToken = "",
            state.refreshToken = ""
            localStorage.removeItem("persist:root");
        }
    },
    extraReducers :(builder)=>{
        builder.addCase(
            loginUser.fulfilled,
            (state,action:PayloadAction<TokenType>)=>{
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            }
        )
    }
});

export const loginReducer = loginSlice.reducer;
export const {logout,updateToken} = loginSlice.actions;
export const getAccessToken = (state:RootState)=>state.login.accessToken;