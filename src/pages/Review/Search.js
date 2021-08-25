import React from "react";
import styled from "styled-components";
import Color from "../../shared/Color";
import SearchIcon from "@material-ui/icons/Search";

const Search = (props)=>{
    return(
        <Container>
            <SearchBarBox >
             
                <SearchBar placeholder="책이름, 저자명 등으로 검색해보세요" />
                <SearchIcon />
            </SearchBarBox>

        </Container>
    )
}


const Container = styled.div`
background: ${Color.mainColor};
width: 100%;
height: 100vh;
display: flex;
    justify-content: center;
`;


const SearchBarBox = styled.div`
  width: 90%;
  height: 50px;
  border: 1px solid ${Color.gray};
  border-radius: 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${Color.mainColor};
  margin-top: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 48px;
  color: ${Color.gray};
  border: none;
  border-radius: 12px;
  background-color: ${Color.mainColor};
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${Color.gray};
  }
  padding: 0px 0px 0px 10px;
`;

export default Search;