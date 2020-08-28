import React, { Component } from 'react'
import {
  Container,
  Grid,
  Segment,
  Form,
  Button,
} from 'semantic-ui-react'
import Header from '../uikit/Header'
import Menus from '../uikit/Menus'
import Loader from '../uikit/Loader'
import {
  Link
} from "react-router-dom";
import {getClassRoomByID, postClassRoom} from './api-data/classRoom'
import { getAllState, storeActions } from '../store/Store.js';

export default class ClassRoomForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }
  render() {
    let {selectedClassRoom} = getAllState();
    let {name} = this.state;
    let nameValue = name || selectedClassRoom.name;
    return (
      <div>
      <Header />
      <Grid style={{ marginTop: '2.4em' }}>
        <Menus />
        <Grid.Column stretched width={12}>
        <h1>Form Kelas</h1>
        <Form size='large'>
          <Segment stacked>
            <h4>Nama kelas:</h4>
            <Form.Input defaultValue={nameValue} fluid placeholder='Nama Kelas' onChange={(e) => this.setState({name: e.value})} />
            <Link to="/class">
            <Button color='teal' size='small' onClick={() => this._handleSubmit()}>
               Simpan
            </Button>
          </Link>
          </Segment>
        </Form>
        </Grid.Column>
        <Loader />
      </Grid>
      </div>
    )
  }
  componentDidMount() {
    let classID = this.props.match.params.id;
    storeActions.setIsLoading(true);
    storeActions.setIsError(false);
    getClassRoomByID(classID);
  }

  _handleSubmit = () => {
    let {name} = this.state;
    postClassRoom(name);
  }
}
