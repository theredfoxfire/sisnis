import React, { Component } from "react";
import { Grid, Button, Table, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getAllState, storeActions, chainToView } from "../store/Store.js";
import {
  getAcademicYearsList,
  deleteAcademicYear,
} from "./api-data/academicYear";
import initialState from "../store/state.js";

class AcademicYear extends Component {
  render() {
    let { academicYearsList } = getAllState();
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Tabel Tahun Ajaran</h1>
          <Link to="/academic-year-form/0">
            <Button
              color="green"
              size="small"
              onClick={() =>
                storeActions.setSelectedAcademicYear(
                  initialState.selectedAcademicYear
                )
              }
            >
              <Icon name="plus" />
              Tambah
            </Button>
          </Link>
          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>No</Table.HeaderCell>
                <Table.HeaderCell>Tahun</Table.HeaderCell>
                <Table.HeaderCell>Status </Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {academicYearsList.map((item, key) => {
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{key + 1}</Table.Cell>
                    <Table.Cell width="6">{item.year}</Table.Cell>
                    <Table.Cell width="3">
                      {item.isActive === "TRUE" ? "Aktif" : "Tidak Aktif"}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/academic-year-form/${item.yearId}`}>
                        <Button
                          color="green"
                          basic
                          onClick={() =>
                            storeActions.setSelectedAcademicYear(
                              initialState.selectedAcademicYear
                            )
                          }
                        >
                          <Icon name="pencil" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        color="red"
                        basic
                        onClick={() => this._handleDelete(item.yearId)}
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
        </Grid.Column>
      </div>
    );
  }

  componentDidMount() {
    storeActions.setIsLoading(true);
    storeActions.setIsError(false);
    getAcademicYearsList();
  }

  _handleDelete = (id) => {
    let { isError } = getAllState();
    storeActions.setIsLoading(true);
    storeActions.setModalStatus(true);
    storeActions.setDialogTitle("Hapus Data");
    storeActions.setDialogMessage("Anda yakin akan menghapus item ini?");
    storeActions.setModalConfirmAction(() => {
      deleteAcademicYear(id).then(() => {
        isError && storeActions.setIsError(false);
        storeActions.setModalStatus(false);
      });
    });
  };
}
export default chainToView(AcademicYear);
