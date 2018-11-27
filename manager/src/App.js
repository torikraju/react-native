import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import {Provider} from 'react-redux';
import firebase from 'firebase';


import {FIREBASE_DATA} from './helper/Data';
import configureStore from './store/configureStore';
import Router from './router/Router';


class App extends Component {

    componentWillMount() {
        YellowBox.ignoreWarnings(['unknown call: "relay:check"']);
        firebase.initializeApp(FIREBASE_DATA);
    }

    render() {
        return (
            <Provider store={configureStore()}>
                <Router/>
            </Provider>
        );
    }
}

export default App;


