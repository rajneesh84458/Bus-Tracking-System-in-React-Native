import React, { Component } from 'react';
import { Text, View ,StatusBar,StyleSheet,Dimensions,TextInput,Button,Image,TouchableOpacity} from 'react-native';
import firebase from '../fireBase';


export default class adminInfoClass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            adminIDD: '',
            password: '',
        };
    }

    loginn = () => {


        firebase.firestore().collection("admin").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            //  
            if(doc.exists)
            {
              if((this.state.adminIDD == `${doc.data().adminID}`) && (this.state.password == `${doc.data().adminPass}`))
        {
          this.props.navigation.navigate("adminDetails")
        }
        // else
        // {
        //   alert("Error In Login")
        // }
            }
            else
            {
              alert("No such document!");
            }
          });
      }).catch(function(error) 
      {
          alert("Error getting document:", error);
      }
      );
       
      }
    
  render() {
    return (
      <View style={Styles.main}>
      <StatusBar 
        hidden = {true}
        showHideTransition = "slide"
        />
        <View style={Styles.image}>
            <Image source={require("../assets/admin1.png")} style={Styles.image_pic}/>
        </View>
        <View style={Styles.text}>
            <Text style={Styles.heading}>Login as Admin</Text>
        </View>
        <View style={Styles.input}>


            <TextInput style={Styles.input1} placeholder="Enter Email ID ..." placeholderTextColor="white" 
            onChangeText={(text) => {this.setState({ adminIDD: text });}}/>


            <TextInput style={Styles.input2} placeholder="Enter Password ..." placeholderTextColor="white" secureTextEntry={true}  
            onChangeText={(text) => {this.setState({ password: text });}}/>


            <View style={Styles.buttonWidth}>
                <Button title="Login" onPress={this.loginn} color="black" />
                <View style={Styles.touchable}>
                <Text>New User ? </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('registerStudent')} >
                  <Text style={Styles.textt}> Register Here</Text>
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