import React, { Component } from "react";
import { Grid, Button, Table, Icon } from "semantic-ui-react";
import { getClassRoomByID, deleteStudentClass } from "./api-data/classRoom";
import { Link } from "react-router-dom";
import { getAllState, storeActions } from "../store/Store.js";

export default class ClassDetail extends Component {
  render() {
    let { selectedClassRoom } = getAllState();
    let classID = this.props.match.params.id;
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Detail Kelas: {selectedClassRoom.name}</h1>

          <h3>Daftar Siswa di kelas ini:</h3>
          <Link to={`/class-add-students/${classID}`}>
            <Button color="green" size="small">
              <Icon name="plus" />
              Tambah Siswa Lagi
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
              {selectedClassRoom.students.map((item, key) => {
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{key + 1}</Table.Cell>
                    <Table.Cell width="9">{item.name}</Table.Cell>
                    <Table.Cell>
                      <Button
                        color="red"
                        basic
                        onClick={() => this._handleDelete(item.id)}
                      >
                        <Icon name="trash" />
                        Hapus
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          {selectedClassRoom.students.length < 1 && <h4>Data kosong.</h4>}
        </Grid.Column>
      </div>
    );
  }

  componentDidMount() {
    let classID = this.props.match.params.id;
    storeActions.setIsError(false);
    if (classID > 0) {
      getClassRoomByID(classID);
      storeActions.setIsLoading(true);
    }
  }

  _handleDelete = (studentID) => {
    let classID = this.props.match.params.id;
    storeActions.setModalStatus(true);
    storeActions.setDialogTitle("Hapus data");
    storeActions.setDialogMessage("Anda yakin akan menghapus data ini?");
    storeActions.setModalConfirmAction(() => {
      deleteStudentClass(studentID).then(() => {
        getClassRoomByID(classID);
        storeActions.setModalStatus(false);
      });
    });
  };
}
