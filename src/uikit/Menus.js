import React from "react";
import { Grid, Menu } from "semantic-ui-react";

const Header = (props) => {
  return (
    <Grid.Column width={3}>
      <Menu fluid vertical tabular></Menu>
    </Grid.Column>
  );
};

export default Header;
