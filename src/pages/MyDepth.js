//import 부분
import React, { useEffect } from "react";
import {history} from "../redux/configStore";

import styled from "styled-components";
import Color from "../shared/Color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";
import Background from "../img/background.png"
import {images} from "../shared/Image"
import person from "../img/person.png"
import TreasureBoxModal from "../modals/TreasureBoxModal"
import treasure from "../img/보물상자.png"
import {titles} from "../shared/Titles"

import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as permitAction } from "../redux/modules/permit";
import { useDispatch, useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
    arrow: {
      color: Color.white,
      cursor:"pointer",
    },
  }));

const MyDepth = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const is_open_treasure = useSelector(state => state.permit.is_modal)
    const is_treasure = useSelector(state => state.permit.is_treasure)
    const new_badge = useSelector(state => state.permit.new_badge)
    const badgeCounts = useSelector(state => state.user.user.own_image?.length)
    const userBadges = useSelector(state => state.user.user.own_image)


    //이 값은 treasure를 확인하는 값을 가져왔을 때, 입력시켜준다. 
    // dispatch(permitAction.isTreasure(false))

    const goBack=() => {
        history.goBack();
    }

    const openTreasure = () => {
        dispatch(permitAction.showModal(true));
    }

    useEffect(() => {
        dispatch(userActions.checkTreasureSV())
        dispatch(permitAction.showNav(false));  //네비게이션 없애기 
        dispatch(permitAction.isPadding(false));  //패딩 값을 없애기 
        dispatch(permitAction.showTreasureModal(false)) //보물 찾으러 가라는 모달 없애기 
        return() => {
            dispatch(permitAction.showNav(true)); //나가면서 네비게이션 보이게 하기 
            dispatch(permitAction.isPadding(true)); //나가면서 패딩 돌려놓기 
            dispatch(permitAction.showModal(false)); // 나가면서 모달 닫아 놓기 
            dispatch(permitAction.showNewBadge(null)) // 새로운 뱃지의 값을 null로 만들어놓기
        }
    },[badgeCounts])

//작성하기
  return (
    <React.Fragment>
        {is_open_treasure && <TreasureBoxModal />}
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

            {badgeCounts > 0 && <Badge src={images[userBadges[0]]} top={"5rem"} left={"3rem"} />}
            {badgeCounts > 1 && <Badge src={images[userBadges[1]]} top={"28rem"} left={"15rem"}/>}
            {badgeCounts > 2 && <Badge src={images[userBadges[2]]} top={"55rem"} left={"5rem"}/>}
            {badgeCounts > 3 && <Badge src={images[userBadges[3]]} top={"80rem"} left={"14rem"}/>}
            {badgeCounts > 4 && <Badge src={images[userBadges[4]]} top={"110rem"} left={"4rem"}/>}
            {badgeCounts > 5 && <Badge src={images[userBadges[5]]} top={"130rem"} left={"16rem"}/>}
            <Person src={person}/>


        </Wrapper>
        {new_badge && <NewBadge src={images[new_badge]} className={"scale-up-down-center"}/>}
        {new_badge && <GetNewBadge className={"scale-up-down-center"}>{titles[new_badge]}를 획득하셨습니다.</GetNewBadge>}
        {is_treasure && <Treasure onClick={() => {openTreasure()}} src={treasure}/>}        
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

@media ${(props) => props.theme.tablet} {
    width: 100%;
}
  
@media ${(props) => props.theme.desktop} {
    width: 100%;
}

`

const Treasure = styled.img`
width:auto;
height:auto;
max-width:40vw;
max-height:40vh;
position:fixed;
bottom:3vh;

@media ${(props) => props.theme.mobile} {
    left:30vw;
}

@media ${(props) => props.theme.tablet} {
    width: 100%;
}
  
@media ${(props) => props.theme.desktop} {
    width: 100%;
}
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
position:fixed;
top:20vh;

@media ${(props) => props.theme.mobile} {
    width:auto;
    height:auto;
    max-width:40vw;
    max-height:40vh;
    left:34vw;

}

@media ${(props) => props.theme.tablet} {
    width:auto;
    height:auto;
    max-width:250px;
    max-height:250px;

}
  
@media ${(props) => props.theme.desktop} {
    width:auto;
    height:auto;
    max-width:250px;
    max-height:250px;

}
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
cursor:pointer;
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
padding:0px 10px 0px 30px;
box-sizing:border-box;
z-index:10;

@media ${(props) => props.theme.tablet} {
    width: 420px;
}
  
@media ${(props) => props.theme.desktop} {
    width: 420px;
}

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