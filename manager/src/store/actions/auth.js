import {AsyncStorage} from 'react-native';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';

import {authentication, local_store} from '../../helper/identifires';

import {
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

const loginUserSuccess = (token, expiryDate) => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {token, expiryDate}
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
    dispatch(stopLoading());
    const expiryDate = new Date().getTime() + 3600 * 1000;
    dispatch(loginUserSuccess(response.data.idToken, expiryDate));
    dispatch(storeAuthToken(response.data.idToken, expiryDate, response.data.localId));
    Actions.main();
};

const onLoginFailed = (dispatch, error) => {
    console.log(error);
    dispatch(stopLoading());
    dispatch(setAuthError('Authentication failed'));
};

export const loginUser = ({email, password}) => {
    return dispatch => {
        dispatch(resetAuthError());
        dispatch(startLoading());
        axios.post(authentication.login_url, {
            email: email,
            password: password,
            returnSecureToken: true
        })
            .then(response => onLoginSuccess(dispatch, response))
            .catch(error => {
                console.log(error);
                axios.post(authentication.signUp_url, {email: email, password: password})
                    .then(response => onLoginSuccess(dispatch, response))
                    .catch(error => onLoginFailed(dispatch, error))
            });
    };
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            const expiryDate = getState().auth.expiryDate;
            AsyncStorage.getItem(local_store.userId)
                .catch(() => reject())
                .then(localUserId => {
                    if (!token || new Date(expiryDate) <= new Date()) {
                        AsyncStorage.getItem(local_store.token)
                            .catch(() => reject())
                            .then(tokenFromStorage => {
                                if (!tokenFromStorage) {
                                    reject();
                                    return;
                                }
                                AsyncStorage.getItem(local_store.expiryDate)
                                    .then(expiryDate => {
                                        const parsedExpiryDate = new Date(parseInt(expiryDate));
                                        const now = new Date();
                                        if (parsedExpiryDate > now) {
                                            dispatch(loginUserSuccess(tokenFromStorage, expiryDate));
                                            resolve({token: tokenFromStorage, uid: localUserId});
                                        } else {
                                            reject();
                                        }
                                    })
                                    .catch(() => reject());
                            });
                    } else {
                        resolve({token: token, uid: localUserId});
                    }
                });
        });
        return promise;
    };
};

const storeAuthToken = (token, expiryDate, userId) => {
    return () => {
        AsyncStorage.setItem(local_store.token, token);
        AsyncStorage.setItem(local_store.expiryDate, expiryDate.toString());
        AsyncStorage.setItem(local_store.userId, userId);
    }
};

export const autoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(() => Actions.main())
            .catch((error) => console.log('Failed to fetch token! autoSignIn', error));
    }
};




