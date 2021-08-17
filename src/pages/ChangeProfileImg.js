//import 부분
import React, {useEffect } from "react";
import {Route} from "react-router-dom"
import {history} from "../redux/configStore";

import styled from "styled-components";
import Color from "../shared/Color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";
import OwnImages from "../elements/OwnImages"

import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
    arrow: {
      position: "absolute",
      left:"20px",
      top: "30px",
      color: Color.black,
    },
  }));

const ChangeProfileImg = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const userId = useSelector(state => state.user.user._id)
    const ownImages = useSelector(state => state.user.user.own_image)

 
    const goBack=() => {
        history.goBack();
    }


    useEffect(() => {
        if(userId){
            dispatch(userActions.getUserSV(userId))   
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
            {ownImages?.map((image, idx) => {
                return(
                    <OwnImages image={image} key={idx} level={idx} />
                )
            })}
            </Container>
        </Wrapper>


    </React.Fragment>
  );
};

export default ChangeProfileImg;

const Wrapper = styled.div`
width:100vw;
height:auto;
display:flex;
background: ${Color.mainColor};
box-sizing:border-box;
`

const Container = styled.div`
width:100vw;
height:auto;
min-height:100vh;
flex-direction:column;
align-items:center;
justify-content:flex-start;
padding:80px 30px 0px 30px;
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
left:0px;
font-family: "Noto Serif KR", serif;
`

const HeaderText = styled.div`
font-size:16px;
color:${Color.black};
`