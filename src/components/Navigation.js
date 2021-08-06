import React, { useEffect } from "react";
import { history } from "../redux/configStore";

import styled from "styled-components";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Color from "../shared/Color";

import { useSelector } from "react-redux";

const Navigation = (props) => {
  //주석추가

  const is_login = useSelector((state) => state.user.is_login);

  const toLogin = () => {
    history.push("/login");
  };
  const toMain = () => {
    history.push("/");
  };
  const toPostWrite = () => {
    history.push(`/postwrite`);
  };
  const toMyReviewFeed = () => {
    history.push("/myreviewfeed");
  };
  const toMyProfile = () => {
    history.push("/myprofile");
  };

  return (
    <BottomNavigation
      showLabels
      style={{
        background: Color.mainColor,
        position: "fixed",
        bottom: "0",
        width: "100%",
        color: Color.secondColor,
      }}
    >
      <BottomNavigationAction
        label="피드"
        value="write"
        icon={<ListAltIcon style={{ color: Color.secondColor }} />}
        onClick={() => {
          toMain();
        }}
      />

      <BottomNavigationAction
        label="통합검색"
        value="write"
        icon={<SearchIcon style={{ color: Color.secondColor }} />}
        onClick={() => {
          toMain();
        }}
      />

      <BottomNavigationAction
        value="list"
        icon={
          <AddBoxIcon
            style={{
              color: Color.black,
              fontSize: "48px",
              boxShadow: "5px 5px 5px (0,0,0,0.2)",
            }}
          />
        }
        onClick={() => {
          is_login ? toPostWrite() : toLogin();
        }}
      />

      <BottomNavigationAction
        label="내 피드"
        value="login"
        icon={<AllInboxIcon style={{ color: Color.secondColor }} />}
        onClick={() => {
          is_login ? toMyReviewFeed() : toLogin();
        }}
      />

      <BottomNavigationAction
        label={is_login ? "내 정보" : "로그인"}
        value="login"
        icon={<PersonIcon style={{ color: Color.secondColor }} />}
        onClick={() => {
          is_login ? toMyProfile() : toLogin();
        }}
      />
    </BottomNavigation>
  );
};

export default Navigation;
