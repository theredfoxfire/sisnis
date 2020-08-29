import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  AuthScreen, HomeScreen, UsersScreen,
  ClassScreen, ClassFormScreen, StudentScreen, StudentFormScreen,
  TeacherScreen, TeacherFormScreen, SubjectScreen, SubjectFormScreen,
} from './pages';

export default class Routes extends Component {

  render() {
    return (
    <Router>
      <div>
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
          <Route path="/teacher-form">
            <TeacherFormScreen />
          </Route>
          <Route path="/subject">
            <SubjectScreen />
          </Route>
          <Route path="/subject-form">
            <SubjectFormScreen />
          </Route>
          <Route path="/users">
            <UsersScreen />
          </Route>
          <Route path="/">
            <AuthScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  )}
}
