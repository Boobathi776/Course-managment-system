import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/services/apiInstance";
import { PRIVATE } from "../../api/services/endPoints";
import type { Course } from "./courseSlice";

export type EnrollmentResponse = {
    courseId : number,
    enrolledOn : Date
}

type EnrollmentSliceStateType = {
    enrollments : EnrollmentResponse[],
    courses : Course[]
};

const initialState : EnrollmentSliceStateType = {
    enrollments : [],
    courses:[]
};

//Fetch course for users
export const fetchCoursesForUsers = createAsyncThunk<Course[],void,{rejectValue : string}>(
'users/fetchCourses',
async (_,{rejectWithValue})=>{
    try
    {
        const response = await api.get(PRIVATE.GET_ALL_COURSES_FOR_USER);
        return response.data.data;
    }
    catch(error:any)
    {
        return rejectWithValue(error.response.data.message || "Unable to get all the courses");
    }
});

//fetch all enrollments 
export const fetchEnrollments = createAsyncThunk<EnrollmentResponse[],void,{rejectValue : string}>(
    'enrollment/fetchAll',
    async(_,{rejectWithValue})=>{
        try
        {
            var response = await api.get(PRIVATE.GET_ALL_ENROLLMENTS);
            return response.data.data;
        }
        catch(error:any)
        {
            return rejectWithValue(error.reponse.data.message || "Unable to fetch the enrollments");
        }
    }
);

//Enroll the course
export const enrollCourse = createAsyncThunk<EnrollmentResponse,number,{rejectValue : string}>(
    'enrollment/add',
    async(id,{rejectWithValue})=>{
        try
        {
            var response = await api.post(PRIVATE.ENROLL_COURSE,{courseId:id});
            return response.data.data;
        }
        catch(error:any)
        {
            return rejectWithValue(error.reponse.data.message || "Unable to fetch the enrollments");
        }
    }
);

//Remove the course from the enrollment
export const removeEnrollment = createAsyncThunk<number,number,{rejectValue : string}>(
    'enrollment/remove',
    async(id,{rejectWithValue})=>{
        try
        {
            var response = await api.delete(PRIVATE.REMOVE_ENROLLED_COURSE+id);
            return response.data.data;
        }
        catch(error:any)
        {
            return rejectWithValue(error.reponse.data.message || "Unable to fetch the enrollments");
        }
    }
);


const enrollmentSlice = createSlice({
    name:"enrollment",
    initialState : initialState ,
    reducers : {},
    extraReducers:(builder)=>{
        builder.addCase(fetchCoursesForUsers.fulfilled,(state,action:PayloadAction<Course[]>)=>{
            state.courses = action.payload;
        })
        .addCase(fetchEnrollments.fulfilled,(state,action:PayloadAction<EnrollmentResponse[]>)=>{
            state.enrollments = action.payload;
        })
        .addCase(enrollCourse.fulfilled,(state,action:PayloadAction<EnrollmentResponse>)=>{
            state.enrollments.push(action.payload);
        })
        .addCase(removeEnrollment.fulfilled,(state,action:PayloadAction<number>)=>{
            state.enrollments = state.enrollments.filter(e=>e.courseId!==action.payload);
        })
    }
});

export const enrollmentReducer = enrollmentSlice.reducer;