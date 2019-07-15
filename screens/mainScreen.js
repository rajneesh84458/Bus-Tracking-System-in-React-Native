import React, { Component } from 'react';
import { Text, View, Dimensions,StyleSheet,Image,Button,StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class mainScreenClass extends Component {


  render() {
    return (
       <View style={Styles.main}>
       <StatusBar 
        hidden = {true}
        showHideTransition = "slide"
        />
          <View style={Styles.info}>
            <View style={Styles.logo}>
              <Image source={require('../assets/icon2.png')} style={Styles.logo_Style}/>
            </View>
            <View style={Styles.appName}>
              <Text style={Styles.appNameText}>LocBus</Text>
            </View>
          </View>
          <View style={Styles.buttonContainer}>
           <View style={Styles.buttonWidth}>
           <Button style={Styles.buttonFirst} color="black" title="Login" onPress={() => this.props.navigation.navigate('studentLoginScreen')}/>
            <Button title="Add Bus" color="black" onPress={() => this.props.navigation.navigate('adminInfo')}/>
            <Button title="Enter Bus Number" color="black" onPress={() => this.props.navigation.navigate('busNumber')}/>
           </View>
          </View>
        </View>
    )
  }
}

const Styles = StyleSheet.create({
    main:{
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
      backgroundColor: "rgb(71,206,192)"
    },
    info:{
      width:"100%",
      height:"60%",
      
    },
    logo:{
      width:"100%",
      height:"75%",
     
      justifyContent: "center",
      alignItems: "center",
      padding:"1%"
    },
    logo_Style:{
      height:"65%",
      width:"40%"
    },
    appName:{
      width:"100%",
      height:"20%", 
      justifyContent: "center",
     
    },
    appNameText:{
      fontSize:70,
      // fontFamily: "sans-serif-light",
      marginLeft: "5%",
      color:"white",
      textAlign: "center"
    },
    buttonContainer:{
      width:"100%",
      height:"40%",
    
      marginTop:"5%",
      justifyContent: "center",
      alignItems: "center"
    },
    buttonWidth:{
        width:"60%",
        height:"80%",
        justifyContent: 'space-around',
        
    },
    buttonFirst:{
        
    }
  })
  