import axios from 'axios-proxy-fix';
//note prod baseURL = "http://202.154.178.186:3200";
//note dev baseURL = "http://localhost/nilai-sekolah-be";
import { getAllState, storeActions } from '../../store/Store.js';
import {UNAUTHORIZED_CODE, UNAUTHORIZED_MESSAGE} from '../../Constants';
let { auth } = getAllState();

export const axiosWorker = axios.create({
  baseURL: 'http://202.154.178.186:3200',
  timeout: 10000,
  headers: {'Authorization': `Bearer ${auth.token}`}
});

export const errorHandler = (error) => {
  if (error.response.status === UNAUTHORIZED_CODE) {
    storeActions.setErrorMessage(UNAUTHORIZED_MESSAGE);
    storeActions.setModalStatus(true);
    storeActions.setCloseModalAction(() => {storeActions.setModalStatus(false); window.location.replace("/");});
    storeActions.setModalConfirmAction(() => {storeActions.setModalStatus(false); window.location.replace("/");});
  } else {
    console.log(error.response);
  }
}
