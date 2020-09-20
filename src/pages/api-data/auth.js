import { storeActions } from '../../store/Store.js';
import {axiosWorker} from './config';

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
    storeActions.setIsError(true);
  });
}
