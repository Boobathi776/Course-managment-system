import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/services/apiInstance";
import { PRIVATE, PUBLIC } from "../../api/services/endPoints";
import type { UpdateUserType } from "../../features/user/form/UserForm";

export type UserReturnType = {
    id : string,
    name : string,
    email : string,
    dateOfBirth : Date,
    isAdmin : boolean,
    isActive : boolean
};

 export type UserInputType = {
    name : string,
    email : string,
    dateOfBirth : string,
    isAdmin : boolean,
    isActive : boolean,
    password : string
  }

type UserSliceStateType = {
    users : UserReturnType[],
    editingUser : UserReturnType | null
};

const initialState : UserSliceStateType = {
    users : [],
    editingUser: null
}

export const fetchAllUsers = createAsyncThunk<UserReturnType[],void,{rejectValue:string}>(
    'users/fetch',
    async(_,{rejectWithValue})=>{
        try
        {
            var response = await api.get(PRIVATE.GET_ALL_USERS);
            return response.data;
        }   
        catch(error:any)
        {
            return rejectWithValue(error.response.data.data.message || "Unable to fetch all the users");
        }
    }
);


export const addNewUser = createAsyncThunk<UserReturnType,UserInputType,{rejectValue : string}>(
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


export const updateUser = createAsyncThunk<UserReturnType,UpdateUserType,{rejectValue:string}>(
    'users/update',
    async (updateUser, {rejectWithValue})=>{
        try
        {
            const response = await api.put(PRIVATE.UPDATE_USER+updateUser.id,updateUser);
            return response.data.data;
        }
        catch(error:any)
        {
            return rejectWithValue(error.response.data.message || "Unable to update the user");
        }
    }
);

export const deleteUser = createAsyncThunk<string,string,{rejectValue:string}>(
    'users/delete',
    async(userId,{rejectWithValue})=>{
        try
        {
            const response = await api.delete(PRIVATE.DELETE_USER + userId);
            return response.data.data;
        }
        catch(error : any)
        {
            return rejectWithValue(error.response.data.data.message);
        }
    }
);

 const userSlice = createSlice({
    name:"users",
    initialState: initialState,
    reducers:{
        setEditingUser : (state,action:PayloadAction<UserReturnType | null>)=>{
            state.editingUser = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllUsers.fulfilled,(state,action:PayloadAction<UserReturnType[]>)=>{
            state.users = action.payload;
        })
        .addCase(addNewUser.fulfilled,(state,action:PayloadAction<UserReturnType>)=>{
            state.users.push(action.payload);
        })
        .addCase(updateUser.fulfilled,(state,action:PayloadAction<UserReturnType>)=>{
            const index = state.users.findIndex(u=>u.id===action.payload.id);
            if(index!==-1)
            {
                state.users[index] = action.payload;
            }
        })
        .addCase(deleteUser.fulfilled,(state,action:PayloadAction<string>)=>{
            state.users = state.users.filter(u=>u.id!==action.payload);
        });
    }
});

export const userReducer = userSlice.reducer;
export const {setEditingUser} = userSlice.actions;