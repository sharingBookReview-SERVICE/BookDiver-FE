import React from "react";
import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <Container>

      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 360px;
  height: 720px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default App;

