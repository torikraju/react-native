import {combineReducers} from 'redux';
import AuthReducer from './auth';
import CreateEmployeeReducer from './employee';

export default combineReducers({
    auth: AuthReducer,
    employeeForm: CreateEmployeeReducer
});
