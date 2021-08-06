import React, { useEffect } from "react";
import { history } from "../redux/configStore";

import styled from "styled-components";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";

const Navigation = (props) => {
  //주석추가

  const is_login = useSelector((state) => state.user.is_login);

  return (
    <BottomNavigation
      style={{
        background: "#fafafa",
        position: "fixed",
        bottom: "0",
        width: "100%",
      }}
    >
      <BottomNavigationAction
        label="Write"
        value="write"
        icon={<ListAltIcon />}
        onClick={() => {
          history.push("/");
        }}
      />

      {is_login ? (
        <>
          <BottomNavigationAction
            label="List"
            value="list"
            icon={<EditIcon />}
            onClick={() => {
              history.push(`/postwrite`);
            }}
          />
          <BottomNavigationAction
            label="Login"
            value="login"
            icon={<AllInboxIcon />}
            onClick={() => {
              history.push("/myreviewfeed");
            }}
          />
          <BottomNavigationAction
            label="Login"
            value="login"
            icon={<PersonIcon />}
            onClick={() => {
              history.push("/myprofile");
            }}
          />
        </>
      ) : (
        <>
          <BottomNavigationAction
            label="List"
            value="list"
            icon={<EditIcon />}
            onClick={() => {
              history.push(`/login`);
            }}
          />
          <BottomNavigationAction
            label="Login"
            value="login"
            icon={<AllInboxIcon />}
            onClick={() => {
              history.push("/login");
            }}
          />
          <BottomNavigationAction
            label="Login"
            value="login"
            icon={<PersonIcon />}
            onClick={() => {
              history.push("/login");
            }}
          />
        </>
      )}
    </BottomNavigation>
  );
};

export default Navigation;
