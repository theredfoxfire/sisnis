import React from 'react';
import { storeActions, getAllState } from '../store/Store.js';
import styled from 'styled-components';
const StyledDiv = styled("div")`
  color: palevioletred;
  text-align: center;
  font-weight: bold;
`;
const Loader = () => {
  let {isLoading, isError} = getAllState();
  return (<div>
    {isLoading && <StyledDiv>Loading..</StyledDiv>}
    {isError && <StyledDiv>Gagal menampilkan data!</StyledDiv>}
  </div>);
};

export default Loader;
