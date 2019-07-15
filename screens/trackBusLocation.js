import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import firebase from "../fireBase";

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      key: '',
      isLoading: true,
      busNumber:"",
      location: null,
      errorMessage: null,
    };
  }
  c

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

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }

   
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    this.setState({ location });

    setInterval(update = () => {
      const { navigation } = this.props;
      const updateRef = firebase.firestore().collection('busInfo').doc(JSON.parse(navigation.getParam('boardkey')));

// Set the "capital" field of the city 'DC'
updateRef.update({
    lat:this.state.location.coords.latitude,
    long:this.state.location.coords.longitude
})
.then(function() {
    console.log("Document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
    },500)
    
  };

  render() {
    let text = 'Waiting..';
    let test = '';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = "LONGITUDE " + JSON.stringify(this.state.location.coords.longitude);//here is where magic happens
      test = "LATITUDE " + JSON.stringify(this.state.location.coords.latitude);//latitude = north south, longitude = east west
      
    } 
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
        <Text style={styles.paragraph}>{test}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
