import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image} from 'react-native';
import { Constants, MapView, Location, Permissions, AppLoading } from 'expo';

export default class seeBusClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      gotMarkers: false,
      markers: [],
      mapRegion: null,
      gotLocation: false,
      myLocation: null,
      locationResult: null,
      hasLocationPermissions: false
    };
  }

  componentDidMount() {
    this.fetchMarkerData();
    this._getLocationAsync();
    setInterval(() => {
      this.fetchMarkerData();
    }, 10000); 
  }

  fetchMarkerData() {
    fetch("http://ec2-18-220-154-24.us-east-2.compute.amazonaws.com:3000/api/carts")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          gotMarkers: true,
          markers: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderMarkers() {
    return this.state.markers.map((marker, index) => {
          const coords = {
            latitude: marker.latitude,
            longitude: marker.longitude
          };

          //const metadata = `Description: ${marker.description}`;

          return (
            <MapView.Marker
              key={index}
              coordinate={coords}
              title={marker.name}
              description={marker.description}
              pinColor='#FF0000'
            />
          );
        });
  }
  
  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }


    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });
   
   // Center the map on the location we just fetched.
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922,  longitudeDelta: 0.0421 }});
    this.setState({myLocation: { latitude: location.coords.latitude, longitude: location.coords.longitude}});
    this.setState({ gotLocation: true });
  };  

  render() {
    return (
     
      
      (this.state.gotMarkers && this.state.gotLocation)
        ? <MapView
          style={{ flex: 1,width:"100%",
          height:"90%" }}
          provider="google"
          region={this.state.mapRegion}
          onRegionChangeComplete={this._handleMapRegionChange}
        >
          <MapView.Marker
            key={0}
            coordinate={this.state.myLocation}
            title={"Your Location"}
            description={"Here You Are"}
            pinColor='#0000FF'
          />
          
          {this.renderMarkers()}
        </MapView>
      
      : <View style={{
            flex: 1,
            flexDirection: 'column',
            }}> 
            <View style={{
                flex: 1,
                backgroundColor: '#487EB0',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
                    Welcome to the bus location
                </Text>
                {/* <Image source={require("./assets/truck.png")}/> */}

                <TouchableHighlight style={{ 
                                            margin: 20, 
                                            width: 200, 
                                            height: 45,
                                            backgroundColor: 'rgba(249,128,45,1)',
                                            padding: 10,
                                            alignItems: 'center',
                                         }}
                    onPress={() => {console.log("devid <" + Constants.installationId + ">");                                             
                    }}>
                     <Text style={{color: '#487EB0', fontSize: 18}}>Route..</Text> 
                </TouchableHighlight>                
            </View>
        </View>
        
    );
  }
}