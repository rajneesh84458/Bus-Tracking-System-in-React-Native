import React, { Component } from 'react';
import { Text, View ,StatusBar,StyleSheet,Dimensions,TextInput,Button,Image,TouchableOpacity} from 'react-native';
import firebase from '../fireBase';

export default class registerStudentClass extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isAuthenticated: false,
        typedEmail: '',
        typedPassword: '',
        user: null,
    };
}

onRegister = () => {
  firebase.auth().createUserWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
      .then((loggedInUser) => {
          this.setState({ user: loggedInUser });
         this.props.navigation.navigate('studentLoginScreen')
      }).catch((error) => {
         alert(`Register fail with error: ${error}`);
      });
}

  render() {
    return (
      <View style={Styles.main}>
      <StatusBar 
        hidden = {true}
        showHideTransition = "slide"
        />
        <View style={Styles.image}>
            <Image source={require("../assets/admin.png")} style={Styles.image_pic}/>
        </View>
        <View style={Styles.text}>
            <Text style={Styles.heading}>Register Yourself</Text>
        </View>
        <View style={Styles.input}>
            <TextInput style={Styles.input1} placeholder="Enter your email ..." placeholderTextColor="white" keyboardType='email-address' 
            onChangeText={(text) => {this.setState({ typedEmail: text });}} />

            <TextInput style={Styles.input2} placeholder="Enter Password ..." placeholderTextColor="white" secureTextEntry={true}   
            onChangeText={(text) => {this.setState({ typedPassword: text });}}/>

            <View style={Styles.buttonWidth}>
                <Button title="Register" onPress={this.onRegister} color="black" />
                <View style={Styles.touchable}>
                <Text>Already Member ?</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('studentLoginScreen')} >
                  <Text style={Styles.textt}> Login Here</Text>
                </TouchableOpacity>
                </View>
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
       
        paddingTop: "20%",
        backgroundColor: "rgb(247,108,130)"
    },
    image:{
        width:"100%",
        height:"40%",
        justifyContent: 'center',
        alignItems:"center",
       
    },
    image_pic:{
       width:"50%",
       height:"90%",
       borderRadius: 100,
       borderColor:"white",
       borderWidth:5,
       backgroundColor:"white" 
    },
    text:{
        width:"100%",
        height:"10%",
      
        justifyContent: "center"
    },
    heading:{
        textAlign:"center",
        fontSize:25,
        // fontFamily: "sans-serif-light",
        color:"white"
    },
    input:{
        width:"100%",
     
        alignItems: "center",
        height:"40%"
    },
    input1:{
        width:"80%",
        height:"30%",
        borderWidth:1,
        borderColor:"white",
        marginTop: 10,
        paddingLeft: 10,
        fontSize: 20,
        color:"white"
    },
    input2:{
        width:"80%",
        height:"30%",
        borderWidth:1,
        borderColor:"white",
        marginTop: 10,
        marginBottom: 20,
        paddingLeft: 10,
        fontSize: 20,
        color:"white"
    },
    buttonWidth:{
        width:"50%"
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
      textt:{
    
        color:"white"
      },
      touchable:{
        marginTop:"10%",
        flexDirection: 'row',
        
      }
})

console.disableYellowBox = true;