import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  AuthScreen, HomeScreen, UsersScreen,
  ClassScreen, ClassDetailScreen, ClassFormScreen, StudentScreen, StudentFormScreen,
  TeacherScreen, TeacherFormScreen, SubjectScreen, SubjectFormScreen, ClassAddStudentScreen,
  TeacherDetailScreen, TeacherAddSubjectScreen, TeacherSubjectDetailScreen, ExamFormScreen,
  ExamTypeScreen, ExamTypeFormScreen, TeacherExamDetailScreen,
  AcademicYearScreen, AcademicYearFormScreen, SchoolInfoScreen, SchoolInfoFormScreen,
  UserFormScreen, RoomScreen, RoomFormScreen, TimeSlotScreen, TimeSlotFormScreen,
  ScheduleFormScreen, ScheduleScreen, StudentAttendanceScreen, StudentAttendanceFormScreen
} from './pages';
import { getAllState } from './store/Store.js';
import HeaderMenu from './uikit/Header';
import Menus from './uikit/Menus';
import Loader from './uikit/Loader';
import ModalBox from './uikit/Modal';
import styled from 'styled-components';
let { auth } = getAllState();
const StyledDiv = styled("div")`
  display: flex;
  flex-direction: row;
  padding-top: 70px;
  justify-content: center;
`;
const MenuBox = styled("div")`
  width: 15em;
`;

const RightBox = styled("div")`
  width: 90%;
  padding-left: 20px;
  padding-right: 10px;
  padding-bottom: 15px;
`;

export default class Routes extends Component {

  render() {
    return (
    <Router>
      <div>
        <HeaderMenu />
      <StyledDiv>
      {auth.token &&
        <MenuBox>
          <Menus />
        </MenuBox>
      }
        <RightBox>
            <Loader />
          <Switch>
            <Route path="/home">
              <HomeScreen />
            </Route>
            <Route path="/class">
              <ClassScreen />
            </Route>
            <Route
              exact
              path="/class-form/:id"
              component={ClassFormScreen}
            />
            <Route
              exact
              path="/class-detail/:id"
              component={ClassDetailScreen}
            />
            <Route
              exact
              path="/class-add-students/:id"
              component={ClassAddStudentScreen}
            />
            <Route path="/student">
              <StudentScreen />
            </Route>
            <Route
              exact
              path="/student-form/:id"
              component={StudentFormScreen}
            />
            <Route path="/teacher">
              <TeacherScreen />
            </Route>
            <Route
              exact
              path="/teacher-form/:id"
              component={TeacherFormScreen}
            />
            <Route
              exact
              path="/teacher-detail/:id"
              component={TeacherDetailScreen}
            />
            <Route
              exact
              path="/teacher-subject-detail/:id"
              component={TeacherSubjectDetailScreen}
            />
            <Route
              exact
              path="/teacher-subject-exam-detail/:id"
              component={TeacherExamDetailScreen}
            />
            <Route
              exact
              path="/teacher-add-subject-exam/:id/:teacherSubject"
              component={ExamFormScreen}
            />
            <Route
              exact
              path="/exam-type"
              component={ExamTypeScreen}
            />
            <Route
              exact
              path="/exam-type-form/:id"
              component={ExamTypeFormScreen}
            />
            <Route
              exact
              path="/room"
              component={RoomScreen}
            />
            <Route
              exact
              path="/room-form/:id"
              component={RoomFormScreen}
            />
            <Route
              exact
              path="/schedule"
              component={ScheduleScreen}
            />
            <Route
              exact
              path="/schedule-form/:id"
              component={ScheduleFormScreen}
            />
            <Route
              exact
              path="/timeSlot"
              component={TimeSlotScreen}
            />
            <Route
              exact
              path="/timeSlot-form/:id"
              component={TimeSlotFormScreen}
            />
            <Route
              exact
              path="/studentAttendance"
              component={StudentAttendanceScreen}
            />
            <Route
              exact
              path="/studentAttendance-form/:id"
              component={StudentAttendanceFormScreen}
            />
            <Route
              exact
              path="/school-info"
              component={SchoolInfoScreen}
            />
            <Route
              exact
              path="/school-info-form/:id"
              component={SchoolInfoFormScreen}
            />
            <Route
              exact
              path="/academic-year"
              component={AcademicYearScreen}
            />
            <Route
              exact
              path="/academic-year-form/:id"
              component={AcademicYearFormScreen}
            />
            <Route
              exact
              path="/teacher-add-subject/:id"
              component={TeacherAddSubjectScreen}
            />
            <Route path="/subject">
              <SubjectScreen />
            </Route>
            <Route
              exact
              path="/subject-form/:id"
              component={SubjectFormScreen}
            />
            <Route path="/user">
              <UsersScreen />
            </Route>
            <Route
              exact
              path="/user-form/:id"
              component={UserFormScreen}
            />
            <Route path="/">
              <AuthScreen />
            </Route>
          </Switch>
        </RightBox>
      </StyledDiv>
      <ModalBox />
      </div>
    </Router>
  )}
}
