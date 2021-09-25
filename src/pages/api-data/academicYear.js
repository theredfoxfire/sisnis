import { storeActions } from "../../store/Store.js";
import { axiosWorker, errorHandler } from "./config";
export function getAcademicYearsList() {
  axiosWorker
    .get(`api/academic_year/get-all`)
    .then((res) => {
      const academicYears = res.data.academic_years;
      storeActions.setIsLoading(false);
      storeActions.setAcademicYearsList(academicYears);
    })
    .catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getAcademicYearByID(id) {
  axiosWorker
    .get(`api/academic_year/get/${id}`)
    .then((res) => {
      const selectedAcademicYear = res.data.academic_year;
      storeActions.setIsLoading(false);
      storeActions.setSelectedAcademicYear(selectedAcademicYear);
    })
    .catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postAcademicYear(formData) {
  axiosWorker
    .post(`api/academic_year/add`, {
      ...formData,
    })
    .then(function (response) {
      storeActions.setIsLoading(false);
      getAcademicYearsList();
    })
    .catch(function (error) {
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function putAcademicYear(formData, id) {
  axiosWorker
    .put(`api/academic_year/update/${id}`, {
      ...formData,
    })
    .then(function (response) {
      storeActions.setIsLoading(false);
      getAcademicYearsList();
    })
    .catch(function (error) {
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function deleteAcademicYear(id) {
  return axiosWorker
    .delete(`api/academic_year/delete/${id}`)
    .then((res) => {
      storeActions.setIsLoading(false);
      getAcademicYearsList();
    })
    .catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
