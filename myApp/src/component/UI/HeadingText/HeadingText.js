import React from 'react';
import {styles} from "./HeadingText.style";
import {Text} from "react-native";

const HeadingText = props => {
    return (
        <Text {...props} style={[styles.textHeading, props.style]}>
            {props.children}
        </Text>
    );
};

export default HeadingText;
