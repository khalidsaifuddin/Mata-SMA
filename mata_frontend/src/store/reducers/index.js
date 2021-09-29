import {combineReducers} from 'redux';
import App from './App.reducers';
import PesertaDidik from './PesertaDidik.reducers';
import Gtk from './Gtk.reducers';
import Sarpras from './Sarpras.reducers';
import RaporDapodik from './RaporDapodik.reducers';
import RekapSekolah from './RekapSekolah.reducers';
import RekapPesertaDidik from './RekapPesertaDidik.reducers';
import RekapSarpras from './RekapSarpras.reducers';
import Spm from './Spm.reducers';
import RekapGTK from './RekapGTK.reducers';
import RaporSNP from './RaporSNP.reducers';
import ValidasiData from './ValidasiData.reducers';
import CustomQuery from './CustomQuery.reducers';

const rootReducer = combineReducers({
    App,
    PesertaDidik,
    Gtk,
    Sarpras,
    RaporDapodik,
    RekapSekolah,
    RekapPesertaDidik,
    RekapSarpras,
    Spm,
    RekapGTK,
    RaporSNP,
    ValidasiData,
    CustomQuery
});

export default rootReducer;
