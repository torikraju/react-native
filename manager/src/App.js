import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Provider} from 'react-redux';
import firebase from 'firebase';


import {FIREBASE_DATA} from './helper/Data';
import configureStore from './store/configureStore';
import LoginForm from './components/loginForm/LoginForm';
import {Header} from './components/common/index';


class App extends Component {

    componentWillMount() {
        firebase.initializeApp(FIREBASE_DATA);
    }

    render() {
        return (
            <Provider store={configureStore()}>
                <View>
                    <Header headerText='Login'/>
                    <LoginForm/>
                </View>
            </Provider>

        );
    }
}

export default App;


