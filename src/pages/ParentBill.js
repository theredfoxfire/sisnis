import React, { Component } from 'react'
import {
    Grid,
    Card,
    Table,
} from 'semantic-ui-react';
import { chainToView, getAllState } from '../store/Store.js';
import { getDateByStringJSON } from '../utils/dateUtils';
import { getUserDetail } from './api-data/user';

class ParentBill extends Component {
    render() {
        const { userAditionalInfo } = getAllState();
        return (
            <Grid centered>
                <Grid.Column mobile={16} tablet={12} computer={8}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>Riwayat Tagihan/Pembayaran SPP</Card.Header>
                            <Card.Meta>{userAditionalInfo.details.name}</Card.Meta>
                            <Card.Meta>{userAditionalInfo.details.classRoom.name}</Card.Meta>
                        </Card.Content>
                    </Card>
                    <Table celled selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>No</Table.HeaderCell>
                                <Table.HeaderCell>Tanggal</Table.HeaderCell>
                                <Table.HeaderCell>Tahun Ajaran</Table.HeaderCell>
                                <Table.HeaderCell>Jumlah Tagihan</Table.HeaderCell>
                                <Table.HeaderCell>Keterangan</Table.HeaderCell>
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

export default chainToView(ParentBill);
