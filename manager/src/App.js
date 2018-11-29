import React, {Component} from 'react';
import {Provider} from 'react-redux';


import configureStore from './store/configureStore';
import Router from './router/Router';


class App extends Component {

    render() {
        return (
            <Provider store={configureStore()}>
                <Router/>
            </Provider>
        );
    }
}

export default App;


