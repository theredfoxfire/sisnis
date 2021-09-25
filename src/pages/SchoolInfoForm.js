import React, { Component } from "react";
import { Grid, Segment, Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  getSchoolInfoByID,
  postSchoolInfo,
  putSchoolInfo,
} from "./api-data/schoolInfo";
import { storeActions, chainToView } from "../store/Store.js";
import { isEqual } from "../utils/objectUtils";

class SchoolInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: {
        name: "",
        phone: "",
        email: "",
        address: "",
        postalCode: "",
        province: "",
        city: "",
        subdistrict: "",
      },
      selectedSchoolInfo: {},
    };
  }
  render() {
    let { school } = this.state;
    let {
      name,
      phone,
      email,
      address,
      postalCode,
      province,
      city,
      subdistrict,
    } = school;
    let schoolInfoID = this.props.match.params.id;
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Form Informasi Sekolah</h1>
          <Form size="large">
            <Segment stacked>
              <h4>Nama Sekolah :</h4>
              <Form.Input
                fluid
                placeholder=""
                defaultValue={name}
                onChange={(e) =>
                  this.setState({ school: { ...school, name: e.target.value } })
                }
              />
              <h4>Nomor Telephon/HP :</h4>
              <Form.Input
                fluid
                placeholder=""
                defaultValue={phone}
                onChange={(e) =>
                  this.setState({
                    school: { ...school, phone: e.target.value },
                  })
                }
              />
              <h4>Email :</h4>
              <Form.Input
                fluid
                placeholder=""
                defaultValue={email}
                onChange={(e) =>
                  this.setState({
                    school: { ...school, email: e.target.value },
                  })
                }
              />
              <h4>Provinsi :</h4>
              <Form.Input
                fluid
                placeholder=""
                defaultValue={province}
                onChange={(e) =>
                  this.setState({
                    school: { ...school, province: e.target.value },
                  })
                }
              />
              <h4>Kabupaten/Kota :</h4>
              <Form.Input
                fluid
                placeholder=""
                defaultValue={city}
                onChange={(e) =>
                  this.setState({ school: { ...school, city: e.target.value } })
                }
              />
              <h4>Kecamatan :</h4>
              <Form.Input
                fluid
                placeholder=""
                defaultValue={subdistrict}
                onChange={(e) =>
                  this.setState({
                    school: { ...school, subdistrict: e.target.value },
                  })
                }
              />
              <h4>Kode Pos :</h4>
              <Form.Input
                fluid
                placeholder=""
                defaultValue={postalCode}
                onChange={(e) =>
                  this.setState({
                    school: { ...school, postalCode: e.target.value },
                  })
                }
              />
              <h4>Alamat :</h4>
              <Form.Input
                fluid
                placeholder=""
                defaultValue={address}
                onChange={(e) =>
                  this.setState({
                    school: { ...school, address: e.target.value },
                  })
                }
              />
              <Link to={"/school-info"}>
                <Button color="olive" size="small">
                  Back
                </Button>
              </Link>
              <Link
                to={
                  name !== ""
                    ? "/school-info"
                    : `/school-info-form/${schoolInfoID}`
                }
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
    let schoolInfoID = this.props.match.params.id;
    storeActions.setIsError(false);
    if (schoolInfoID > 0) {
      getSchoolInfoByID(schoolInfoID);
      storeActions.setIsLoading(true);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { selectedSchoolInfo } = this.props;
    if (!isEqual(prevProps.selectedSchoolInfo, selectedSchoolInfo)) {
      this.setState({ school: { ...selectedSchoolInfo } });
    }
  }

  _handleSubmit = () => {
    let { school } = this.state;
    let schoolInfoID = this.props.match.params.id;
    schoolInfoID > 0
      ? putSchoolInfo({ ...school }, schoolInfoID)
      : postSchoolInfo({ ...school });
  };

  _validate = () => {
    let { school } = this.state;
    let {
      name,
      phone,
      email,
      address,
      postalCode,
      province,
      city,
      subdistrict,
    } = school;
    return (
      name === "" ||
      phone === "" ||
      email === "" ||
      address === "" ||
      postalCode === "" ||
      province === "" ||
      city === "" ||
      subdistrict === ""
    );
  };
}

export default chainToView(SchoolInfoForm);
