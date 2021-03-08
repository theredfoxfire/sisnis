import React, { Component } from 'react'
import {
    Grid,
    Card,
    Table,
} from 'semantic-ui-react';
import { chainToView, getAllState } from '../store/Store.js';
import { getDateByStringJSON } from '../utils/dateUtils';
import { getUserDetail } from './api-data/user';

class StudentResult extends Component {
    render() {
        const { userAditionalInfo } = getAllState();
        return (
            <Grid centered>
                <Grid.Column mobile={16} tablet={12} computer={8}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>Rekap Hasil Belajar</Card.Header>
                            <Card.Meta>{userAditionalInfo.details.name}</Card.Meta>
                            <Card.Meta>{userAditionalInfo.details.classRoom.name}</Card.Meta>
                        </Card.Content>
                    </Card>
                    <Table celled selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>No</Table.HeaderCell>
                                <Table.HeaderCell>Pelajaran</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
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

export default chainToView(StudentResult);
