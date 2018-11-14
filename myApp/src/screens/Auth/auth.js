import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native';

import {goToBothPlace} from '../../Helper/navigation';
import {styles} from './auth.style';
import DefaultInput from '../../component/UI/DefaultInput/DefaultInput';
import HeadingText from '../../component/UI/HeadingText/HeadingText';
import MainText from '../../component/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import Button from '../../component/UI/Button/Button'


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
                    <Button color='#29aaf4' onPress={() => alert('ok')}>Switch to Login</Button>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder='Your E-Mail Address' style={styles.input}/>
                        <DefaultInput placeholder='Password' style={styles.input}/>
                        <DefaultInput placeholder='Confirm Password' style={styles.input}/>
                    </View>
                    <Button color='#29aaf4' onPress={this.loginHandler}>Submit</Button>
                </View>
            </ImageBackground>
        );
    }
}


export default AuthScreen;
