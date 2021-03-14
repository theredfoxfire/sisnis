import React, { Component } from 'react'
import {
    Grid,
    Card,
    Table,
} from 'semantic-ui-react';
import { chainToView, getAllState } from '../store/Store.js';
import { getStringFromOptions } from '../utils/dateUtils';
import { getScheduleByStudent } from './api-data/schedule';
import { DAY_LIST } from '../Constants';

class StudentSchedule extends Component {
    render() {
        const { userAditionalInfo, scheduleList } = getAllState();
        return (
            <Grid centered>
                <Grid.Column>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>Jadwal Pelajaran</Card.Header>
                            <Card.Meta>{userAditionalInfo.details.name}</Card.Meta>
                            <Card.Meta>{userAditionalInfo.details.classRoom.name}</Card.Meta>
                        </Card.Content>
                    </Card>
                    <Table celled selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>No</Table.HeaderCell>
                                <Table.HeaderCell>Tahun Ajaran</Table.HeaderCell>
                                <Table.HeaderCell>Matapelajaran</Table.HeaderCell>
                                <Table.HeaderCell>Guru</Table.HeaderCell>
                                <Table.HeaderCell>Hari</Table.HeaderCell>
                                <Table.HeaderCell>Ruangan</Table.HeaderCell>
                                <Table.HeaderCell>Jam</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {scheduleList.schedules.map((item, key) => {
                                const dayString = getStringFromOptions(item.day, DAY_LIST);
                                return (
                                    <Table.Row key={key}>
                                        <Table.Cell width="1">{key + 1}</Table.Cell>
                                        <Table.Cell width="2">{item.academicYear.year}</Table.Cell>
                                        <Table.Cell width="2">{item.subject.name}</Table.Cell>
                                        <Table.Cell width="2">{item.teacher.name}</Table.Cell>
                                        <Table.Cell width="1">{dayString.label}</Table.Cell>
                                        <Table.Cell width="3">{item.room.name}</Table.Cell>
                                        <Table.Cell width="2">{item.time.time}</Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid>
        )
    }
    componentDidMount() {
        const { userAditionalInfo } = getAllState();
        getScheduleByStudent(userAditionalInfo.details.id);
    }

}

export default chainToView(StudentSchedule);
