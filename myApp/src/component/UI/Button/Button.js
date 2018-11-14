import React from 'react';
import {TouchableOpacity, Text, View, TouchableNativeFeedback, Platform} from 'react-native';
import styles from './Button.style';

const Button = props => {

    const content = (
        <View style={[styles.button, {backgroundColor: props.color}]}>
            <Text>
                {props.children}
            </Text>
        </View>
    );

    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        );
    }

    return (
        <TouchableOpacity onPress={props.onPress}>
            {content}
        </TouchableOpacity>
    );
};

export default Button;
