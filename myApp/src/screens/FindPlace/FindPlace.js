import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import * as identifier from '../../Helper/identifires';
import {iconsMap} from '../../Helper/iconHelper';

import PlaceList from '../../component/PlaceList/PlaceList';


class FindPlaceScreen extends Component {


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

    itemSelectedHandler = (key) => {
        const selectedPlace = this.props.places.find(place => {
            return place.key === key;
        });
        Navigation.push(this.props.componentId, {
            component: {
                name: 'PlaceDetails',
                passProps: {
                    selectedPlace: selectedPlace
                },
                options: {
                    topBar: {
                        title: {
                            text: selectedPlace.name
                        }
                    }
                }
            }
        })
        ;
    };


    render() {
        return (
            <View>
                <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

export default connect(mapStateToProps)(FindPlaceScreen);
