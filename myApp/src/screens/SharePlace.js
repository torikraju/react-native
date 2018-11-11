import React, { Component } from 'react';
import { View, Text } from 'react-native';


class SharePlaceScreen extends Component {
    static get options() {
        return {
            topBar: {
                backButton: {
                    title: 'Back',
                    visible: true,
                    showTitle: true
                },
                title: {
                    text: 'Search Place',
                    alignment: 'center'
                }
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

export default SharePlaceScreen;