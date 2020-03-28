import * as types from '../actions/types';

export default function(state = [], action) {
    const response = action.response;
    console.log('in default', action.type)
    switch(action.type) {
        case types.DUMMY_ACTION: 
            console.log('in action start');
            return {...state, dummyLoading: true};
        case types.DUMMY_ACTION + '_SUCCESS':
            console.log('in action success', action)
            return {...state, dummyData: action.response, dummyLoading: undefined}
        case types.DUMMY_ACTION + '_ERROR':
            return {...state, dummyErr: action.error, dummyLoading: undefined}
        default:
            return state;
    }
}
