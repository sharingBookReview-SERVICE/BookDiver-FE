import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import {history} from "../redux/configStore"

import Color from "../shared/Color"


const useStyles = makeStyles((theme) => ({

    goback:{
      cursor:"pointer",
    }
  }));


const ArrowBack = () => {
    const classes = useStyles();
    const goBack = () => {
        history.goBack()
    }
    return (
        <ArrowBox onClick={() => {goBack()}}>
            <ArrowBackIcon 
            className={classes.goback}/>
        </ArrowBox>
    );
};

export default ArrowBack;

const ArrowBox = styled.div`
width:40px;
height:40px;
display:flex;
justify-content:center;
align-items:center;
transition:0.5s ease-in-out;
margin-left:5px;
:hover{
  border-radius:40px;
  background:${Color.line};
}
`