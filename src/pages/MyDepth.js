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
import Background from "../img/background.png"
import {images} from "../shared/Image"
import person from "../img/person.png"
import ameba from "../img/꿈꾸는 아메바-120px.svg"
import whiteFish from "../img/귀여운 흰동가리-120px.svg"
import TreasureBoxModal from "../modals/TreasureBoxModal"
import treasure from "../img/보물상자.png"

import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as permitAction } from "../redux/modules/permit";
import { useDispatch, useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
    arrow: {
      color: Color.white,
    },
  }));

const MyDepth = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const is_open_treasure = useSelector(state => state.permit.is_modal)
    const is_treasure = useSelector(state => state.permit.is_treasure)
    const is_new_badge = useSelector(state => state.permit.new_badge)
    const badgeCounts = useSelector(state => state.user.user.own_image.length)
    const userBadges = useSelector(state => state.user.user.own_image)
    console.log(badgeCounts)
 
    const goBack=() => {
        history.goBack();
    }

    const openTreasure = () => {
        dispatch(permitAction.showModal(true));
    }

    useEffect(() => {
        dispatch(permitAction.showNav(false));
        dispatch(permitAction.isPadding(false));
        dispatch(permitAction.showTreasureModal(false))
        return() => {
            dispatch(permitAction.showNav(true));
            dispatch(permitAction.isPadding(true));
            dispatch(permitAction.showModal(false));
        }
    },[])

    


//작성하기
  return (
    <React.Fragment>
        <Wrapper>
            <Image src={Background}/>
            <Header>

                <ArrowBackIcon 
                onClick={() => {
                    goBack()
                }} 
                className={classes.arrow}/>
                <HeaderText>나의 수심 깊이</HeaderText>
                <Help onClick={()=>{history.push('/levelhelp')}}>도움말</Help>

            </Header>

            {badgeCounts > 0 && <Badge src={images[userBadges[0]]} top={"10vh"} left={"10vw"} />}
            {badgeCounts > 1 && <Badge src={images[userBadges[1]]} top={"60vh"} left={"60vw"}/>}
            {badgeCounts > 2 && <Badge src={images[userBadges[2]]} top={"120vh"} left={"20vw"}/>}
            {badgeCounts > 3 && <Badge src={images[userBadges[3]]} top={"180vh"} left={"30vw"}/>}
            {badgeCounts > 4 && <Badge src={images[userBadges[4]]} top={"240vh"} left={"10vw"}/>}
            {badgeCounts > 5 && <Badge src={images[userBadges[5]]} top={"300vh"} left={"60vw"}/>}
            <Person src={person}/>


        </Wrapper>
        {is_new_badge && <NewBadge src={images.level10[1]} className={"scale-up-down-center"}/>}
        {is_new_badge && <GetNewBadge className={"scale-up-down-center"}>'귀여운 흰동가리'를 획득하셨습니다.</GetNewBadge>}
        {is_treasure && <Treasure onClick={() => {openTreasure()}} src={treasure}/>}        
        {is_open_treasure && <TreasureBoxModal />}
    </React.Fragment>
  );
};

export default MyDepth;

const Wrapper = styled.div`
width:100vw;
height:auto;
display:flex;
background: ${Color.black};
box-sizing:border-box;
flex-direction:column;
align-items:center;
justify-content:flex-start;
padding:80px 0px 0px 0px;
background-image:url(${Background});
background-size: contain;
background-repeat: no-repeat;
`

const Treasure = styled.img`
width:auto;
height:auto;
max-width:40vw;
max-height:40vh;
position:fixed;
bottom:3vh;
left:30vw;
`

const Badge = styled.img`
width:auto;
height:auto;
max-width:100px;
max-height:100px;
position:absolute;
top:${(props) => props.top};
left: ${(props) => props.left};
`

const Person = styled.img`
width:auto;
height:auto;
max-width:40vw;
max-height:40vh;
position:fixed;
top:20vh;
left:34vw;
`

const Image = styled.img`
width:auto;
height:auto;
max-width:99%;
max-height:100%;
opacity:0;
`

const Help = styled.div`
font-size:16px;
background:transparent;
color:${Color.white};
font-weight:bold;
`

const Header = styled.div`
width: 100%;
height: 80px;
display:flex;
justify-content:space-between;
align-items:center;
background-color: ${Color.black};
position:fixed;
top:0px;
left:0px;
padding:0px 10px 0px 30px;
box-sizing:border-box;
z-index:10;
`

const HeaderText = styled.div`
font-size:16px;
color:${Color.white};
`

const NewBadge = styled.img`
width:auto;
height:auto;
max-width:50vw;
max-height:50vh;
position:fixed;
bottom:25vh;
left:36vw;
`

const GetNewBadge = styled.div`
width:70vw;
height:12vh;
border-radius:20px;
background:${Color.black};
color:${Color.white};
display:flex;
justify-content:center;
align-items:center;
position:fixed;
bottom:5vh;
left:15vw;
`