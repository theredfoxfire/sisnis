import React, { Component } from "react";
import { Grid, Button, Table, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getAllState, storeActions, chainToView } from "../store/Store.js";
import { getStudentAttendanceList } from "./api-data/studentAttendance";
import initialState from "../store/state.js";
import { getDateByStringJSON } from "../utils/dateUtils";
import { getScheduleByID } from "./api-data/schedule";
import { getStringFromOptions } from "../utils/dateUtils";
import { DAY_LIST } from "../Constants";
import styled from "styled-components";

const Row = styled("div")`
  display: flex;
  flex-direction: row;
`;

const Label = styled("div")`
  width: 120px;
`;

class StudentAttendanceDateList extends Component {
  render() {
    let { studentAttendanceList, selectedSchedule } = getAllState();
    let scheduleId = this.props.match.params.scheduleId;
    const dayString = getStringFromOptions(selectedSchedule.day, DAY_LIST);
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Tabel Rekap Kehadiran</h1>
          {selectedSchedule.id !== "" ? (
            <div>
              <Row>
                <Label>Kelas:</Label> <b>{selectedSchedule.classRoomName}</b>
              </Row>
              <Row>
                <Label>Matapelajaran:</Label>{" "}
                <b>{selectedSchedule.subjectName}</b>
              </Row>
              <Row>
                <Label>Guru:</Label> <b>{selectedSchedule.teacherName}</b>
              </Row>
              <Row>
                <Label>Hari:</Label> <b>{dayString.label}</b>
              </Row>
              <Row>
                <Label>Jam:</Label> <b>{selectedSchedule.timeString}</b>
              </Row>
              <Row>
                <Label>Semester:</Label> <b>{selectedSchedule.academicYear}</b>
              </Row>
            </div>
          ) : null}
          <Link
            to={`/studentAttendance/${scheduleId}/new`}
            onClick={() => {
              storeActions.setStudentAttendanceList(
                initialState.studentAttendanceList
              );
              storeActions.setSelectedSchedule(initialState.selectedSchedule);
            }}
          >
            <Button color="green" size="small">
              <Icon name="plus" />
              Tambah
            </Button>
          </Link>
          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>No</Table.HeaderCell>
                <Table.HeaderCell>Tanggal Absensi</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {studentAttendanceList.map((item, key) => {
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{key + 1}</Table.Cell>
                    <Table.Cell width="6">
                      {getDateByStringJSON(item.date).dateIDN}
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        to={`/studentAttendance/${item.schedule}/${item.date}`}
                      >
                        <Button
                          color="green"
                          basic
                          onClick={() =>
                            storeActions.setStudentAttendanceList(
                              initialState.studentAttendanceList
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
          <Link to={`/studentAttendance`}>
            <Button
              color="olive"
              size="small"
              onClick={() =>
                storeActions.setStudentAttendanceList(
                  initialState.studentAttendanceList
                )
              }
            >
              Back
            </Button>
          </Link>
        </Grid.Column>
      </div>
    );
  }

  componentDidMount() {
    let scheduleId = this.props.match.params.scheduleId;
    storeActions.setIsLoading(true);
    storeActions.setIsError(false);
    getStudentAttendanceList(scheduleId);
    getScheduleByID(scheduleId);
  }
}

export default chainToView(StudentAttendanceDateList);
