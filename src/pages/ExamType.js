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
import {getExamTypeList, deleteExamType} from './api-data/examType';
import initialState from '../store/state.js';

class ExamType extends Component {
  render() {
    let {examTypeList} = getAllState();
    return (
      <div>
        <Grid.Column stretched width={12}>
        <h1>Tabel Tipe Exam</h1>
        <Link to="/exam-type-form/0">
          <Button color='green' size="small" onClick={() => storeActions.setSelectedExamType(initialState.selectedExamType)}>
            <Icon name='plus' />
            Tambah
          </Button>
        </Link>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Skala Nilai </Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {examTypeList.map((item, key) => {
              return (
                <Table.Row key={key}>
                  <Table.Cell>{key + 1}</Table.Cell>
              <Table.Cell width="6">{item.name}</Table.Cell>
              <Table.Cell width="3">{item.scale}</Table.Cell>
                  <Table.Cell>
                  <Link to={`/exam-type-form/${item.id}`}>
                  <Button color='green' basic onClick={() => storeActions.setSelectedExamType(initialState.selectedExamType)}>
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
    getExamTypeList();
  }

  _handleDelete = (id) => {
    let { isError } = getAllState();
    storeActions.setIsLoading(true);
    storeActions.setModalStatus(true);
    storeActions.setDialogTitle("Hapus Data");
    storeActions.setDialogMessage("Anda yakin akan menghapus item ini?");
    storeActions.setModalConfirmAction(() => {
      deleteExamType(id).then(() => {
        isError && storeActions.setIsError(false);
        storeActions.setModalStatus(false);
      });
    });
  }
}

export default chainToView(ExamType);
