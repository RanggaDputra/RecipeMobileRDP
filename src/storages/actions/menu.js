import axios from "axios";
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = `https://kind-blue-sheep-boot.cyclic.app/`; 


export const getMenuDetail = (id) => async (dispatch) => {
    const baseURL = 'https://kind-blue-sheep-boot.cyclic.app/';
    let headers = {
        headers: {
            "Content-Type" : "multipart/form-data",
            "Authorization" : `Bearer ${login.data.token}`
        }
    }
    try {
        dispatch({ type: "DETAIL_MENU_PENDING" });
        const result = await axios.get(`${baseURL}/recipe/${id}`,headers);
        dispatch({ payload: result.data.data, type: "DETAIL_MENU_SUCCESS" });
    } catch (err) {
        console.error("error");
        dispatch({ payload: err.response, type: "DETAIL_MENU_FAILED" });
        console.error(err);
    }
};



export const getProfilDetail = () => async (dispatch) => {
    try {
        dispatch({ type: "DETAIL_MENU_PENDING" });
        const result = await axios.post(`${baseURL}/users/login`, {}, { headers });
        dispatch({ payload: result.data.data, type: "DETAIL_MENU_SUCCESS" });
    } catch (err) {
        console.error("error");
        dispatch({ payload: err.response, type: "DETAIL_MENU_FAILED" });
        console.error(err);
    }
};

export const getProfilDetailById = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DETAIL_MENU_PENDING" });
        const result = await axios.get(`${baseURL}/users/${id}`, { headers });
        dispatch({ payload: result.data.data, type: "DETAIL_MENU_SUCCESS" });
    } catch (err) {
        console.error("error");
        dispatch({ payload: err.response, type: "DETAIL_MENU_FAILED" });
        console.error(err);
    }
};
export const getMenuUsers = (id) => async (dispatch) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in AsyncStorage');
    }
    const baseURL = 'https://kind-blue-sheep-boot.cyclic.app/';
    let headers = {
        headers: {
            "Content-Type" : "multipart/form-data",
            "Authorization" : `Bearer ${token}`
        }
    }
    try {
        dispatch({ type: "GET_MENU_USERS_REQUEST" });
        const result = await axios.get(`${baseURL}/recipe/users/${id}`,headers );
        dispatch({ payload: result.data.data, type: "GET_MENU_USERS_SUCCESS" });
    } catch (err) {
        console.error("error");
        dispatch({ payload: err.response, type: "GET_MENU_USERS_ERROR" });
        console.error(err);
    }
};

export const getMenu = () => 
    async dispatch => {
       
        try{
            const token = await AsyncStorage.getItem('token');
            console.log('result')
            console.log(token)
            if (!token) {
              throw new Error('Token not found in AsyncStorage');
            }
        
            const headers = {
              Authorization: `Bearer ${token}`,
            };

            dispatch({ type: "GET_MENU_REQUEST" });
            const response = await axios.get(`${baseURL}/recipe`,headers);
            if (response.data && response.data.message) {
                dispatch({type: 'GET_MENU_SUCCESS', payload: response.data});
                console.log('Success');
              } else {
                console.log('Invalid response data:', response.data);
              }
        } catch(err){
            console.log("error")
            dispatch({payload:err.response,type:"GET_MENU_FAILED"})
            console.log(err)
        }
    }
export const searchMenu = (data) => async (dispatch) => {
    try {
        dispatch({ type: "GET_MENU_PENDING" });
        const result = await axios.get(`${baseURL}/recipe/detail?search=${data}`, { headers });
        dispatch({ payload: result.data.data, type: "GET_MENU_SUCCESS" });
    } catch (err) {
        console.error("error");
        dispatch({ payload: err.response, type: "GET_MENU_FAILED" });
        console.error(err);
    }
};

export const deleteMenu = (id, navigate) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_MENU_PENDING" });
        const result = await axios.delete(`${baseURL}/recipe/${id}`, { headers });
        console.log(result);
        navigate('/');
        dispatch({ payload: result.data.data, type: "DELETE_MENU_SUCCESS" });
    } catch (err) {
        console.error("error");
        dispatch({ payload: err.response.data.message, type: "DELETE_MENU_FAILED" });
        console.error(err);
    }
};

// export const postMenu = (data, navigate) => async (dispatch) => {
//     try {
//         dispatch({ type: "POST_MENU_PENDING" });
//         const result = await axios.post(`${baseURL}recipe`, data, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//         console.log(result);
//         dispatch({ payload: result.data.data, type: "POST_MENU_SUCCESS" });
//     } catch (err) {
//         console.error("error");
//         dispatch({ payload: err.response.data.message, type: "POST_MENU_FAILED" });
//         console.error(err);
//     }
// };

export const updateMenu = (data, id, navigate) => async (dispatch) => {
    
    try {
        dispatch({ type: "PUT_MENU_PENDING" });
        const result = await axios.put(`${baseURL}/recipe/${id}`, data, { headers });
        console.log(result);
        navigate('/');
        dispatch({ payload: result.data.data, type: "PUT_MENU_SUCCESS" });
    } catch (err) {
        console.error("error");
        dispatch({ payload: err.response.data.message, type: "PUT_MENU_FAILED" });
        console.error(err);
    }
};
export const updateProfile = (data, id, navigate) => async (dispatch) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in AsyncStorage');
    }
    const baseURL = 'https://kind-blue-sheep-boot.cyclic.app/';
    let headers = {
        headers: {
            "Content-Type" : "multipart/form-data",
            "Authorization" : `Bearer ${token}`
        }
    }
    try {
        dispatch({ type: "PUT_PROFILE_REQUEST" });
        const result = await axios.put(`${baseURL}/users/${id}`, data, { headers });
        console.log(result);
        navigate('/');
        dispatch({ payload: result.data.data, type: "PUT_PROFILE_SUCCESS" });
    } catch (err) {
        console.error("error");
        dispatch({ payload: err.response.data.message, type: "PUT_PROFILE_FAILED" });
        console.error(err);
    }
};
