import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './Button.style';

const Button = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.button, {backgroundColor: props.color}]}>
                <Text>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default Button;
