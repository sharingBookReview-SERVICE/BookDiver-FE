
//import 부분
import React, {useEffect } from "react";
import { useParams } from "react-router";
import {Route} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {history} from "../../redux/configStore";
import { actionCreators as userActions } from "../../redux/modules/user";


import styled from "styled-components";
import Color from "../../shared/Color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";
import {FollowUser} from "../../elements";
import { ArrowBack } from "../../components";




const useStyles = makeStyles((theme) => ({
    arrow: {
      margin: "0px 30px"
    },
  }));
const OtherFollow = (props) =>{
    const dispatch = useDispatch();
    const classes = useStyles();
    const params = useParams();
    const location = props.location.pathname;
    const id = params.otherId;
    const nickname = useSelector(state=> state.user.my_feed.user?.nickname);
    const follow_list = useSelector(state=> state.user.follow_list);
    
    const goBack=() => {
        history.goBack();
    }

    useEffect(() => {
       if(location.includes("follower")){
          dispatch(userActions.getOtherFollowerListSV(id))
       }
       else{
           dispatch(userActions.getOtherFollowingListSV(id))
       }
    },[])
    return(  
    <React.Fragment>
        <Wrapper>
            <Container>
            <Header>

                <ArrowBackIcon 
                onClick={() => {
                    goBack()
                }} 
                className={classes.arrow}
              />

                <Route path="/following">
                    <HeaderText>{nickname}이 팔로잉 하는 다이버들</HeaderText>
                </Route> 
                <Route path="/follower">
                    <HeaderText>{nickname}을 팔로우 하는 다이버들</HeaderText>
                </Route>
                <div></div>
            </Header>
            {follow_list.map((user) => {
                return(
                    <FollowUser {...user} location={location} key={user?.id}/>
                )
            })}
            </Container>
        </Wrapper>


    </React.Fragment>
  );
};

export default OtherFollow;

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
  padding:80px 30px 0px 30px;
}

@media ${(props) => props.theme.tablet} {
  padding:80px 0px 0px 0px;
    width: 100%;
  }
  
  @media ${(props) => props.theme.desktop} {
    padding:80px 0px 0px 0px;
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
left:0px;
font-family: 'Noto Sans KR', sans-serif;

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
`