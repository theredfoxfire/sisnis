import React, { Component } from "react";
import { Grid, Segment, Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  getClassRoomByID,
  postClassRoom,
  putClassRoom,
} from "./api-data/classRoom";
import { getAllState, storeActions, chainToView } from "../store/Store.js";
import { getTeacherList } from "./api-data/teacher";
import DropdownSelect from "../uikit/Dropdown";
import { isEqual } from "../utils/objectUtils";

class ClassRoomForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      teacherId: "",
    };
  }
  render() {
    let { teacherList } = getAllState();
    let { name, teacherId } = this.state;
    let classID = this.props.match.params.id;
    let teacherOptions = [];
    teacherList.forEach((item, i) => {
      teacherOptions.push({
        key: i,
        text: `No.Induk: ${item.serial}, Nama: ${item.name}`,
        value: item.id,
      });
    });
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Form Kelas</h1>
          <Form size="large">
            <Segment stacked>
              <h4>Nama Kelas:</h4>
              <Form.Input
                defaultValue={name}
                fluid
                placeholder="Nama Kelas"
                onChange={(e) => this.setState({ name: e.target.value })}
              />
              <h4>Pilih Walikelas:</h4>
              <DropdownSelect
                placeholder="Pilih Walikelas"
                value={teacherId}
                onChange={(e, { value }) => this.setState({ teacherId: value })}
                multiple={false}
                options={teacherOptions}
              />
              <br />
              <Link to={"/class"}>
                <Button color="olive" size="small">
                  Back
                </Button>
              </Link>
              <Link to={name !== "" ? "/class" : `/class-form/${classID}`}>
                <Button
                  color="teal"
                  size="small"
                  disabled={name === ""}
                  onClick={() => name !== "" && this._handleSubmit()}
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
    let classID = this.props.match.params.id;
    storeActions.setIsError(false);
    getTeacherList();
    if (classID > 0) {
      getClassRoomByID(classID);
      storeActions.setIsLoading(true);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { selectedClassRoom } = this.props;
    if (!isEqual(prevProps.selectedClassRoom, selectedClassRoom)) {
      this.setState({
        name: selectedClassRoom.name,
        teacherId: selectedClassRoom.teacherId,
      });
    }
  }

  _handleSubmit = () => {
    let { name, teacherId } = this.state;
    let classID = this.props.match.params.id;
    classID > 0
      ? putClassRoom(name, classID, teacherId)
      : postClassRoom(name, teacherId);
  };
}

export default chainToView(ClassRoomForm);
