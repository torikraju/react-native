import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux'

import PlaceInput from '../../component/PlaceInput/PlaceInput';
import * as actions from '../../store/actions/index';
import * as identifier from "../../Helper/identifires";
import {iconsMap} from '../../Helper/iconHelper';


class SharePlaceScreen extends Component {
    static get options() {
        return {
            topBar: {
                leftButtons: {
                    id: identifier.SIDE_DRAWER_BUTTON_ID,
                    icon: iconsMap[identifier.SIDE_DRAWER_ICON]

                },
                title: {
                    text: 'Find Place',
                    alignment: 'center'
                }
            }
        };
    }

    placeAddedHandler = (placeName) => {
        this.props.onAddPlace(placeName);
    };

    render() {
        return (
            <View>
                <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
            </View>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(actions.addPlace(placeName))
    };
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
