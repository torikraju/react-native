import * as actionTypes from '../actions/actionTypes';

const initialState = {
    places: [],
    selectedPlace: null
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random().toString(36).substr(2, 9),
                    name: action.placeName,
                    image: {
                        uri: 'http://offroadbangladesh.com/wp-content/uploads/2015/02/Amiakum-waterfall-626x365.jpg'
                    }
                })
            };
        case actionTypes.DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.key !== state.selectedPlace.key;
                }),
                selectedPlace: null
            };
        case actionTypes.SELECT_PLACE:
            return {
                ...state,
                selectedPlace: state.places.find(place => {
                    return place.key === action.placeKey;
                })
            };
        case actionTypes.DESELECT_PLACE:
            return {
                ...state,
                selectedPlace: null
            };
        default:
            return state;
    }
};

export default reducer;