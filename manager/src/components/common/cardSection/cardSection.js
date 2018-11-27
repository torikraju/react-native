import React from 'react';
import {View} from 'react-native';

import {styles} from './cardSection.style';

export const CardSection = props => {
    return (
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
    );
};

