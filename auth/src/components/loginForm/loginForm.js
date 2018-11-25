import React, {Component} from 'react';
import {TextInput} from 'react-native';

import {Button, Card, CardSection, Input} from '../common/index';

class LoginForm extends Component {

    state = {
        email: '',
        password: ''
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

                <CardSection>
                    <Button>Login</Button>
                </CardSection>

            </Card>
        );
    }
}

export default LoginForm;
