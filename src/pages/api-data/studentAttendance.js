import { storeActions } from '../../store/Store.js';
import {axiosWorker, errorHandler} from './config';
export function getStudentAttendanceList(scheduleId, date = 0) {
  axiosWorker.get(`api/studentAttendance/get-all/${scheduleId}/${date}`)
    .then(res => {
      const studentAttendances = res.data.studentAttendances;
      storeActions.setIsLoading(false);
      if (date === 'new') {
        storeActions.setStudentAttendanceList([]);
      } else {
        storeActions.setStudentAttendanceList(studentAttendances);
      }

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
    students: formData.studentAttendances,
    date: formData.date,
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(false);
    getStudentAttendanceList(formData.scheduleId);
    storeActions.setDialogMessage("Data berhasil disimpan");
  })
  .catch(function (error) {
    storeActions.setIsError(true);
    storeActions.setIsLoading(false);
    storeActions.setDialogMessage("Gagal menyimpan data");
  });
}

export function putStudentAttendance(formData) {
  axiosWorker.put(`api/studentAttendance/update`, {
  students: formData.studentAttendances,
  date: formData.date,
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(false);
    getStudentAttendanceList(formData.scheduleId);
    storeActions.setDialogMessage("Data berhasil disimpan");
  })
  .catch(function (error) {
    storeActions.setIsError(true);
    storeActions.setIsLoading(false);
    storeActions.setDialogMessage("Gagal menyimpan data");
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
