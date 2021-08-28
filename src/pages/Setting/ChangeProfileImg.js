//import 부분
import React, {useEffect } from "react";
import {Route} from "react-router-dom"
import {history} from "../../redux/configStore";

import styled from "styled-components";
import Color from "../../shared/Color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";
import {OwnImages} from "../../elements"

import { actionCreators as userActions } from "../../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
    arrow: {
      color: Color.black,
      cursor:"pointer",
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

box-sizing:border-box;

@media ${(props) => props.theme.mobile} {
    padding:80px 20px 0px 20px;
    width: 100%;
}

@media ${(props) => props.theme.tablet} {
    padding-top:56px;
    width: 100%;
}
  
@media ${(props) => props.theme.desktop} {
    padding-top:56px;
    width: 100%;
}

`

const Header = styled.div`
width: 100%;
height: 56px;
display:flex;
justify-content:flex-start;
padding-left:20px;
box-sizing:border-box;
align-items:center;
background-color: ${Color.mainColor};
position:fixed;
top:0px;

font-family: "Noto Serif KR", serif;

@media ${(props) => props.theme.mobile} {
    width: 420px;
    left:0px;
}

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