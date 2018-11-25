import React from 'react';
import {TextInput, View, Text} from 'react-native';

import {styles} from './input.style';

export const Input = ({label, value, onChangeText, placeholder, secureTextEntry}) => {
    const {containerStyle, inputStyle, labelStyle} = styles;
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                style={inputStyle}
                onChangeText={onChangeText}
                value={value}
                autoCorrect={false}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};
