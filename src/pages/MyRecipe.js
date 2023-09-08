import * as React from 'react';
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
import Toast from 'react-native-toast-message';

function MyRecipe ({}) {

    return(
      <View>
        <Text>aw</Text>
      </View>
    )
  }

  export default MyRecipe;