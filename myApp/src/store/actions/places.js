import * as actionTypes from './actionTypes';
import {uiStopLoading, uiStartLoading} from './ui';
import {authGetToken} from "./auth";

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        let authToken;
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(() => alert("No valid token found!"))
            .then(token => {
                authToken = token;
                return fetch('https://us-central1-awesome-places-f47ae.cloudfunctions.net/storeImage', {
                    method: 'POST',
                    body: JSON.stringify({
                        image: image.base64
                    }),
                    headers: {
                        'Authorization': 'Bearer ' + authToken
                    }
                });
            })
            .then(response => response.json())
            .then(parseResponse => {
                dispatch(getPlaces());
                const placeData = {
                    name: placeName,
                    location: location,
                    image: parseResponse.imageUrl
                };
                fetch('https://awesome-places-f47ae.firebaseio.com/places.json?auth=' + authToken, {
                    method: 'POST',
                    body: JSON.stringify(placeData)
                })
                    .then(response => response.json())
                    .then(() => dispatch(uiStopLoading()))
                    .catch(() => addPlaceCatchError(dispatch));
            })
            .catch(() => addPlaceCatchError(dispatch));
    };
};


export const getPlaces = () => {
    return dispatch => {
        dispatch(authGetToken())
            .catch(() => alert("No valid token found!"))
            .then(token => fetch('https://awesome-places-f47ae.firebaseio.com/places.json?auth=' + token))
            .then(res => res.json())
            .then(parseRes => dispatch(setPlaces(convertPlaceToArray(parseRes))))
            .catch(() => alert("Something went wrong, please try again!"));
    };
};

export const setPlaces = (places) => {
    return {
        type: actionTypes.SET_PLACES,
        places: places
    };
};


export const deletePlace = (key) => {
    return dispatch => {
        dispatch(authGetToken())
            .catch(() => alert("No valid token found!"))
            .then(token => {
                dispatch(removePlace(key));
                return fetch("https://awesome-places-f47ae.firebaseio.com/places/" + key + ".json?auth=" + token, {method: "DELETE"});
            }).then(res => res.json())
            .then(parsedRes => console.log(parsedRes))
            .catch(() => alert("Something went wrong, sorry :/"));
    };
};


export const removePlace = key => {
    return {
        type: actionTypes.REMOVE_PLACE,
        key: key
    };
};


const convertPlaceToArray = parseRes => {
    const places = [];
    for (let key in parseRes) {
        places.push({
            ...parseRes[key],
            image: {
                uri: parseRes[key].image
            },
            key: key
        });
    }
    return places;
};

const addPlaceCatchError = dispatch => {
    alert("Something went wrong, please try again!");
    dispatch(uiStopLoading());
};


