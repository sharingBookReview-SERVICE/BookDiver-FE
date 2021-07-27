import React from "react";
import styled from "styled-components";

const BookDetail = () => {


    return (
        <React.Fragment>
            <Main></Main>
    <LogoHeader>
    </LogoHeader>
            <SelectBook>
                <BookTitle>

                </BookTitle>
            </SelectBook>
        </React.Fragment>

    )
}

const LogoHeader = styled.div`
width: 100%;
  height: 72px;
  padding: 12px 0 1px;
  border: 1px solid black;
  box-sizing: border-box;
  background-color: var(--system-temp-10);
`;

const SelectBook = styled.div`
  width: 100%;
  height: 1016px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  margin: 0 0 8px;
  padding: 16px 24px;
  background-color: var(--system-temp-10);
  border: 1px solid black;
  box-sizing: border-box;
`

const BookTitle = styled.div`
  width: 312px;
  height: 112px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  border: solid 1px black;
  background-color: var(--system-temp-10);
  box-sizing: border-box;
`;
export default BookDetail;