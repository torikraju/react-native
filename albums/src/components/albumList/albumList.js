import React, {Component} from 'react';
import {View} from 'react-native';
import axios from 'axios';
import {SkypeIndicator} from 'react-native-indicators';

import {styles} from './albumList.style';
import AlbumDetail from '../albumDetail/albumDetail';


class AlbumList extends Component {

    state = {
        albums: [],
        isLoading: true
    };

    componentWillMount() {
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
            .then(response => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        albums: response.data,
                        isLoading: false
                    };
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderAlbums = () => {
        return this.state.albums.map((album, index) => <AlbumDetail key={index} album={album}/>);
    };

    render() {

        let lists = (
            <View style={{padding: 32}}>
                <SkypeIndicator color='#006FB3' size={60}/>
            </View>
        );

        if (!this.state.isLoading) {
            lists = this.renderAlbums();
        }
        return (
            <View>
                {lists}

            </View>
        );
    }
}

export default AlbumList;
