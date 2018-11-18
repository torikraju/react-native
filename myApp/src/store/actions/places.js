import * as actionTypes from './actionTypes';
import {iconsLoaded} from "../../Helper/iconHelper";

export const addPlace = (placeName, location, image) => {
    return dispatch => {

        console.log('sendingRequest...');
        fetch('https://us-central1-awesome-places-f47ae.cloudfunctions.net/storeImage', {
            method: 'POST',
            body: JSON.stringify({
                image: image.base64
            })
        }).catch(error => console.log(error))
            .then(response => response.json())
            .then(parseResponse => {
                const placeData = {
                    name: placeName,
                    location: location,
                    image: parseResponse.imageUrl
                };
                fetch('https://awesome-places-f47ae.firebaseio.com/places.json', {
                    method: 'POST',
                    body: JSON.stringify(placeData)
                }).catch(error => console.log(error))
                    .then(response => response.json())
                    .then(parseResponse => {
                        console.log(parseResponse);
                    });
            });
    };
};

export const deletePlace = (key) => {
    return {
        type: actionTypes.DELETE_PLACE,
        placeKey: key
    };
};



