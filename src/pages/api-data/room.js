import { storeActions } from "../../store/Store.js";
import { axiosWorker, errorHandler } from "./config";
export function getRoomList() {
  axiosWorker
    .get(`api/room/get-all`)
    .then((res) => {
      const rooms = res.data.rooms;
      storeActions.setIsLoading(false);
      storeActions.setRoomList(rooms);
    })
    .catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getRoomByID(id) {
  axiosWorker
    .get(`api/room/get/${id}`)
    .then((res) => {
      const selectedRoom = res.data.room;
      storeActions.setIsLoading(false);
      storeActions.setSelectedRoom(selectedRoom);
    })
    .catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postRoom(formData) {
  axiosWorker
    .post(`api/room/add`, {
      ...formData,
    })
    .then(function (response) {
      storeActions.setIsLoading(false);
      getRoomList();
    })
    .catch(function (error) {
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function putRoom(formData, id) {
  axiosWorker
    .put(`api/room/update/${id}`, {
      ...formData,
    })
    .then(function (response) {
      storeActions.setIsLoading(false);
      getRoomList();
    })
    .catch(function (error) {
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function deleteRoom(id) {
  return axiosWorker
    .delete(`api/room/delete/${id}`)
    .then((res) => {
      storeActions.setIsLoading(false);
      getRoomList();
    })
    .catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
