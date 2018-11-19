import {SET_AUTH_TOKEN, AUTH_REMOVE_TOKEN} from '../actions/actionTypes';

const initialState = {
    token: null
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_TOKEN:
            return {
                ...state,
                token: action.token
            };
        case AUTH_REMOVE_TOKEN:
            return {
                ...state,
                token: null
            };
        default:
            return state;
    }
};

export default reducer;
