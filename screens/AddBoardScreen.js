import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput,Dimensions,Text,Button,StatusBar } from 'react-native';

import firebase from "../fireBase";

class AddBoardScreen extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('busInfo');
    this.state = {
      busNumber: '',
      isLoading: false,
    };
  }
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  saveBoard() {
    this.setState({
      isLoading: true,
    });
    this.ref.add({
      busNumber: this.state.busNumber,
      lat:"",
      long:""
    }).then((docRef) => {
      this.setState({
        busNumber: '',
        isLoading: false,
      });
      this.props.navigation.goBack();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <View style={styles.main}>
      <StatusBar 
        hidden = {true}
        showHideTransition = "slide"
        />
        <View style={styles.header}>
          <Text style={styles.textt}>Enter Bus Number</Text>
        </View>
        <View style={styles.listItems}>
        
        <View style={styles.subContainer}>
          <TextInput style={styles.Inputt}
              placeholder={'Enter Bus Number'}
              placeholderTextColor="white"
              value={this.state.busNumber}
              onChangeText={(text) => this.updateTextInput(text, 'busNumber')}
          />
        <View style={styles.button}>
          <Button title="Save" color="black" onPress={() => this.saveBoard()}/>
        </View>
        </View>     
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    width:Dimensions.get("window").width,
    height:Dimensions.get("window").height,
    backgroundColor: "rgb(46,204,113)"
  },
  header:{
    width:"100%",
    height:"10%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"white"
  },
  textt:{
    color:"black",
    fontSize: 25
  },
  listItems:{
    width:"100%",
    height:"90%",
  
  },
  Inputt:{
    borderWidth:1,
    borderColor:"white",
    width:"80%",
    height:"20%",
    color:"white",
    paddingLeft:"5%",
    fontSize:20
  },
  button:{
    width:"80%"
  },
  subContainer: {
    width:"100%",
    height:"50%",
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddBoardScreen;