import {Platform} from 'react-native';




export const DIMENSIONS = {
    portrait: 'portrait',
    landscape: 'landscape',
    height: 500
};

export const AUTH_MESSAGE = {
    'EMAIL_NOT_FOUND': 'This email is not registered',
    'INVALID_PASSWORD': "Password didn't match",
    'USER_DISABLED': 'This user in disabled',
    'EMAIL_EXISTS': 'This email is already registered',
    'OPERATION_NOT_ALLOWED': 'SignUp is disabled',
    'TOO_MANY_ATTEMPTS_TRY_LATER': 'Too many attempts please trylater'
};

export const local_store = {
    token: 'ap:auth:token',
    expiryDate: 'ap:auth:expiryDate',
    refreshToken: 'ap:auth:refreshToken'
};

export const api_key = 'AIzaSyC-8uDz6pEUwIVVPaJ2OCN55Bw-CmYI0rg';

export const authentication = {
    login_url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + api_key,
    signUp_url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + api_key,
    place_url: 'https://awesome-places-f47ae.firebaseio.com/places.json?auth=',
    cloud_storage: 'https://us-central1-awesome-places-f47ae.cloudfunctions.net/storeImage'
};
