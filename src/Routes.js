import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  AuthScreen,
  HomeScreen,
  UsersScreen,
  ClassScreen,
  ClassDetailScreen,
  ClassFormScreen,
  StudentScreen,
  StudentFormScreen,
  TeacherScreen,
  TeacherFormScreen,
  SubjectScreen,
  SubjectFormScreen,
  ClassAddStudentScreen,
  TeacherDetailScreen,
  TeacherAddSubjectScreen,
  TeacherSubjectDetailScreen,
  ExamFormScreen,
  ExamTypeScreen,
  ExamTypeFormScreen,
  TeacherExamDetailScreen,
  AcademicYearScreen,
  AcademicYearFormScreen,
  SchoolInfoScreen,
  SchoolInfoFormScreen,
  UserFormScreen,
  RoomScreen,
  RoomFormScreen,
  TimeSlotScreen,
  TimeSlotFormScreen,
  ScheduleFormScreen,
  ScheduleScreen,
  StudentAttendanceScreen,
  StudentAttendanceFormScreen,
  PresenceScheduleScreen,
  StudentAttendanceDateListScreen,
  StudentInfoScreen,
  StudentScheduleScreen,
  StudentExamScreen,
  StudentPresenceScreen,
  StudentResultScreen,
  ParentBillScreen,
  TeacherAttendanceReportScreen,
  TeacherExamReportScreen,
  TeacherManageExamScreen,
  TeacherScheduleScreen,
} from "./pages";
import HeaderMenu from "./uikit/Header";
import Loader from "./uikit/Loader";
import ModalBox from "./uikit/Modal";
import styled from "styled-components";
import { Container } from "semantic-ui-react";

const ContentBox = styled("div")`
  marginbottom: 20px;
`;

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <HeaderMenu />
        <Container style={{ paddingTop: "5em" }}>
          <Loader />
          <Switch>
            <Route path="/home">
              <HomeScreen />
            </Route>
            <Route path="/class">
              <ClassScreen />
            </Route>
            <Route exact path="/class-form/:id" component={ClassFormScreen} />
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
            <Route exact path="/exam-type" component={ExamTypeScreen} />
            <Route
              exact
              path="/exam-type-form/:id"
              component={ExamTypeFormScreen}
            />
            <Route exact path="/room" component={RoomScreen} />
            <Route exact path="/room-form/:id" component={RoomFormScreen} />
            <Route exact path="/schedule" component={ScheduleScreen} />
            <Route
              exact
              path="/schedule-form/:id"
              component={ScheduleFormScreen}
            />
            <Route exact path="/timeSlot" component={TimeSlotScreen} />
            <Route
              exact
              path="/timeSlot-form/:id"
              component={TimeSlotFormScreen}
            />
            <Route
              exact
              path="/studentAttendance"
              component={PresenceScheduleScreen}
            />
            <Route
              exact
              path="/student-schedule"
              component={StudentScheduleScreen}
            />
            <Route exact path="/student-exam" component={StudentExamScreen} />
            <Route
              exact
              path="/student-presence"
              component={StudentPresenceScreen}
            />
            <Route exact path="/parent-bill" component={ParentBillScreen} />
            <Route
              exact
              path="/student-result"
              component={StudentResultScreen}
            />
            <Route
              exact
              path="/studentAttendance/:scheduleId/:date"
              component={StudentAttendanceScreen}
            />
            <Route
              exact
              path="/studentAttendance/:scheduleId"
              component={StudentAttendanceDateListScreen}
            />
            <Route
              exact
              path="/studentAttendance-form/:id"
              component={StudentAttendanceFormScreen}
            />
            <Route exact path="/school-info" component={SchoolInfoScreen} />
            <Route
              exact
              path="/school-info-form/:id"
              component={SchoolInfoFormScreen}
            />
            <Route exact path="/academic-year" component={AcademicYearScreen} />
            <Route exact path="/student-info" component={StudentInfoScreen} />
            <Route
              exact
              path="/academic-year-form/:id"
              component={AcademicYearFormScreen}
            />
            <Route
              exact
              path="/teacher-add-subject/:id/:subjectId"
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
            <Route exact path="/user/:role" component={UsersScreen} />
            <Route
              exact
              path="/user-form/:id/:role"
              component={UserFormScreen}
            />
            <Route
              exact
              path="/user-update-password/:id/:role"
              component={UserFormScreen}
            />
            <Route
              exact
              path="/teacher-schedule"
              component={TeacherScheduleScreen}
            />
            <Route
              exact
              path="/teacher-manage-exam"
              component={TeacherManageExamScreen}
            />
            <Route
              exact
              path="/teacher-attedance-report"
              component={TeacherAttendanceReportScreen}
            />
            <Route
              exact
              path="/teacher-exam-report"
              component={TeacherExamReportScreen}
            />
            <Route path="/">
              <AuthScreen />
            </Route>
          </Switch>
        </Container>
        <Container style={{ paddingTop: "1em" }} />
        <ModalBox />
      </Router>
    );
  }
}
