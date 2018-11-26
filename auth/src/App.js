import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';

import {Button, Header, Spinner, CardSection} from './components/common/index';
import {FIREBASE_DATA} from './components/helper/Data';
import LoginForm from './components/loginForm/loginForm';

class App extends Component {

    state = {
        loggedIn: null,

    };

    componentWillMount() {
        firebase.initializeApp(FIREBASE_DATA);
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({loggedIn: !!user});
        });
    }


    renderContent = () => {
        const button = (
            <CardSection>
                <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
            </CardSection>
        );
        const spinner = (
            <View style={{paddingTop: 25}}>
                <Spinner size='large'/>
            </View>
        );
        switch (this.state.loggedIn) {
            case true:
                return button;
            case false:
                return <LoginForm/>;
            default:
                return spinner;
        }
    };


    render() {
        return (
            <View>
                <Header headerText='Authentication'/>
                {this.renderContent()}
            </View>
        );
    }
}

export default App;

