import React, { Component } from 'react'
import {
    Grid,
    Card,
    Table,
} from 'semantic-ui-react';
import { chainToView, getAllState } from '../store/Store.js';
import { getDateByStringJSON } from '../utils/dateUtils';
import { getUserDetail } from './api-data/user';

class StudentPresence extends Component {
    render() {
        const { userAditionalInfo } = getAllState();
        return (
            <Grid centered>
                <Grid.Column mobile={16} tablet={12} computer={8}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>Rekap Absesnsi</Card.Header>
                            <Card.Meta>{userAditionalInfo.details.name}</Card.Meta>
                            <Card.Meta>{userAditionalInfo.details.classRoom.name}</Card.Meta>
                        </Card.Content>
                    </Card>
                    <Table celled selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>No</Table.HeaderCell>
                                <Table.HeaderCell>Matapelajaran</Table.HeaderCell>
                                <Table.HeaderCell>Guru</Table.HeaderCell>
                                <Table.HeaderCell>Hari</Table.HeaderCell>
                                <Table.HeaderCell>Ruangan</Table.HeaderCell>
                                <Table.HeaderCell>Jam</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>

                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid>
        )
    }
    componentDidMount() {
        getUserDetail();
    }

}

export default chainToView(StudentPresence);
