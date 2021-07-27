import React from "react";
import styled from "styled-components";
import { ConnectedRouter } from 'connected-react-router';
import { Route } from "react-router-dom";
import {history} from "../redux/configStore";
import ReviewDetail from "../pages/ReviewDetail";
import Home from "../pages/Home"

function App() {
  return (
    <ConnectedRouter history={history}>
    <div className="App">
      <Container>
      <Route path="/" exact component={Home} />
      <Route path="/reviewdetail" exact component={ReviewDetail} />
      </Container>
    </div>
    </ConnectedRouter>
  );
}

const Container = styled.div`
  width: 360px;
  height: 640px;
  background: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing:border-box;
  padding:0px;
  position:relative;
`;

export default App;

