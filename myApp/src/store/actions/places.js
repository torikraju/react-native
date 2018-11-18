import * as actionTypes from './actionTypes';
import {uiStopLoading, uiStartLoading} from './ui';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch('https://us-central1-awesome-places-f47ae.cloudfunctions.net/storeImage', {
            method: 'POST',
            body: JSON.stringify({
                image: image.base64
            })
        }).catch(error => {
            alert("Something went wrong, please try again!");
            console.log(error);
            dispatch(uiStopLoading());
        })
            .then(response => response.json())
            .then(parseResponse => {
                dispatch(getPlaces());
                const placeData = {
                    name: placeName,
                    location: location,
                    image: parseResponse.imageUrl
                };
                fetch('https://awesome-places-f47ae.firebaseio.com/places.json', {
                    method: 'POST',
                    body: JSON.stringify(placeData)
                }).catch(error => {
                    alert("Something went wrong, please try again!");
                    console.log(error);
                    dispatch(uiStopLoading());
                })
                    .then(response => response.json())
                    .then(parseResponse => {
                        dispatch(uiStopLoading());
                        console.log(parseResponse);
                    });
            });
    };
};


export const getPlaces = () => {
    return dispatch => {
        fetch('https://awesome-places-f47ae.firebaseio.com/places.json')
            .catch(err => {
                alert("Something went wrong, please try again!");
                console.log(err);
            }).then(res => res.json())
            .then(parseRes => {
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
                dispatch(setPlaces(places));
            });
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
        dispatch(removePlace(key));
        fetch("https://awesome-places-f47ae.firebaseio.com/places/" + key + ".json", {
            method: "DELETE"
        })
            .catch(err => {
                alert("Something went wrong, sorry :/");
                console.log(err);
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log("Done!");
                console.log(parsedRes);
            });
    };
};


export const removePlace = key => {
    return {
        type: actionTypes.REMOVE_PLACE,
        key: key
    };
};



