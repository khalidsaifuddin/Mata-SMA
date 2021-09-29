import axios from 'axios/index';

export const GET_SPM_KABUPATEN = '[SPM] GET SPM KABUPATEN';
export const GET_SPM_KABUPATEN_PER_KECAMATAN = '[SPM] GET SPM KABUPATEN PER KECAMATAN';
export const GET_SPM_USIA_SEKOLAH = '[SPM] GET SPM USIA SEKOLAH';
export const GET_SPM_LUAR_WILAYAH = '[SPM] GET SPM LUAR_WILAYAH';
export const GET_SPM_SATUAN_PENDIDIKAN = '[SPM] GET SPM SATUAN_PENDIDIKAN';
export const GET_SPM_PENDIDIK = '[SPM] GET SPM PENDIDIK';
export const GET_SPM_KEPSEK = '[SPM] GET SPM KEPSEK';
export const GET_SPM_TENAGA_PENUNJANG = '[SPM] GET SPM TENAGA_PENUNJANG';
export const GET_ANAK_TIDAK_SEKOLAH = '[SPM] GET ANAK_TIDAK_SEKOLAH';
export const GET_PD_MISKIN = '[SPM] GET PD_MISKIN';
export const GET_REKAP_BERANDA_SPM = '[SPM] GET_REKAP_BERANDA_SPM';
export const SIMPAN_VERVAL_ATS = '[SPM] SIMPAN_VERVAL_ATS';
export const SIMPAN_VERVAL_PD_MISKIN = '[SPM] SIMPAN_VERVAL_PD_MISKIN';
export const GET_PENERIMA_SPM = '[SPM] GET_PENERIMA_SPM';
export const SIMPAN_PENERIMA_SPM = '[SPM] SIMPAN_PENERIMA_SPM';
export const GET_RENCANA_PEMENUHAN_SPM = '[SPM] GET_RENCANA_PEMENUHAN_SPM';
export const GET_RENCANA_PEMENUHAN_SPM_FLAT = '[SPM] GET_RENCANA_PEMENUHAN_SPM_FLAT';
export const SIMPAN_RENCANA_PEMENUHAN_SPM = '[SPM] SIMPAN_RENCANA_PEMENUHAN_SPM';
export const TABEL_21 = '[SPM] TABEL_21';
export const TABEL_31 = '[SPM] TABEL_31';
export const GET_DINAS = '[SPM] GET_DINAS';
export const SIMPAN_TABEL_21 = '[SPM] SIMPAN_TABEL_21';
export const SIMPAN_TABEL_31 = '[SPM] SIMPAN_TABEL_31';
export const HAPUS_TABEL_31 = '[SPM] HAPUS_TABEL_31';
export const TABEL_41 = '[SPM] TABEL_41';
export const TABEL_42 = '[SPM] TABEL_42';
export const TABEL_43 = '[SPM] TABEL_43';
export const SIMPAN_TABEL_41 = '[SPM] SIMPAN_TABEL_41';
export const SIMPAN_TABEL_42 = '[SPM] SIMPAN_TABEL_42';
export const GET_INDEX_PENDIDIDIKAN = '[SPM] GET_INDEX_PENDIDIDIKAN';
export const SIMPAN_INDEX_PENDIDIDIKAN = '[SPM] SIMPAN_INDEX_PENDIDIDIKAN';

export function getSPMKabupaten(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/getSPMKabupaten', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SPM_KABUPATEN,
                payload: response.data,
                routeParams
            })
        );
}

export function getSPMKabupatenPerKecamatan(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/getSPMKabupatenPerKecamatan', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SPM_KABUPATEN_PER_KECAMATAN,
                payload: response.data,
                routeParams
            })
        );
}

export function getSPMKabupatenPerSekolah(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/getSPMKabupatenPerSekolah', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SPM_KABUPATEN_PER_SEKOLAH,
                payload: response.data,
                routeParams
            })
        );
}

export function getSPMUsiaSekolah(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/getSPMUsiaSekolah', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SPM_USIA_SEKOLAH,
                payload: response.data,
                routeParams
            })
        );
}

