import { storeActions } from '../../store/Store.js';
import { axiosWorker, errorHandler, maxItems } from './config';

export function getUserList(role, activePage = 1) {
  axiosWorker.get(`api/user/get-all/${role}?page=${activePage}&pageItems=${maxItems}`)
    .then(res => {
      const users = res.data;
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
      storeActions.setIsError(false);
      storeActions.setSelectedUser(selectedUser);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getUserDetail() {
  axiosWorker.get(`api/user/get-user/detail`)
    .then(res => {
      const selectedUser = res.data.user;
      storeActions.setIsLoading(false);
      storeActions.setIsError(false);
      storeActions.setUserAditionalInfo(selectedUser);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postUser(formData, role) {
  axiosWorker.post(`api/user/add`, {
    ...formData
  })
    .then(function (response) {
      storeActions.setIsLoading(false);
      getUserList(role);
    })
    .catch(function (error) {
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function putUser(formData, id, role) {
  axiosWorker.put(`api/user/update/${id}`, {
    ...formData,
  })
    .then(function (response) {
      storeActions.setIsLoading(false);
      getUserList(role);
    })
    .catch(function (error) {
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function putUserActivate(id, role) {
  storeActions.setModalStatus(false);
  axiosWorker.put(`api/user/update/${id}/activate`, {})
    .then(function (response) {
      storeActions.setIsLoading(false);
      getUserList(role);
    })
    .catch(function (error) {
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}


export function deleteUser(id, role) {
  return axiosWorker.delete(`api/user/delete/${id}`)
    .then(res => {
      storeActions.setIsLoading(false);
      getUserList(role);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
