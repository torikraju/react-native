import React, {Component} from 'react';
import {Text} from 'react-native';
import firebase from 'firebase';

import {Button, Card, CardSection, Input, Spinner} from '../common/index';
import {styles} from './loginFrom.style';

class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    };

    onButtonPress = () => {
        const {email, password} = this.state;

        this.setState({error: '', loading: true});

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response);
                this.onLoginSuccess();
            })
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(response => {
                        console.log(response);
                        this.onLoginSuccess();
                    })
                    .catch(() => {
                        this.onLoginFailed();
                    });
            });
    };

    onLoginSuccess = () => {
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false
        });
    };

    onLoginFailed = () => {
        this.setState({error: 'Authentication failed', loading: false});
    };

    renderButton = () => {
        return (this.state.loading) ? <Spinner size='small'/> : <Button onPress={this.onButtonPress}>Login</Button>;
    };

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label='Email'
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                        placeholder='user@gmail.com'
                    />
                </CardSection>

                <CardSection>
                    <Input
                        placeholder='password'
                        label='Password'
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                        secureTextEntry={true}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>

            </Card>
        );
    }
}

export default LoginForm;
