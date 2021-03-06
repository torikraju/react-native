import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {styles} from './button.style';

const Button = ({onPress, children}) => {
    const {buttonStyle, textStyle} = styles;
    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;
