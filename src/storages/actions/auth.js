import axios from 'axios';

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
    result.data && dispatch({type:'LOGIN_SUCCESS', payload:result.data})
    result.data && console.log('success')
    
  } catch (err) {
    console.log('err');
    console.log(err);
    console.log(err.response.data.message);
    dispatch({type: 'LOGIN_ERROR',payload:err.response.data.message});
  }
};

export const logout = () => {
    return(dispatch,getState) => {
      // console.log('get token',getState().login.data.token)
        dispatch({type:"DELETE_TOKEN"})
    }
}