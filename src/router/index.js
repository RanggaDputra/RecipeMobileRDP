import React, { useState, useEffect } from 'react';
import {View, Text,TouchableOpacity,Image,ScrollView,StyleSheet,Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { logout, postlogin } from '../storages/actions/auth';
import {useNavigation} from '@react-navigation/native';
// import AddRecipe from '../pages/add-recipe';
import { Fumi } from 'react-native-textinput-effects';
import { Button } from '@rneui/themed';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import {BackgroundImage,Input,Icon} from '@rneui/base';
import { Plane } from 'react-native-animated-spinkit'
import Login from '../pages/login'
import Register from '../pages/register'
import HomeScreen from '../pages/home'
import RecipeAll from '../pages/RecipeAll';
import AddRecipe from '../pages/AddRecipe';
import MyRecipe from '../pages/MyRecipe';
import DetailsScreen from '../pages/DetailScreen';
import DetailMenu from '../pages/DetailMenu';
import Detail from '../pages/detail';
import SplashScreen from '../pages/SplashScreen';
import Profile from '../pages/Profile';
import Search from '../pages/Search';

const screenWidth = Dimensions.get('window').width;
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs({}){
  
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Tab.Navigator screenOptions={{headerShown:false}} style={{display:'none'}} >
        <Tab.Screen  name="Home" component={HomeScreen} options={{
          tabBarIcon: ()=> (<Ionicons style={{color:"black"}} name='home' size={30}/>)
        }}/>
        <Tab.Screen name="DetailsScreen" component={DetailsScreen} options={{
          tabBarIcon: ()=> (<Ionicons style={{color:"black"}} name='apps-outline' size={30}/>)
        }}/>

    </Tab.Navigator>
  );
}


function Router() {
  const login = useSelector((state) => state.login);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {login.data ? (
          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyRecipe"
          component={MyRecipe}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailMenu"
          component={DetailMenu}
          options={({ route }) => ({ title: `Menu Detail ${route.params.itemId}` })}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={({ route }) => ({ title: `Menu Detail Recipe ${route.params.itemId}` })}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: 'Register',headerShown: false }}
        />
        <Stack.Screen
          name="AddRecipe"
          component={AddRecipe}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecipeAll"
          component={RecipeAll}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default Router;