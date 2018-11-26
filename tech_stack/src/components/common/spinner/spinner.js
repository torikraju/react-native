import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {styles} from './spinner.style';

export const Spinner = ({size}) => {
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator size={size || 'large'}/>
        </View>
    );
};

