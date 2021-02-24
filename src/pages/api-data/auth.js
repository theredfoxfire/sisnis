import { storeActions } from '../../store/Store.js';
import { axiosWorker } from './config';
import { AUTH_FAILED_MESSAGE } from '../../Constants';
import jwt_decode from "jwt-decode";

export function postLogin(formData) {
  axiosWorker.post(`api/login_check`, {
    ...formData
  })
    .then(function (response) {
      const token = response.data.token;
      storeActions.setIsLoading(false);
      storeActions.setAuth(token);
      const decoded = jwt_decode(token);
      storeActions.setUserDetail(decoded);
      window.location.replace("/home");
    })
    .catch(function (error) {
      storeActions.setIsLoading(false);
      storeActions.setErrorMessage(AUTH_FAILED_MESSAGE);
      storeActions.setIsError(true);
    });
}
