import React from 'react';
import {View} from 'react-native';

import {styles} from './card.style';

export const Card = props => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

