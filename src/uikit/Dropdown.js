import React from "react";
import { Dropdown } from "semantic-ui-react";

const DropdownSelection = (props) => (
  <Dropdown
    {...props}
    placeholder={props.placeholder}
    fluid
    multiple={props.multiple}
    search
    selection
    options={props.options}
  />
);

export default DropdownSelection;
