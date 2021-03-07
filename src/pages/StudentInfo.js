import React, { Component } from 'react'
import {
    Grid,
    Image,
    Card,
    Divider,
} from 'semantic-ui-react';
import { chainToView, getAllState } from '../store/Store.js';
import { getDateByStringJSON } from '../utils/dateUtils';
import { getUserDetail } from './api-data/user';

class StudentInfo extends Component {
    render() {
        const { userAditionalInfo } = getAllState();
        return (
            <Grid centered>
                <Grid.Column mobile={16} tablet={12} computer={8}>
                    <Card fluid>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{userAditionalInfo.details.name}</Card.Header>
                            <Card.Meta>{userAditionalInfo.details.classRoom.name}</Card.Meta>
                            <Card.Description>
                                <b>Tanggal Lahir:</b> {getDateByStringJSON(userAditionalInfo.details.birthDay).dateIDN}
                                <Divider clearing />
                                <b>Nama orang tua:</b> {userAditionalInfo.details.parentName}
                                <Divider clearing />
                                <b>Alamat orang tua:</b> {userAditionalInfo.details.parentAddress}
                                <Divider clearing />
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        )
    }
    componentDidMount() {
        getUserDetail();
    }

}

export default chainToView(StudentInfo);
