import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';


import PlaceInput from './src/component/PlaceInput/PlaceInput';
import PlaceList from './src/component/PlaceList/PlaceList';
import PlaceDetail from './src/component/PlaceDetail/PlaceDetail';
import * as actions from './src/store/actions/index';


type Props = {};

class App extends Component<Props> {
    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
    };

    placeSelectedHandler = key => {
        this.props.onSelectPlace(key);

    };
    placeDeletedHandler = () => {
        this.props.onDeletePlace();
    };

    modalClosedHandler = () => {
        this.props.onDeselectPlace();
    };

    render() {
        return (
            <View style={styles.container}>
                <PlaceDetail
                    selectedPlace={this.props.selectedPlace}
                    onItemDeleted={this.placeDeletedHandler}
                    onModalClose={this.modalClosedHandler}/>
                <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
                <PlaceList
                    places={this.props.places}
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

const mapStateToProps = state => {
    return {
        places: state.places.places,
        selectedPlace: state.places.selectedPlace
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (name) => dispatch(actions.addPlace(name)),
        onDeletePlace: () => dispatch(actions.deletePlace()),
        onSelectPlace: (key) => dispatch(actions.selectPlace(key)),
        onDeselectPlace: () => dispatch(actions.deselectPlace())
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
