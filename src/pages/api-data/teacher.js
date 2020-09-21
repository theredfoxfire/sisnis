import { storeActions } from '../../store/Store.js';
import {axiosWorker, errorHandler} from './config';
export function getTeacherList() {
  axiosWorker.get(`api/teacher/get-all`)
    .then(res => {
      const teachers = res.data.teachers;
      storeActions.setIsLoading(false);
      storeActions.setTeacherList(teachers);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getTeacherByID(id) {
  axiosWorker.get(`api/teacher/get/${id}`)
    .then(res => {
      const selectedTeacher = res.data.teacher;
      storeActions.setIsLoading(false);
      storeActions.setSelectedTeacher(selectedTeacher);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postTeacher(formData) {
  axiosWorker.post(`api/teacher/add`, {
    ...formData
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getTeacherList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}

export function putTeacher(formData, id) {
  axiosWorker.put(`api/teacher/update/${id}`, {
    ...formData,
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getTeacherList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}

export function deleteTeacher(id) {
  axiosWorker.delete(`api/teacher/delete/${id}`)
    .then(res => {
      storeActions.setIsLoading(false);
      getTeacherList();
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
