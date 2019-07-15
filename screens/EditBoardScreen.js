import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from "../fireBase";

class EditBoardScreen extends Component {
  static navigationOptions = {
    title: 'Edit Board',
  };
  constructor() {
    super();
    this.state = {
      key: '',
      isLoading: true,
      busNumber:""
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('busInfo').doc(JSON.parse(navigation.getParam('boardkey')));
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          busNumber: board.title,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  updateBoard() {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    const updateRef = firebase.firestore().collection('busInfo').doc(this.state.key);
    updateRef.set({
      busNumber: this.state.busNumber,
    }).then((docRef) => {
      this.setState({
        key: '',
        busNumber:"",
        isLoading: false,
      });
      this.props.navigation.navigate('Board');
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
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Update Bus Number'}
              value={this.state.title}
              onChangeText={(text) => this.updateTextInput(text, 'busNumber')}
          />
        </View>
        <View style={styles.button}>
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
    );
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

export default EditBoardScreen;