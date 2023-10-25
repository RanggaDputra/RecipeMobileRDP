// Import React and other necessary modules once
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Form } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux'; // Remove the duplicate import
import { logout, postlogin } from '../storages/actions/auth';
// import AddRecipe from '../pages/add-recipe';
import { Fumi } from 'react-native-textinput-effects';
import { Button } from '@rneui/themed';
import { Plane } from 'react-native-animated-spinkit'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';

function Login({ navigation }) {

  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });

  const postData = (e) => {
    e.preventDefault();
    dispatch(postlogin(inputData, navigation));
  };

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  return (
    <View>
      <View >
        <Image
          source={require('../asset/hiya.png')}
          style={{
            width: 420,
            height: 250,
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 10,
            marginBottom: 50,
          }}
        />
      </View>
      <Text style={{ textAlign: 'center', fontSize: 30, color: '#EFC81A',color:'black' }}>Welcome !</Text>
      <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 30,color:'black' }}>Log in to your existing account</Text>
        <Fumi
          // onChange={onChange}  
          onChangeText={text => setInputData({...inputData, email: text})}    
          value={inputData.email}
          label={'examplexxx@gmail.com'}
          iconClass={FontAwesomeIcon}
          iconName={'user'}
          iconColor={'#f95a25'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
        />
        <Fumi
          // onChange={onChange} 
          onChangeText={text => setInputData({...inputData, password: text})}
          value={inputData.password}
          label={'Password'}
          secureTextEntry
          iconClass={FontAwesomeIcon}
          iconName={'lock'}
          iconColor={'#f95a25'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={{ marginVertical: 10 }}
        />

      <Text style={{ textAlign: 'right', marginVertical: 20, marginRight: 15, fontSize: 15 }}>Forgot password ?</Text>
      <Button
        title="Login"
        containerStyle={{
          height: 40,
          width: 300,
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: 10,
        }}
        buttonStyle={{ backgroundColor: 'rgba(255, 193, 7, 1)' }}
        titleStyle={{
          color: 'white',
          marginHorizontal: 20,
        }}
        
        onPress={postData}
        // onPress={() => navigation.navigate('MyTabs')}
      />
      <Text>{login.isLoading &&  <Plane size={48} color="black"/>}</Text>
      {/* <Text>{login.messageError && login.messageError}</Text> */}
      <Text style={{ textAlign: 'center', marginVertical: 20, marginRight: 15, fontSize: 15,color:'black' }}>
        Don’t have an account?<TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={{color:'black'}}>Sign Up</Text></TouchableOpacity></Text>
    </View>
  );
}

export default Login;
