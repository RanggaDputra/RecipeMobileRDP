import * as React from 'react';
import {View, Text,TouchableOpacity,Image,Span} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { logout, postlogin } from '../storages/actions/auth';
// import AddRecipe from '../pages/add-recipe';
import { Fumi } from 'react-native-textinput-effects';
import { Button } from '@rneui/themed';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';



function Register ({navigation}) {

    return (
        
      <View >
        <View>
      
      <Image source={require('../asset/hiya.png')} style={{width:420,height:250,marginLeft:'auto',marginRight:'auto',borderRadius:10,marginBottom:50}} />
      </View>
      <Text style={{textAlign:'center',fontSize:30,color:'#EFC81A'}}>Welcome !</Text>
      <Text style={{textAlign:'center',fontSize:20,marginBottom:30}}>Register to Recipe App</Text>
      <Fumi
  label={'myname'}
  iconClass={FontAwesomeIcon}
  iconName={'user'}
  iconColor={'#f95a25'}
  iconSize={20}
  iconWidth={40}
  inputPadding={16}
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
  />
  <Fumi
  label={'Password'}
  iconClass={FontAwesomeIcon}
  iconName={'lock'}
  iconColor={'#f95a25'}
  iconSize={20}
  iconWidth={40}
  inputPadding={16}
  style={{marginVertical:10}}
  />
  <Text style={{textAlign:'right',marginVertical:20,marginRight:15,fontSize:15}}>Forgot password ?</Text>
  
        <Button
            title="Register"
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
      
    );
  
  }

  export default Register;