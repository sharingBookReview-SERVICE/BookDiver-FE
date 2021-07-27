import React from "react";
import styled from "styled-components";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PersonIcon from "@material-ui/icons/Person";
import ListIcon from "@material-ui/icons/List";

const Navigation = (props) => {

  return (
    <BottomNavigation style={{ background: "#fafafa",position:"fixed", bottom:"0", width:"100%" }}>
      <BottomNavigationAction
        label="Write"
        value="write"
        icon={<AddIcon />}
      />
      <BottomNavigationAction
        label="List"
        value="list"
        icon={<ListIcon />}
      />
      <BottomNavigationAction
        label="Login"
        value="login"
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );
};

export default Navigation;