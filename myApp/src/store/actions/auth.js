import {AsyncStorage} from 'react-native';
import {AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN, TRY_AUTH} from './actionTypes';
import {ToastAndroid} from 'react-native';
import {uiStartLoading, uiStopLoading} from './ui';
import {goToBothPlace, goToLoginPage} from '../../Helper/navigation';

import {authentication, AUTH_MESSAGE, local_store} from '../../Helper/identifires';
import axios from 'axios';

export const tryAuth = (authData, authMode) => {
    return dispatch => {

        let url = (authMode === 'login') ? authentication.login_url : authentication.signUp_url;
        dispatch(uiStartLoading());
        axios.post(url, getAuthJsonData(authData))
            .then(response => {
                console.log(response);
                dispatch(uiStopLoading());
                goToBothPlace();
                dispatch(authStoreToken(response.data.idToken));
            })
            .catch(error => {
                console.log(error.response.data.error.message);
                ToastAndroid.showWithGravityAndOffset(AUTH_MESSAGE[error.response.data.error.message], ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
                dispatch(uiStopLoading());
            });

    };
};


const getAuthJsonData = (authData) => {
    return {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
    };
};

export const setAuthToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                checkForToken(dispatch, reject, resolve);
            } else {
                resolve(token);
            }
        });
        return promise;
    };
};
export const authStoreToken = (token) => {
    return dispatch => {
        dispatch(setAuthToken(token));
        AsyncStorage.setItem(local_store.token, token);
    };
};

export const autoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .catch(() => console.log('Failed to fetch token!'))
            .then(() => goToBothPlace());
    };
};

const checkForToken = (dispatch, reject, resolve) => {
    AsyncStorage.getItem(local_store.token)
        .catch(() => reject())
        .then(tokenFromStorage => {
            dispatch(setAuthToken(tokenFromStorage));
            resolve(tokenFromStorage);
        });
};
