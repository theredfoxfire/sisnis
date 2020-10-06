import { storeActions } from '../../store/Store.js';
import {axiosWorker, errorHandler, maxItems} from './config';
export function getStudentList(activePage) {
  axiosWorker.get(`api/student/get-all?page=${activePage}&pageItems=${maxItems}`)
    .then(res => {
      storeActions.setIsLoading(false);
      storeActions.setStudentList(res.data);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getStudentByID(id) {
  axiosWorker.get(`api/student/get/${id}`)
    .then(res => {
      const selectedStudent = res.data.student;
      storeActions.setIsLoading(false);
      storeActions.setSelectedStudent(selectedStudent);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postStudent(formData) {
  axiosWorker.post(`api/student/add`, {
    ...formData
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getStudentList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}

export function putStudent(formData, id) {
  axiosWorker.put(`api/student/update/${id}`, {
    ...formData,
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getStudentList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}

export function setStudentClass(formData) {
  return axiosWorker.put(`api/student/add/class-room/${formData.student}`, {
    classRoomId: formData.classID,
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}


export function deleteStudent(id) {
  axiosWorker.delete(`api/student/delete/${id}`)
    .then(res => {
      storeActions.setIsLoading(false);
      getStudentList();
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
