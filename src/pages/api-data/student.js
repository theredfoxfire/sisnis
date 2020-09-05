import axios from 'axios-proxy-fix';
import { storeActions } from '../../store/Store.js';
import {baseURL} from './config';
export function getStudentList() {
  axios.get(`${baseURL}/api/student/get-all`)
    .then(res => {
      const students = res.data.students;
      storeActions.setIsLoading(false);
      storeActions.setStudentList(students);
    }).catch(function (error) {
      console.log(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getStudentByID(id) {
  axios.get(`${baseURL}/api/student/get/${id}`)
    .then(res => {
      const selectedStudent = res.data.student;
      storeActions.setIsLoading(false);
      storeActions.setSelectedStudent(selectedStudent);
    }).catch(function (error) {
      console.log(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postStudent(formData) {
  axios.post(`${baseURL}/api/student/add`, {
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
  axios.put(`${baseURL}/api/student/update/${id}`, {
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


export function deleteStudent(id) {
  axios.delete(`${baseURL}/api/student/delete/${id}`)
    .then(res => {
      storeActions.setIsLoading(false);
      getStudentList();
    }).catch(function (error) {
      console.log(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
