import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';


import PlaceInput from './src/component/PlaceInput/PlaceInput';
import PlaceList from './src/component/PlaceList/PlaceList';
import PlaceDetail from './src/component/PlaceDetail/PlaceDetail';


type Props = {};
export default class App extends Component<Props> {
    state = {
        places: [],
        selectedPlace: null
    };

    placeAddedHandler = placeName => {
        this.setState(prevState => {
            return {
                places: prevState.places.concat({
                    key: Math.random(),
                    name: placeName,
                    image: {
                        uri: 'http://offroadbangladesh.com/wp-content/uploads/2015/02/Amiakum-waterfall-626x365.jpg'
                    }
                })
            };
        });
    };

    placeSelectedHandler = key => {
        this.setState(prevState => {
            return {
                selectedPlace: prevState.places.find(place => {
                    return place.key === key;
                })
            };
        });

    };
    placeDeletedHandler = () => {
        this.setState(prevState => {
            return {
                places: prevState.places.filter((place) => {
                    return place.key !== prevState.selectedPlace.key;
                }),
                selectedPlace: null
            };
        });
    };
    modalClosedHandler = () => {
        this.setState({
            selectedPlace: null
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <PlaceDetail
                    selectedPlace={this.state.selectedPlace}
                    onItemDeleted={this.placeDeletedHandler}
                    onModalClose={this.modalClosedHandler}/>
                <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
                <PlaceList
                    places={this.state.places}
                    onItemSelected={this.placeSelectedHandler}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 26,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start"
    }
});
