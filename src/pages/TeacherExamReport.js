import React, { Component } from 'react'
import {
    Grid,
    Card,
    Table,
} from 'semantic-ui-react';
import { chainToView, getAllState } from '../store/Store.js';
import { getDateByStringJSON } from '../utils/dateUtils';
import { getUserDetail } from './api-data/user';

class TeacherExamReport extends Component {
    render() {
        const { userAditionalInfo } = getAllState();
        return (
            <Grid centered>
                <Grid.Column mobile={16} tablet={12} computer={8}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>Rekap Nilai Siswa</Card.Header>
                            <Card.Meta>{userAditionalInfo.details.name}</Card.Meta>
                        </Card.Content>
                    </Card>
                    <Table celled selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>No</Table.HeaderCell>
                                <Table.HeaderCell>Nama</Table.HeaderCell>
                                <Table.HeaderCell>Tugas</Table.HeaderCell>
                                <Table.HeaderCell>Ulangan</Table.HeaderCell>
                                <Table.HeaderCell>UAS</Table.HeaderCell>
                                <Table.HeaderCell>UTS</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
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

export default chainToView(TeacherExamReport);
