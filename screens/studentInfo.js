import React, { Component } from 'react';
import { Text, View, StyleSheet,Dimensions,Image,BackHandler,Alert,Button,StatusBar } from 'react-native';

import firebase from '../fireBase';


export default class studentInfoClass extends Component {

  constructor(props) {
 
    super(props);
 
    this.back_Button_Press = this.back_Button_Press.bind(this);
 
  }

  signOutUser =  () => {
    this.props.navigation.navigate('studentLoginScreen')
    firebase.auth().signOut();
}

  componentWillMount() {
 
    BackHandler.addEventListener('hardwareBackPress', this.back_Button_Press);
  }
 
  componentWillUnmount() {
 
    BackHandler.removeEventListener('hardwareBackPress', this.back_Button_Press);
  }
 
  back_Button_Press = () => {
 
    
    Alert.alert(
      ' Exit From App ',
      ' Do you want to exit From App ?',
      [
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
        { text: 'No', onPress: () => console.log('NO Pressed') }
      ],
      { cancelable: false },
    );

    return true;
  }

  render() {
    return (    
         <View style={Styles.main}>
         <StatusBar 
        hidden = {true}
        showHideTransition = "slide"
        />
            <View style={Styles.main2}>
              <View style={Styles.pic}>
                <Image source={require("../assets/student2.png")} style={Styles.image_pic}/>
              </View>
              <View style={Styles.text}>
                <Text style={Styles.textt}>Welcome Student</Text>
                <View style={Styles.logoutButton}>
                  <Button title="Logout" color="black" onPress={this.signOutUser}/>
                </View>
              </View>
            </View>
         </View>
    )
  }
}

const Styles = StyleSheet.create(
  {
    main:{
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
      backgroundColor:"rgb(245,192,92)"
    },
    main2:{
      width:"100%",
      height:"92%",
      justifyContent:"center",
      alignItems:"center"
    },
    pic:{
      width:"100%",
      height:"60%",
      justifyContent:"center",
      alignItems:"center",
    
    
    },
    text:{
      width:"100%",
      height:"20%",
      

      justifyContent:"center",
      alignItems:"center",
      
    },
    textt:{
      textAlign:"center",
      fontSize:30,
      color:"white"
    },
    image_pic:{
      width:"70%",
      height:"70%",
      borderRadius: 150,
      borderColor:"white",
      borderWidth:5,
      backgroundColor:"white" 
   },
   logoutButton:{
     width:"50%",
     marginTop:"5%"
   }
  }
)