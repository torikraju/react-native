import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

import {styles} from './LoginForm.style';
import {Card, CardSection, Input, Button, Spinner} from '../common/index';
import {loginUser, autoSignIn} from '../../store/actions/index';

class LoginForm extends Component {

    state = {
        email: '',
        password: ''
    };

    componentDidMount() {
        this.props.onAutoSignIn();
    }


    onInputChange = (key, value) => {
        this.setState(prevState => {
            return {...prevState, [key]: value};
        })
    };

    loginHandler = () => {
        this.props.onLoginUser(this.state);
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
                        value={this.state.email}
                        placeholder='email@email.com'
                        onChangeText={(val) => this.onInputChange('email', val)}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label='Password'
                        placeholder='password'
                        secureTextEntry={true}
                        value={this.state.password}
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
    const {error, loading} = state.auth;
    return {
        error: error,
        loading: loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoginUser: (props) => dispatch(loginUser(props)),
        onAutoSignIn: () => dispatch(autoSignIn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
