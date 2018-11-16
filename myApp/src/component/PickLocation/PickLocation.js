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
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    style={styles.map}
                />
                <View style={styles.button}>
                    <Button title='Locate Me' onPress={() => alert('located')}/>
                </View>
            </View>
        );
    }
}

export default PickLocation;
