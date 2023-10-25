import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const base_url = `https://kind-blue-sheep-boot.cyclic.app/`;

const dataDummy = {
  email: 'ranggaardokit@gmail.com',
  password: '123456',
};

export const postlogin = data => async (dispatch, getState) => {
  try {
    dispatch({type: 'LOGIN_REQUEST'});
    const result = await axios.post(base_url+`users/login`,data);
    console.log('result data ', result);
    await AsyncStorage.setItem('token', result.data.users.token);
    result.data && dispatch({type:'LOGIN_SUCCESS', payload:result.data})
    result.data && console.log('success')
    
  } catch (err) {
    console.log('err');
    console.log(err);
    console.log(err.response.data.message);
    dispatch({type: 'LOGIN_ERROR',payload:err.response.data.message});
  }
};

export const register = data => async (dispatch) => {
  try {
    dispatch({type: 'REGIS_REQUEST'});
    const result = await axios.post(base_url+`users/register`,data);
    console.log('result data ');
    console.log(result);
    result.data && dispatch({type:'REGIS_SUCCESS', payload:result.data})
    result.data && console.log('success')
    
  } catch (err) {
    console.log('err');
    console.log(err);
    console.log(err.response.data.message);
    dispatch({type: 'REGIS_ERROR',payload:err.response.data.message});
  }
};

export const logout = () => {
    return async(dispatch,getState) => {
      console.log(await AsyncStorage.getItem('token'));
        dispatch({type:"DELETE_TOKEN"})
    }
}