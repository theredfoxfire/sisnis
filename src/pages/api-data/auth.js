import { storeActions } from '../../store/Store.js';
import {axiosWorker} from './config';
import {AUTH_FAILED_MESSAGE} from '../../Constants';

export function postLogin(formData) {
  axiosWorker.post(`api/login_check`, {
    ...formData
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    storeActions.setAuth(response.data.token);
    window.location.replace("/home");
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setErrorMessage(AUTH_FAILED_MESSAGE);
    storeActions.setIsError(true);
  });
}
