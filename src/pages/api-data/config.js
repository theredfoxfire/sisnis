import axios from 'axios-proxy-fix';
//note prod baseURL = "http://202.154.178.186:3200";
//note dev baseURL = "http://localhost/nilai-sekolah-be";
//old token = eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MDA1OTIwMjcsImV4cCI6MTYwMDU5NTYyNywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiYWRtaW4ifQ.b7QeK8wKCZyTFtbz03ZJCPfxDrL2_j-NSo8ouQ83jVeadi0nt4p4m5kWsv82LphflfbJSeZuS68I3UxMcGufiA
import { getAllState, storeActions } from '../../store/Store.js';
import {UNAUTHORIZED_CODE, UNAUTHORIZED_MESSAGE} from '../../Constants';
let { auth } = getAllState();

export const axiosWorker = axios.create({
  baseURL: 'http://localhost/nilai-sekolah-be',
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
