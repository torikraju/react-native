import React, {Component} from 'react';
import {View, Image, Button} from 'react-native';

import imagePlaceHolder from "../../assets/beautiful-place.jpg";
import styles from './PickImage.style';

class PickImage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={imagePlaceHolder} style={styles.imagePreview}/>
                </View>
                <View style={styles.button}>
                    <Button title='Pick Image' onPress={() => alert('picked')}/>
                </View>
            </View>
        );
    }
}

export default PickImage;
