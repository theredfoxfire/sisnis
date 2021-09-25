import React, { Component } from "react";
import { Grid, Segment, Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getRoomByID, postRoom, putRoom } from "./api-data/room";
import { storeActions, chainToView } from "../store/Store.js";
import { isEqual } from "../utils/objectUtils";

class RoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selectedRoom: {},
    };
  }
  render() {
    let { name } = this.state;
    let roomID = this.props.match.params.id;
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Form Ruangan</h1>
          <Form size="large">
            <Segment stacked>
              <h4>Nama :</h4>
              <Form.Input
                fluid
                placeholder="Nama "
                defaultValue={name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
              <Link to={"/room"}>
                <Button color="olive" size="small">
                  Back
                </Button>
              </Link>
              <Link to={name !== "" ? "/room" : `/room-form/${roomID}`}>
                <Button
                  color="teal"
                  size="small"
                  disabled={this._validate()}
                  onClick={() => !this._validate() && this._handleSubmit()}
                >
                  Simpan
                </Button>
              </Link>
            </Segment>
          </Form>
        </Grid.Column>
      </div>
    );
  }

  componentDidMount() {
    let roomID = this.props.match.params.id;
    storeActions.setIsError(false);
    if (roomID > 0) {
      getRoomByID(roomID);
      storeActions.setIsLoading(true);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { selectedRoom } = this.props;
    if (!isEqual(prevProps.selectedRoom, selectedRoom)) {
      this.setState({ name: selectedRoom.name });
    }
  }

  _handleSubmit = () => {
    let { name } = this.state;
    let roomID = this.props.match.params.id;
    roomID > 0 ? putRoom({ name: name }, roomID) : postRoom({ name: name });
  };

  _validate = () => {
    let { name } = this.state;
    return name === "";
  };
}

export default chainToView(RoomForm);
