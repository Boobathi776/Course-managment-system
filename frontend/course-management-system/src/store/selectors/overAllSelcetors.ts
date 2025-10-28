import type { RootState } from "../store";

export const getAccessToken = (state:RootState)=>state.login.accessToken;
export const getAllCourses = (state:RootState)=>state.course?.courses;

export const getAllUsers = (state:RootState)=>state.users.users;
export const getEditingUser = (state:RootState)=>state.users.editingUser;

export const getUser = (state:RootState)=>state.users.user;