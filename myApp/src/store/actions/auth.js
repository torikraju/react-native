import {AsyncStorage} from 'react-native';
import {SET_AUTH_TOKEN, AUTH_REMOVE_TOKEN} from './actionTypes';
import {ToastAndroid} from 'react-native';
import {uiStartLoading, uiStopLoading} from './ui';
import {goToBothPlace, goToLoginPage} from '../../Helper/navigation';

import {AUTH_MESSAGE, LOCAL_ID_TOKEN} from '../../Helper/identifires';

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        console.log('action-auth', authMode);
        const apiKey = 'AIzaSyC-8uDz6pEUwIVVPaJ2OCN55Bw-CmYI0rg';
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + apiKey;
        if (authMode === 'signup') {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + apiKey;
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(error => {
            console.log(error);
            ToastAndroid.showWithGravityAndOffset(
                'Something went wrong please try again',
                ToastAndroid.LONG, ToastAndroid.TOP, 25, 50,
            );
            dispatch(uiStopLoading());
        }).then(res => res.json())
            .then(pasredRes => {
                if (pasredRes.error) {
                    //alert('Athenticaiton failed, please try again');
                    ToastAndroid.showWithGravityAndOffset(
                        AUTH_MESSAGE[pasredRes.error.message],
                        ToastAndroid.LONG, ToastAndroid.TOP, 25, 50,
                    );
                } else if (!pasredRes.idToken) {
                    alert('Authentication failed, please try again');
                } else {
                    dispatch(authStoreToken(pasredRes.idToken, pasredRes.expiresIn));
                    goToBothPlace();
                }
                console.log(pasredRes)
                dispatch(uiStopLoading());
            });

    };
};

export const setAuthToken = token => {
    return {
        type: SET_AUTH_TOKEN,
        token: token
    }
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                let fetchedToken;
                AsyncStorage.getItem(LOCAL_ID_TOKEN)
                    .catch(() => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage;
                        if (!tokenFromStorage) {
                            reject();
                        }
                        return AsyncStorage.getItem('ap:auth:expiryDate')
                            .then(expiryDate => {
                                const parseExpiryDate = new Date(parseInt(expiryDate));
                                const now = new Date();
                                if (parseExpiryDate > now) {
                                    dispatch(setAuthToken(tokenFromStorage));
                                    resolve(fetchedToken);
                                } else {
                                    reject();
                                }

                            })
                            .catch(() => reject());

                    });
            } else {
                resolve(token);
            }
        });
        return promise;
    };
};


export const authStoreToken = (token, expiresIn) => {
    return dispatch => {
        dispatch(setAuthToken(token));
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        AsyncStorage.setItem(LOCAL_ID_TOKEN, token);
        AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString());
    };
};


export const autoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(() => goToBothPlace())
            .catch((error) => console.log('Failed to fetch token!', error));
    }
};

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("ap:auth:token");
        AsyncStorage.removeItem("ap:auth:expiryDate");
        return AsyncStorage.removeItem("ap:auth:refreshToken");
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
