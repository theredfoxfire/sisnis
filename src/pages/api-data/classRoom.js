import { storeActions } from '../../store/Store.js';
import {axiosWorker, errorHandler} from './config';

export function getClassRoomList() {
  axiosWorker.get(`api/class-room/get-all`)
    .then(res => {
      const classRoomList = res.data.classRooms;
      storeActions.setIsLoading(false);
      storeActions.setClassRoomList(classRoomList );
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getClassRoomByID(id) {
  axiosWorker.get(`api/class-room/get/${id}`)
    .then(res => {
      const selectedClassRoom = res.data.classRoom;
      storeActions.setIsLoading(false);
      storeActions.setSelectedClassRoom(selectedClassRoom);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postClassRoom(name, teacherId) {
  axiosWorker.post(`api/class-room/add`, {
    name: name,
    teacherId,
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getClassRoomList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}

export function putClassRoom(name, id, teacherId) {
  axiosWorker.put(`api/class-room/update/${id}`, {
    name: name,
    teacherId,
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getClassRoomList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}


export function deleteClass(id) {
  axiosWorker.delete(`api/class-room/delete/${id}`)
    .then(res => {
      storeActions.setIsLoading(false);
      getClassRoomList();
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function deleteStudentClass(id) {
  return axiosWorker.delete(`api/student/delete/class/${id}`)
    .then(res => {
      storeActions.setIsLoading(false);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
