import React, {Component} from 'react';
import {View, Text, TextInput, Button, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux'

import PlaceInput from '../../component/PlaceInput/PlaceInput';
import * as actions from '../../store/actions/index';
import * as identifier from "../../Helper/identifires";
import {iconsMap} from '../../Helper/iconHelper';
import {NAVIGATION_IDENTIFIER} from '../../Helper/identifires';
import {styles} from './SharePlace.style';
import DefaultInput from '../../component/UI/DefaultInput/DefaultInput';
import MainText from '../../component/UI/MainText/MainText';
import HeadingText from '../../component/UI/HeadingText/HeadingText';
import imagePlaceHolder from '../../assets/beautiful-place.jpg';


class SharePlaceScreen extends Component {
    static get options() {
        return {
            topBar: {
                leftButtons: {
                    id: NAVIGATION_IDENTIFIER.SIDE_DRAWER_BUTTON_ID,
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
            <ScrollView>
                <View style={styles.container}>
                    <MainText><HeadingText>Share a place with us!</HeadingText></MainText>
                    <View style={styles.placeholder}>
                        <Image source={imagePlaceHolder} style={styles.imagePreview}/>
                    </View>
                    <View style={styles.button}>
                        <Button title='Pick Image'/>
                    </View>
                    <View style={styles.placeholder}><Text>Map</Text></View>
                    <View style={styles.button}>
                        <Button title='Locate Me'/>
                    </View>
                    <DefaultInput placeholder='Place Name'/>
                    <View style={styles.button}>
                        <Button title='Share the Place'/>
                    </View>
                    {/*<PlaceInput onPlaceAdded={this.placeAddedHandler}/>*/}
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
