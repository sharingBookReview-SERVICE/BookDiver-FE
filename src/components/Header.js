//import 부분
import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import Color from "../shared/Color";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    width: "20px",
    height: "20px",
    position: "absolute",
    left: "20px",
    color: Color.mainColor,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  //깃 플로우 테스트
  return (
    <React.Fragment>
      <HeaderPadding></HeaderPadding>
      <HeaderBox>
        <LogoBox></LogoBox>

        <SearchBarBox>
          <SearchIcon className={classes.searchIcon} />
          <SearchBar placeholder="리뷰궁금한 책 검색" />
        </SearchBarBox>
      </HeaderBox>
    </React.Fragment>
  );
};

const HeaderPadding = styled.div`
  height: 20px;
  width: 100%;
  background-color: ${Color.black};
`;

const HeaderBox = styled.div`
  height: 72px;
  width: 100%;
  display: grid;
  flex-direction: row;
  grid-template-columns: 1fr 1fr;
  box-sizing: border-box;
  border-bottom: 1px solid #f3f3f3;
  background-color: ${Color.black};
`;

const LogoBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 0px 0px 12px;
`;

const Logo = styled.div`
  font-size: 33px;
  font-weight: 800;
  color: #1168d7;
`;

const SearchBarBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px 12px 12px 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 100%;
  color: ${Color.mainColor};
  border: 1px solid ${Color.mainColor};
  border-radius: 12px;
  background-color: ${Color.black};
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${Color.mainColor};
  }
  padding: 0px 0px 0px 36px;
`;

export default Header;
