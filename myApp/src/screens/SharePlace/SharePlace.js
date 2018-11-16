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
import validate from '../../utility/validation';


class SharePlaceScreen extends Component {

    state = {
        placeName: '',
        controls: {
            placeName: {
                value: "",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            location: {
                value: null,
                valid: false
            },
            image: {
                value: null,
                valid: false
            }
        }
    }

    placeNameChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            };
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
        this.props.onAddPlace(
            this.state.controls.placeName.value,
            this.state.controls.location.value,
            this.state.controls.image.value
        );
        //optional make placeName value to empty
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: ''
                    }
                }
            };
        });
    };

    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            };
        });
    };


    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            };
        });
    };


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a place with us!</HeadingText>
                    </MainText>
                    <PickImage onImagePicked={this.imagePickedHandler}/>
                    <PickLocation onLocationPick={this.locationPickedHandler}/>
                    <PlaceInput
                        placeName={this.state.controls.placeName.value}
                        onChangeText={this.placeNameChangedHandler}/>
                    <View style={styles.button}>
                        <Button
                            title='Share the Place'
                            onPress={this.placeAddedHandler}
                            disabled={
                                !this.state.controls.placeName.valid ||
                                !this.state.controls.location.valid ||
                                !this.state.controls.image.valid
                            }
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(actions.addPlace(placeName, location, image))
    };
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
