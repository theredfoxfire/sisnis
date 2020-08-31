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
          <Route
            exact
            path="/teacher-form/:id"
            component={TeacherFormScreen}
          />
          <Route path="/subject">
            <SubjectScreen />
          </Route>
          <Route
            exact
            path="/subject-form/:id"
            component={SubjectFormScreen}
          />
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
