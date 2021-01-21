let initialState = {
  activeItem: "home",
  classRoomList: [],
  isLoading: false,
  isError: false,
  isModalOpen: false,
  isShowReject: false,
  selectedClassRoom: {name: '', students: []},
  selectedClassRoomID: 0,
  studentList: {students: [], totals: 0},
  selectedStudent: {serial: '', name: ''},
  teacherList: [],
  selectedTeacher: {serial: '', name: '', classToSubjects: [], guardianClass: []},
  subjectList: [],
  userList: [],
  examTypeList: [],
  roomList: [],
  schoolInfoList: [],
  academicYearsList: [],
  selectedSubject: {serial: '', name: ''},
  auth: JSON.parse(localStorage.getItem('storedAuth')) || {},
  errorMessage: "Gagal menampilkan data!",
  confirmAction: () => {},
  closeModalAction: false,
  dialogTitle: "Sesi Anda habis",
  dialogMessage: "Sesi Anda sudah berkahir, silahkan login ulang!",
  teacherSubject: {id: '', name: '', className: '', exams: []},
  selectedExam: {id: '', name: '', students: [], examPoints: []},
  selectedExamType: {id: '', name: '', scale: ''},
  selectedRoom: {id: '', name: ''},
  selectedUser: {id: '', username: '', password: '', email: ''},
  selectedSchoolInfo: {id: '', name: '', phone: '', email: '', address: '', postalCode: '', province: '', city: '', subdistrict:''},
  selectedAcademicYear: {id: '', year: '', isActive: ''},
};

export default initialState;
