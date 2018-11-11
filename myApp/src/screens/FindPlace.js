import React, { Component } from 'react';
import { View, Text } from 'react-native';


class FindPlaceScreen extends Component {
    static get options() {
        return {
            topBar: {
                title: {
                    text: 'Find Place',
                    alignment: 'center'
                },
            }
        };
    }
    render() {
        return (
            <View>
                <Text></Text>
            </View>
        );
    }
}

export default FindPlaceScreen;