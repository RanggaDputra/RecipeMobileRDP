import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { logout, postlogin } from '../storages/actions/auth';
import { useNavigation } from '@react-navigation/native';
// import AddRecipe from '../pages/add-recipe';
import { Fumi } from 'react-native-textinput-effects';
import { Button } from '@rneui/themed';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import { BackgroundImage, Input, Icon } from '@rneui/base';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.menu);

 





  const handleSearch = () => {
    navigation.navigate('Search');
  };



  return (

    <View>
      <Fumi
        label={'Search Pasta, Bread, etc'}
        iconClass={FontAwesomeIcon}
        onPress={handleSearch}
        iconName={'search'}
        iconColor={'#f95a25'}
        iconSize={20}
        iconWidth={40}
        zIndex={-10}
        inputPadding={16}
        // onChangeText={(value) => setSearch(value)}
        // value={search}
        style={{ marginVertical: 20, marginHorizontal: 20, borderRadius: 10,width:350 }}
      />
      <TouchableOpacity
        onPress={handleSearch}
        style={{
          backgroundColor: 'transparent',
          borderRadius: 6,
          height: 50,
          width: 390,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -80,
          zIndex:100
        }}>
      </TouchableOpacity>

      <Text style={{ marginLeft: 20, marginTop: 30, fontSize: 20, color: 'black', fontWeight: 'bold' }}>Popular Recipe</Text>
      <Text style={{ marginLeft: 20, fontSize: 15, color: 'black', fontWeight: 'bold' }}>Popular Cheeck</Text>
     
      
      <ScrollView
        horizontal={true}
        style={styles.carousel}
        showsHorizontalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.navigate('RecipeAll')}>
          <View style={styles.box}>
            <BackgroundImage source={require('../asset/gado.png')} style={styles.Img} />
            <Text style={styles.textImg}>Gado-gado</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RecipeAll')}>
          <View style={styles.box}>
            <BackgroundImage source={require('../asset/nasgor.jpg')} style={styles.Img} />
            <Text style={styles.textImg}>Nasi Goreng</Text>

          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RecipeAll')}>
          <View style={styles.box}>
            <BackgroundImage source={require('../asset/sate.jpeg')} style={styles.Img} />
            <Text style={styles.textImg}>Sate Ayam</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* aw */}


      <Text style={{ marginLeft: 20, marginTop: 30, fontSize: 20, color: 'black', fontWeight: 'bold' }}>New Recipe</Text>
      <TouchableOpacity onPress={() => navigation.navigate('AddRecipe')}><Text style={{textAlign:'right',marginRight:20,color:'blue',fontWeight:'bold',marginTop:-20}}>ADD YOUR RECIPE</Text></TouchableOpacity>
      <ScrollView
        horizontal={true}
        style={styles.carousel}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.IconCont1}>
          <View style={styles.square}>
            <BackgroundImage source={require('../asset/Icon2.png')} style={styles.Icon} />
          </View>
          <Text style={{ marginTop: 5, fontSize: 15 }}>Soup</Text>
        </View>
        <View style={styles.IconCont}>
          <View style={styles.square}>
            <BackgroundImage source={require('../asset/Icon1.png')} style={styles.Icon} />
          </View>
          <Text style={{ marginTop: 5, fontSize: 15 }}>Chicken</Text>
        </View>
        <View style={styles.IconCont}>
          <View style={styles.square}>
            <BackgroundImage source={require('../asset/Icon3.png')} style={styles.Icon} />
          </View>
          <Text style={{ marginTop: 5, fontSize: 15 }}>Seafood</Text>
        </View>
        <View style={styles.IconCont}>
          <View style={styles.square}>
            <BackgroundImage source={require('../asset/Icon1.png')} style={styles.Icon} />
          </View>
          <Text style={{ marginTop: 5, fontSize: 15 }}>Dessert</Text>
        </View>
      </ScrollView>

      {/*  */}
      <Text style={{ marginLeft: 20, marginTop: 30, fontSize: 20, color: 'black', fontWeight: 'bold' }}>Popular For You</Text>
      <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen')}><Text style={{textAlign:'right',marginRight:20,color:'blue',fontWeight:'bold',marginTop:-20}}>MORE INFO</Text></TouchableOpacity>
      <View>
        <ScrollView
        
          horizontal={true}
          style={styles.carousel}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.box1} marginBottom={50}>
            <BackgroundImage source={require('../asset/parfait.jpg')} style={styles.Img1} />
            <View style={styles.headTitle}>
              <Text style={{ fontSize: 16, fontWeight: '900', marginLeft: 10,color:"black" }}>
                Parfrait Fruit
              </Text>
              <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 10,color:"black" }}>
                Parfaits are made of fruit...
              </Text>
            </View>
          </View>
          <View style={styles.box1}>
            <BackgroundImage source={require('../asset/straw.jpeg')} style={styles.Img1} />
            <View style={styles.headTitle}>
              <Text style={{ fontSize: 16, fontWeight: '900', marginLeft: 10,color:"black" }}>
                Strawberry Shortcake
              </Text>
              <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 10,color:"black" }}>
                This Shortcake made with...
              </Text>
            </View>
          </View>
          <View style={styles.box1}>
            <BackgroundImage source={require('../asset/carbonara.jpeg')} style={styles.Img1} />
            <View style={styles.headTitle}>
              <Text style={{ fontSize: 16, fontWeight: '900', marginLeft: 10,color:"black" }}>
                Spaghetti Carbonara
              </Text>
              <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 10,color:"black" }}>
                Delicious health food is...
              </Text>
            </View>
          </View>
          
        </ScrollView>
        {/* <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}><Text style={{textAlign: 'right',marginRight:123,color:'black'}}>Home</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AddRecipe')}><Text style={{textAlign: 'right',marginRight:123,color:'black'}}>Add Recipe</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen')}><Text style={{textAlign: 'right',marginRight:123,color:'black'}}>Detail</Text></TouchableOpacity>
          </View> */}
      </View>

      {/* <TouchableOpacity style={{backgroundColor:"red", width:120,height:30,borderRadius:20,justifyContent:'center',alignItems:'center',margin:20}} onPress={() => dispatch(logout())} >
        <Text style={{color:"white",fontSize:20,fontWeight:'800'}}>LOGOUT</Text>
      </TouchableOpacity> */}
    </View>

  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFCFC',
    flex: 1,
    alignItems: 'center',
  },

  row: {
    alignItems: 'flex-start',
    width: screenWidth,
    paddingLeft: 30,
    marginTop: 20,
    // overflow: 'visible',
  },

  carousel: {
    flexDirection: 'row',
    marginTop: 15,
    // height: 200,
    // overflow: 'visible',
  },

  box: {
    width: 260,
    height: 158,
    backgroundColor: 'lightgray',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },

  box1: {
    width: 180,
    height: 140,
    backgroundColor: 'lightgray',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 20, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },

  square: {
    width: 70,
    height: 70,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    // marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },

  Img: {
    width: 260,
    height: 158,
    position: 'absolute',
  },

  Img1: {
    width: 180,
    height: 140,
    position: 'absolute',
  },

  textImg: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginLeft: 20,
    marginBottom: 14,
  },

  Icon: {
    width: 75,
    height: 75,
    position: 'absolute',
  },

  IconCont: {
    alignItems: 'center',
    marginRight: 20,
  },
  IconCont1: {
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 35
  },

  headTitle: {
    width: 180,
    height: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 0,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  head: {
    width: 395,
    height: 308,
    backgroundColor: '#EEC302',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cover: {
    width: 370,
    height: 530,
    backgroundColor: 'white',
    marginTop: 250,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    flexDirection: 'column',
  },

  ImgProfile: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },

  bar: {
    width: 370,
    height: 70,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  barLeft: {
    // width: 150,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
  },

  barRight: {
    // width: 100,
    alignItems: 'center',
    flexDirection: 'row',
  },
});