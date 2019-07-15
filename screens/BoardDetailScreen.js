import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View,Dimensions,StatusBar } from 'react-native';
import { List, ListItem, Text, Card, Button } from 'react-native-elements';
import firebase from "../fireBase";

class BoardDetailScreen extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      busInfo: {},
      key: ''
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('busInfo').doc(JSON.parse(navigation.getParam('boardkey')));
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          busInfo: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }
  deleteBoard(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    firebase.firestore().collection('busInfo').doc(key).delete().then(() => {
      console.log("Document successfully deleted!");
      this.setState({
        isLoading: false
      });
      navigation.navigate('Board');
    }).catch((error) => {
      console.error("Error removing document: ", error);
      this.setState({
        isLoading: false
      });
    });
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
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
        <Text style={styles.textt}>Edit Bus Number</Text>
      </View>
        <Card style={styles.container}>
          <View style={styles.subContainer}>
            <View style={styles.fetchData}>
              <Text h3>{this.state.busInfo.busNumber}</Text>
            </View>
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#CCCCCC'}
              leftIcon={{name: 'edit'}}
              title='Edit'
              onPress={() => {
                this.props.navigation.navigate('EditBoard', {
                  boardkey: `${JSON.stringify(this.state.key)}`,
                });
              }} />
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#999999'}
              color={'#FFFFFF'}
              leftIcon={{name: 'delete'}}
              title='Delete'
              onPress={() => this.deleteBoard(this.state.key)} />
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#999999'}
              color={'#FFFFFF'}
              leftIcon={{name: 'delete'}}
              title='Go Back'
              onPress={() => this.props.navigation.goBack()} />
          </View>
        </Card>
      </View>
     
    );
  }
}
const styles = StyleSheet.create({
  main:{
    width:Dimensions.get("window").width,
    height:Dimensions.get("window").height,
    backgroundColor: "rgb(26,188,156)"
  },

  header:{
    width:"100%",
    height:"10%",
 
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "white"
  },
  textt:{
    fontSize:25,
    color:"black"
  },
  container: {
    width:"100%",
    height:"90%",
    padding: 20,
    justifyContent:"center",
    alignItems:"center"
  },
  subContainer: {
    width:"100%",
    height:"20%",
    marginTop:"15%",
    paddingBottom: 20,
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
  detailButton: {
    marginTop: 10
  }
})

export default BoardDetailScreen;