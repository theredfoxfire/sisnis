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
import { getAcademicYearByID, postAcademicYear, putAcademicYear } from './api-data/academicYear';
import { storeActions, chainToView } from '../store/Store.js';
import DropdownSelect from '../uikit/Dropdown';

class AcademicYearForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "",
      isActive: false,
      selectedAcademicYear: {},
    };
  }
  render() {
    let { year, isActive, selectedAcademicYear } = this.state;
    let isActiveValue = isActive || selectedAcademicYear.isActive;
    let yearValue = year || selectedAcademicYear.year;
    let academicYearID = this.props.match.params.id;
    let statusOptions = [
      {
        key: 1,
        text: "Active",
        value: "TRUE"
      },
      {
        key: 2,
        text: "Tidak Active",
        value: "FALSE",
      },
    ];
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Form Tahun Ajaran</h1>
          <Form size='large'>
            <Segment stacked>
              <h4>Tahun :</h4>
              <Form.Input fluid placeholder='Tahun Ajaran' defaultValue={yearValue} onChange={(e) => this.setState({ year: e.target.value, scale: isActiveValue })} />
              <h4>Status</h4>
              <DropdownSelect placeholder="Pilih status" value={isActiveValue} onChange={(e, { value }) => this.setState({ year: yearValue, isActive: value })} multiple={false} options={statusOptions} />
              <br />
              <Link to={"/academic-year"}>
                <Button color='olive' size='small'>
                  Back
              </Button>
              </Link>
              <Link to={year !== "" ? "/academic-year" : `/academic-year-form/${academicYearID}`}>
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
    let academicYearID = this.props.match.params.id;
    storeActions.setIsError(false);
    if (academicYearID > 0) {
      getAcademicYearByID(academicYearID);
      storeActions.setIsLoading(true);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { selectedAcademicYear } = this.props;
    if (JSON.stringify(prevProps.selectedAcademicYear) !== JSON.stringify(selectedAcademicYear)) {
      this.setState({ selectedAcademicYear });
    }
  }

  _handleSubmit = () => {
    let { year, isActive } = this.state;
    let academicYearID = this.props.match.params.id;
    academicYearID > 0 ? putAcademicYear({ year, isActive }, academicYearID) : postAcademicYear({ year, isActive });
  }

  _validate = () => {
    let { year } = this.state;
    return year === "";
  }
}

export default chainToView(AcademicYearForm);
