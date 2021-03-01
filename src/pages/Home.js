import React, { Component } from 'react'
import {
  Grid,
} from 'semantic-ui-react';
import { getAllState, chainToView } from '../store/Store.js';
import { USER_ROLE } from '../Constants';
import { getUserDetail } from './api-data/user';

class Home extends Component {
  render() {
    const { userDetail } = getAllState();
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Hello {this._renderRole(userDetail.roles[0])}</h1>
        </Grid.Column>
      </div>
    )
  }
  componentDidMount() {
    getUserDetail();
  }
  _renderRole(role) {
    switch (role) {
      case USER_ROLE.ROLE_ADMIN: {
        return 'Admin';
      }
      case USER_ROLE.ROLE_STUDENT: {
        return 'Siswa';
      }
      case USER_ROLE.ROLE_PARENT: {
        return 'Wali Murid';
      }
      case USER_ROLE.ROLE_TEACHER: {
        return 'Guru';
      }
      default: {
        return 'NOT DEFINED';
      }
    };
  }

}

export default chainToView(Home);
