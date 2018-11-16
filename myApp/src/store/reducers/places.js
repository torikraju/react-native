import * as actionTypes from '../actions/actionTypes';

const initialState = {
    places: []
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
                        uri: action.image.uri
                    },
                    location: action.location
                })
            };
        case actionTypes.DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.key !== action.placeKey;
                })
            };
        default:
            return state;
    }
};

export default reducer;