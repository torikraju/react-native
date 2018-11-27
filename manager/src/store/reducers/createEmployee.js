import {
    EMPLOYEE_UPDATE
} from '../actions/actionTypes';

const initialState = {
    name: '',
    phone: '',
    shift: ''
};


export default (state = initialState, action) => {
    switch (action.type) {
        case EMPLOYEE_UPDATE:
            return {
                //key interpolation
                ...state, [action.payload.prop]: action.payload.value
            };
        default:
            return state;
    }
};
