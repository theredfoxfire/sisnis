import React, { Component } from "react";
import { Grid, Button, Table, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getAllState, storeActions, chainToView } from "../store/Store.js";
import { getSchoolInfoList } from "./api-data/schoolInfo";
import initialState from "../store/state.js";

class SchoolInfo extends Component {
  render() {
    let { schoolInfoList } = getAllState();
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Informasi Sekolah</h1>
          {schoolInfoList.length > 0 ? null : (
            <Link to="/school-info-form/0">
              <Button
                color="green"
                size="small"
                onClick={() =>
                  storeActions.setSelectedSchoolInfo(
                    initialState.selectedSchoolInfo
                  )
                }
              >
                <Icon name="plus" />
                Tambah
              </Button>
            </Link>
          )}

          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>No</Table.HeaderCell>
                <Table.HeaderCell>Nama</Table.HeaderCell>
                <Table.HeaderCell>Alamat </Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {schoolInfoList.map((item, key) => {
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{key + 1}</Table.Cell>
                    <Table.Cell width="6">{item.name}</Table.Cell>
                    <Table.Cell width="3">{item.address}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/school-info-form/${item.id}`}>
                        <Button
                          color="green"
                          basic
                          onClick={() =>
                            storeActions.setSelectedSchoolInfo(
                              initialState.selectedSchoolInfo
                            )
                          }
                        >
                          <Icon name="pencil" />
                          Edit
                        </Button>
                      </Link>
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
    getSchoolInfoList();
  }
}

export default chainToView(SchoolInfo);
