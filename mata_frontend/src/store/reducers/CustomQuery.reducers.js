import * as Actions from '../actions';

const initialState = {
    kategori_custom_query: {
        rows: [],
        total: 0
    },
    custom_query: {
        rows: [],
        total: 0
    }
};

const CustomQueryReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        
        case Actions.GET_KATEGORI_CUSTOM_QUERY:
        {
            return {
                ...state,
                kategori_custom_query: action.payload
            };
        }
        case Actions.RUN_CUSTOM_QUERY:
        {
            return {
                ...state,
                custom_query: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
}

export default CustomQueryReducer;