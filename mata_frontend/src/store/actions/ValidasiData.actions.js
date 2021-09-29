import axios from 'axios/index';

export const GET_VALIDASI_DATA = '[GTK] GET_VALIDASI_DATA';
export const GET_VALIDASI_DATA_BERANDA = '[GTK] GET_VALIDASI_DATA_BERANDA';
export const GET_VALIDASI_DATA_RECORD = '[GTK] GET_VALIDASI_DATA_RECORD';
export const SIMPAN_VALIDASI_DATA = '[GTK] SIMPAN_VALIDASI_DATA';

export function getValidasiDataRecord(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/ValidasiData/getValidasiDataRecord', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_VALIDASI_DATA_RECORD,
                payload: response.data,
                routeParams
            })
        );
}

export function getValidasiData(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/ValidasiData/getValidasiData', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_VALIDASI_DATA,
                payload: response.data,
                routeParams
            })
        );
}

export function getRekapValidasiBeranda(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/ValidasiData/getRekapValidasiBeranda', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_VALIDASI_DATA_BERANDA,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanValidasiData(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/ValidasiData/simpanValidasiData', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_VALIDASI_DATA,
                payload: response.data,
                routeParams
            })
        );
}