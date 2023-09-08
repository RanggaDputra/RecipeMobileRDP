import { StyleSheet, Text, View,Image } from 'react-native'
import React, { Component } from 'react'

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.navigate('Login')
        },5000)
    }
    render(){
        return(
            <View>
                 <Image source={require('../asset/image15.png')} style={{width:420,height:900,objectFit:'cover'}} />
                 <Image source={require('../asset/23.png')} style={{marginTop:-600,marginLeft:'auto',marginRight:'auto'}} />
                <Text style={{fontSize:40,textAlign:'center',color:'#EFC81A',fontWeight:'bold'}}>..Welcome..</Text>
            </View>
        )
    }
}

export default SplashScreen

const styles = StyleSheet.create({})