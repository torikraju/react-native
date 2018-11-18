import * as actionTypes from './actionTypes';
import {uiStartLoading, uiStopLoading} from './ui';
import {goToBothPlace} from '../../Helper/navigation';

export const tryAuth = (authData) => {
    return dispatch => {
        dispatch(authSignUp(authData));
    };
};

export const authSignUp = (authData) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC-8uDz6pEUwIVVPaJ2OCN55Bw-CmYI0rg', {
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
            alert('Athenticaiton failed, please try again');
            dispatch(uiStopLoading());
        }).then(res => res.json())
            .then(pasredRes => {
                if (pasredRes.error) {
                    alert('Athenticaiton failed, please try again');
                } else {
                    goToBothPlace();
                }
                console.log(pasredRes)
                dispatch(uiStopLoading());
            });
    }
};
