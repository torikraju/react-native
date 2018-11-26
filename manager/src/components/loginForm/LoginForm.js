import React, {Component} from 'react';

import {Card, CardSection, Input, Button} from '../common/index';

class LoginForm extends Component {
    render() {
        return (
            <Card>
                <CardSection>
                    <Input label='Email' placeholder='email@email.com'/>
                </CardSection>
                <CardSection>
                    <Input label='Password' placeholder='password' secureTextEntrys/>
                </CardSection>
                <CardSection>
                    <Button>Login</Button>
                </CardSection>
            </Card>
        );
    }
}

export default LoginForm;
