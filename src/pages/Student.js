import React, { Component } from 'react'
import {
  Grid,
  Button,
  Table,
  Icon,
  Header, Modal,
  Pagination,
  Form,
} from 'semantic-ui-react';
import {
  Link
} from "react-router-dom";
import { getAllState, storeActions } from '../store/Store.js';
import initialState from '../store/state';
import {getStudentList, deleteStudent} from './api-data/student';
import {maxItems} from './api-data/config';
import styled from 'styled-components';

const Row = styled("div")`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
export default class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedID: 0,
      activePage: 1,
    }
  }
  render() {
    let {studentList, isLoading} = getAllState();
    let {isModalOpen, activePage} = this.state;
    let startNumbering = (activePage - 1) * maxItems;
    return (
      <div>
        <Grid.Column stretched width={12}>
        <h1>Tabel Siswa</h1>
      <Row><Link to="/student-form/0" onClick={() => storeActions.setSelectedStudent(initialState.selectedStudent)}>
        <Button color='green' size="small">
          <Icon name='plus' />
          Tambah Siswa
        </Button>
        </Link>
        <Pagination
          boundaryRange={0}
          defaultActivePage={activePage}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          onPageChange={(e, data) => this._onPageChange(data)}
          totalPages={Math.ceil(studentList.totals / maxItems)}
          disabled={isLoading}
        />
        </Row>
        <Form.Input placeholder='Filter nama'
          onChange={(e) => this._handleFilter(e.target.value)} />
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>No. Induk</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {studentList.students.map((item, key) => {
              return (
                <Table.Row key={key}>
                  <Table.Cell>{startNumbering + key + 1}</Table.Cell>
                <Table.Cell width="3">{item.serial}</Table.Cell>
              <Table.Cell width="6">{item.name}</Table.Cell>
                  <Table.Cell>
                  <Link to={`/student-form/${item.id}`}>
                  <Button color='green' basic onClick={() => {
                      storeActions.setSelectedStudent(initialState.selectedStudent);
                    }}>
                    <Icon name='pencil' />
                    Edit
                  </Button>
                  </Link>
                  <Button color='red' basic onClick={() => this.setState({isModalOpen: true, selectedID: item.id})}>
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
      <Modal
        closeIcon
        open={isModalOpen}
        onClose={() => this.setState({isModalOpen: false})}
        onOpen={() => this.setState({isModalOpen: true})}
      >
      <Header icon='trash' content='Hapus Data Siswa' />
      <Modal.Content>
        <p>
          Apakah Anda yakin ingin menghapus data ini?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => this.setState({isModalOpen: false})}>
          <Icon name='remove' /> Tidak
        </Button>
        <Button color='green' onClick={() => this._onDeleteItem()}>
          <Icon name='checkmark' /> Ya
        </Button>
      </Modal.Actions>
    </Modal>
      </div>
    )
  }

  componentDidMount() {
    const {activePage} = this.state;
    storeActions.setIsLoading(true);
    storeActions.setIsError(false);
    getStudentList(activePage);
  }

  _onDeleteItem = () => {
    let {selectedID} = this.state;
    this.setState({isModalOpen: false});
    storeActions.setIsLoading(true);
    deleteStudent(selectedID);
  }

  _onPageChange = (data) => {
    this.setState({activePage: data.activePage});
    getStudentList(data.activePage);
    storeActions.setIsLoading(true);
  }

  _handleFilter = (val) => {
    const {activePage} = this.state;
    this.setState({name: val});

    storeActions.setIsLoading(true);
    storeActions.setIsError(false);
    getStudentList(activePage, val, "");
  }
}
