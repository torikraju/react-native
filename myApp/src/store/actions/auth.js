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
                dispatch(authStoreToken(response.data.idToken, response.data.expiresIn));
                goToBothPlace();
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
    };
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                let fetchedToken;
                AsyncStorage.getItem(local_store.token)
                    .catch(err => reject())
                    .then(tokenFormStorage => {
                        fetchedToken = tokenFormStorage;
                        if (!tokenFormStorage) {
                            console.log('localToke', tokenFormStorage);
                            reject();
                            return;
                        }
                        return AsyncStorage.getItem(local_store.expiryDate);
                    }).then(expiryDate => {
                    const parseExpiryDate = new Date(parseInt(expiryDate));
                    const now = new Date();
                    if (parseExpiryDate > now) {
                        dispatch(setAuthToken(fetchedToken));
                        resolve(fetchedToken);
                    }
                    else {
                        reject();
                    }
                }).catch(err => reject());
            } else {
                resolve(token);
                dispatch(setAuthToken(token));
            }
        });
        return promise;
    };
};
export const authStoreToken = (token, expiresIn) => {
    return dispatch => {
        dispatch(setAuthToken(token));
        const now = new Date();
        const expiryDate = now.getTime() + 10 * 1000;
        AsyncStorage.setItem(local_store.token, token);
        AsyncStorage.setItem(local_store.expiryDate, expiryDate.toString());
    };
};

export const autoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(() => goToBothPlace())
            .catch(() => console.log('Failed to fetch token!'));
    }
};

