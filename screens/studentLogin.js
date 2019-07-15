import React, { Component } from 'react';
import { Text, View ,StatusBar,StyleSheet,Dimensions,TextInput,Image,TouchableOpacity} from 'react-native';
import { Button } from 'native-base'
import firebase from '../fireBase';


export default class studentLoginClass extends Component {

    constructor(props) {
        super(props)
    
        this.state = ({
          email: '',
          password: ''
        })
      }
    
      componentDidMount() {
    
        firebase.auth().onAuthStateChanged((user) => {
          if (user != null) {
            console.log(user)
          }
        })
      }
    
      signUpUser = (email, password) => {
    
        try {
    
          if (this.state.password.length < 6) {
            alert("Please enter atleast 6 characters")
            return;
          }
    
          firebase.auth().createUserWithEmailAndPassword(email, password)
        }
        catch (error) {
          console.log(error.toString())
        }
      }
    
      loginUser = (email, password) => {
    
        try {
    
          firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
            console.log(user)
    
          })
        }
        catch (error) {
          console.log(error.toString())
        }
      }
    
      async loginWithFacebook() {
    
        //ENTER YOUR APP ID 
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('411601352743539', { permissions: ['public_profile','email'] })
    
        if (type == 'success') {
    
          const credential = firebase.auth.FacebookAuthProvider.credential(token)
    
          firebase.auth().signInWithCredential(credential).catch((error) => {
            console.log(error)
          })
          this.props.navigation.navigate("welcomeStudentScreen")
        }
      }  
    
  render() {
    return (
      <View style={Styles.main}>
      <StatusBar 
        hidden = {true}
        showHideTransition = "slide"
        />
        <View style={Styles.image}>
            <Image source={require("../assets/student.jpg")} style={Styles.image_pic}/>
        </View>
        <View style={Styles.text}>
            <Text style={Styles.heading}>Login to Track Bus</Text>
        </View>
        <View style={Styles.input}>
            <View style={Styles.buttonWidth}>
            <Button style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => this.loginWithFacebook()}>
            <Text style={{ color: 'white' }}> Login With Facebook</Text>
          </Button>
          <Button style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => this.props.navigation.goBack()}>
            <Text style={{ color: 'white' }}>Go Back</Text>
          </Button>
          

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
        backgroundColor: "rgb(92,157,237)"
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
       borderWidth:5 
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
        fontSize: 16,
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
        fontSize: 16,
        color:"white"
    },
    buttonWidth:{
        width:"50%"
    },
    textt:{
    
        color:"white"
      },
      touchable:{
        marginTop:"10%",
        flexDirection: 'row',
        justifyContent:"center"
      }
})