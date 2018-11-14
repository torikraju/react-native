import React, {Component} from 'react';
import {View, ImageBackground, Dimensions} from 'react-native';

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
        let headingText = null;

        if (Dimensions.get('window').height > 500) {
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }

        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    {headingText}
                    <Button color='#29aaf4' onPress={() => alert('ok')}>Switch to Login</Button>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder='Your E-Mail Address' style={styles.input}/>
                        <View style={styles.passwordContainer}>
                            <View style={styles.passwordWrapper}>
                                <DefaultInput placeholder='Password' style={styles.input}/>
                            </View>
                            <View style={styles.passwordWrapper}>
                                <DefaultInput placeholder='Confirm Password' style={styles.input}/>
                            </View>
                        </View>
                    </View>
                    <Button color='#29aaf4' onPress={this.loginHandler}>Submit</Button>
                </View>
            </ImageBackground>
        );
    }
}


export default AuthScreen;
