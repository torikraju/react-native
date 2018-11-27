import {combineReducers} from 'redux';
import AuthReducer from './auth';
import CreateEmployeeReducer from './createEmployee';

export default combineReducers({
    auth: AuthReducer,
    employeeForm: CreateEmployeeReducer
});
