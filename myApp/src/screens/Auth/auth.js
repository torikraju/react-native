import React, {Component} from 'react';
import {View, Text, Button, TextInput} from 'react-native';

import {goToBothPlace} from '../../Helper/navigation';
import {styles} from './auth.style';
import DefaultInput from '../../component/UI/DefaultInput/DefaultInput';


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
                    <DefaultInput placeholder='Your E-Mail Address' style={styles.input}/>
                    <DefaultInput placeholder='Password' style={styles.input}/>
                    <DefaultInput placeholder='Confirm Password' style={styles.input}/>
                </View>
                <Button title='Login' onPress={this.loginHandler}/>
            </View>
        );
    }
}


export default AuthScreen;
