import { storeActions } from '../../store/Store.js';
import {axiosWorker, errorHandler, maxItems} from './config';
export function getScheduleList(activePage=1) {
  axiosWorker.get(`api/schedule/get-all?page=${activePage}&pageItems=${maxItems}`)
    .then(res => {
      const schedules = res.data;
      storeActions.setIsLoading(false);
      storeActions.setScheduleList(schedules);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getScheduleByID(id) {
  axiosWorker.get(`api/schedule/get/${id}`)
    .then(res => {
      const selectedSchedule = res.data.schedule;
      storeActions.setIsLoading(false);
      storeActions.setSelectedSchedule(selectedSchedule);
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postSchedule(formData) {
  axiosWorker.post(`api/schedule/add`, {
    ...formData
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(false);
    window.location.replace("/schedule");
  })
  .catch(function (error) {
    storeActions.setIsError(true);
    storeActions.setErrorMessage("Jadwal digunakan oleh pelajaran lain, coba ubah hari/ruangan/jam");
  });
}

export function putSchedule(formData, id) {
  axiosWorker.put(`api/schedule/update/${id}`, {
    ...formData,
  })
  .then(function (response) {
    storeActions.setIsLoading(false);
    getScheduleList();
  })
  .catch(function (error) {
    storeActions.setIsLoading(false);
    storeActions.setIsError(true);
  });
}


export function deleteSchedule(id) {
  return axiosWorker.delete(`api/schedule/delete/${id}`)
    .then(res => {
      storeActions.setIsLoading(false);
      getScheduleList();
    }).catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
