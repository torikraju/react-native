import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'

import PlaceInput from '../../component/PlaceInput/PlaceInput';
import * as actions from '../../store/actions/index';


class SharePlaceScreen extends Component {
    static get options() {
        return {
            topBar: {
                backButton: {
                    title: 'Back',
                    visible: true,
                    showTitle: true
                },
                title: {
                    text: 'Search Place',
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
                <PlaceInput onPlaceAdded={this.placeAddedHandler} />
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