import * as React from 'react';
import {View, Text,TouchableOpacity,Image,ScrollView,StyleSheet,Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { logout, postlogin } from '../storages/actions/auth';
import {useNavigation,useRoute} from '@react-navigation/native';
// import AddRecipe from '../pages/add-recipe';
import { Fumi } from 'react-native-textinput-effects';
import { Button } from '@rneui/themed';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import {BackgroundImage,Input,Icon} from '@rneui/base';
import Toast from 'react-native-toast-message';


const screenWidth = Dimensions.get('window').width;
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function DetailsScreen() {
  const dispatch = useDispatch();
    const navigation = useNavigation();
    const login = useSelector((state) => state.login);
    const route = useRoute();
    
    let headers = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${login.data.token}`
        }
    };
    const getProfilDetailById = (itemId) => async (dispatch) => {
      const baseURL = `https://kind-blue-sheep-boot.cyclic.app/`; 

      try {
          dispatch({ type: "DETAIL_MENU_PENDING" });
          const result = await axios.get(`${baseURL}users/${itemId}`,headers );
          dispatch({ payload: result.data.data, type: "DETAIL_MENU_SUCCESS" });
      } catch (err) {
          console.error("error");
          dispatch({ payload: err.response, type: "DETAIL_MENU_FAILED" });
          console.error(err);
      }
  };
  const { data, isLoading, error } = useSelector((state) => state.login);
  
    const handleLogout = () => {
      Toast.show({
        type: 'success',
        text1: 'Anda berhasil logout',
        visibilityTime: 2000, // Durasi tampilan toast dalam milidetik (opsional)
      });
  
      // Lakukan tindakan logout atau penanganan lainnya di sini
      // Pastikan untuk membersihkan data login saat logout
      dispatch(logout());
  
      // Setelah logout, ganti navigasi ke "Login"
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Login' }],
      // });
  
      // Atau alternatif, Anda dapat menggunakan navigation.navigate('Login');
    };
    return (
      <View style={styles.container}>
        {data &&(

        <View style={styles.head}>
          <Image source={{ uri: data.photo }} style={styles.ImgProfile} />
          <Text
            style={{
              fontSize: 25,
              fontWeight: '800',
              color: 'white',
              marginTop: 10,
              marginBottom: 20,
            }}>
            {data.username}
          </Text>
        </View>
         )}
        <View style={styles.cover}>
          <View style={styles.bar}>
            <View style={styles.barLeft}>
              <Icon
                marginLeft={20}
                marginRight={20}
                type="feather"
                name="user"
                size={35}
                color="rgba(239, 200, 26, 1)"
              />
              <Text style={{color: 'rgba(0, 0, 0, 0.70);', fontSize: 20}}>
                Edit Profile
              </Text>
            </View>
            <View style={styles.barRight}>
              <Icon
                marginRight={20}
                type="feather"
                name="chevron-right"
                size={35}
                color="#8C8C8C"
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('MyRecipe')}>
          <View style={styles.bar}>
            <View style={styles.barLeft}>
              <Icon
                marginLeft={20}
                marginRight={20}
                type="feather"
                name="award"
                size={35}
                color="rgba(239, 200, 26, 1)"
              />
              <Text style={{color: 'rgba(0, 0, 0, 0.70);', fontSize: 20}}>
                My Recipe
              </Text>
            </View>
            <View style={styles.barRight}>
              <Icon
                marginRight={20}
                type="feather"
                name="chevron-right"
                size={35}
                color="#8C8C8C"
              />
            </View>
          </View>
          </TouchableOpacity>
          <View style={styles.bar}>
            <View style={styles.barLeft}>
              <Icon
                marginLeft={20}
                marginRight={20}
                type="feather"
                name="bookmark"
                size={35}
                color="rgba(239, 200, 26, 1)"
              />
              <Text style={{color: 'rgba(0, 0, 0, 0.70);', fontSize: 20}}>
                Saved Recipe
              </Text>
            </View>
            <View style={styles.barRight}>
              <Icon
                marginRight={20}
                type="feather"
                name="chevron-right"
                size={35}
                color="#8C8C8C"
              />
            </View>
          </View>
          <View style={styles.bar}>
            <View style={styles.barLeft}>
              <Icon
                marginLeft={20}
                marginRight={20}
                type="feather"
                name="thumbs-up"
                size={35}
                color="rgba(239, 200, 26, 1)"
              />
              <Text style={{color: 'rgba(0, 0, 0, 0.70);', fontSize: 20}}>
                Liked Recipe
              </Text>
            </View>
            <View style={styles.barRight}>
              <Icon
                marginRight={20}
                type="feather"
                name="chevron-right"
                size={35}
                color="#8C8C8C"
              />
            </View>
          </View>
          <View style={styles.bar}>
            <View style={styles.barLeft}>
              <Icon
                marginLeft={20}
                marginRight={20}
                type="feather"
                name="log-out"
                size={35}
                color="#ff6666"
              />
              <Text
                style={{color: '#ff6666', fontSize: 20}}
                onPress={handleLogout}>
                Logout
              </Text>
            </View>
            <View style={styles.barRight}></View>
          </View>
        </View>
        <Toast />
      </View>
    );
  }
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
      shadowOffset: {width: 20, height: 10},
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
    IconCont1:{
      alignItems: 'center',
      marginRight: 20,
      marginLeft:35
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
  export default DetailsScreen;
