import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import reducers from './reducers/index';
import {Header} from './components/common/index';
import LibraryList from './components/libraryList/libraryList';


const App = () => {
    return (
        <Provider store={createStore(reducers)}>
            <View>
                <Header headerText='Tech Stack'/>
                <LibraryList/>
            </View>
        </Provider>

    );
};

export default App;

