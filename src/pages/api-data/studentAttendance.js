import { storeActions } from '../../store/Store.js';
import {axiosWorker, errorHandler} from './config';
export function getStudentAttendanceList() {
  axiosWorker.get(`api/studentAttendance/get-all`)
    .then(res => {
      const studentAttendances = res.data.studentAttendances;
      storeActions.setIsLoading(false);
      storeActions.setStudentAttendanceList(studentAttendances);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getStudentAttendanceByID(id) {
  axiosWorker.get(`api/studentAttendance/get/${id}`)
    .then(res => {
      const selectedStudentAttendance = res.data.studentAttendance;
      storeActions.setIsLoading(false);
      storeActions.setSelectedStudentAttendance(selectedStudentAttendance);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postStudentAttendance(formData) {
  axiosWorker.post(`api/studentAttendance/add`, {
    ...formData
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getStudentAttendanceList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}

export function putStudentAttendance(formData, id) {
  axiosWorker.put(`api/studentAttendance/update/${id}`, {
    ...formData,
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getStudentAttendanceList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}


export function deleteStudentAttendance(id) {
  return axiosWorker.delete(`api/studentAttendance/delete/${id}`)
    .then(res => {
      storeActions.setIsLoading(false);
      getStudentAttendanceList();
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
