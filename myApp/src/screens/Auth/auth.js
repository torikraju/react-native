import React, {Component} from 'react';
import {View, Text, Button, TextInput} from 'react-native';

import {goToBothPlace} from '../../Helper/navigation';
import {styles} from './auth.style';


class AuthScreen extends Component {

    loginHandler = () => {
        goToBothPlace();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Please Log In</Text>
                <Button title='Switch to Login'/>
                <View style={styles.inputContainer}>
                    <TextInput placeholder='Your E-Mail Address' style={styles.input}/>
                    <TextInput placeholder='Password' style={styles.input}/>
                    <TextInput placeholder='Confirm Password' style={styles.input}/>
                </View>
                <Button title='Login' onPress={this.loginHandler}/>
            </View>
        );
    }
}


export default AuthScreen;
