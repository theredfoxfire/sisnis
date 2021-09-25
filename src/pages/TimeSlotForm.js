import React, { Component } from "react";
import { Grid, Segment, Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  getTimeSlotByID,
  postTimeSlot,
  putTimeSlot,
} from "./api-data/timeSlot";
import { storeActions, chainToView } from "../store/Store.js";
import { isEqual } from "../utils/objectUtils";

class TimeSlotForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "",
      selectedTimeSlot: {},
    };
  }
  render() {
    let { time } = this.state;
    let timeSlotID = this.props.match.params.id;
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Form Slot Waktu</h1>
          <Form size="large">
            <Segment stacked>
              <h4>Waktu :</h4>
              <Form.Input
                fluid
                placeholder="Waktu "
                defaultValue={time}
                onChange={(e) => this.setState({ time: e.target.value })}
              />
              <Link to={"/timeSlot"}>
                <Button color="olive" size="small">
                  Back
                </Button>
              </Link>
              <Link
                to={time !== "" ? "/timeSlot" : `/timeSlot-form/${timeSlotID}`}
              >
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
    let timeSlotID = this.props.match.params.id;
    storeActions.setIsError(false);
    if (timeSlotID > 0) {
      getTimeSlotByID(timeSlotID);
      storeActions.setIsLoading(true);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { selectedTimeSlot } = this.props;
    if (!isEqual(prevProps.selectedTimeSlot, selectedTimeSlot)) {
      this.setState({ time: selectedTimeSlot.time });
    }
  }

  _handleSubmit = () => {
    let { time } = this.state;
    let timeSlotID = this.props.match.params.id;
    timeSlotID > 0 ? putTimeSlot({ time }, timeSlotID) : postTimeSlot({ time });
  };

  _validate = () => {
    let { time } = this.state;
    return time === "";
  };
}

export default chainToView(TimeSlotForm);
