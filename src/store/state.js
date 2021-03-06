let initialState = {
  activeItem: JSON.parse(localStorage.getItem('activeItem')) || "home",
  classRoomList: [],
  isLoading: false,
  isError: false,
  isModalOpen: false,
  isShowReject: false,
  selectedClassRoom: { name: '', students: [] },
  selectedClassRoomID: 0,
  studentList: { students: [], totals: 0 },
  selectedStudent: { serial: '', name: '' },
  teacherList: [],
  selectedTeacher: { serial: '', name: '', classToSubjects: [], guardianClass: [] },
  subjectList: [],
  userList: { users: [], totals: 0 },
  examTypeList: [],
  roomList: [],
  studentAttendanceList: [],
  timeSlotList: [],
  scheduleList: { schedules: [], totals: 0 },
  teacherSubjectList: [],
  schoolInfoList: [],
  academicYearsList: [],
  selectedSubject: { serial: '', name: '' },
  auth: JSON.parse(localStorage.getItem('storedAuth')) || {},
  errorMessage: "Gagal menampilkan data!",
  confirmAction: () => { },
  closeModalAction: false,
  dialogTitle: "Sesi Anda habis",
  dialogMessage: "Sesi Anda sudah berkahir, silahkan login ulang!",
  teacherSubject: { id: '', name: '', className: '', exams: [] },
  selectedExam: { id: '', name: '', students: [], examPoints: [] },
  selectedExamType: { id: '', name: '', scale: '' },
  selectedRoom: { id: '', name: '' },
  selectedStudentAttendance: { id: '', schedule: '', student: '', notes: '', presenceStatus: '' },
  selectedTimeSlot: { id: '', time: '' },
  selectedSchedule: { id: '', time: '', subject: '', room: '', day: '', students: [] },
  selectedUser: { id: '', username: '', password: '', email: '' },
  selectedSchoolInfo: { id: '', name: '', phone: '', email: '', address: '', postalCode: '', province: '', city: '', subdistrict: '' },
  selectedAcademicYear: { id: '', year: '', isActive: '' },
  userDetail: JSON.parse(localStorage.getItem('storedUserDetail')) || {
    exp: 0,
    iat: 0,
    roles: `[]`,
    username: ``,
  },
  userAditionalInfo: { id: 0, email: "", "username": "", details: [] }
};

export default initialState;
