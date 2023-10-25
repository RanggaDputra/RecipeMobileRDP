import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu, getMenuUsers } from '../storages/actions/menu';
import { useNavigation } from '@react-navigation/native';
// import AddRecipe from '../pages/add-recipe';
import axios from 'axios';
import { Fumi } from 'react-native-textinput-effects';
import { Button } from '@rneui/themed';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import { BackgroundImage, Input, Icon } from '@rneui/base';
import Toast from 'react-native-toast-message';



const MyRecipe = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInVzZXJuYW1lIjoicmFwIiwiZW1haWwiOiJyYW5nZ2FhcmRva2l0QGdtYWlsLmNvbSIsInBob3RvIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZG9hNjF1cmxxL2ltYWdlL3VwbG9hZC92MTY5MzM4MzM1OC9yZWNpcGUvZWd2cXZ1OWMxanB2ZGJ4eHFpbXMuanBnIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMzBUMTY6MTU6NTkuMDM2WiIsInJvbGUiOm51bGwsImlzX2FjdGl2ZSI6dHJ1ZSwiY2hlY2tlciI6IjJjZTMyYzc1LTZkZGMtNDM0MC04YmQ2LTJlNzZhMWYzMTQ4ZiIsImlhdCI6MTY5Mzk5MDQzOH0.4AP4de8Z9KkMOKfE-9VnL-O-IoHhoCf5Wpj-qEYYKUI`;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const login = useSelector((state) => state.login);
  const getMenuByUsers = useSelector((state) => state.getMenuByUser);
  const { data, isSuccess, isError } = getMenuByUsers;

  console.log('data');
  console.log(data);

  const deleteMenu = (itemId) => async (dispatch) => {
    const baseURL = `https://kind-blue-sheep-boot.cyclic.app/`;
    let headers = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${login.data.token}`
      }
    }
    try {
      dispatch({ type: "DELETE_MENU_PENDING" });
      const result = await axios.delete(`${baseURL}recipe/${itemId}`, headers);
      console.log(result);

      dispatch({ payload: result.data.data, type: "DELETE_MENU_SUCCESS" });
    } catch (err) {
      console.error("error");
      dispatch({ payload: err.response.data.message, type: "DELETE_MENU_FAILED" });
      console.error(err);
    }
  };

  useEffect(() => {
    dispatch(getMenuUsers(login.data.id));
  }, [dispatch, login.data.id]);
  return (

    <View>
      
      <Text style={{ fontSize: 20,marginLeft:20,color:"black" }}>
        {login.data.username}
      </Text>
      
      <View style={{ flexDirection: 'row',marginLeft:20 }}>

        <Text style={{ fontSize: 20 ,color:"black"}}>Recipe Yang anda punya </Text>
        <Text style={{ fontSize: 20 ,color:"black"}}>
          {data.length ? data.length : 0}
        </Text>
      </View>


      {isError ? (
        <Text style={{ textAlign: 'center', marginTop: 300,color:'black' }}>
          Recipe not found
        </Text>
      ) : (
        <View >
          {data && data.length > 0 ? (

            <FlatList
              marginBottom={200}
              data={data}
              renderItem={({ item }) => (

                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>
                  <View>
                    <Image
                      style={{ height: 100, width: 100, borderRadius: 10 }}
                      source={{ uri: item.photo }}
                    />
                  </View>
                  <View>
                    <Text onPress={() => navigation.navigate('DetailMenu', { itemId: item.id })} style={{ fontSize: 25, marginTop: 10, marginLeft: 20,color:"black" }}>{item.title}</Text>
                    <Text style={{ fontSize: 15, marginTop: 5, marginLeft: 20,color:"black" }} >{item.category}</Text>
                    <View style={{ flexDirection: 'row' }}>

                      <TouchableOpacity style={{ width: 80, marginLeft: 20 }} onPress={() => navigation.navigate('DetailMenu', { itemId: item.id })}><Text style={{ fontSize: 15, marginTop: 5, paddingLeft: 20, paddingVertical: 5, borderRadius: 5, backgroundColor: '#30C0F3', color: 'white' }}>Update</Text></TouchableOpacity>
                      <TouchableOpacity style={{ width: 80, marginLeft: 20 }} onPress={() => dispatch(deleteMenu(item.id, navigation))}><Text style={{ fontSize: 15, marginTop: 5, paddingLeft: 20, paddingVertical: 5, borderRadius: 5, backgroundColor: '#F57E71', color: 'white' }}>Delete</Text></TouchableOpacity>
                    </View>
                  </View>



                </View>


              )}
            />
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 300,color:'black' }}>
              Recipe not found
            </Text>
          )}
        </View>
      )}
    </View>
  )
}

export default MyRecipe;