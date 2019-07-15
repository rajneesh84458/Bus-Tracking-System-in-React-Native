import React, { Component } from 'react';
import {StyleSheet} from 'react-native'; 
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import mainScreenClass from './screens/mainScreen';
import studentLoginClass from './screens/studentLogin';
import registerStudentClass from './screens/registerStudent';
import studentInfoClass from "./screens/studentInfo";
import findBusClass from "./screens/findBus";
import { MaterialIcons } from '@expo/vector-icons';
import adminInfoClass from './screens/adminInfo';
import adminDetailsClass from "./screens/adminDetails";
import BoardScreen from "./screens/BoardScreen";
import seeBusClass from './screens/seeBus';
import AddBoardScreen from "./screens/AddBoardScreen";
import EditBoardScreen from "./screens/EditBoardScreen";
import BoardDetailScreen from "./screens/BoardDetailScreen";
import BusNumberClass from "./screens/busNumber";
import trackBusLocationClass from "./screens/trackBusLocation";
import adminUpdateClass from "./screens/adminUpdate";

export default class App extends Component {
  render() {
    return <AppContainer/>    
  }
}

 const AppTabNavigator = createMaterialBottomTabNavigator(
  {
    "STUDENT INFO":{
      screen:studentInfoClass,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <MaterialIcons style={Styles.icon} name={"info"} color={tintColor} />
      }
    },
    "FIND BUS":{
      screen:findBusClass,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <MaterialIcons style={Styles.icon} name={"location-on"} color={tintColor} />
      }
    }
  }, 
  {
    activeColor: 'rgb(245,192,92)',
    inactiveColor: 'white',
    barStyle: { backgroundColor: 'black' },
    
  }
 )

const AppStackNavigator = createStackNavigator(
  {
    mainScreen:{screen:mainScreenClass},
    studentLoginScreen:{screen:studentLoginClass},
    registerStudent:{screen:registerStudentClass},
    welcomeStudentScreen:{screen:AppTabNavigator},
    adminInfo:{screen:adminInfoClass},
    adminDetails:{screen:adminDetailsClass},
    Board: {screen:BoardScreen},
    BoardDetails: {screen:BoardDetailScreen},
    AddBoard: {screen:AddBoardScreen},
    EditBoard: {screen:EditBoardScreen},
    busNumber:{screen:BusNumberClass},
    trackBus:{screen:trackBusLocationClass},
    seeBus:{screen:seeBusClass},
    adminUpdatee:{screen:adminUpdateClass}
  },
  {
    initialRouteName:  "mainScreen",
    defaultNavigationOptions:{
      header:null
    }
  }
)

const AppContainer = createAppContainer(AppStackNavigator);

const Styles = StyleSheet.create({
  icon:{
    fontSize:20
  }
})

