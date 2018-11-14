import React from 'react';
import {TextInput} from 'react-native';
import {styles} from "./DefaultInput.style";

const DefaultInput = props => {
    return (
        <TextInput
            style={styles.input}
            {...props}
        />
    );
};

export default DefaultInput;