export function getSPMLuarWilayah(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/getSPMLuarWilayah', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SPM_LUAR_WILAYAH,
                payload: response.data,
                routeParams
            })
        );
}

export function getSPMSatuanPendidikan(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/getSPMSatuanPendidikan', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SPM_SATUAN_PENDIDIKAN,
                payload: response.data,
                routeParams
            })
        );
}

export function getSPMPendidik(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/getSPMPendidik', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SPM_PENDIDIK,
                payload: response.data,
                routeParams
            })
        );
}

export function getSPMKepsek(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/getSPMKepsek', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SPM_KEPSEK,
                payload: response.data,
                routeParams
            })
        );
}

export function getSPMTenagaPenunjang(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/getSPMTenagaPenunjang', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SPM_TENAGA_PENUNJANG,
                payload: response.data,
                routeParams
            })
        );
}

export function getAnakTidakSekolah(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/getAnakTidakSekolah', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ANAK_TIDAK_SEKOLAH,
                payload: response.data,
                routeParams
            })
        );
}

export function getPDMiskin(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/getPDMiskin', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PD_MISKIN,
                payload: response.data,
                routeParams
            })
        );
}

export function getRekapBerandaSPM(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/getRekapBerandaSPM', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_REKAP_BERANDA_SPM,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanVervalAts(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/simpanVervalAts', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_VERVAL_ATS,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanVervalPDMiskin(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/simpanVervalPDMiskin', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_VERVAL_PD_MISKIN,
                payload: response.data,
                routeParams
            })
        );
}

export function getPenerimaSPM(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/getPenerimaSPM', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PENERIMA_SPM,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanPenerimaSPM(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/simpanPenerimaSPM', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_PENERIMA_SPM,
                payload: response.data,
                routeParams
            })
        );
}

export function rootRencanaPemenuhanSPM(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/rootRencanaPemenuhanSPM', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_RENCANA_PEMENUHAN_SPM,
                payload: response.data,
                routeParams
            })
        );
}

export function getRencanaPemenuhanSPMFlat(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/getRencanaPemenuhanSPMFlat', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_RENCANA_PEMENUHAN_SPM_FLAT,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanRencanaPemenuhanSPM(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/simpanRencanaPemenuhanSPM', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_RENCANA_PEMENUHAN_SPM,
                payload: response.data,
                routeParams
            })
        );
}

export function tabel21(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/tabel21', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : TABEL_21,
                payload: response.data,
                routeParams
            })
        );
}

export function tabel31(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/tabel31', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : TABEL_31,
                payload: response.data,
                routeParams
            })
        );
}

export function getDinas(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/getDinas', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_DINAS,
                payload: response.data,
                routeParams
            })
        );
}


export function simpanTabel21(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/simpanTabel21', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_TABEL_21,
                payload: response.data,
                routeParams
            })
        );
}


export function simpanTabel31(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/simpanTabel31', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_TABEL_31,
                payload: response.data,
                routeParams
            })
        );
}

export function hapusTabel31(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/hapusTabel31', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : HAPUS_TABEL_31,
                payload: response.data,
                routeParams
            })
        );
}

export function tabel41(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/tabel41', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : TABEL_41,
                payload: response.data,
                routeParams
            })
        );
}

export function tabel42(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/tabel42', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : TABEL_42,
                payload: response.data,
                routeParams
            })
        );
}

export function tabel43(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/tabel43', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : TABEL_43,
                payload: response.data,
                routeParams
            })
        );
}


export function simpantabel41(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/simpantabel41', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_TABEL_41,
                payload: response.data,
                routeParams
            })
        );
}

export function simpantabel42(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/simpantabel42', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_TABEL_42,
                payload: response.data,
                routeParams
            })
        );
}

export function getIndexPendidikan(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/getIndexPendidikan', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_INDEX_PENDIDIDIKAN,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanIndexPendidikan(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/SPM/simpanIndexPendidikan', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_INDEX_PENDIDIDIKAN,
                payload: response.data,
                routeParams
            })
        );
}
