import React from "react";
import { history } from "../redux/configStore";
import {  NavLink, useLocation } from 'react-router-dom';

import styled from "styled-components";
import PersonIcon from "@material-ui/icons/Person";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AddBoxIcon from "@material-ui/icons/AddBox";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';
import AddIcon from '@material-ui/icons/Add';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';

import { makeStyles } from "@material-ui/core/styles";

import Color from "../shared/Color";
import {images} from "../shared/Image"

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as permitActions } from "../redux/modules/permit";

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
    pointerEvents: "none",
    color:Color.black,
  },
  plus:{
    color:Color.secondColor,
    fontSize:"28px",
    "&:hover":{
      color:Color.mainColor,
    },
    transition:"0.5s ease-in-out",
  },
  postActive:{
    pointerEvents: "none",
  }
}));

const Navigation = (props) => {
  //주석추가
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation()

  const is_login = useSelector((state) => state.user.is_login);
  const profile = useSelector((state) => state.user.user.profileImage)



  const setMyFeedLoading = () => {
    if(location.pathname === "/myfeed"){
      return
    }
    dispatch(permitActions.isLoading(true))
  }

  const setMainLoading = () => {
    if(location.pathname === "/"){
      return
    }
    dispatch(permitActions.isLoading(true))
  }

  const setDivingLoading = () => {
    if(location.pathname === "/mydepth"){
      return
    }
    dispatch(permitActions.isLoading(true))
  }



  if(!is_login){
    return(
      <NavBox>

      <IconBox to="/" exact activeClassName={classes.active}>
        <QuestionAnswerOutlinedIcon className={classes.icon}/>
        <PageName >피드</PageName>
      </IconBox>

      <IconBox to="/bookCollectionMain" >
        <BookOutlinedIcon className={classes.icon}/>
        <PageName >북컬렉션</PageName>
      </IconBox>

      <AddBox to="/login">
      <PlusBox>
          <AddIcon className={classes.plus}/>
        </PlusBox>
      </AddBox>

      <IconBox to="/login" >
        <SpeakerNotesOutlinedIcon className={classes.icon}/>
        <PageName >내 피드</PageName>
      </IconBox>

      <IconBox to="/login" activeClassName={classes.active}>
        <PersonIcon className={classes.icon}/>
        <PageName >로그인</PageName>
      </IconBox>
    </NavBox>
    )
  }

  return (
    <NavBox>

      <IconBox 
      to="/" exact
      onClick={setMainLoading}
      activeClassName={classes.active}>
        <QuestionAnswerOutlinedIcon className={classes.icon}/>
        <PageName >피드</PageName>
      </IconBox>

      <IconBox 
      to="/bookCollectionMain"
      activeClassName={classes.active}>
        <BookOutlinedIcon className={classes.icon}/>
        <PageName >북컬렉션</PageName>
      </IconBox>

      <AddBox 
      to="/postwrite"
      activeClassName={classes.postActive}>
        <PlusBox>
          <AddIcon className="plus" className={classes.plus}/>
        </PlusBox>
      </AddBox>

      <IconBox 
      to="/myfeed"
      onClick={setMyFeedLoading}
      activeClassName={classes.active}>
        <SpeakerNotesOutlinedIcon className={classes.icon}/>
        <PageName >내 피드</PageName>
      </IconBox>

      <IconBox 
      to="/mydepth"
      onClick={setDivingLoading}
      activeClassName={classes.active}>
        <ProfileImg src={images[profile]}></ProfileImg>
        <PageName >잠수상태</PageName>
      </IconBox>
    </NavBox>
  );
};

export default Navigation;

const ProfileImg = styled.img`
width:23px;
height:23px;
border-radius:50%;
margin-bottom:2px;
cursor:pointer;
`


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
box-shadow: 0 -4px 4px -2px rgba(0,0,0,0.2);
z-index: 50;
@media ${(props) => props.theme.tablet} {
  width: 420px;
  height: 60px;
  position:fixed;
  bottom:0;
}

@media ${(props) => props.theme.desktop} {
  width: 420px;
  height: 60px;
  position:fixed;
  bottom:0;
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
transition: 0.2s ease-in-out;
:hover {
  color:${Color.black};
}
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

const PlusBox = styled.div`
  width:42px;
  height:42px;
  border:1px solid ${Color.secondColor};
  border-radius:13px;
  display:flex;
  justify-content:center;
  align-items:center;
  transition: 0.2s ease-in-out;
  :hover{
    background:${Color.secondColor};
  }
`

const PageName = styled.div`
font-size:10px;
`