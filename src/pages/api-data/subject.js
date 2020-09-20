import { storeActions } from '../../store/Store.js';
import {axiosWorker} from './config';
export function getSubjectList() {
  axiosWorker.get(`api/subject/get-all`)
    .then(res => {
      const subjects = res.data.subjects;
      storeActions.setIsLoading(false);
      storeActions.setSubjectList(subjects);
    }).catch(function (error) {
      console.log(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getSubjectByID(id) {
  axiosWorker.get(`api/subject/get/${id}`)
    .then(res => {
      const selectedSubject = res.data.subject;
      storeActions.setIsLoading(false);
      storeActions.setSelectedSubject(selectedSubject);
    }).catch(function (error) {
      console.log(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postSubject(formData) {
  axiosWorker.post(`api/subject/add`, {
    ...formData
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getSubjectList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}

export function putSubject(formData, id) {
  axiosWorker.put(`api/subject/update/${id}`, {
    ...formData,
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getSubjectList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}


export function deleteSubject(id) {
  axiosWorker.delete(`api/subject/delete/${id}`)
    .then(res => {
      storeActions.setIsLoading(false);
      getSubjectList();
    }).catch(function (error) {
      console.log(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
