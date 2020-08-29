let initialState = {
  activeItem: "home",
  classRoomList: [],
  isLoading: false,
  isError: false,
  selectedClassRoom: {},
  selectedClassRoomID: 0,
  studentList: [],
  selectedStudent: {},
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
};
