//import 부분
import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import Color from "../shared/Color";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../img/로고.png"

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as permitAction } from "../redux/modules/permit";

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
  const dispatch = useDispatch()
  const classes = useStyles();


  const openNotSupportModal = () => {
    dispatch(permitAction.showNotSupport(true))
  }


  return (
    <React.Fragment>
      <Wrapper>
      <HeaderBox>
        <LogoBox><Logo src={logo}/></LogoBox>

        <SearchBarBox onClick={openNotSupportModal}>
          <SearchIcon className={classes.searchIcon} />
          <SearchBar placeholder="궁금한 책 검색하기" />
        </SearchBarBox>
      </HeaderBox>
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
background-color: ${Color.black};
height:auto;
width:100%;
position:fixed;
top:0px;
z-index:1;
@media ${(props) => props.theme.tablet} {
  width:420px;
}

@media ${(props) => props.theme.desktop} {
  width:420px;
}
`

const HeaderBox = styled.div`
  height: 12vh;
  width: 100%;
  display: grid;
  flex-direction: row;
  grid-template-columns: 1fr 1fr;
  box-sizing: border-box;
  border-bottom: 1px solid #f3f3f3;

  @media ${(props) => props.theme.tablet} {
    width:420px;
    height:72px;
  }

  @media ${(props) => props.theme.desktop} {
    width:420px;
    height:72px;
  }

`;

const LogoBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 0px 0px 25px;
`;

const Logo = styled.img`
width:auto;
height:auto;
max-width:30vw;
max-height:30vh;

@media ${(props) => props.theme.tablet} {
  max-width:120px;
  max-height:120px;
}

@media ${(props) => props.theme.desktop} {
  max-width:120px;
  max-height:120px;
}
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
  height: 48px;
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
