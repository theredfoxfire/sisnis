import { storeActions } from '../../store/Store.js';
import {axiosWorker, errorHandler} from './config';
export function getExamTypeList() {
  axiosWorker.get(`api/examType/get-all`)
    .then(res => {
      const examTypes = res.data.examTypes;
      storeActions.setIsLoading(false);
      storeActions.setExamTypeList(examTypes);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getExamTypeByID(id) {
  axiosWorker.get(`api/examType/get/${id}`)
    .then(res => {
      const selectedExamType = res.data.examType;
      storeActions.setIsLoading(false);
      storeActions.setSelectedExamType(selectedExamType);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postExamType(formData) {
  axiosWorker.post(`api/examType/add`, {
    ...formData
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getExamTypeList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}

export function putExamType(formData, id) {
  axiosWorker.put(`api/examType/update/${id}`, {
    ...formData,
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getExamTypeList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}


export function deleteExamType(id) {
  return axiosWorker.delete(`api/examType/delete/${id}`)
    .then(res => {
      storeActions.setIsLoading(false);
      getExamTypeList();
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
