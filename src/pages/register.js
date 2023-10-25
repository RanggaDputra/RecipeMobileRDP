import React, {useState, useEffect} from 'react';
import {View, Text,TouchableOpacity,Image, PermissionsAndroid, ScrollView,Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { logout, postlogin } from '../storages/actions/auth';
// import AddRecipe from '../pages/add-recipe';
import { Fumi } from 'react-native-textinput-effects';
import {register} from '../storages/actions/auth';
import { Button } from '@rneui/themed';
import * as ImagePicker from 'react-native-image-picker'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import axios from 'axios';


function Register ({}) {
  const login = useSelector((state)=>state.login)
  const [photo,setPhoto] = useState(null)
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {messageError, isError, isLoading} = useSelector(state => state.register);
  const [postResponse,setPostResponse] = useState(null)
  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: '',
    photo:''
  });



  const handleInput = (name, value) => {
    setInputData({...inputData, [name]: value});
  };

  // const handleSubmit = async () => {
  //   try {
  //     dispatch(register(inputData, navigation));
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSignin = () => {
    navigation.navigate('Loginn');
  };


  useEffect(()=>{
    console.log("res upload recipe ",postResponse)
    postResponse && navigation.navigate("Login")
},[postResponse])

  const requestPermission = async ()=> {
    try{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA, {
                title: "App Camera Permission",
                message: "App needs Camera Access",
                buttonPositive:"OK",
                buttonNegative:"cancel"
            }
        )
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
            console.log("access camera success")
            cameraLaunch()

        } else{
            console.log("access camera failed")
            console.log(PermissionsAndroid.RESULTS.GRANTED)
        }
    }catch(err){
        console.log("error")
        console.log(err)
    }
}
const cameraLaunch = () => {
  let options = {
      storageOptions: {
          skipBackup:true,
          path:"images"
      }
  }
  ImagePicker.launchCamera(options,(res)=>{
      console.log("response camera ", res)
      if(res.didCancel){
          console.log("user cancel camera picker")
      } else if(res.error){
          console.log("camera picker error ",res.errorMessage)
      } else{
          console.log(res)
          setPhoto(res.assets[0])
      }
  })
}
const galleryLaunch = () => {
  let options = {
      storageOptions: {
          skipBackup:true,
          path:"images"
      }
  }
  ImagePicker.launchImageLibrary(options,(res)=>{
      if(res.didCancel){
          console.log("user cancel camera picker")
      } else if(res.error){
          console.log("camera picker error ",res.errorMessage)
      } else{
          console.log(res)
          setPhoto(res.assets[0])
      }
  })
}

const register = async (event) => {
  // event.preventDefault();

  // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInVzZXJuYW1lIjoicmFwIiwiZW1haWwiOiJyYW5nZ2FhcmRva2l0QGdtYWlsLmNvbSIsInBob3RvIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZG9hNjF1cmxxL2ltYWdlL3VwbG9hZC92MTY5MzM4MzM1OC9yZWNpcGUvZWd2cXZ1OWMxanB2ZGJ4eHFpbXMuanBnIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMzBUMTY6MTU6NTkuMDM2WiIsInJvbGUiOm51bGwsImlzX2FjdGl2ZSI6dHJ1ZSwiY2hlY2tlciI6IjJjZTMyYzc1LTZkZGMtNDM0MC04YmDQmQ2LTJlNzZhMWYzMTQ4ZiIsImlhdCI6MTY5Mzk5NjMzNn0.KFz3H74e2BvI4IaI2iPTBnAWm6BHD35CFE9Ivd0_30w`; // Ganti dengan token yang sesuai
  const baseURL = 'https://kind-blue-sheep-boot.cyclic.app/'; // Ganti dengan URL API yang sesuai

  try {
    dispatch({ type: 'REGIS_REQUEST' });

    const formData = new FormData();
    formData.append('username', inputData.username);
    formData.append('email', inputData.email);
    formData.append('password', inputData.password);
    formData.append("photo", {uri:photo.uri,name:photo.fileName,type:photo.type})

    const result = await axios.post(`${baseURL}users/register`, formData);

    console.log(result)
      result.data && setPostResponse(result.data)

    dispatch({ payload: result.data.users, type: 'REGIS_SUCCESS' });
    setInputData({
      username: '',
      email: '',
      password: '',
      photo:'',
    });

    Alert.alert('Success', 'Register successfully!','Aktivasi dulu ya akunnya di GMAIL:)');
  } catch (err) {
    console.error('error');
    dispatch({ payload: err.response.data.message, type: 'REGIS_ERROR' });
    console.error(err);
  }
};



    return (
        <ScrollView>
<View >
        <View>
      
      <Image source={require('../asset/hiya.png')} style={{width:420,height:250,marginLeft:'auto',marginRight:'auto',borderRadius:10,marginBottom:50}} />
      </View>
      <Text style={{textAlign:'center',fontSize:30,color:'#EFC81A',color:'black'}}>Welcome !</Text>
      <Text style={{textAlign:'center',fontSize:20,marginBottom:30,color:'black'}}>Register to Recipe App</Text>
      <Fumi
  label={'myname'}
  iconClass={FontAwesomeIcon}
  iconName={'user'}
  iconColor={'#f95a25'}
  iconSize={20}
  iconWidth={40}
  inputPadding={16}
  onChangeText={(text) => setInputData({ ...inputData, username: text })}
  value={inputData.username}
  />
  <Fumi
  label={'examplexxx@gmail.com'}
  iconClass={FontAwesomeIcon}
  iconName={'user'}
  iconColor={'#f95a25'}
  iconSize={20}
  iconWidth={40}
  inputPadding={16}
  style={{marginVertical:10}}
  onChangeText={(text) => setInputData({ ...inputData, email: text })}
  value={inputData.email}
  />
  <View>
  <TouchableOpacity onPress={()=>requestPermission()}>
        <Text style={{color:'black'}}>Take Foto</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>galleryLaunch()}>
        <Text style={{color:'black'}}>Gallery Foto</Text>
    </TouchableOpacity>
    {photo && 
    <Image resizeMode='cover' style={{height:200,width:200,marginHorizontal:90}} source={{uri:photo.uri}} />
    }
  </View>
  <Fumi
  label={'Password'}
  iconClass={FontAwesomeIcon}
  iconName={'lock'}
  iconColor={'#f95a25'}
  iconSize={20}
  iconWidth={40}
  inputPadding={16}
  style={{marginVertical:10}}
  onChangeText={(text) => setInputData({ ...inputData, password: text })}
  value={inputData.password}
  />
  <Text style={{textAlign:'right',marginVertical:20,marginRight:15,fontSize:15,color:'black'}}>Forgot password ?</Text>
  
        <Button
            title="Register"
            onPress={photo ? ()=>register() : null}
            containerStyle={{
              height: 40,
              width: 300,
              marginLeft:'auto',
              marginRight:'auto',
              borderRadius:10
            }}
            buttonStyle={{ backgroundColor: 'rgba(255, 193, 7, 1)' }}
            titleStyle={{
              color: 'white',
              marginHorizontal: 20,
            }}
            // onPress={() => dispatch(postlogin())}
          />
  
        <Text style={{textAlign:'center',marginVertical:20,marginRight:15,fontSize:15}}>have an account?<TouchableOpacity onPress={() => navigation.navigate('Login')}><Text>Sign In</Text></TouchableOpacity></Text>
      </View>
        </ScrollView>
      
      
    );
  
  }

  export default Register;