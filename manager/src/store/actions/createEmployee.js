import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

import {EMPLOYEE_UPDATE} from './actionTypes';

export const employeeUpdate = ({prop, value}) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: {prop, value}
    };
};
