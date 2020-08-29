import React, { Component } from 'react'
import {
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
import {getClassRoomByID, postClassRoom, putClassRoom} from './api-data/classRoom'
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
    let classID = this.props.match.params.id;
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
          <Form.Input defaultValue={nameValue} fluid placeholder='Nama Kelas' onChange={(e) => this.setState({name: e.target.value})} />
            <Link to={"/class"}>
              <Button color='olive' size='small'>
                 Back
              </Button>
            </Link>
            <Link to={name !== "" ? "/class" : `/class-form/${classID}`}>
              <Button color='teal' size='small' disabled={name === ""} onClick={() => name !== "" && this._handleSubmit()}>
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
    storeActions.setIsError(false);
    if (classID > 0) {
      getClassRoomByID(classID);
      storeActions.setIsLoading(true);
    }
  }

  _handleSubmit = () => {
    let {name} = this.state;
    let classID = this.props.match.params.id;
    classID > 0 ? putClassRoom(name, classID) : postClassRoom(name);
  }
}
