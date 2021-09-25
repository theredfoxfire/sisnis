import React, { Component } from "react";
import { Grid, Button, Table, Pagination, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getAllState, storeActions, chainToView } from "../store/Store.js";
import { getScheduleList, deleteSchedule } from "./api-data/schedule";
import initialState from "../store/state.js";
import { getStringFromOptions } from "../utils/dateUtils";
import { DAY_LIST } from "../Constants";
import { maxItems } from "./api-data/config";
import styled from "styled-components";

const Row = styled("div")`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }
  render() {
    let { scheduleList, isLoading } = getAllState();
    let { activePage } = this.state;
    let startNumbering = (activePage - 1) * maxItems;
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Tabel Jadwal Pelajaran</h1>

          <Row>
            <Link to="/schedule-form/0">
              <Button
                color="green"
                size="small"
                onClick={() =>
                  storeActions.setSelectedSchedule(
                    initialState.selectedSchedule
                  )
                }
              >
                <Icon name="plus" />
                Tambah
              </Button>
            </Link>
            <Pagination
              boundaryRange={0}
              defaultActivePage={activePage}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={3}
              onPageChange={(e, data) => this._onPageChange(data)}
              totalPages={Math.ceil(scheduleList.totals / maxItems)}
              disabled={isLoading}
            />
          </Row>
          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>No</Table.HeaderCell>
                <Table.HeaderCell>Matapelajaran</Table.HeaderCell>
                <Table.HeaderCell>Guru</Table.HeaderCell>
                <Table.HeaderCell>Hari</Table.HeaderCell>
                <Table.HeaderCell>Kelas / TA</Table.HeaderCell>
                <Table.HeaderCell>Ruangan</Table.HeaderCell>
                <Table.HeaderCell>Jam</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {scheduleList.schedules.map((item, key) => {
                const dayString = getStringFromOptions(item.day, DAY_LIST);
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{startNumbering + key + 1}</Table.Cell>
                    <Table.Cell width="2">{item.subject.name}</Table.Cell>
                    <Table.Cell width="2">{item.teacher.name}</Table.Cell>
                    <Table.Cell width="1">{dayString.label}</Table.Cell>
                    <Table.Cell width="2">
                      {item.classRoom.name} / {item.academicYear.year}
                    </Table.Cell>
                    <Table.Cell width="3">{item.room.name}</Table.Cell>
                    <Table.Cell width="2">{item.time.time}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/schedule-form/${item.id}`}>
                        <Button
                          color="green"
                          basic
                          onClick={() =>
                            storeActions.setSelectedSchedule(
                              initialState.selectedSchedule
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
        </Grid.Column>
      </div>
    );
  }

  componentDidMount() {
    let { activePage } = this.state;
    storeActions.setIsLoading(true);
    storeActions.setIsError(false);
    getScheduleList(activePage);
  }

  _handleDelete = (id) => {
    let { isError } = getAllState();
    storeActions.setIsLoading(true);
    storeActions.setModalStatus(true);
    storeActions.setDialogTitle("Hapus Data");
    storeActions.setDialogMessage("Anda yakin akan menghapus item ini?");
    storeActions.setModalConfirmAction(() => {
      storeActions.setModalStatus(false);
      deleteSchedule(id).then(() => {
        isError && storeActions.setIsError(false);
      });
    });
  };

  _onPageChange = (data) => {
    this.setState({ activePage: data.activePage });
    getScheduleList(data.activePage);
    storeActions.setIsLoading(true);
  };
}

export default chainToView(Schedule);
