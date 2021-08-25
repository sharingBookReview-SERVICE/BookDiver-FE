//import 부분
import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import Color from "../shared/Color";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../img/Header-Main-Logo@3x.png";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as permitAction } from "../redux/modules/permit";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

const useStyles = makeStyles((theme) => ({
  icon: {
    width: "25px",
    height: "25px",
    color: Color.fontBlack,
    marginLeft:"15px",
    cursor:"pointer",
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

        <SearchBarBox >
          <SearchIcon
          onClick={openNotSupportModal} 
          className={classes.icon} />
          <NotificationsNoneIcon
          onClick={openNotSupportModal} 
          className={classes.icon}/>
        </SearchBarBox>
      </HeaderBox>
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
background-color: ${Color.mainColor};
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
  height: 56px;
  width: 100%;
  display: grid;
  flex-direction: row;
  grid-template-columns: 1fr 1fr;
  box-sizing: border-box;

  @media ${(props) => props.theme.tablet} {
    width:420px;
    height:56px;
  }

  @media ${(props) => props.theme.desktop} {
    width:420px;
    height:56px;
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
max-width:90px;
max-height:90px;

@media ${(props) => props.theme.tablet} {
  max-width:90px;
  max-height:90px;
}

@media ${(props) => props.theme.desktop} {
  max-width:90px;
  max-height:90px;
}
`;

const SearchBarBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px 20px 12px 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

export default Header;
