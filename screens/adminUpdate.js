import React,{Component} from 'react';
import {Text,View,StyleSheet,TextInput,ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import firebase from "../fireBase";

export default class adminUpdateClass extends Component{

    constructor() {
        super();
        this.state = {
            adminID:"",
            adminPass:""
        };
      }

    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
      }

    updateBoard() {
      
       
        const updateRef = firebase.firestore().collection('admin').doc('adminInfo');
        updateRef.set({
          adminID: this.state.adminID,
          adminPass:this.state.adminPass
        }).then((docRef) => {
          alert('Successfully Updated')
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }

    render(){
        return(
            <ScrollView style={styles.container}>
            <View style={styles.subContainer}>
              <TextInput
                  placeholder={'Update Admin ID'}
                  
                  onChangeText={(text) => this.updateTextInput(text, 'adminID')}
              />
            </View>
            <View style={styles.button}>
            <TextInput
                  placeholder={'Update Admin ID'}
                  
                  onChangeText={(text) => this.updateTextInput(text, 'adminPass')}
              />
              <Button
                large
                leftIcon={{name: 'update'}}
                title='Update'
                onPress={() => this.updateBoard()} />
            </View>
            <View style={styles.button}>
                <Button
                large
                leftIcon={{name: 'update'}}
                title='Go Back'
                onPress={() => this.props.navigation.goBack()} />
            </View>
          </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20
    },
    subContainer: {
      flex: 1,
      marginBottom: 20,
      padding: 5,
      borderBottomWidth: 2,
      borderBottomColor: '#CCCCCC',
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
  
  })