let initialState = {
  activeItem: "home",
  classRoomList: [],
  isLoading: false,
  isError: false,
  isModalOpen: false,
  isShowReject: false,
  selectedClassRoom: {name: '', students: []},
  selectedClassRoomID: 0,
  studentList: [],
  selectedStudent: {serial: '', name: ''},
  teacherList: [],
  selectedTeacher: {serial: '', name: ''},
  subjectList: [],
  selectedSubject: {serial: '', name: ''},
  auth: JSON.parse(localStorage.getItem('storedAuth')) || {},
  errorMessage: "Gagal menampilkan data!",
  confirmAction: () => {},
  closeModalAction: false,
  dialogTitle: "Sesi Anda habis",
  dialogMessage: "Sesi Anda sudah berkahir, silahkan login ulang!",
};

let stateContainer = {state: initialState};

export const setStoreContainer = (setter) => {
  stateContainer = setter;
};

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
  setAuth: async (auth) => {
    localStorage.setItem('storedAuth', JSON.stringify({token: auth}));
    await stateContainer.setState({auth: {token: auth}});
  },
};
