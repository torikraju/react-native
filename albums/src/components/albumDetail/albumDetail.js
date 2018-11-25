import React from 'react';
import {View, Text, Image, Linking} from 'react-native';

import {styles} from './albumDetail.style';
import Card from '../card/card';
import CardSection from '../cardSection/cardSection';
import Button from '../button/button';

const AlbumDetail = ({album}) => {
    const {
        title,
        artist,
        thumbnail_image,
        image,
        url
    } = album;
    const {
        thumbnailStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        headerTextStyle,
        imageStyle
    } = styles;


    return (
        <Card>
            <CardSection>
                <View style={thumbnailContainerStyle}>
                    <Image style={thumbnailStyle} source={{uri: thumbnail_image}}/>
                </View>
                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{title}</Text>
                    <Text>{artist}</Text>
                </View>
            </CardSection>

            <CardSection>
                <Image style={imageStyle} source={{uri: image}}/>
            </CardSection>

            <CardSection>
                <Button onPress={() => Linking.openURL(url)}>Buy Now</Button>
            </CardSection>
        </Card>
    );
};

export default AlbumDetail;
