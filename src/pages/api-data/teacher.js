import axios from 'axios-proxy-fix';
import { storeActions } from '../../store/Store.js';

export function getTeacherList() {
  axios.get(`/api/teacher/get-all`)
    .then(res => {
      const teachers = res.data.teachers;
      storeActions.setIsLoading(false);
      storeActions.setTeacherList(teachers);
    }).catch(function (error) {
      console.log(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getTeacherByID(id) {
  axios.get(`/api/teacher/get/${id}`)
    .then(res => {
      const selectedTeacher = res.data.teacher;
      storeActions.setIsLoading(false);
      storeActions.setSelectedTeacher(selectedTeacher);
    }).catch(function (error) {
      console.log(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postTeacher(formData) {
  axios.post('/api/teacher/add', {
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
  axios.put(`/api/teacher/update/${id}`, {
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
  axios.delete(`/api/teacher/delete/${id}`)
    .then(res => {
      storeActions.setIsLoading(false);
      getTeacherList();
    }).catch(function (error) {
      console.log(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
