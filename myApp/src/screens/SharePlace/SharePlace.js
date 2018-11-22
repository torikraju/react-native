import React, {Component} from 'react';
import {View, Text, TextInput, Button, ScrollView, Image, ActivityIndicator} from 'react-native';
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
import {Navigation} from "react-native-navigation";


class SharePlaceScreen extends Component {


    reset = () => {
        this.setState({
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
        });
    };

    componentWillMount() {
        this.reset();
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
        this.reset();
        this.imagePicker.reset();
        this.locationPicker.reset();
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

        let submitButton = (
            <Button
                title='Share the Place'
                onPress={this.placeAddedHandler}
                disabled={
                    !this.state.controls.placeName.valid ||
                    !this.state.controls.location.valid ||
                    !this.state.controls.image.valid
                }
            />
        );

        if (this.props.isLoading) {
            submitButton = <ActivityIndicator/>;
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a place with us!</HeadingText>
                    </MainText>
                    <PickImage onImagePicked={this.imagePickedHandler} ref={ref => this.imagePicker = ref}/>
                    <PickLocation onLocationPick={this.locationPickedHandler} ref={ref => this.locationPicker = ref}/>
                    <PlaceInput
                        placeName={this.state.controls.placeName.value}
                        onChangeText={this.placeNameChangedHandler}/>
                    <View style={styles.button}>
                        {submitButton}
                    </View>
                </View>
            </ScrollView>
        );
    }
}


const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(actions.addPlace(placeName, location, image))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
