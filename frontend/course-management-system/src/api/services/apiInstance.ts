import axios from "axios";
import { store } from "../../store/store";
import { logout, updateToken, type TokenType } from "../../store/slices/loginSlice";
import { BASE_URL, PUBLIC } from "./endPoints";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const accessToken = state.login.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}
,
(error)=>Promise.reject(error)
);

let isRefreshing = false;
const waitingPromises : {
    resolve : (token : string | null)=>void,
    reject : (error : any)=>void
}[] = [];

const clearWaitingQueue = (error : any ,token : string | null)=>{
    waitingPromises.forEach(prom=>{
        if(error)
        {
            prom.reject(error);
        }
        else 
        {
            prom.resolve(token);
        }
    });
    waitingPromises.length = 0;
};

api.interceptors.response.use(
    (response)=>response,
    async(error)=>{

        const originalRequest = error.config;
        try
        {
            if(error?.response?.status === 401 && !originalRequest._retry)
            {
                originalRequest._retry = true;
                if(isRefreshing)
                {
                    return new Promise((resolve,reject)=>{
                        waitingPromises.push({resolve,reject});
                    })
                    .then((token)=>{
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch(error=>Promise.reject(error));
                }
                isRefreshing = true;
                const state = store.getState();
                const dispatch = store.dispatch;

                const refreshToken = state.login.refreshToken;
                const response = await axios.post(BASE_URL+PUBLIC.REFRESH,{refreshToken:refreshToken});
                const tokens : TokenType = response.data.data;
                dispatch(updateToken(tokens));
                clearWaitingQueue(null,tokens.accessToken);
                isRefreshing = false;
                originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`
                return api(originalRequest);
            }
        }
        catch(error)
        {
            clearWaitingQueue(error,null);
            isRefreshing = false;
            const dispatch = store.dispatch;
            dispatch(logout());
            return Promise.reject(error);
        }
    }
)
