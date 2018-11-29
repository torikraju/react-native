import {AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

import {getUserId, authGetToken} from './auth';
import {local_store} from '../../helper/identifires';


import {
    EMPLOYEE_INPUT_HANDLER,
    RESET_EMPLOYEE_FROM,
    ALL_EMPLOYEES
} from './actionTypes';

export const inputHandler = ({prop, value}) => {
    return {
        type: EMPLOYEE_INPUT_HANDLER,
        payload: {prop, value}
    };
};

const resetEmployeeForm = () => {
    return {
        type: RESET_EMPLOYEE_FROM
    }
};


export const setEmployees = (employees) => {
    return {
        type: ALL_EMPLOYEES,
        payload: employees
    };
};


export const employeeCreate = ({name, phone, shift}) => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                let id;
                AsyncStorage.getItem(local_store.userId)
                    .then(response => {
                        id = response;
                        axios.post(`https://manager-eb77b.firebaseio.com/users/${id}/employee.json?auth=${token}`, {
                            name: name,
                            phone: phone,
                            shift: shift
                        }).then(() => {
                            dispatch(resetEmployeeForm());
                            Actions.employeeList({type: 'reset'});
                        }).catch((error) => console.log(error));
                    })
                    .catch(() => console.log('error'));
            })
            .catch((error) => console.log('failed to fetch token when saving new employee', error))
    };
};


export const fetchEmployees = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                let id;
                AsyncStorage.getItem(local_store.userId)
                    .then(response => {
                        id = response;
                        axios.get(`https://manager-eb77b.firebaseio.com/users/${id}/employee.json?auth=${token}`)
                            .then((response) => {
                                console.log(response);
                                dispatch(setEmployees(convertPlaceToArray(response.data)));
                            }).catch((error) => console.log(error));
                    })
                    .catch(() => console.log('error'));
            })
            .catch((error) => console.log('failed to fetch token when saving new employee', error))
    };
};

export const employeeUpdate = ({name, phone, shift, uid}) => {
    return dispatch => {
        console.log(name, phone, shift, uid);
        dispatch(authGetToken())
            .then(token => {
                let id;
                AsyncStorage.getItem(local_store.userId)
                    .then(response => {
                        id = response;
                        let data = {
                            name: name,
                            phone: phone,
                            shift: shift
                        };
                        console.log(data);
                        axios.put(`https://manager-eb77b.firebaseio.com/users/${id}/employee/${uid}.json/?auth=${token}`, data)
                            .then((response) => {
                                dispatch(resetEmployeeForm());
                                console.log(response);
                                Actions.employeeList({type: 'reset'});
                            }).catch((error) => console.log(error));
                    })
                    .catch(() => console.log('error'));
            })
            .catch((error) => console.log('failed to fetch token when saving new employee', error))
    };
};

export const employeeDelete = ({uid}) => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                let id;
                AsyncStorage.getItem(local_store.userId)
                    .then(response => {
                        id = response;
                        axios.delete(`https://manager-eb77b.firebaseio.com/users/${id}/employee/${uid}.json/?auth=${token}`)
                            .then((response) => {
                                dispatch(resetEmployeeForm());
                                console.log(response);
                                Actions.employeeList({type: 'reset'});
                            }).catch((error) => console.log(error));
                    }).catch(() => console.log('failed to delete a employee'));
            }).catch((error) => console.log('failed to fetch token when saving new employee', error))
    };

};


//need to pass it to app data
const convertPlaceToArray = parseRes => {
    const places = [];
    for (let key in parseRes) {
        places.push({
            ...parseRes[key],
            key: key
        });
    }
    return places;
};




