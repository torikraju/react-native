import React, {Component} from 'react';
import {View, ImageBackground, Dimensions, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';


import {styles} from './auth.style';
import DefaultInput from '../../component/UI/DefaultInput/DefaultInput';
import HeadingText from '../../component/UI/HeadingText/HeadingText';
import MainText from '../../component/UI/MainText/MainText';
import backgroundImage from '../../assets/background.png';
import Button from '../../component/UI/Button/Button';
import {DIMENSIONS} from '../../Helper/identifires';
import validate from '../../utility/validation';
import {tryAuth, autoSignIn} from '../../store/actions/index';


class AuthScreen extends Component {

    state = {
        viewMode: Dimensions.get('window').height > 500 ? DIMENSIONS.portrait : DIMENSIONS.landscape,
        controls: {
            email: {
                value: '',
                valid: false,
                touch: false,
                validationRules: {
                    isEmail: true
                }
            },
            password: {
                value: '',
                valid: false,
                touch: false,
                validationRules: {
                    minLength: 6
                }
            },
            confirmPassword: {
                value: '',
                valid: false,
                touch: false,
                validationRules: {
                    equalTo: 'password'
                }
            }
        },
        authMode: 'login'
    };


    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyles);
    }


    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles);
    }

    componentDidMount() {
        this.props.onAutoSignIn();
    }

    updateStyles = (dimensions) => {
        this.setState({
            viewMode: dimensions.window.height > DIMENSIONS.height ? DIMENSIONS.portrait : DIMENSIONS.landscape
        });
    };


    loginHandler = () => {

        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onLogin(authData, this.state.authMode);

    }

    updateInputState = (key, value) => {

        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }

        if (key === "password") {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }

        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password'
                            ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue)
                            : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touch: true
                    }
                }
            };
        });
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'
            };
        });
    };

    render() {
        let headingText = null;
        let confirmPasswordControl = null;
        let submitButton = (
            <Button
                color='#29aaf4'
                onPress={this.loginHandler}
                disabled={
                    !this.state.controls.confirmPassword.valid && this.state.authMode === 'signup' ||
                    !this.state.controls.password.valid ||
                    !this.state.controls.email.valid
                }
            >Submit</Button>
        );

        if (this.props.isLoading) {
            submitButton = <ActivityIndicator/>
        }

        if (this.state.authMode === 'signup') {
            confirmPasswordControl = (
                <View style={this.state.viewMode === DIMENSIONS.portrait
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper}>
                    <DefaultInput
                        placeholder='Confirm Password'
                        style={styles.input}
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touch}
                        secureTextEntry={true}
                    />
                </View>
            );
        }

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
                    <Button
                        color='#29aaf4'
                        onPress={this.switchAuthModeHandler}
                    >Switch to {this.state.authMode === 'login' ? 'SignUp' : 'Login'}</Button>
                    <View style={styles.inputContainer}>
                        <DefaultInput
                            placeholder='Your E-Mail Address'
                            style={styles.input}
                            value={this.state.controls.email.value}
                            onChangeText={(val) => this.updateInputState('email', val)}
                            valid={this.state.controls.email.valid}
                            touched={this.state.controls.email.touch}
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='email-address'
                        />
                        <View style={this.state.viewMode === DIMENSIONS.portrait || this.state.authMode === 'login'
                            ? styles.portraitPasswordContainer
                            : styles.landscapePasswordContainer}>
                            <View style={this.state.viewMode === DIMENSIONS.portrait || this.state.authMode === 'login'
                                ? styles.portraitPasswordWrapper
                                : styles.landscapePasswordWrapper}>
                                <DefaultInput
                                    placeholder='Password'
                                    style={styles.input}
                                    value={this.state.controls.password.value}
                                    onChangeText={(val) => this.updateInputState('password', val)}
                                    valid={this.state.controls.password.valid}
                                    touched={this.state.controls.password.touch}
                                    secureTextEntry={true}
                                />
                            </View>
                            {confirmPasswordControl}
                        </View>
                    </View>
                    {submitButton}
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
        onAutoSignIn: () => dispatch(autoSignIn())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
