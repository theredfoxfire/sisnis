import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { getAllState, chainToView } from "../store/Store.js";
import { USER_ROLE } from "../Constants";
import { getUserDetail } from "./api-data/user";

class Home extends Component {
  render() {
    const { userDetail } = getAllState();
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Halo {this._renderRole(userDetail.roles[0])}</h1>
        </Grid.Column>
      </div>
    );
  }
  componentDidMount() {
    getUserDetail();
  }
  _renderRole(role) {
    const { userAditionalInfo } = getAllState();
    switch (role) {
      case USER_ROLE.ROLE_ADMIN: {
        return "Admin";
      }
      case USER_ROLE.ROLE_STUDENT: {
        return `${userAditionalInfo.details.name || ""}`;
      }
      case USER_ROLE.ROLE_PARENT: {
        return `Orang tua/Wali murid ${userAditionalInfo.details.name || ""}`;
      }
      case USER_ROLE.ROLE_TEACHER: {
        return `${userAditionalInfo.details.name || ""}`;
      }
      default: {
        return "NOT DEFINED";
      }
    }
  }
}

export default chainToView(Home);
