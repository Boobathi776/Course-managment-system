import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/services/apiInstance";
import { PRIVATE } from "../../api/services/endPoints";
import type { CourseFromScemaType } from "../../features/course/form/courseSchema";

export type Course = {
    id : number,
    name : string,
    startDate : Date,
    courseDuration : number,
    minimumAgeRequired : number,
    createdOn : Date
};

type CourseInitialState = {
    courses : Course[]
    editingCourse : Course | null
}

type UpdateCourseArgument = {
    id : number,
    course : CourseFromScemaType
}

const initialState : CourseInitialState = {
    courses : [],
    editingCourse : null
}

export const fetchCourses = createAsyncThunk<Course[],void,{rejectValue : string}>(
'fetchCourses',
async (_,{rejectWithValue})=>{
    try
    {
        const response = await api.get(PRIVATE.GET_ALL_COURSES);
        return response.data.data;
    }
    catch(error:any)
    {
        return rejectWithValue(error.response.data.message || "Unable to get all the courses");
    }
});

export const addNewCourse = createAsyncThunk<Course,CourseFromScemaType,{rejectValue : string}>(
    'course/add',
    async(newCourse,{rejectWithValue})=>{
        try
        {   
        const response = await api.post(PRIVATE.POST_COURSE,newCourse);
        return response.data.data;
        }
        catch(error:any)
        {
            return rejectWithValue(error.response.data.message || "Unable to add a new course");
        }
    }
);

export const updateCourse = createAsyncThunk<Course,UpdateCourseArgument,{rejectValue : string}>(
    'course/update',
    async({id,course}:UpdateCourseArgument,{rejectWithValue})=>{
        try
        {   
        const response = await api.put(PRIVATE.UPDATE_COURSE+id,course);
        return response.data.data;
        }
        catch(error:any)
        {
            return rejectWithValue(error.response.data.message || "Unable to add a new course");
        }
    }
);

export const deleteCourse = createAsyncThunk<number,number,{rejectValue : string}>(
    'course/delete',
    async(id,{rejectWithValue})=>{
        try
        {   
        const response = await api.delete(PRIVATE.DELETE_COURSE+id);
        return response.data.data && id ;
        }
        catch(error:any)
        {
            return rejectWithValue(error.response.data.message || "Unable to add a new course");
        }
    }
);

const courseSlice = createSlice({
    name:"course",
    initialState : initialState,
    reducers:{
        setEditingCourse : (state,action:PayloadAction<Course|null>)=>{
            state.editingCourse = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(
            fetchCourses.fulfilled,
            (state,action:PayloadAction<Course[]>)=>{
                state.courses = action.payload;
            }
        )
        .addCase(addNewCourse.fulfilled,
            (state,action:PayloadAction<Course>)=>{
                state.courses.push(action.payload);
            }
        )
        .addCase(updateCourse.fulfilled,
            (state,action:PayloadAction<Course>)=>{
                const index = state.courses.findIndex(c=>c.id===action.payload.id);
                if(index!=-1)
                {
                    state.courses[index] = action.payload;
                }
            }
        )
        .addCase(deleteCourse.fulfilled,
            (state,action:PayloadAction<number>)=>{
               state.courses = state.courses.filter(c=>c.id !== action.payload);
            }
        );
    }
});

export const courseReducer = courseSlice.reducer;
export const {setEditingCourse} = courseSlice.actions;
