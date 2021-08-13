import React, { useEffect } from "react";
import { history } from "../redux/configStore";

import styled from "styled-components";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SearchIcon from "@material-ui/icons/Search";
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
    color: Color.secondColor,
    width:"auto",
  },
  plusButton: {
    color: Color.black,
    fontSize: "48px",
    filter: "drop-shadow(1px 1px 4px rgba(0,0,0,0.4))",
  },
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
    <BottomNavigation showLabels className={classes.navBox}>
      <BottomNavigationAction
        label="피드"
        value="write"
        className={classes.button}
        icon={<ListAltIcon className={classes.icon} />}
        onClick={() => {
          toMain();
        }}
      />

      <BottomNavigationAction
        label="북컬렉션"
        value="write"
        className={classes.button}
        icon={<BookOutlinedIcon className={classes.icon} />}
        onClick={() => {
          toCollection();
        }}
      />

      <BottomNavigationAction
        value="list"
        className={classes.button}
        icon={<AddBoxIcon className={classes.plusButton} />}
        onClick={() => {
          is_login ? toPostWrite() : toLogin();
        }}
      />

      <BottomNavigationAction
        label="내 피드"
        value="login"
        className={classes.button}
        icon={<SpeakerNotesIcon className={classes.icon} />}
        onClick={() => {
          is_login ? toMyReviewFeed() : toLogin();
        }}
      />

      <BottomNavigationAction
        label={is_login ? "내 정보" : "로그인"}
        value="login"
        className={classes.button}
        icon={<PersonIcon className={classes.icon} />}
        onClick={() => {
          is_login ? toSetting() : toLogin();
        }}
      />
    </BottomNavigation>
  );
};

export default Navigation;
