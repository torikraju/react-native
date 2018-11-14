import React, {Component} from 'react';
import {View, Button, ImageBackground} from 'react-native';

import {goToBothPlace} from '../../Helper/navigation';
import {styles} from './auth.style';
import DefaultInput from '../../component/UI/DefaultInput/DefaultInput';
import HeadingText from '../../component/UI/HeadingText/HeadingText';
import MainText from '../../component/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';


class AuthScreen extends Component {

    loginHandler = () => {
        goToBothPlace();
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Please Log In</HeadingText>
                    </MainText>
                    <Button title='Switch to Login'/>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder='Your E-Mail Address' style={styles.input}/>
                        <DefaultInput placeholder='Password' style={styles.input}/>
                        <DefaultInput placeholder='Confirm Password' style={styles.input}/>
                    </View>
                    <Button title='Login' onPress={this.loginHandler}/>
                </View>
            </ImageBackground>
        );
    }
}


export default AuthScreen;
