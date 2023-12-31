import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, PermissionsAndroid, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'react-native-image-picker'
import axios from 'axios';

function AddRecipe({ navigation }) {
  const login = useSelector((state)=>state.login)
  const [photo,setPhoto] = useState(null)
  const dispatch = useDispatch();
  const [postResponse,setPostResponse] = useState(null)
  const [inputData, setInputData] = useState({
    title: '',
    ingredients: '',
    category_id: '1',
    photo:''
  });
  let headers = {
    headers: {
        "Content-Type" : "multipart/form-data",
        "Authorization" : `Bearer ${login.data.token}`
    }
}

  useEffect(()=>{
    console.log("res upload recipe ",postResponse)
    postResponse && navigation.navigate("Home")
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

  const uploadRecipe = async (event) => {
    // event.preventDefault();

    // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInVzZXJuYW1lIjoicmFwIiwiZW1haWwiOiJyYW5nZ2FhcmRva2l0QGdtYWlsLmNvbSIsInBob3RvIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZG9hNjF1cmxxL2ltYWdlL3VwbG9hZC92MTY5MzM4MzM1OC9yZWNpcGUvZWd2cXZ1OWMxanB2ZGJ4eHFpbXMuanBnIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMzBUMTY6MTU6NTkuMDM2WiIsInJvbGUiOm51bGwsImlzX2FjdGl2ZSI6dHJ1ZSwiY2hlY2tlciI6IjJjZTMyYzc1LTZkZGMtNDM0MC04YmDQmQ2LTJlNzZhMWYzMTQ4ZiIsImlhdCI6MTY5Mzk5NjMzNn0.KFz3H74e2BvI4IaI2iPTBnAWm6BHD35CFE9Ivd0_30w`; // Ganti dengan token yang sesuai
    const baseURL = 'https://kind-blue-sheep-boot.cyclic.app/'; // Ganti dengan URL API yang sesuai

    try {
      dispatch({ type: 'POST_MENU_PENDING' });

      const formData = new FormData();
      formData.append('title', inputData.title);
      formData.append('ingredients', inputData.ingredients);
      formData.append('category_id', inputData.category_id);
      formData.append("photo", {uri:photo.uri,name:photo.fileName,type:photo.type})

      const result = await axios.post(`${baseURL}recipe`, formData,headers);

      console.log(result)
        result.data && setPostResponse(result.data)

      dispatch({ payload: result.data.data, type: 'POST_MENU_SUCCESS' });
      setInputData({
        title: '',
        ingredients: '',
        category_id: '',
        photo:'',
      });

      Alert.alert('Success', 'Recipe posted successfully!');
    } catch (err) {
      console.error('error');
      dispatch({ payload: err.response.data.message, type: 'POST_MENU_FAILED' });
      console.error(err);
    }
  };

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 30, color: '#EFC81A', marginTop: 40, marginBottom: 20 }}>ADD YOUR RECIPE</Text>
      <TextInput
        style={[styles.input,{color:'black'}]}
        onChangeText={(text) => setInputData({ ...inputData, title: text })}
        value={inputData.title}
        placeholder="Title"
      />
      <TextInput
        style={[styles.input, { height: 100,color:'black' }]}
        multiline
        onChangeText={(text) => setInputData({ ...inputData, ingredients: text })}
        value={inputData.ingredients}
        placeholder="Ingredients"
      />
      

      <TouchableOpacity onPress={()=>requestPermission()}>
        <Text style={{color:'black'}}>Take Foto</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>galleryLaunch()}>
        <Text style={{color:'black'}}>Gallery Foto</Text>
    </TouchableOpacity>
    {photo && 
    <Image resizeMode='cover' style={{height:200,width:200,marginHorizontal:90}} source={{uri:photo.uri}} />
    }

      
      {/* Input untuk Category */}
      <TextInput
        style={[styles.input,{color:'black'}]}
        onChangeText={(text) => setInputData({ ...inputData, category_id: text })}
        value={inputData.category_id}
        placeholder="Category"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={photo ? ()=>uploadRecipe() : null}
      >
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'rgba(255, 193, 7, 1)',
    height: 40,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default AddRecipe;
