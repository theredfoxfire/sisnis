import axios from 'axios-proxy-fix';
import { storeActions } from '../../store/Store.js';

export function getClassRoomList() {
  axios.get(`/api/class-room/get-all`)
    .then(res => {
      const classRoomList = res.data.classRooms;
      storeActions.setIsLoading(false);
      storeActions.setClassRoomList(classRoomList );
    }).catch(function (error) {
      console.log(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getClassRoomByID(id) {
  axios.get(`/api/class-room/get/${id}`)
    .then(res => {
      const selectedClassRoom = res.data.classRoom;
      storeActions.setIsLoading(false);
      storeActions.setSelectedClassRoom(selectedClassRoom);
    }).catch(function (error) {
      console.log(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postClassRoom(name) {
  axios.post('/api/class-room/add', {
    name: name,
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

export function putClassRoom(name, id) {
  axios.put(`/api/class-room/update/${id}`, {
    name: name,
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


export function deletClass(id) {
  axios.delete(`/api/class-room/delete/${id}`)
    .then(res => {
      storeActions.setIsLoading(false);
      getClassRoomList();
    }).catch(function (error) {
      console.log(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
