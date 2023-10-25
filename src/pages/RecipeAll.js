import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMenu } from "../storages/actions/menu";
import axios from "axios";
import { Plane } from 'react-native-animated-spinkit'
import { useNavigation, useRoute } from '@react-navigation/native';



function RecipeAll({ navigation }) {

  const baseURL = `https://kind-blue-sheep-boot.cyclic.app/`; 
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInVzZXJuYW1lIjoicmFwIiwiZW1haWwiOiJyYW5nZ2FhcmRva2l0QGdtYWlsLmNvbSIsInBob3RvIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZG9hNjF1cmxxL2ltYWdlL3VwbG9hZC92MTY5MzM4MzM1OC9yZWNpcGUvZWd2cXZ1OWMxanB2ZGJ4eHFpbXMuanBnIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMzBUMTY6MTU6NTkuMDM2WiIsInJvbGUiOm51bGwsImlzX2FjdGl2ZSI6dHJ1ZSwiY2hlY2tlciI6IjJjZTMyYzc1LTZkZGMtNDM0MC04YmQ2LTJlNzZhMWYzMTQ4ZiIsImlhdCI6MTY5Mzk5MDQzOH0.4AP4de8Z9KkMOKfE-9VnL-O-IoHhoCf5Wpj-qEYYKUI`; // Token Anda
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  // const { itemId } = route.params;

  const fetchMenu = async () => {
    // const token = await AsyncStorage.getItem("token")
    try {
      const response = await axios.get(`${baseURL}/recipe`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response && response.data && response.data.data) {
        // Pastikan respons dan data tersedia sebelum mengakses data
        const menuItems = response.data.data;
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
        const result = await axios.delete(`${baseURL}recipe/${itemId}`,headers );
        console.log(result);
        
        dispatch({ payload: result.data.data, type: "DELETE_MENU_SUCCESS" });
    } catch (err) {
        console.error("error");
        dispatch({ payload: err.response.data.message, type: "DELETE_MENU_FAILED" });
        console.error(err);
    }
};

  useEffect(() => {
    fetchMenu(); // Panggil fungsi fetchMenu untuk mengambil data menu
  }, []);

  return (
    <ScrollView>
      <View>
        <Text style={{color:'black',fontSize:20,marginLeft:'auto',marginRight:'auto',marginTop:20,color:'#EFC81A'}}>
      Temukan Recipe yang anda inginkan
        </Text>
        </View>
      {isLoading ? (
        <View style={{justifyContent:'center',
        alignItems:'center',marginTop:100}}>

          <Plane size={48} color="black" />
        </View>
      ) : (
        menuData.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => console.log(item.id)}
          >
            <Image
              source={{ uri: item.photo }} // Ubah ini sesuai dengan format sumber gambar Anda
              style={{
                width: 150,
                height: 150,
                // marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 10,
                marginTop: 50,
                marginLeft:20,
                marginBottom:-40
              }}
            />
            <View style={{marginBottom:30}} >

            <Text style={{textAlign: 'right',marginTop:-80,marginRight:170,color:'black',fontWeight:'bold',marginBottom:20}}>Menu</Text>
            <Text style={{textAlign: 'left',marginLeft:205,color:'black'}}>{item.title}</Text>
            <Text style={{textAlign: 'left',marginLeft:205,color:'black',marginBottom:20}}>{item.author}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { itemId: item.id })}><Text style={{textAlign: 'right',marginRight:123,color:'black'}}>Detail Recipe</Text></TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

export default RecipeAll;
