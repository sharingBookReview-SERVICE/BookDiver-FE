//import 부분
import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import {Route} from "react-router-dom"
import {history} from "../redux/configStore";

import styled from "styled-components";
import Color from "../shared/Color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";
import FollowUser from "../elements/FollowUser";

import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
    arrow: {
      position: "absolute",
      left:"20px",
      top: "30px",
      color: Color.black,
      cursor:"pointer",
    },
  }));

const Follow = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const params = useParams();
    const location = props.location.pathname
    const followList = useSelector(state => state.user.follow_list);
 
    const goBack=() => {
        history.goBack();
    }

    useEffect(() => {
        if(location === "/follower"){
            dispatch(userActions.getFollowerListSV())
        }else{
            dispatch(userActions.getFollowingListSV())
        }
    },[])

//작성하기
  return (
    <React.Fragment>
        <Wrapper>
            <Container>
            <Header>

                <ArrowBackIcon 
                onClick={() => {
                    goBack()
                }} 
                className={classes.arrow}/>

                <Route path="/following">
                    <HeaderText>내가 팔로잉 하는 다이버들</HeaderText>
                </Route> 
                <Route path="/follower">
                    <HeaderText>나를 팔로우 하는 다이버들</HeaderText>
                </Route>

            </Header>
            {followList.map((user) => {
                return(
                    <FollowUser {...user} location={location} key={user.id}/>
                )
            })}
            </Container>
        </Wrapper>


    </React.Fragment>
  );
};

export default Follow;

const Wrapper = styled.div`
width:100vw;
height:auto;
display:flex;
background: ${Color.mainColor};
box-sizing:border-box;

@media ${(props) => props.theme.tablet} {
    width: 100%;
}
  
@media ${(props) => props.theme.desktop} {
    width: 100%;
}

`

const Container = styled.div`
width:100vw;
height:auto;
min-height:100vh;
flex-direction:column;
align-items:center;
justify-content:flex-start;
padding:80px 30px 0px 0px;
box-sizing:border-box;

@media ${(props) => props.theme.tablet} {
    width: 100%;
  }
  
  @media ${(props) => props.theme.desktop} {
    width: 100%;
  }
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

@media ${(props) => props.theme.tablet} {
    width: 420px;
  }
  
  @media ${(props) => props.theme.desktop} {
    width: 420px;
  }

`

const HeaderText = styled.div`
font-size:16px;
color:${Color.black};
`