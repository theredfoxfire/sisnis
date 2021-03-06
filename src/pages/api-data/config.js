import axios from 'axios-proxy-fix';
//note prod baseURL = "http://103.150.113.100:3200/public";
//note dev baseURL = "http://localhost/nilai-sekolah-be/public";
import { getAllState, storeActions } from '../../store/Store.js';
import { USER_ROLE } from '../../Constants';
import { UNAUTHORIZED_CODE, UNAUTHORIZED_MESSAGE } from '../../Constants';
let { auth, userDetail } = getAllState();

export const axiosWorker = axios.create({
  baseURL: `http://localhost/nilai-sekolah-be/public/${getRoleEndpoint()}`,
  timeout: 10000,
  headers: { 'Authorization': `Bearer ${auth.token}` }
});

export function getRoleEndpoint() {
  switch (userDetail.roles[0]) {
    case USER_ROLE.ROLE_ADMIN: {
      return '';
    }
    case USER_ROLE.ROLE_STUDENT: {
      return 'student';
    }
    case USER_ROLE.ROLE_PARENT: {
      return 'parent';
    }
    case USER_ROLE.ROLE_TEACHER: {
      return 'teacher';
    }
    default: {
      return '';
    }
  };
}

export const errorHandler = (error) => {
  if (error.response.status === UNAUTHORIZED_CODE) {
    storeActions.setErrorMessage(UNAUTHORIZED_MESSAGE);
    storeActions.setModalStatus(true);
    storeActions.setDialogTitle("Sesi Anda habis");
    storeActions.setDialogMessage("Sesi Anda sudah berkahir, silahkan login ulang!");
    storeActions.setCloseModalAction(() => { storeActions.setModalStatus(false); window.location.replace("/"); });
    storeActions.setModalConfirmAction(() => { storeActions.setModalStatus(false); window.location.replace("/"); });
  } else {
    console.log(error.response);
  }
}

export const maxItems = "25";
