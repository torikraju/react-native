import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    START_LOADING,
    STOP_LOADING,
    LOGIN_USER_SUCCESS,
    SET_AUTH_ERROR,
    RESET_AUTH_ERROR
} from '../actions/actionTypes';
import {updateObject} from '../../helper/uitility';

const initialState = {
    email: '',
    password: '',
    loading: false,
    error: '',
    user: null
};

const emailChanged = (state, action) => {
    return updateObject(state, {email: action.payload});
};
const passwordChanged = (state, action) => {
    return updateObject(state, {password: action.payload});
};

const startLoading = (state) => {
    return updateObject(state, {loading: true});
};

const stopLoading = (state) => {
    return updateObject(state, {loading: false});
};

const loginUserSuccess = (state, action) => {
    return updateObject(state, {user: action.payload})
};

const setAuthError = (state, action) => {
    return updateObject(state, {error: action.payload})
};
const resetAuthError = (state) => {
    return updateObject(state, {error: ''})
};


export default (state = initialState, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return emailChanged(state, action);
        case PASSWORD_CHANGED:
            return passwordChanged(state, action);
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
