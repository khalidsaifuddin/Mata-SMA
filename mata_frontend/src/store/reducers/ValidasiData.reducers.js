import * as Actions from '../actions';

const initialState = {
    validasi_data: {
        rows: [],
        total: 0
    },
    validasi_data_beranda: [],
    validasi_data_record: {
        rows: [],
        total: 0
    },
    rekap_validasi_beranda: {}
};

const ValidasiDataReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_VALIDASI_DATA:
        {
            return {
                ...state,
                validasi_data: action.payload
            };
        }
        case Actions.GET_VALIDASI_DATA_BERANDA:
        {
            return {
                ...state,
                rekap_validasi_beranda: action.payload[0]
            };
        }
        case Actions.GET_VALIDASI_DATA_RECORD:
        {
            return {
                ...state,
                validasi_data_record: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
}

export default ValidasiDataReducer;