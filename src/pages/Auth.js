import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { postLogin } from "./api-data/auth";
import { getAllState, chainToView, storeActions } from "../store/Store.js";
let { auth } = getAllState();
class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }
  render() {
    let { isLoading } = getAllState();
    return (
      <Grid
        textAlign="center"
        style={{ height: "70vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="/images/logosemantic.png" /> Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                onChange={(e) => this.setState({ username: e.target.value })}
                iconPosition="left"
                placeholder="Username"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />

              <Button
                color="teal"
                fluid
                size="large"
                disabled={this._validateForm() || isLoading}
                onClick={() => !this._validateForm() && this._handleSubmit()}
              >
                {isLoading ? "Processing..." : "Login"}
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
  componentDidMount() {
    localStorage.clear();
    auth.token && window.location.replace("/");
  }
  _validateForm = () => {
    let { username, password } = this.state;
    return username === "" || password === "";
  };

  _handleSubmit = () => {
    let { username, password } = this.state;
    storeActions.setIsLoading(true);
    storeActions.setErrorMessage("");
    postLogin({ username, password });
  };
}

export default chainToView(Auth);
