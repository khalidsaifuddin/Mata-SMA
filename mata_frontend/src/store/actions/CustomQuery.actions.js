import axios from 'axios/index';

export const GET_KATEGORI_CUSTOM_QUERY = '[CUSTOM QUERY] GET_KATEGORI_CUSTOM_QUERY';
export const GET_KATEGORI_CUSTOM_QUERY_SEKOLAH = '[CUSTOM QUERY] GET_KATEGORI_CUSTOM_QUERY_SEKOLAH';
export const GET_KATEGORI_CUSTOM_QUERY_PESERTA_DIDIK = '[CUSTOM QUERY] GET_KATEGORI_CUSTOM_QUERY_PESERTA_DIDIK';
export const GET_KATEGORI_CUSTOM_QUERY_DATAMART = '[CUSTOM QUERY] GET_KATEGORI_CUSTOM_QUERY_DATAMART';
export const RUN_CUSTOM_QUERY = '[CUSTOM QUERY] RUN_CUSTOM_QUERY';
export const RUN_CUSTOM_QUERY_PESERTA_DIDIK = '[CUSTOM QUERY] RUN_CUSTOM_QUERY_PESERTA_DIDIK';
export const RUN_CUSTOM_QUERY_DATAMART = '[CUSTOM QUERY] RUN_CUSTOM_QUERY_DATAMART';

export function getKategoriCustomQueryDatamart(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/CustomQuery/getKategoriCustomQueryDatamart', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_KATEGORI_CUSTOM_QUERY_DATAMART,
                payload: response.data,
                routeParams
            })
        );
}

export function getKategoriCustomQueryPesertaDidik(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/CustomQuery/getKategoriCustomQueryPesertaDidik', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_KATEGORI_CUSTOM_QUERY_PESERTA_DIDIK,
                payload: response.data,
                routeParams
            })
        );
}

export function getKategoriCustomQuerySekolah(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/CustomQuery/getKategoriCustomQuerySekolah', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_KATEGORI_CUSTOM_QUERY_SEKOLAH,
                payload: response.data,
                routeParams
            })
        );
}

export function getKategoriCustomQuery(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/CustomQuery/getKategoriCustomQuery', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_KATEGORI_CUSTOM_QUERY,
                payload: response.data,
                routeParams
            })
        );
}

export function runCustomQuery(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/CustomQuery/runCustomQuery', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : RUN_CUSTOM_QUERY,
                payload: response.data,
                routeParams
            })
        );
}

export function runCustomQueryPesertaDidik(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/CustomQuery/runCustomQueryPesertaDidik', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : RUN_CUSTOM_QUERY_PESERTA_DIDIK,
                payload: response.data,
                routeParams
            })
        );
}

export function runCustomQueryDatamart(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/CustomQuery/runCustomQueryDatamart', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : RUN_CUSTOM_QUERY_DATAMART,
                payload: response.data,
                routeParams
            })
        );
}