import React, {Component} from 'react';
import {View, ImageBackground, Dimensions} from 'react-native';

import {goToBothPlace} from '../../Helper/navigation';
import {styles} from './auth.style';
import DefaultInput from '../../component/UI/DefaultInput/DefaultInput';
import HeadingText from '../../component/UI/HeadingText/HeadingText';
import MainText from '../../component/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import Button from '../../component/UI/Button/Button';
import {DIMENSIONS} from '../../Helper/identifires';


class AuthScreen extends Component {

    state = {
        viewMode: Dimensions.get('window').height > 500 ? DIMENSIONS.portrait : DIMENSIONS.landscape,
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                }
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6
                }
            },
            confirmPassword: {
                value: '',
                valid: false,
                validationRules: {
                    equalTo: 'password'
                }
            }
        }
    };


    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyles);
    }


    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles);
    }

    updateStyles = (dimensions) => {
        this.setState({
            viewMode: dimensions.window.height > DIMENSIONS.height ? DIMENSIONS.portrait : DIMENSIONS.landscape
        });
    }


    loginHandler = () => {
        goToBothPlace();
    }

    updateInputState = (key, value) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value
                    }
                }
            };
        });
    };

    render() {
        let headingText = null;

        if (this.state.viewMode === DIMENSIONS.portrait) {
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
                        <DefaultInput
                            placeholder='Your E-Mail Address'
                            style={styles.input}
                            value={this.state.controls.email.value}
                            onChangeText={(val) => this.updateInputState('email', val)}
                        />
                        <View style={this.state.viewMode === DIMENSIONS.portrait
                            ? styles.portraitPasswordContainer
                            : styles.landscapePasswordContainer}>
                            <View style={this.state.viewMode === DIMENSIONS.portrait
                                ? styles.portraitPasswordWrapper
                                : styles.landscapePasswordWrapper}>
                                <DefaultInput
                                    placeholder='Password'
                                    style={styles.input}
                                    value={this.state.controls.password.value}
                                    onChangeText={(val) => this.updateInputState('password', val)}
                                />
                            </View>
                            <View style={this.state.viewMode === DIMENSIONS.portrait
                                ? styles.portraitPasswordWrapper
                                : styles.landscapePasswordWrapper}>
                                <DefaultInput
                                    placeholder='Confirm Password'
                                    style={styles.input}
                                    value={this.state.controls.confirmPassword.value}
                                    onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                                />
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
