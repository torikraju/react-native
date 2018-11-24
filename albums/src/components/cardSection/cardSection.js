import React from 'react';
import {View} from 'react-native';

import {styles} from './cardSection.style';

const CardSection = props => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

export default CardSection;
