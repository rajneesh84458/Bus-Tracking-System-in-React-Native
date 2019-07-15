import React, { Component } from 'react';
import { StyleSheet, ScrollView, StatusBar, View, Text,Dimensions,TouchableOpacity,ActivityIndicator } from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';
import { MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from "../fireBase";

class BoardScreen extends Component {
 
  constructor() {
    super();
    this.ref = firebase.firestore().collection('busInfo');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      boards: []
    };
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { busNumber } = doc.data();
      boards.push({
        key: doc.id,
        doc, 
        busNumber
      });
    });
    this.setState({
      boards,
      isLoading: false,
   });
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="white"/>
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
       <View style={styles.Buttonn}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
    
          <MaterialCommunityIcons name="backburger" size={32} color="white" />
          </TouchableOpacity>
         </View>
         <View style={styles.headingText}>
           <Text style={styles.textt}>Bus List</Text>
         </View>
         <View style={styles.Buttonn}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("AddBoard")}>
          <MaterialIcons name="add-box" size={32} color="white" />
          </TouchableOpacity>
         </View>
       </View>
       <View style={styles.listItems}>
       <ScrollView style={styles.container}>
      
      {
        this.state.boards.map((item, i) => (
          <ListItem
          style={styles.itemLayout}
            key={i}
            title={item.busNumber}
            leftIcon={{name: 'bus', type: 'font-awesome'}}
            onPress={() => {
              this.props.navigation.navigate('BoardDetails', {
                boardkey: `${JSON.stringify(item.key)}`,
              });
            }}
          />
        ))
      }
        </ScrollView>
       </View>
       
     </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    width:Dimensions.get("window").width,
    height:Dimensions.get("window").height,
    backgroundColor: "rgb(52,152,219)"
  },
  header:{
    width:"100%",
    height:"10%",
    borderWidth:1,
    borderColor:"white",
    flexDirection: "row"
  },
  headingText:{
    width:"40%",
    height:"100%",
    
    justifyContent:"center",
    alignItems:"center"
  },
  textt:{
    fontSize:25,
    color:"white"
  },
  Buttonn:{
    justifyContent:"center",
    alignItems:"center",
    width:"30%",
    height:"100%"
  },
  listItems:{
    width:"100%",
    height:"90%"
  },
  itemLayout:{
    borderWidth:1,
    borderColor:"white"
  },
  container: {
   flex: 1,
   paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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

export default BoardScreen;