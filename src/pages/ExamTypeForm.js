import React, { Component } from 'react'
import {
  Grid,
  Segment,
  Form,
  Button,
} from 'semantic-ui-react';
import {
  Link
} from "react-router-dom";
import {getExamTypeByID, postExamType, putExamType} from './api-data/examType';
import {storeActions, chainToView } from '../store/Store.js';

class ExamTypeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      scale: "",
      selectedExamType: {},
    };
  }
  render() {
    let {name, scale, selectedExamType} = this.state;
    let scaleValue = scale || selectedExamType.scale;
    let nameValue = name || selectedExamType.name;
    let examTypeID = this.props.match.params.id;
    return (
      <div>
        <Grid.Column stretched width={12}>
        <h1>Form Tipe Exam</h1>
        <Form size='large'>
          <Segment stacked>
          <h4>Nama :</h4>
          <Form.Input fluid placeholder='Nama '  defaultValue={nameValue} onChange={(e) => this.setState({name: e.target.value, scale: scale || selectedExamType.scale})} />
          <h4>Skala Nilai :</h4>
          <Form.Input fluid placeholder='Skala Nilai' defaultValue={scaleValue} onChange={(e) => this.setState({scale: e.target.value, name: name || selectedExamType.name})} />
            <Link to={"/exam-type"}>
              <Button color='olive' size='small'>
                 Back
              </Button>
            </Link>
            <Link to={name !== "" ? "/exam-type" : `/exam-type-form/${examTypeID}`}>
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
      let examTypeID = this.props.match.params.id;
      storeActions.setIsError(false);
      if (examTypeID > 0) {
        getExamTypeByID(examTypeID);
        storeActions.setIsLoading(true);
      }
    }

    componentDidUpdate(prevProps, prevState) {
      let {selectedExamType} = this.props;
      if (JSON.stringify(prevProps.selectedExamType) !== JSON.stringify(selectedExamType)) {
        this.setState({selectedExamType});
      }
    }

    _handleSubmit = () => {
      let {name, scale} = this.state;
      let examTypeID = this.props.match.params.id;
      examTypeID > 0 ? putExamType({name: name, scale: scale}, examTypeID) : postExamType({name: name, scale: scale});
    }

    _validate = () => {
      let {scale, name} = this.state;
      return scale === "" || name === "";
    }
}

export default chainToView(ExamTypeForm);
