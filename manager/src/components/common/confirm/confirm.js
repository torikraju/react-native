import React from 'react';
import {Text, View, Modal} from 'react-native';

import {CardSection} from '../cardSection/cardSection';
import {Button} from '../button/button';
import {styles} from './confirm.style';


export const Confirm = ({children, onAccept, onDecline, visible}) => {

    const {container, cardSectionStyle, textStyle} = styles;
    return (
        <Modal
            animationType='slide'
            onRequestClose={() => {
            }}
            transparent={true}
            visible={visible}>
            <View style={container}>
                <CardSection style={cardSectionStyle}>
                    <Text style={textStyle}>{children}</Text>
                </CardSection>
                <CardSection>
                    <Button onPress={onAccept}>Yes</Button>
                    <Button onPress={onDecline}>No</Button>
                </CardSection>
            </View>
        </Modal>
    );
};
