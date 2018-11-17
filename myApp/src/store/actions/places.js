import * as actionTypes from './actionTypes';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        const placeData = {
            name: placeName,
            location: location
        };

        fetch('https://awesome-places-f47ae.firebaseio.com/places.json', {
            method: 'POST',
            body: JSON.stringify(placeData)
        })
            .catch(error => console.log(error))
            .then(response => response.json())
            .then(parseResponse => {
                console.log(parseResponse);
            });
    };
};

export const deletePlace = (key) => {
    return {
        type: actionTypes.DELETE_PLACE,
        placeKey: key
    };
};



