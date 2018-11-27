import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    STOP_LOADING,
    START_LOADING,
    LOGIN_USER_SUCCESS,
    SET_AUTH_ERROR,
    RESET_AUTH_ERROR
} from './actionTypes';

const startLoading = () => {
    return {
        type: START_LOADING
    };
};

const stopLoading = () => {
    return {
        type: STOP_LOADING
    };
};

const loginUserSuccess = user => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: user
    };
};

const setAuthError = error => {
    return {
        type: SET_AUTH_ERROR,
        payload: error
    };
};

const resetAuthError = () => {
    return {
        type: RESET_AUTH_ERROR
    };
};

const onLoginSuccess = (dispatch, response) => {
    console.log(response);
    dispatch(stopLoading());
    dispatch(loginUserSuccess(response));
    Actions.main();
};

const onLoginFailed = (dispatch, error) => {
    console.log(error);
    dispatch(stopLoading());
    dispatch(setAuthError('Authentication failed'));
};

export const emailChanged = text => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
};

export const passwordChanged = text => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
};

export const loginUser = ({email, password}) => {
    return dispatch => {
        dispatch(resetAuthError());
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => onLoginSuccess(dispatch, response))
            .catch((error) => {
                console.log(error);
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(response => onLoginSuccess(dispatch, response))
                    .catch((error) => onLoginFailed(dispatch, error));
            });
    };
};
