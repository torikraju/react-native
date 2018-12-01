import {Actions} from 'react-native-router-flux';
import axios from 'axios';

import {authGetToken} from './auth';
import {url} from '../../helper/identifires';


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

const gotoEmployeeList = dispatch => {
    dispatch(resetEmployeeForm());
    Actions.employeeList({type: 'reset'});
};

const getFromData = (name, phone, shift) => {
    return {
        name: name,
        phone: phone,
        shift: shift
    }
};


export const employeeCreate = ({name, phone, shift}) => {
    return dispatch => {
        dispatch(authGetToken())
            .then(response => {
                axios.post(`${url.db_url}/${response.uid}/employee.json?auth=${response.token}`, getFromData(name, phone, shift))
                    .then(() => gotoEmployeeList(dispatch))
                    .catch(error => console.log(error));
            })
            .catch(error => console.log('failed to fetch token and uid form localStorage while creating employee', error))
    };
};


export const fetchEmployees = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(response => {
                axios.get(`${url.db_url}/${response.uid}/employee.json?auth=${response.token}`)
                    .then(response => dispatch(setEmployees(convertPlaceToArray(response.data))))
                    .catch(error => console.log(error));
            })
            .catch(error => console.log('failed to fetch token and uid form localStorage while fetching employee', error))
    };
};

export const employeeUpdate = ({name, phone, shift, uid}) => {
    return dispatch => {
        console.log(name, phone, shift, uid);
        dispatch(authGetToken())
            .then(response => {
                axios.put(`${url.db_url}/${response.uid}/employee/${uid}.json/?auth=${response.token}`, getFromData(name, phone, shift))
                    .then(() => gotoEmployeeList(dispatch))
                    .catch(error => console.log(error));
            }).catch(error => console.log('failed to fetch token and uid form localStorage while updating employee', error))
    };
};

export const employeeDelete = ({uid}) => {
    return dispatch => {
        dispatch(authGetToken())
            .then(response => {
                axios.delete(`${url.db_url}/${response.uid}/employee/${uid}.json/?auth=${response.token}`)
                    .then(() => Actions.employeeList({type: 'reset'}))
                    .catch(error => console.log(error));
            }).catch(error => console.log('failed to fetch token and uid form localStorage while deleting employee', error))
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




