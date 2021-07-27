import React from "react";
import styled from "styled-components";
import { ConnectedRouter } from 'connected-react-router';
import { Route } from "react-router-dom";
import {history} from "../redux/configStore";
import ReviewDetail from "../pages/ReviewDetail";
import Home from "../pages/Home"
import Navigation from "../components/Navigation";


function App() {


  return (
      <React.Fragment>
        <Container>
            <ConnectedRouter history={history}>
              <Route path="/" exact component={Home} />
              <Route path="/reviewdetail" exact component={ReviewDetail} />
            </ConnectedRouter>
          <Navigation/>
          </Container>
      </React.Fragment>
  );

}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing:border-box;
  padding:0px 0px 40px 0px;
  position:relative;
`;


export default App;

