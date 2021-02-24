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
    let { username, password, email } = this.state;
    let userID = this.props.match.params.id;
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Form User</h1>
          <Form size='large'>
            <Segment stacked>
              <h4>Username :</h4>
              <Form.Input fluid placeholder='Username ' defaultValue={username} onChange={(e) => this.setState({ username: e.target.value })} />
              <h4>Email :</h4>
              <Form.Input fluid placeholder='Email ' defaultValue={email} onChange={(e) => this.setState({ email: e.target.value })} />
              <h4>Password :</h4>
              <Form.Input fluid placeholder='Password' type='password' defaultValue={password} onChange={(e) => this.setState({ password: e.target.value })} />
              <Link to={"/user"}>
                <Button color='olive' size='small'>
                  Back
              </Button>
              </Link>
              <Link to={username !== "" ? "/user" : `/user-form/${userID}`}>
                <Button color='teal' size='small' disabled={this._validate()} onClick={() => !this._validate() && this._handleSubmit()} >
                  Simpan
              </Button>
              </Link>
            </Segment>
          </Form>
        </Grid.Column>
      </div>
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
      this.setState({ emai: selectedUser.email, username: selectedUser.username });
    }
  }

  _handleSubmit = () => {
    let { username, password, email } = this.state;
    let userID = this.props.match.params.id;
    userID > 0 ? putUser({ username, password, email }, userID) : postUser({ username, password, email });
  }

  _validate = () => {
    let { password, username, email } = this.state;
    return password === "" || username === "" || email === "";
  }
}

export default chainToView(UserForm);
