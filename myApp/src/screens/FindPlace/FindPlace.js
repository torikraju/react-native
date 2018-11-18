import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Animated} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';

import {iconsMap} from '../../Helper/iconHelper';
import PlaceList from '../../component/PlaceList/PlaceList';
import {SCREEN_NAMES, NAVIGATION_IDENTIFIER, ICONS} from '../../Helper/identifires';
import {getPlaces} from '../../store/actions/index';

class FindPlaceScreen extends Component {


    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }


    componentDidAppear() {
        this.props.onLoadPlaces();
    }


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

    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0)
    };

    // componentDidMount() {
    //     this.props.onLoadPlaces();
    // }


    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }
        ).start(() => {
            this.setState({
                placesLoaded: true
            });
            this.placesLoadedHandler();
        });

    };

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

        let content = (
            <Animated.View style={{
                opacity: this.state.removeAnim,
                transform: [
                    {
                        scale: this.state.removeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [12, 1]
                        })
                    }
                ]
            }}>
                <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Find Places</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );

        if (this.state.placesLoaded) {
            content = <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
        }

        return (
            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    searchButton: {
        borderColor: 'orange',
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: 'orange',
        fontWeight: 'bold',
        fontSize: 26
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadPlaces: () => dispatch(getPlaces())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);
