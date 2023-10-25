import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { logout, postlogin } from '../storages/actions/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Fumi } from 'react-native-textinput-effects';
import { Button } from '@rneui/themed';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import { BackgroundImage, Input, Icon } from '@rneui/base';
import Toast from 'react-native-toast-message';
import axios from 'axios';

function Detail({ }) {
    const [menuData, setMenuData] = useState([]);
    const login = useSelector((state) => state.login);
    const route = useRoute();
    const dispatch = useDispatch();
    const { itemId } = route.params;
    let headers = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${login.data.token}`
        }
    };
    
    useEffect(() => {
        console.log(itemId);
        dispatch(getMenuDetail(itemId));
    }, []);

    const getMenuDetail = (id) => async (dispatch) => {
        const baseURL = 'https://kind-blue-sheep-boot.cyclic.app/';
        try {
            dispatch({ type: "DETAIL_MENU_PENDING" });
            const result = await axios.get(`${baseURL}/recipe/${id}`, headers);
            dispatch({ payload: result.data.data, type: "DETAIL_MENU_SUCCESS" });
        } catch (err) {
            console.error("error");
            dispatch({ payload: err.response, type: "DETAIL_MENU_FAILED" });
            console.error(err);
        }
    };

    // Menampilkan data yang diterima dari permintaan Axios
    const { data, isLoading, error } = useSelector((state) => state.detailMenu); // Pastikan ini sesuai dengan state Anda

    return (
        <View>
            {isLoading && <Text>Loading...</Text>}
            {error && <Text>Error: {error.message}</Text>}
            {data && (
                <View>
                    <Image
              source={{ uri: data.photo }} // Ubah ini sesuai dengan format sumber gambar Anda
              style={{
                width: 220,
                height: 150,
                marginTop: 30,
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 10,
                marginBottom: 50,
              }}
            />
            <View style={{marginLeft:50}}>

                    <Text style={{color:'black'}}>Nama Menu: {data.title}</Text>
                    <Text style={{color:'black'}}>Ingredients: {data.ingredients}</Text>
            </View>
                  
                </View>
            )}
        </View>
    );
}

export default Detail;
