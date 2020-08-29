import axios from 'axios-proxy-fix';
import { storeActions } from '../../store/Store.js';

export function getStudentList() {
  axios.get(`/api/student/get-all`)
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
  axios.get(`/api/student/get/${id}`)
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
  axios.post('/api/student/add', {
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
  axios.put(`/api/student/update/${id}`, {
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
  axios.delete(`/api/student/delete/${id}`)
    .then(res => {
      storeActions.setIsLoading(false);
      getStudentList();
    }).catch(function (error) {
      console.log(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
