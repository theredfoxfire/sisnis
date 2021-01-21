import { storeActions } from '../../store/Store.js';
import {axiosWorker, errorHandler} from './config';
export function getTimeSlotList() {
  axiosWorker.get(`api/timeSlot/get-all`)
    .then(res => {
      const timeSlots = res.data.timeSlots;
      storeActions.setIsLoading(false);
      storeActions.setTimeSlotList(timeSlots);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getTimeSlotByID(id) {
  axiosWorker.get(`api/timeSlot/get/${id}`)
    .then(res => {
      const selectedTimeSlot = res.data.timeSlot;
      storeActions.setIsLoading(false);
      storeActions.setSelectedTimeSlot(selectedTimeSlot);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postTimeSlot(formData) {
  axiosWorker.post(`api/timeSlot/add`, {
    ...formData
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getTimeSlotList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}

export function putTimeSlot(formData, id) {
  axiosWorker.put(`api/timeSlot/update/${id}`, {
    ...formData,
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getTimeSlotList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}


export function deleteTimeSlot(id) {
  return axiosWorker.delete(`api/timeSlot/delete/${id}`)
    .then(res => {
      storeActions.setIsLoading(false);
      getTimeSlotList();
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
