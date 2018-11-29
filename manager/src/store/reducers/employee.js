import {
    EMPLOYEE_INPUT_HANDLER,
    RESET_EMPLOYEE_FROM,
    ALL_EMPLOYEES
} from '../actions/actionTypes';

const initialState = {
    name: '',
    phone: '',
    shift: '',
    employees: []
};


export default (state = initialState, action) => {
    switch (action.type) {
        case EMPLOYEE_INPUT_HANDLER:
            return {
                //key interpolation
                ...state, [action.payload.prop]: action.payload.value
            };
        case RESET_EMPLOYEE_FROM:
            return initialState;
        case ALL_EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            };
        default:
            return state;
    }
};
