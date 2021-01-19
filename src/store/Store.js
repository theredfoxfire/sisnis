import React from "react";
import initialState from './state';
let stateContainer = {state: initialState};

export const setStoreContainer = (setter) => {
  stateContainer = setter;
};

export const chainToView = (ViewComponent) => {
  return (props) => <ViewComponent {...props} {...stateContainer.state} />;
}

export const getAllState = () => stateContainer.state;

export const storeActions = {
  setActiveItem: async (activeItem) => {
    await stateContainer.setState({activeItem: activeItem});
  },
  setClassRoomList: async (classRoomList) => {
    await stateContainer.setState({classRoomList: classRoomList});
  },
  setStudentList: async (studentList) => {
    await stateContainer.setState({studentList: studentList});
  },
  setTeacherList: async (teacherList) => {
    await stateContainer.setState({teacherList: teacherList});
  },
  setSubjectList: async (subjectList) => {
    await stateContainer.setState({subjectList: subjectList});
  },
  setAcademicYearsList: async (list) => {
    await stateContainer.setState({academicYearsList: list});
  },
  setIsLoading: async (isLoading) => {
    await stateContainer.setState({isLoading: isLoading});
  },
  setIsError: async (isError) => {
    await stateContainer.setState({isError: isError});
  },
  setSelectedClassRoomID: async (selectedClassRoomID) => {
    await stateContainer.setState({selectedClassRoomID: selectedClassRoomID});
  },
  setSelectedClassRoom: async (selectedClassRoom) => {
    await stateContainer.setState({selectedClassRoom: selectedClassRoom});
  },
  setSelectedStudent: async (selectedStudent) => {
    await stateContainer.setState({selectedStudent: selectedStudent});
  },
  setSelectedTeacher: async (selectedTeacher) => {
    await stateContainer.setState({selectedTeacher: selectedTeacher});
  },
  setSelectedSubject: async (selectedSubject) => {
    await stateContainer.setState({selectedSubject: selectedSubject});
  },
  setErrorMessage: async (errorMessage) => {
    await stateContainer.setState({errorMessage: errorMessage});
  },
  setModalStatus: async (status) => {
    await stateContainer.setState({isModalOpen: status});
  },
  setModalConfirmAction: async (confirmAction) => {
    await stateContainer.setState({confirmAction: confirmAction});
  },
  setCloseModalAction: async (closeAction) => {
    await stateContainer.setState({closeModalAction: closeAction});
  },
  setDialogTitle: async (dialogTitle) => {
    await stateContainer.setState({dialogTitle: dialogTitle});
  },
  setDialogMessage: async (dialogMessage) => {
    await stateContainer.setState({dialogMessage: dialogMessage});
  },
  setTeacherSubject: async (teacherSubject) => {
    await stateContainer.setState({teacherSubject: teacherSubject});
  },
  setExamTypeList: async (examTypeList) => {
    await stateContainer.setState({examTypeList: examTypeList});
  },
  setSchoolInfoList: async (schoolInfoList) => {
    await stateContainer.setState({schoolInfoList: schoolInfoList});
  },
  setSelectedExamType: async (selectedExamType) => {
    await stateContainer.setState({selectedExamType: selectedExamType});
  },
  setSelectedSchoolInfo: async (selectedSchoolInfo) => {
    await stateContainer.setState({selectedSchoolInfo: selectedSchoolInfo});
  },
  setSelectedExam: async (selectedExam) => {
    await stateContainer.setState({selectedExam: selectedExam});
  },
  setSelectedAcademicYear: async (item) => {
    await stateContainer.setState({selectedAcademicYear: item});
  },
  setAuth: async (auth) => {
    localStorage.setItem('storedAuth', JSON.stringify({token: auth}));
    await stateContainer.setState({auth: {token: auth}});
  },
};
