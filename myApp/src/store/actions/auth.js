import {SET_AUTH_TOKEN} from './actionTypes';
import {ToastAndroid} from 'react-native';
import {uiStartLoading, uiStopLoading} from './ui';
import {goToBothPlace} from '../../Helper/navigation';

import {AUTH_MESSAGE} from '../../Helper/identifires';

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
                    dispatch(setAuthToken(pasredRes.idToken));
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
                reject();
            } else {
                resolve(token);
            }
        });
        return promise;
    };
};
