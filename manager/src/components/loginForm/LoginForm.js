import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

import {styles} from './LoginForm.style';
import {Card, CardSection, Input, Button, Spinner} from '../common/index';
import {emailChanged, passwordChanged, loginUser} from '../../store/actions/index';

class LoginForm extends Component {

    onInputChange = (key, value) => {
        if (key === 'email') {
            this.props.onEmailChanged(value)
        } else {
            this.props.onPasswordChanged(value);
        }
    };

    loginHandler = () => {
        this.props.onLoginUser(this.props);
    };

    renderButton = () => {
        return (this.props.loading) ? <Spinner size='small'/> : <Button onPress={this.loginHandler}>Login</Button>;
    };

    renderError = () => {
        if (this.props.error) {
            return (
                <View style={{backgroundColor: 'white'}}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
        return null;
    };

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label='Email'
                        value={this.props.email}
                        placeholder='email@email.com'
                        onChangeText={(val) => this.onInputChange('email', val)}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label='Password'
                        placeholder='password'
                        secureTextEntry={true}
                        onChangeText={(val) => this.onInputChange('password', val)}
                    />
                </CardSection>
                {this.renderError()}
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const {email, password, error, loading} = state.auth;
    return {
        email: email,
        password: password,
        error: error,
        loading: loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEmailChanged: (text) => dispatch(emailChanged(text)),
        onPasswordChanged: (text) => dispatch(passwordChanged(text)),
        onLoginUser: (props) => dispatch(loginUser(props)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
