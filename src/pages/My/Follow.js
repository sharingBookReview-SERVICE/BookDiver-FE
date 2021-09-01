//import 부분
import React, {useEffect } from "react";
import { useParams } from "react-router";
import {Route} from "react-router-dom"
import {history} from "../../redux/configStore";

import styled from "styled-components";
import Color from "../../shared/Color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";

import { actionCreators as userActions } from "../../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";

import {FollowUser} from "../../elements";


const useStyles = makeStyles((theme) => ({
    arrow: {
      margin: "0px 20px",
      cursor:"pointer",
    },
  }));

const Follow = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
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
            <Header   
            onClick={() => {
                    goBack()
                }} >

                <ArrowBackIcon   className={classes.arrow}/>

                <Route path="/following">
                    <HeaderText>내가 팔로잉 하는 다이버들</HeaderText>
                </Route> 
                <Route path="/follower">
                    <HeaderText>나를 팔로우 하는 다이버들</HeaderText>
                </Route>
                <div></div>
            </Header>
            <FollowWrapper>
            {followList.map((user) => {
                return(
                    <FollowUser {...user} location={location} key={user?.id}/>
                )
            })}
             </FollowWrapper>
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

box-sizing:border-box;

@media ${(props) => props.theme.mobile} {
  padding: 50px 20px 0px 20px;
}

@media ${(props) => props.theme.tablet} {
  padding:50px 0px 0px 0px;
    width: 100%;
  }
  
  @media ${(props) => props.theme.desktop} {
    padding:50px 0px 0px 0px;
    width: 100%;
  }
`

const Header = styled.div`
width: 100%;
height: 56px;
display:flex;
align-items:center;
background-color: ${Color.mainColor};
position:fixed;
top:0px;
border-bottom: 4px solid #d7d3d3;
font-family: 'Noto Sans KR', sans-serif;
@media ${(props) => props.theme.mobile} {
  left: 0px;
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
width:100%;
text-align:center;
position: absolute;
`

const FollowWrapper = styled.div`
@media ${(props) => props.theme.tablet} {
  padding-left:20px;
  padding-right:20px;
  }
  
  @media ${(props) => props.theme.desktop} {
    padding-left:20px;
    padding-right:20px;
  }
`;