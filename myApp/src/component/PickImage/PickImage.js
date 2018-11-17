import React, {Component} from 'react';
import {View, Image, Button} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import styles from './PickImage.style';

class PickImage extends Component {

    state = {
        pickedImaged: null
    };

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: 'Pick an Image'}, response => {
            if (response.didCancel) {
                console.log('User cancelled');
            } else if (response.error) {
                console.log('Error: ', response.error);
            } else {
                this.setState({
                    pickedImaged: {uri: response.uri}
                });
                this.props.onImagePicked({uri: response.uri, base64: response.data});

            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImaged} style={styles.imagePreview}/>
                </View>
                <View style={styles.button}>
                    <Button title='Pick Image' onPress={this.pickImageHandler}/>
                </View>
            </View>
        );
    }
}

export default PickImage;
