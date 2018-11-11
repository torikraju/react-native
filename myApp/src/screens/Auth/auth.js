import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { goToFindPlace, goToBothPlace } from '../navigation';

class AuthScreen extends Component {

    loginHandler = () => {
        goToFindPlace();
        goToBothPlace();
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title='Login' onPress={this.loginHandler} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: 350,
        fontSize: 18,
        fontWeight: '500',
        height: 55,
        backgroundColor: '#42A5F5',
        margin: 10,
        color: 'white',
        padding: 8,
        borderRadius: 14
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AuthScreen;