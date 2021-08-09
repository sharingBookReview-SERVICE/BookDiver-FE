//import 부분
import React, { useRef, useState } from "react";

import styled from "styled-components";
import Color from "../shared/Color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";
import OneCollection from "../elements/OneCollection";

const useStyles = makeStyles((theme) => ({
    arrow: {
      position: "absolute",
      left:"20px",
      top: "30px",
      color: Color.black,
    },
  }));

const ReviewWrite = (props) => {
    const classes = useStyles();


//작성하기
  return (
    <React.Fragment>
        <Wrapper>
            <Header>
                <ArrowBackIcon className={classes.arrow}/> 
                <HeaderText>추천 컬렉션</HeaderText>
            </Header>
            
            <OneCollection/>
            <OneCollection/>
            <OneCollection/>
            <OneCollection/>
            <OneCollection/>
            <OneCollection/>
            <OneCollection/>
            <OneCollection/>

        </Wrapper>


    </React.Fragment>
  );
};

export default ReviewWrite;

const Wrapper = styled.div`
width:100vw;
height:auto;
display:flex;
flex-direction:column;
align-items:center;
justify-content:flex-start;
background: ${Color.mainColor};
padding:80px 15px 0px 15px;
box-sizing:border-box;
`

const Header = styled.div`
width: 100%;
height: 80px;
display:flex;
justify-content:center;
align-items:center;
background-color: ${Color.mainColor};
position:fixed;
top:0px;
font-family: "Noto Serif KR", serif;
`

const HeaderText = styled.div`
font-size:16px;
color:${Color.black};
`