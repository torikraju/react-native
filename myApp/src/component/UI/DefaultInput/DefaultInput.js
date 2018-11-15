import React from 'react';
import {TextInput} from 'react-native';
import {styles} from "./DefaultInput.style";

const DefaultInput = props => {
    return (
        <TextInput
            {...props}
            style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]}
        />
    );
};

export default DefaultInput;


