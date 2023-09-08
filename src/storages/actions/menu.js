import axios from "axios";
import { useSelector } from 'react-redux';

const baseURL = `https://kind-blue-sheep-boot.cyclic.app/`; 
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsInVzZXJuYW1lIjoic2hpbiIsImVtYWlsIjoicmFuZ2dhYXJkb2tpdDIzQGdtYWlsLmNvbSIsInBob3RvIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZG9hNjF1cmxxL2ltYWdlL3VwbG9hZC92MTY5MjE1MDE5NS9yZWNpcGUveHdyNzJ6bnZlejZxbWFidG50aWoucG5nIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMTZUMDk6NDM6MTYuMTE4WiIsInJvbGUiOm51bGwsImlzX2FjdGl2ZSI6dHJ1ZSwiY2hlY2tlciI6ImM3MDk5YWEyLTIyOTMtNDRlNS1hNzE1LTBlZDk3ZjIwZTFhZiIsImlhdCI6MTY5Mzk5MzM4Mn0.jhn-BDU_lv6iJMhjguR2FnHhluyk-5Hb2qXjAg5b7TY`;
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

export const fetchMenu = () => async (dispatch) => {
    // const token = await AsyncStorage.getItem("token")
    try {
        dispatch({type: 'GET_MENU_REQUEST'});
      const response = await axios.get(`${baseURL}/recipe`, {
        headers: { Authorization: `Bearer ${token}` }
      } );

      if (response && response.data && response.data.data) {
        // Pastikan respons dan data tersedia sebelum mengakses data
        const menuItems = response.data.data;
        dispatch({payload:result.data.data,type:"GET_MENU_SUCCESS"})
        setMenuData(menuItems);
        setIsLoading(false);
      } else {
        console.error("Data menu tidak tersedia dalam respons");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error fetching menu data:", err);
      setIsLoading(false);
    }
  };

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
