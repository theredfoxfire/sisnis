import React from "react";
import { getAllState } from "../store/Store.js";
import styled from "styled-components";
const StyledDiv = styled("div")`
  color: palevioletred;
  text-align: center;
  font-weight: bold;
  height: 10px;
`;
const Loader = () => {
  let { isLoading, isError, errorMessage } = getAllState();
  return (
    <div>
      {isLoading ? <StyledDiv>Loading...</StyledDiv> : <StyledDiv />}
      {isError ? <StyledDiv>{errorMessage}</StyledDiv> : <StyledDiv />}
    </div>
  );
};

export default Loader;
