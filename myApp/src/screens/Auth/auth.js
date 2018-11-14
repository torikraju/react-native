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

    state = {
        respStyles: {
            pwContainerDirection: 'column',
            pwContainerJustifyContent: 'flex-start',
            pwWrapperWidth: '100%'
        }
    }


    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', (dimension) => {
            console.log(dimension);
            this.setState({
                respStyles: {
                    pwContainerDirection: Dimensions.get('window').height > 500 ? 'column' : 'row',
                    pwContainerJustifyContent: Dimensions.get('window').height > 500 ? 'flex-start' : 'space-between',
                    pwWrapperWidth: Dimensions.get('window').height > 500 ? '100%' : '45%'
                }
            });
        });
    }

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
                        <View style={{
                            flexDirection: this.state.respStyles.pwContainerDirection,
                            justifyContent: this.state.respStyles.pwContainerJustifyContent
                        }}>
                            <View style={{
                                width: this.state.respStyles.pwWrapperWidth
                            }}>
                                <DefaultInput placeholder='Password' style={styles.input}/>
                            </View>
                            <View style={{
                                width: this.state.respStyles.pwWrapperWidth
                            }}>
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
