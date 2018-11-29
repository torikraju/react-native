import {
    START_LOADING,
    STOP_LOADING,
    LOGIN_USER_SUCCESS,
    SET_AUTH_ERROR,
    RESET_AUTH_ERROR
} from '../actions/actionTypes';
import {updateObject} from '../../helper/uitility';

const initialState = {
    loading: false,
    error: '',
    user: null,
    token: null,
    expiryDate: null
};

const startLoading = (state) => {
    return updateObject(state, {loading: true});
};

const stopLoading = (state) => {
    return updateObject(state, {loading: false});
};

const loginUserSuccess = (state, action) => {
    return updateObject(state, {
        token: action.payload.token,
        expiryDate: action.payload.expiryDate
    });
};

const setAuthError = (state, action) => {
    return updateObject(state, {error: action.payload})
};
const resetAuthError = (state) => {
    return updateObject(state, {error: ''})
};


export default (state = initialState, action) => {
    switch (action.type) {
        case START_LOADING:
            return startLoading(state);
        case STOP_LOADING:
            return stopLoading(state);
        case LOGIN_USER_SUCCESS:
            return loginUserSuccess(state, action);
        case SET_AUTH_ERROR:
            return setAuthError(state, action);
        case RESET_AUTH_ERROR:
            return resetAuthError(state);
        default:
            return state;
    }
};
