import React, {Component} from 'react';
import {Button, Text, View} from "react-native";
import {styles} from "./PickLocation.style";

class PickLocation extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}><Text>Map</Text></View>
                <View style={styles.button}>
                    <Button title='Locate Me' onPress={() => alert('located')}/>
                </View>
            </View>
        );
    }
}

export default PickLocation;
