import { storeActions } from '../../store/Store.js';
import {axiosWorker, errorHandler} from './config';

export function getTeacherSubject($teacherSubject) {
  axiosWorker.get(`api/exam/get/teacher-subject/${$teacherSubject}`)
    .then(res => {
      const teacherSubject = res.data.exam;
      storeActions.setIsLoading(false);
      storeActions.setTeacherSubject(teacherSubject );
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getExamByID(id) {
  axiosWorker.get(`api/exam/get/${id}`)
    .then(res => {
      const selectedExam = res.data.classRoom;
      storeActions.setIsLoading(false);
      storeActions.setSelectedExam(selectedExam);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postExam(formData) {
  axiosWorker.post(`api/exam/add`, {
    name: formData.name,
    teacherSubject: formData.teacherSubject,
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getTeacherSubject(formData.teacherSubject);
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}

export function putExam(name, id) {
  axiosWorker.put(`api/exam/update/${id}`, {
    name: name,
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getTeacherSubject();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}


export function deleteExam(id) {
  return axiosWorker.delete(`api/exam/delete/${id}`)
    .then(res => {
      storeActions.setIsLoading(false);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
