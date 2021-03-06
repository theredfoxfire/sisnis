import React, { Component } from 'react'
import {
    Grid,
    Image,
} from 'semantic-ui-react';
import { chainToView } from '../store/Store.js';
import { getUserDetail } from './api-data/user';

class StudentInfo extends Component {
    render() {
        return (
            <Grid columns='four' divided>
                <Grid.Row>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    componentDidMount() {
        getUserDetail();
    }

}

export default chainToView(StudentInfo);
