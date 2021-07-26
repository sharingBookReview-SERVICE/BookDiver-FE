import React from "react";
import styled from "styled-components";
import { ConnectedRouter } from 'connected-react-router';
import { Route } from "react-router-dom";
import {history} from "../redux/configStore";

function App() {
  return (
    <ConnectedRouter history={history}>
    <div className="App">
      <Container>
      {/* <Route path="/" exact component={} /> */}
      </Container>
    </div>
    </ConnectedRouter>
  );
}

const Container = styled.div`
  width: 360px;
  height: 720px;
  background: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default App;

