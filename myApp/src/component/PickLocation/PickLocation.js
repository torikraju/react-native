import React, {Component} from 'react';
import {Button, Text, View, Dimensions} from "react-native";
import styles from "./PickLocation.style";
import MapView, {Marker} from 'react-native-maps';

class PickLocation extends Component {

    componentWillMount() {
        this.reset();
    }

    reset = () => {
        this.setState({
            focusedLocation: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
            },
            locationChosen: false
        });
    };

    pickLocationHandler = event => {
        const coordinate = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude
        });
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude
                },
                locationChosen: true
            };
        });

        this.props.onLocationPick({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude
        });

    };

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(position => {
                const coordinateEvent = {
                    nativeEvent: {
                        coordinate: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    }
                };
                this.pickLocationHandler(coordinateEvent);
            },
            error => {
                console.log(error);
                alert('Fetching the positon failed, please pick one manually')
            });
    };

    render() {

        let marker = null;

        if (this.state.locationChosen) {
            marker = <Marker coordinate={this.state.focusedLocation}/>;
        }

        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    region={!this.state.locationChosen ? this.state.focusedLocation : null}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}>
                    {marker}
                </MapView>

                <View style={styles.button}>
                    <Button title='Locate Me' onPress={this.getLocationHandler}/>
                </View>
            </View>
        );
    }
}

export default PickLocation;
