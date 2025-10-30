export const BASE_URL = "https://localhost:7183/api";


export const PUBLIC = Object.freeze({
    LOGIN : `/Authentication/login`,
    REGISTER : `/Authentication/register`,
    REFRESH : `/Authentication/refresh`
});

export const PRIVATE = Object.freeze({
    GET_ALL_COURSES : `/Course/courses`,
    POST_COURSE : `/Course/add`,
    UPDATE_COURSE : `/Course/update/`,
    DELETE_COURSE : `/Course/delete/`,

    // fetch all the users from the backend 
    GET_ALL_USERS : `/User/users`,
    UPDATE_USER : `/User/update/`,
    DELETE_USER : `/User/deleteUser/`,


    // get single user 
    GET_SINGLE_USER : `/User/singleUser`,

    //User endpoints
    GET_ALL_COURSES_FOR_USER : `/Enrollment/courses`,
    ENROLL_COURSE : `/Enrollment/enroll`,
    GET_ALL_ENROLLMENTS : `/Enrollment/getEnrollments`,
    REMOVE_ENROLLED_COURSE:`/Enrollment/delete/`,

});
