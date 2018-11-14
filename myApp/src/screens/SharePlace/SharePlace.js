import React, {Component} from 'react';
import {View, Text, TextInput, Button, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux'

import PlaceInput from '../../component/PlaceInput/PlaceInput';
import * as actions from '../../store/actions/index';
import {iconsMap} from '../../Helper/iconHelper';
import {NAVIGATION_IDENTIFIER, ICONS} from '../../Helper/identifires';
import {styles} from './SharePlace.style';
import MainText from '../../component/UI/MainText/MainText';
import HeadingText from '../../component/UI/HeadingText/HeadingText';
import PickImage from "../../component/PickImage/PickImage";
import PickLocation from "../../component/PickLocation/PickLocation";


class SharePlaceScreen extends Component {

    state = {
        placeName: ''
    }

    placeNameChangedHandler = val => {
        this.setState({
            placeName: val
        });
    };

    static get options() {
        return {
            topBar: {
                leftButtons: {
                    id: NAVIGATION_IDENTIFIER.SIDE_DRAWER_BUTTON_ID,
                    icon: iconsMap[ICONS.menu]

                },
                title: {
                    text: 'Find Place',
                    alignment: 'center'
                }
            }
        };
    }

    placeAddedHandler = () => {
        if (this.state.placeName.trim() !== '') {
            this.props.onAddPlace(this.state.placeName);
            this.setState({placeName: ''});
        }
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a place with us!</HeadingText>
                    </MainText>
                    <PickImage/>
                    <PickLocation/>
                    <PlaceInput
                        placeName={this.state.placeName}
                        onChangeText={this.placeNameChangedHandler}/>
                    <View style={styles.button}>
                        <Button title='Share the Place' onPress={this.placeAddedHandler}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(actions.addPlace(placeName))
    };
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
