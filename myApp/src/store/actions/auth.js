import {AsyncStorage} from 'react-native';
import {AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN, TRY_AUTH} from './actionTypes';
import {ToastAndroid} from 'react-native';
import {uiStartLoading, uiStopLoading} from './ui';
import {goToBothPlace, goToLoginPage} from '../../Helper/navigation';

import {authentication, AUTH_MESSAGE, local_store, api_key} from '../../Helper/identifires';
import axios from 'axios';

export const tryAuth = (authData, authMode) => {
    return dispatch => {

        let url = (authMode === 'login') ? authentication.login_url : authentication.signUp_url;
        dispatch(uiStartLoading());
        axios.post(url, getAuthJsonData(authData))
            .then(response => {
                console.log(response);
                dispatch(uiStopLoading());
                dispatch(authStoreToken(response.data.idToken, response.data.expiresIn, response.data.refreshToken));
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

export const setAuthToken = (token, expiryDate) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expiryDate: expiryDate
    };
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            const expiryDate = getState().auth.expiryDate;
            if (!token || new Date(expiryDate) <= new Date()) {
                let fetchedToken;
                AsyncStorage.getItem(local_store.token)
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage;
                        if (!tokenFromStorage) {
                            reject();
                            return;
                        }
                        return AsyncStorage.getItem(local_store.expiryDate);
                    })
                    .then(expiryDate => {
                        const parsedExpiryDate = new Date(parseInt(expiryDate));
                        const now = new Date();
                        if (parsedExpiryDate > now) {
                            dispatch(setAuthToken(fetchedToken));
                            resolve(fetchedToken);
                        } else {
                            reject();
                        }
                    })
                    .catch(err => reject());
            } else {
                resolve(token);
            }
        });
        return promise
            .catch(err => {
                return AsyncStorage.getItem(local_store.refreshToken)
                    .then(refreshToken => {
                        return fetch(
                            "https://securetoken.googleapis.com/v1/token?key=" + api_key,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                body: "grant_type=refresh_token&refresh_token=" + refreshToken
                            }
                        );
                    })
                    .then(res => res.json())
                    .then(parsedRes => {
                        if (parsedRes.id_token) {
                            console.log("Refresh token worked!");
                            dispatch(
                                authStoreToken(
                                    parsedRes.id_token,
                                    parsedRes.expires_in,
                                    parsedRes.refresh_token
                                )
                            );
                            return parsedRes.id_token;
                        } else {
                            dispatch(authClearStorage());
                        }
                    });
            })
            .then(token => {
                if (!token) {
                    throw new Error();
                } else {
                    return token;
                }
            });
    };
};


export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        const now = new Date();
        const expiryDate = now.getTime() + 10 * 1000;
        dispatch(setAuthToken(token, expiryDate));
        AsyncStorage.setItem(local_store.token, token);
        AsyncStorage.setItem(local_store.expiryDate, expiryDate.toString());
        AsyncStorage.setItem(local_store.refreshToken, refreshToken);
    };
};

export const autoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(() => goToBothPlace())
            .catch(() => console.log('Failed to fetch token! autoSignIn'));
    }
};

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem(local_store.token);
        AsyncStorage.removeItem(local_store.expiryDate);
        return AsyncStorage.removeItem(local_store.refreshToken);
    };
};


export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage()).then(() => {
            goToLoginPage();
        });
        dispatch(authRemoveToken());
    };
};

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    };
};

