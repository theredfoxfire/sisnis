import { storeActions } from "../../store/Store.js";
import { axiosWorker, errorHandler } from "./config";

export function getTeacherSubject($teacherSubject) {
  axiosWorker
    .get(`api/exam/get/teacher-subject/${$teacherSubject}`)
    .then((res) => {
      const teacherSubject = res.data.exam;
      storeActions.setIsLoading(false);
      storeActions.setTeacherSubject(teacherSubject);
    })
    .catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function getExamByID(id) {
  axiosWorker
    .get(`api/exam/get/${id}`)
    .then((res) => {
      const selectedExam = res.data.exam;
      storeActions.setIsLoading(false);
      storeActions.setSelectedExam(selectedExam);
    })
    .catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postExam(formData) {
  axiosWorker
    .post(`api/exam/add`, {
      name: formData.name,
      teacherSubject: formData.teacherSubject,
      examType: formData.examType,
      examDate: formData.examDate,
    })
    .then(function (response) {
      storeActions.setIsLoading(false);
      getTeacherSubject(formData.teacherSubject);
    })
    .catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function postStudentsPoint(formData) {
  axiosWorker
    .post(`api/exam/point/add`, {
      examId: formData.examID,
      studentPoints: formData.studentPoints,
    })
    .then(function (response) {
      storeActions.setIsLoading(false);
      storeActions.setIsError(false);
      storeActions.setDialogMessage("Data berhasil disimpan");
      getExamByID(formData.examID);
    })
    .catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
      storeActions.setErrorMessage("Data gagal disimpan");
    });
}
export function putStudentsPoint(formData) {
  axiosWorker
    .put(`api/exam/point/update`, {
      examId: formData.examID,
      studentPoints: formData.studentPoints,
    })
    .then(function (response) {
      storeActions.setIsLoading(false);
      storeActions.setIsError(false);
      getExamByID(formData.examID);
      storeActions.setDialogMessage("Data berhasil disimpan");
    })
    .catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setErrorMessage("Data gagal disimpan");
      storeActions.setIsError(true);
    });
}

export function putExam(name, id) {
  axiosWorker
    .put(`api/exam/update/${id}`, {
      name: name,
    })
    .then(function (response) {
      storeActions.setIsLoading(false);
      getTeacherSubject();
    })
    .catch(function (error) {
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}

export function deleteExam(id) {
  return axiosWorker
    .delete(`api/exam/delete/${id}`)
    .then((res) => {
      storeActions.setIsLoading(false);
    })
    .catch(function (error) {
      errorHandler(error);
      storeActions.setIsLoading(false);
      storeActions.setIsError(true);
    });
}
