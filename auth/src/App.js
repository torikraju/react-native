import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';

import {Header} from './components/common/index';
import {FIREBASE_DATA} from './components/helper/Data';
import LoginForm from './components/loginForm/loginForm';

class App extends Component {

    componentWillMount() {
        firebase.initializeApp(FIREBASE_DATA);
    }

    render() {
        return (
            <View>
                <Header headerText='Authentication'/>
                <LoginForm/>
            </View>
        );
    }
}

export default App;

