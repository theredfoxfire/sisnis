import React, { Component } from "react";
import { Grid, Button, Table, Icon, Header, Modal } from "semantic-ui-react";
import { getClassRoomList, deleteClass } from "./api-data/classRoom";
import { Link } from "react-router-dom";
import { getAllState, storeActions } from "../store/Store.js";
import initialState from "../store/state.js";

export default class ClassRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedID: 0,
    };
  }
  render() {
    let { classRoomList } = getAllState();
    let { isModalOpen } = this.state;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <h1>Tabel Kelas</h1>
            <Link
              to="/class-form/0"
              onClick={() =>
                storeActions.setSelectedClassRoom(
                  initialState.selectedClassRoom
                )
              }
            >
              <Button color="green" size="small">
                <Icon name="plus" />
                Tambah Kelas
              </Button>
            </Link>
            <Table celled selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>No</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Walikelas</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {classRoomList.map((item, key) => {
                  return (
                    <Table.Row key={key}>
                      <Table.Cell>{key + 1}</Table.Cell>
                      <Table.Cell width="9">
                        <Link to={`/class-detail/${item.id}`}>{item.name}</Link>
                      </Table.Cell>
                      <Table.Cell>{item.guardianName}</Table.Cell>
                      <Table.Cell>
                        <Link to={`/class-form/${item.id}`}>
                          <Button
                            color="green"
                            basic
                            onClick={() => {
                              storeActions.setSelectedClassRoomID(item.id);
                              storeActions.setSelectedClassRoom(
                                initialState.selectedClassRoom
                              );
                            }}
                          >
                            <Icon name="pencil" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          color="red"
                          basic
                          onClick={() =>
                            this.setState({
                              isModalOpen: true,
                              selectedID: item.id,
                            })
                          }
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

            <Modal
              closeIcon
              open={isModalOpen}
              onClose={() => this.setState({ isModalOpen: false })}
              onOpen={() => this.setState({ isModalOpen: true })}
            >
              <Header icon="trash" content="Hapus Data Kelas" />
              <Modal.Content>
                <p>Apakah Anda yakin ingin menghapus data ini?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  color="red"
                  onClick={() => this.setState({ isModalOpen: false })}
                >
                  <Icon name="remove" /> Tidak
                </Button>
                <Button color="green" onClick={() => this._onDeleteItem()}>
                  <Icon name="checkmark" /> Ya
                </Button>
              </Modal.Actions>
            </Modal>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  componentDidMount() {
    storeActions.setIsLoading(true);
    storeActions.setIsError(false);
    getClassRoomList();
  }

  _onDeleteItem = () => {
    let { selectedID } = this.state;
    this.setState({ isModalOpen: false });
    storeActions.setIsLoading(true);
    deleteClass(selectedID);
  };
}
