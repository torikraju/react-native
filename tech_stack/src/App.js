import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index';
import {Header} from './components/common/index';
import LibraryList from './components/libraryList/libraryList';

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}


const App = () => {
    return (
        <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(thunk)))}>
            <View style={{flex: 1}}>
                <Header headerText='Tech Stack'/>
                <LibraryList/>
            </View>
        </Provider>

    );
};

export default App;

