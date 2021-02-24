import React, { Component } from 'react'
import {
  Grid,
  Button,
  Table,
  Icon,
} from 'semantic-ui-react';
import {
  Link
} from "react-router-dom";
import { getAllState, storeActions, chainToView } from '../store/Store.js';
import { getUserList, putUserActivate, deleteUser } from './api-data/user';
import initialState from '../store/state.js';
import { isEqual } from '../utils/objectUtils';
import { USER_ROLE } from '../Constants';
class User extends Component {
  render() {
    let { userList } = getAllState();
    const role = this.props.match.params.role;

    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>User {this._renderRole(role)}</h1>
          <Link to={`/user-form/0/${role}`}>
            <Button color='green' size="small" onClick={() => storeActions.setSelectedUser(initialState.selectedUser)}>
              <Icon name='plus' />
            Tambah
          </Button>
          </Link>

          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>No</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Status </Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {userList.map((item, key) => {
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{key + 1}</Table.Cell>
                    <Table.Cell width="3">{item.username}</Table.Cell>
                    <Table.Cell width="3">{item.email}</Table.Cell>
                    <Table.Cell width="3">{item.isActive ? "Aktif" : "Tidak Aktif"}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/user-form/${item.id}`}>
                        <Button color='green' basic onClick={() => storeActions.setSelectedUser(initialState.selectedUser)}>
                          <Icon name='pencil' />
                    Edit
                  </Button>
                      </Link>
                      {item.isActive ? <Button color='yellow' basic onClick={() => this._handleAcivation(item.id, item.isActive)}>
                        <Icon name='delete' />
                    Non Aktifkan
                  </Button> :
                        <Button color='green' basic onClick={() => this._handleAcivation(item.id, item.isActive)}>
                          <Icon name='check' />
                    Aktifkan
                  </Button>
                      }
                      <Button color='red' basic onClick={() => this._handleDelete(item.id)}>
                        <Icon name='trash' />
                    Hapus
                  </Button>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </Grid.Column>
      </div>
    )
  }
  _renderRole(role) {
    switch (role) {
      case USER_ROLE.ROLE_ADMIN: {
        return 'Admin';
      }
      case USER_ROLE.ROLE_STUDENT: {
        return 'Siswa';
      }
      default: {
        return 'NOT DEFINED';
      }
    };
  }

  _handleDelete = (id) => {
    let { isError } = getAllState();
    const role = this.props.match.params.role;
    storeActions.setIsLoading(true);
    storeActions.setModalStatus(true);
    storeActions.setDialogTitle("Hapus Data");
    storeActions.setDialogMessage("Anda yakin akan menghapus item ini?");
    storeActions.setModalConfirmAction(() => {
      deleteUser(id, role).then(() => {
        isError && storeActions.setIsError(false);
        storeActions.setModalStatus(false);
      });
    });
  }

  _handleAcivation = (id, isActive) => {
    const role = this.props.match.params.role;
    storeActions.setIsLoading(true);
    storeActions.setModalStatus(true);
    storeActions.setDialogTitle("Aktifasi User");
    storeActions.setDialogMessage(`Anda yakin akan ${isActive ? "me-non aktikan" : "mengaktifkan"} user ini?`);
    storeActions.setModalConfirmAction(() => {
      putUserActivate(id, role);
    });
  }

  componentDidMount() {
    const role = this.props.match.params.role;
    storeActions.setIsLoading(true);
    storeActions.setIsError(false);
    getUserList(role);
  }
  componentDidUpdate(prevProps) {
    const role = this.props.match.params.role;
    const prevRole = prevProps.match.params.role;
    if (!isEqual(role, prevRole)) {
      getUserList(role);
    }
  }
}

export default chainToView(User);
