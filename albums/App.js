import React, {Component} from 'react';
import {View} from 'react-native';

import Header from './src/components/header/header';
import AlbumList from './src/components/albumList/albumList';


type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View>
                <Header headerText='Albums!'/>
                <AlbumList/>
            </View>
        );
    }
}

