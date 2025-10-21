export const BASE_URL = "https://localhost:7183/api";


export const PUBLIC = Object.freeze({
    LOGIN : `/Authentication/login`,
    REGISTER : `/Authentication/register`,
    REFRESH : `/Authentication/refresh`
});

export const PRIVATE = Object.freeze({
    GET_ALL_COURSES : `/Course/courses`,
    POST_COURSE : `/Course/add`,
    UPDATE_COURSE : `/Course/update/`
});
