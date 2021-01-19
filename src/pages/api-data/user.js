import { storeActions } from '../../store/Store.js';
import {axiosWorker, errorHandler} from './config';
export function getUserList() {
  axiosWorker.get(`api/user/get-all`)
    .then(res => {
      const users = res.data.users;
      storeActions.setIsLoading(false);
      storeActions.setUserList(users);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getUserByID(id) {
  axiosWorker.get(`api/user/get/${id}`)
    .then(res => {
      const selectedUser = res.data.user;
      storeActions.setIsLoading(false);
      storeActions.setSelectedUser(selectedUser);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postUser(formData) {
  axiosWorker.post(`api/user/add`, {
    ...formData
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getUserList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}

export function putUser(formData, id) {
  axiosWorker.put(`api/user/update/${id}`, {
    ...formData,
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getUserList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}

export function putUserActivate(id) {
  storeActions.setModalStatus(false);
  axiosWorker.put(`api/user/update/${id}/activate`, {})
  .then(function (response) {
    storeActions.setIsLoading(false);
    getUserList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}


export function deleteUser(id) {
  return axiosWorker.delete(`api/user/delete/${id}`)
    .then(res => {
      storeActions.setIsLoading(false);
      getUserList();
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
