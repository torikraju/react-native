import React from 'react';
import {View, Text, Image, Button} from 'react-native';

import {styles} from './albumDetail.style';
import Card from '../card/card';
import CardSection from '../cardSection/cardSection';

const AlbumDetail = props => {
    return (
        <Card>
            <CardSection>
                <Text>{props.album.title}</Text>
            </CardSection>
        </Card>
    );
};

export default AlbumDetail;
