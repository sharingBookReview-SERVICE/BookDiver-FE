import React from "react";
import styled from "styled-components";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PersonIcon from "@material-ui/icons/Person";
import ListAltIcon from '@material-ui/icons/ListAlt';
import AllInboxIcon from '@material-ui/icons/AllInbox';

const Navigation = (props) => {

  return (
    <BottomNavigation style={{ background: "#fafafa",position:"fixed", bottom:"0", width:"100%" }}>
      <BottomNavigationAction
        label="Write"
        value="write"
        icon={<ListAltIcon /> }
      />
      <BottomNavigationAction
        label="List"
        value="list"
        icon={<AddIcon />}
      />
      <BottomNavigationAction
        label="Login"
        value="login"
        icon={<AllInboxIcon />}
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