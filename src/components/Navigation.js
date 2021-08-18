import React from "react";
import { history } from "../redux/configStore";
import { BrowserRouter as Router,  NavLink } from 'react-router-dom';

import styled from "styled-components";
import PersonIcon from "@material-ui/icons/Person";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AddBoxIcon from "@material-ui/icons/AddBox";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import { makeStyles } from "@material-ui/core/styles";

import Color from "../shared/Color";

import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  navBox: {
    backgroundColor: Color.mainColor,
    position: "fixed",
    bottom: "0",
    width: "100%",
    color: Color.secondColor,
    boxShadow: "0 -3px 6px rgba(0,0,0,0.2)",
    zIndex:"2",
  },
  icon: {
    width:"auto",
    cursor:"pointer",
  },
  plusButton: {
    cursor: "pointer",
    color: Color.black,
    fontSize: "48px",
    filter: "drop-shadow(1px 1px 4px rgba(0,0,0,0.4))",
  },
  active:{
    color:Color.black,
  }
}));

const Navigation = (props) => {
  //주석추가
  const classes = useStyles();

  const is_login = useSelector((state) => state.user.is_login);

  const toLogin = () => {
    history.push("/login");
  };
  const toMain = () => {
    history.push("/");
  };
  const toCollection = () => {
    history.push("/bookCollectionMain");
  };
  const toPostWrite = () => {
    history.push(`/postwrite`);
  };
  const toMyReviewFeed = () => {
    history.push("/myfeed");
  };
  const toSetting = () => {
    history.push("/setting");
  };

  return (
    <NavBox>

      <IconBox to="/" exact activeClassName={classes.active}>
        <ListAltIcon className={classes.icon}/>
        <PageName >피드</PageName>
      </IconBox>

      <IconBox to="/bookCollectionMain" activeClassName={classes.active}>
        <BookOutlinedIcon className={classes.icon}/>
        <PageName >북컬렉션</PageName>
      </IconBox>

      <AddBox to="/postwrite">
        <AddBoxIcon className={classes.plusButton}/>
      </AddBox>

      <IconBox to="/myfeed" activeClassName={classes.active}>
        <SpeakerNotesIcon className={classes.icon}/>
        <PageName >내 피드</PageName>
      </IconBox>

      <IconBox to="/setting" activeClassName={classes.active}>
        <PersonIcon className={classes.icon}/>
        <PageName >내 정보</PageName>
      </IconBox>
    </NavBox>
  );
};

export default Navigation;


const NavBox = styled.div`
width:100%;
display:grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
box-sizing:border-box;
background:${Color.mainColor};
color:${Color.secondColor};
position: fixed;
bottom:0px;
height: 60px;

@media ${(props) => props.theme.tablet} {
  width: 420px;
  height: 60px;
  position:fixed;
  bottom:0;
  box-shadow: 0 4px 4px -4px rgba(0,0,0,0.2);
}

@media ${(props) => props.theme.desktop} {
  width: 420px;
  height: 60px;
  position:fixed;
  bottom:0;
  box-shadow: 0px -4px 4px -2px rgba(0,0,0,0.2);
}
`

const IconBox = styled(NavLink)`
width:100%;
height:100%;
display:flex;
padding-top:10px;
flex-direction:column;
align-items:center;
justify-content:flex-start;
text-decoration:none;
color:${Color.secondColor};
`

const AddBox = styled(NavLink)`
width:auto;
height:100%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
color:${Color.black};
`

const PageName = styled.div`
font-size:10px;
`