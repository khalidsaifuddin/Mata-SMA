import * as Actions from '../actions';
import React, {Component} from 'react';

const initialState = {
    foo: 'bar',
    spm_kabupaten: [{
        persen: 0,
        tanggal_rekap_terakhir: '-'
    }],
    spm_kabupaten_per_kecamatan: [{
        persen: 0,
        tanggal_rekap_terakhir: '-'
    }],
    spm_kabupaten_per_sekolah: [{
        persen: 0,
        tanggal_rekap_terakhir: '-'
    }],
    spm_usia_sekolah: {
        rows: [],
        total: 0
    },
    spm_luar_wilayah: {
        rows: [],
        total: 0
    },
    spm_satuan_pendidikan: {
        rows: [],
        total: 0
    },
    spm_pendidik: {
        rows: [],
        total: 0
    },
    spm_kepsek: {
        rows: [],
        total: 0
    },
    spm_tenaga_penunjang: {
        rows: [],
        total: 0
    },
    anak_tidak_sekolah: {
        rows: [],
        total: 0
    },
    pd_miskin: {
        rows: [],
        total: 0
    },
    rekap_beranda_spm: {
        kip: [],
        miskin: []
    },
    penerima_spm: {
        rows: [],
        total: 0
    },
    rencana_pemenuhan_spm: {
        rows: [],
        total: 0
    },
    tabel_21: {
        rows: [],
        total: 0
    },
    tabel_31: {
        rows: [],
        total: 0
    },
    tabel_41: {
        rows: [],
        total: 0
    },
    tabel_42: {
        rows: [],
        total: 0
    },
    tabel_43: {
        rows: [],
        total: 0
    },
    dinas: {
        rows: [],
        total: 0
    }
};

const SpmReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_SPM_KABUPATEN:
        {
            return {
                ...state,
                spm_kabupaten: action.payload
            };
        }
        case Actions.GET_SPM_KABUPATEN_PER_KECAMATAN:
        {
            return {
                ...state,
                spm_kabupaten_per_kecamatan: action.payload
            };
        }
        case Actions.GET_SPM_KABUPATEN_PER_SEKOLAH:
        {
            return {
                ...state,
                spm_kabupaten_per_sekolah: action.payload
            };
        }
        case Actions.GET_SPM_USIA_SEKOLAH:
        {
            return {
                ...state,
                spm_usia_sekolah: action.payload
            };
        }
        case Actions.GET_SPM_LUAR_WILAYAH:
        {
            return {
                ...state,
                spm_luar_wilayah: action.payload
            };
        }
        case Actions.GET_SPM_SATUAN_PENDIDIKAN:
        {
            return {
                ...state,
                spm_satuan_pendidikan: action.payload
            };
        }
        case Actions.GET_SPM_PENDIDIK:
        {
            return {
                ...state,
                spm_pendidik: action.payload
            };
        }
        case Actions.GET_SPM_KEPSEK:
        {
            return {
                ...state,
                spm_kepsek: action.payload
            };
        }
        case Actions.GET_SPM_TENAGA_PENUNJANG:
        {
            return {
                ...state,
                spm_tenaga_penunjang: action.payload
            };
        }
        case Actions.GET_ANAK_TIDAK_SEKOLAH:
        {
            return {
                ...state,
                anak_tidak_sekolah: action.payload
            };
        }
        case Actions.GET_PD_MISKIN:
        {
            return {
                ...state,
                pd_miskin: action.payload
            };
        }
        case Actions.GET_REKAP_BERANDA_SPM:
        {
            return {
                ...state,
                rekap_beranda_spm: action.payload
            };
        }
        case Actions.GET_PENERIMA_SPM:
        {
            return {
                ...state,
                penerima_spm: action.payload
            };
        }
        case Actions.GET_RENCANA_PEMENUHAN_SPM:
        {
            return {
                ...state,
                rencana_pemenuhan_spm: action.payload
            };
        }
        case Actions.GET_RENCANA_PEMENUHAN_SPM_FLAT:
        {
            return {
                ...state,
                rencana_pemenuhan_spm: action.payload
            };
        }
        case Actions.TABEL_21:
        {
            return {
                ...state,
                tabel_21: action.payload
            };
        }
        case Actions.TABEL_31:
        {
            return {
                ...state,
                tabel_31: action.payload
            };
        }
        case Actions.TABEL_41:
        {
            return {
                ...state,
                tabel_41: action.payload
            };
        }
        case Actions.TABEL_42:
        {
            return {
                ...state,
                tabel_42: action.payload
            };
        }
        case Actions.TABEL_43:
        {
            return {
                ...state,
                tabel_43: action.payload
            };
        }
        case Actions.GET_DINAS:
        {
            return {
                ...state,
                dinas: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
}

export default SpmReducer;