import React, { Component } from 'react'
import {
  Grid,
  Segment,
  Form,
  Button,
} from 'semantic-ui-react';
import {
  Link
} from "react-router-dom";
import { getUserByID, postUser, putUser } from './api-data/user';
import { storeActions, chainToView } from '../store/Store.js';
import { isEqual } from '../utils/objectUtils';
import { USER_ROLE } from '../Constants';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
    };
  }
  render() {
    let { username, email } = this.props.selectedUser;
    let userID = this.props.match.params.id;
    const role = this.props.match.params.role;
    const isNotAdmin = role !== USER_ROLE.ROLE_ADMIN;
    return (
      <Grid.Column stretched width={12}>
        <h1>Form User</h1>
        <Form autoComplete="off">
          <Segment stacked>
            <h4>Username :</h4>
            <Form.Input readOnly={isNotAdmin} fluid placeholder={userID > 0 ? username : 'Username '} onChange={(e) => this.setState({ username: e.target.value })} />
            <h4>Email :</h4>
            <Form.Input fluid placeholder={userID > 0 ? email : 'Email '} type="email" onChange={(e) => this.setState({ email: e.target.value })} />
            <h4>Password :</h4>
            {userID > 0 && "(biarkan kosong jika password tidak ingin diubah)"}
            <Form.Input autoComplete="new-password" fluid placeholder='Password' type='password' defaultValue={""} onChange={(e) => this.setState({ password: e.target.value })} />
            {isNotAdmin ? <Button color='teal' size='small' disabled={this._validate()} onClick={() => !this._validate() && this._handleSubmit()} >
              Simpan
              </Button> : <>
              <Link to={`/user/${role}`}>
                <Button color='olive' size='small'>
                  Back
              </Button>
              </Link>
              <Link to={username !== "" ? `/user/${role}` : `/user-form/${userID}/${role}`}>
                <Button color='teal' size='small' disabled={this._validate()} onClick={() => !this._validate() && this._handleSubmit()} >
                  Simpan
              </Button>
              </Link>
            </>}

          </Segment>
        </Form>
      </Grid.Column>
    )
  }

  componentDidMount() {
    let userID = this.props.match.params.id;
    storeActions.setIsError(false);
    if (userID > 0) {
      getUserByID(userID);
      storeActions.setIsLoading(true);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { selectedUser } = this.props;
    if (!isEqual(prevProps.selectedUser, selectedUser)) {
      this.setState({ email: selectedUser.email, username: selectedUser.username });
    }
  }

  _handleSubmit = () => {
    let { username, password, email } = this.state;
    const role = this.props.match.params.role;
    let userID = this.props.match.params.id;
    userID > 0 ? putUser({ username, password: password === '' ? undefined : password, email }, userID, role) : postUser({ username, password, email, roles: `["${role}"]` }, role);
  }

  _validate = () => {
    let userID = this.props.match.params.id;
    let { password, username, email } = this.state;
    return (userID < 1 && password === "") || username === "" || email === "";
  }
}

export default chainToView(UserForm);
