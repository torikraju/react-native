import React from 'react';
import {Text} from 'react-native';
import styles from './MainText.style';

const MainText = props => {
    return (
        <Text style={styles.mainText}>{props.children}</Text>
    );
};

export default MainText;
