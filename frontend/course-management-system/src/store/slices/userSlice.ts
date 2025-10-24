import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserFormType } from "../../features/user/form/userFormSchema";
import { api } from "../../api/services/apiInstance";
import { PUBLIC } from "../../api/services/endPoints";

export type UserReturnType = {
    id : string,
    name : string,
    email : string,
    dateOfBirth : Date,
    isAdmin : boolean,
    isActive : boolean
};

type UserSliceStateType = {
    users : UserReturnType[]
};

const initialState : UserSliceStateType = {
    users : []
}

export const addNewUser = createAsyncThunk<UserReturnType,Omit<UserFormType,"confirmPassword">,{rejectValue : string}>(
    'user/add',
    async(newUser,{rejectWithValue})=>{
        try
        {
            var response = await api.post(PUBLIC.REGISTER,newUser);
            return response.data.data;
        }
        catch(error : any)
        {
            return rejectWithValue(error.response.data.message || "Unable to add a new User");
        }
    }
);


 const userSlice = createSlice({
    name:"users",
    initialState: initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addNewUser.fulfilled,(state,action:PayloadAction<UserReturnType>)=>{
            state.users.push(action.payload);
        });
    }
});

export const userReducer = userSlice.reducer;
