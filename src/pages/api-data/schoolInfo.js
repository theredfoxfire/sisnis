import { storeActions } from "../../store/Store.js";
import { axiosWorker, errorHandler } from "./config";
export function getSchoolInfoList() {
  axiosWorker
    .get(`api/schoolInfo/get-all`)
    .then((res) => {
      const schoolInfos = res.data.schoolInfos;
      storeActions.setIsLoading(false);
      storeActions.setSchoolInfoList(schoolInfos);
    })
    .catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getSchoolInfoByID(id) {
  axiosWorker
    .get(`api/schoolInfo/get/${id}`)
    .then((res) => {
      const selectedSchoolInfo = res.data.schoolInfo;
      storeActions.setIsLoading(false);
      storeActions.setSelectedSchoolInfo(selectedSchoolInfo);
    })
    .catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postSchoolInfo(formData) {
  axiosWorker
    .post(`api/schoolInfo/add`, {
      ...formData,
    })
    .then(function (response) {
      storeActions.setIsLoading(false);
      getSchoolInfoList();
    })
    .catch(function (error) {
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function putSchoolInfo(formData, id) {
  axiosWorker
    .put(`api/schoolInfo/update/${id}`, {
      ...formData,
    })
    .then(function (response) {
      storeActions.setIsLoading(false);
      getSchoolInfoList();
    })
    .catch(function (error) {
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function deleteSchoolInfo(id) {
  return axiosWorker
    .delete(`api/schoolInfo/delete/${id}`)
    .then((res) => {
      storeActions.setIsLoading(false);
      getSchoolInfoList();
    })
    .catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
