import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';

import {iconsMap} from '../../Helper/iconHelper';
import PlaceList from '../../component/PlaceList/PlaceList';
import {SCREEN_NAMES, NAVIGATION_IDENTIFIER, ICONS} from '../../Helper/identifires';


class FindPlaceScreen extends Component {


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

    itemSelectedHandler = (key) => {
        const selectedPlace = this.props.places.find(place => {
            return place.key === key;
        });
        Navigation.push(this.props.componentId, {
            component: {
                name: SCREEN_NAMES.PlaceDetail,
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
