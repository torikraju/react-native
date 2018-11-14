import React, {Component} from 'react';
import {View, Text, Button, TextInput} from 'react-native';

import {goToBothPlace} from '../../Helper/navigation';
import {styles} from './auth.style';
import DefaultInput from '../../component/UI/DefaultInput/DefaultInput';
import HeadingText from '../../component/UI/HeadingText/HeadingText';


class AuthScreen extends Component {

    loginHandler = () => {
        goToBothPlace();
    }

    render() {
        return (
            <View style={styles.container}>
                <HeadingText>Please Log In</HeadingText>
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
