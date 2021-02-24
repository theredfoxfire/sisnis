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
import { getTimeSlotList, deleteTimeSlot } from './api-data/timeSlot';
import initialState from '../store/state.js';

class TimeSlot extends Component {
  render() {
    let { timeSlotList } = getAllState();
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Tabel Slot Waktu</h1>
          <Link to="/timeSlot-form/0">
            <Button color='green' size="small" onClick={() => storeActions.setSelectedTimeSlot(initialState.selectedTimeSlot)}>
              <Icon name='plus' />
            Tambah
          </Button>
          </Link>
          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>No</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {timeSlotList.map((item, key) => {
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{key + 1}</Table.Cell>
                    <Table.Cell width="6">{item.time}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/timeSlot-form/${item.id}`}>
                        <Button color='green' basic onClick={() => storeActions.setSelectedTimeSlot(initialState.selectedTimeSlot)}>
                          <Icon name='pencil' />
                    Edit
                  </Button>
                      </Link>
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

  componentDidMount() {
    storeActions.setIsLoading(true);
    storeActions.setIsError(false);
    getTimeSlotList();
  }

  _handleDelete = (id) => {
    let { isError } = getAllState();
    storeActions.setIsLoading(true);
    storeActions.setModalStatus(true);
    storeActions.setDialogTitle("Hapus Data");
    storeActions.setDialogMessage("Anda yakin akan menghapus item ini?");
    storeActions.setModalConfirmAction(() => {
      storeActions.setModalStatus(false);
      deleteTimeSlot(id).then(() => {
        isError && storeActions.setIsError(false);
      });
    });
  }
}

export default chainToView(TimeSlot);
