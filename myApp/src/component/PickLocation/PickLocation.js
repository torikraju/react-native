import React, {Component} from 'react';
import {Button, Text, View} from "react-native";
import styles from "./PickLocation.style";
import MapView from 'react-native-maps';

class PickLocation extends Component {

    state = {
        focusedLocation: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
        }
    };

    pickLocationHanlder = event => {
        const coordinate = event.nativeEvent.coordinate;

        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude
                }
            };
        });

    };

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    region={this.state.focusedLocation}
                    style={styles.map}
                    onPress={this.pickLocationHanlder}
                />
                <View style={styles.button}>
                    <Button title='Locate Me' onPress={() => alert('located')}/>
                </View>
            </View>
        );
    }
}

export default PickLocation;
