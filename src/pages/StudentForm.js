import React, { Component } from 'react'
import {
  Grid,
  Segment,
  Form,
  Button,
  Radio,
  TextArea,
} from 'semantic-ui-react';
import {
  Link
} from "react-router-dom";
import { getStudentByID, postStudent, putStudent } from './api-data/student'
import { getAllState, storeActions, chainToView } from '../store/Store.js';
import { isEqual } from '../utils/objectUtils';
import { getClassRoomList } from './api-data/classRoom';
import DropdownSelect from '../uikit/Dropdown';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { getDateByStringJSON } from '../utils/dateUtils';

class StudentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      serial: "",
      classRoom: "",
      gender: "",
      birthDay: "",
      parentName: "",
      city: "",
      parentAddress: "",
      religion: "",
    };
  }
  render() {
    let { selectedStudent, classRoomList } = getAllState();
    let { name, serial, gender, birthDay, classRoom, parentName, parentAddress, city, religion } = this.state;
    let serialValue = serial || selectedStudent.serial;
    let nameValue = name || selectedStudent.name;
    let classRoomValue = classRoom || selectedStudent.classId;
    let studentID = this.props.match.params.id;
    let classRoomOptions = [];
    classRoomList.forEach((item, i) => {
      classRoomOptions.push({
        key: i,
        text: item.name,
        value: item.id,
      });
    });
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Form Siswa</h1>
          <Form size='large'>
            <Segment stacked>
              <h4>Nomer Induk Siswa:</h4>
              <Form.Input fluid placeholder='Nomer Induk Siswa' defaultValue={serialValue} onChange={(e) => this.setState({ serial: e.target.value, name: name || selectedStudent.name })} />
              <h4>Nama Siswa:</h4>
              <Form.Input fluid placeholder='Nama Siswa' defaultValue={nameValue} onChange={(e) => this.setState({ name: e.target.value, serial: serial || selectedStudent.serial })} />
              <h4>Jenis Kelamin:</h4>
              <Radio
                label='Laki-laki'
                name='gender'
                value='LAKI_LAKI'
                checked={gender === 'LAKI_LAKI'}
                onChange={() => this.setState({ gender: 'LAKI_LAKI' })}
              />
              <br />
              <Radio
                label='Perempuan'
                name='gender'
                value='PEREMPUAN'
                checked={gender === 'PEREMPUAN'}
                onChange={() => this.setState({ gender: 'PEREMPUAN' })}
              />
              <h4>Tanggal Lahir</h4>
            * Tahun-bulan-tanggal<br />
              <SemanticDatepicker clearable={false} locale="en-US" onChange={(event, data) => this.setState({
                birthDay: data.value,
              })} type="basic" value={birthDay} />
              <h4>Nama Orang Tua/Wali:</h4>
              <Form.Input fluid placeholder='Nama Orang Tua/Wali' defaultValue={parentName} onChange={(e) => this.setState({ parentName: e.target.value })} />
              <h4>Kabupaten/Kota:</h4>
              <Form.Input fluid placeholder='Kabupaten/Kota' defaultValue={city} onChange={(e) => this.setState({ city: e.target.value })} />
              <h4>Alamat lengkap orang tua:</h4>
              <TextArea rows={3} value={parentAddress} placeholder='Alamat lengkap orang tua' onChange={(e) => this.setState({ parentAddress: e.target.value })} />
              <h4>Agama:</h4>
              <Form.Input fluid placeholder='Agama' defaultValue={religion} onChange={(e) => this.setState({ religion: e.target.value })} />
              <h4>Pilih Kelas:</h4>
              <DropdownSelect placeholder="Pilih Kelas" value={classRoomValue} onChange={(e, { value }) => this.setState({ classRoom: value })} multiple={false} options={classRoomOptions} />
              <br />
              <Link to={"/student"}>
                <Button color='olive' size='small'>
                  Back
              </Button>
              </Link>
              <Link to={name !== "" ? "/student" : `/student-form/${studentID}`}>
                <Button color='teal' size='small' disabled={this._validate()} onClick={() => !this._validate() && this._handleSubmit()} >
                  Simpan
              </Button>
              </Link>
            </Segment>
          </Form>
        </Grid.Column>
      </div>
    )
  }

  componentDidMount() {
    let studentID = this.props.match.params.id;
    storeActions.setIsError(false);
    storeActions.setIsLoading(true);
    getClassRoomList();
    if (studentID > 0) {
      getStudentByID(studentID);
      this._validate();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { selectedStudent } = this.props;
    if (!isEqual(prevProps.selectedStudent, selectedStudent)) {
      this.setState({
        name: selectedStudent.name,
        serial: selectedStudent.serial,
        classRoom: selectedStudent.classId,
        ...selectedStudent,
        birthDay: getDateByStringJSON(selectedStudent.birthDay).newDateObject,
      });
    }
  }

  _handleSubmit = () => {
    let studentID = this.props.match.params.id;
    studentID > 0 ? putStudent({ ...this.state }, studentID) : postStudent({ ...this.state });
  }

  _validate = () => {
    let { name, serial, gender, parentName, parentAddress, city, religion } = this.state;
    return serial === "" || name === "" || gender === "" || parentName === "" || parentAddress === "" || city === "" || religion === "";
  }
}

export default chainToView(StudentForm);
