//import 부분
import React, { useEffect, useState } from "react";
import {history} from "../../../redux/configStore";

import styled from "styled-components";
import Color from "../../../shared/Color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";

import {depth_image} from "../../../shared/Image";
import {titleWord} from "../../../shared/Titles"

import {TreasureBoxModal} from "../../../modals";
import {Background, treasure, person} from "../../../img";
import Loading from "../../ETC/Loading"

import { actionCreators as userActions } from "../../../redux/modules/user";
import { actionCreators as permitAction } from "../../../redux/modules/permit";
import { useDispatch, useSelector } from "react-redux";

import Level from "./Level";
import NotSupport from "../../../modals/NotSupport"


const useStyles = makeStyles((theme) => ({
    arrow: {
      color: Color.black,
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
    const is_loading = useSelector(state => state.permit.is_loading)
    const is_support_modal = useSelector(state => state.permit.is_support_modal)
    const my_level = useSelector(state => state.user.user?.level)

    //이 값은 treasure를 확인하는 값을 가져왔을 때, 입력시켜준다. 
    // dispatch(permitAction.isTreasure(false))

    const openNotSupportModal = () => {
        dispatch(permitAction.showNotSupport(true))
      }

    const goBack=() => {
        history.push("/myfeed");
    }

    const openTreasure = () => {
        dispatch(permitAction.showModal(true));
    }

    useEffect(() => {
        dispatch(userActions.getUserSV()) //수심페이지에서 유저정보 다시 불러오기 
        dispatch(userActions.checkTreasureSV())
        dispatch(permitAction.showTreasureModal(false)) //보물 찾으러 가라는 모달 없애기
        setTimeout(() => {
            dispatch(permitAction.isLoading(false))
          }, 600);
        return() => {
            dispatch(permitAction.showModal(false)); // 나가면서 모달 닫아 놓기 
            dispatch(permitAction.showNewBadge(null)) // 새로운 뱃지의 값을 null로 만들어놓기
        }
    },[badgeCounts])



  return (
    <React.Fragment>
        <TreasureBoxModal is_open_treasure={is_open_treasure}/>
        <NotSupport is_support_modal={is_support_modal}/>

            {is_loading ? <Loading/> : 
            <>      
            <Wrapper>
                <Header>
                    <ArrowBackIcon 
                    onClick={() => {
                        goBack()
                    }} 
                    className={classes.arrow}/>
                    <HeaderText>잠수상태</HeaderText>
                    <div></div>
                </Header>

                <CategoryWrapper>
                    <Depth>나의 잠수상태</Depth>
                    <Ranking onClick={openNotSupportModal}>다이버 랭킹</Ranking>
                    <Tutorial onClick={openNotSupportModal}>잠수하는 법</Tutorial>
                    <CategoryBar/>
                </CategoryWrapper>
                    <MyLevel>{my_level}m에서 잠수중</MyLevel>
                <Level/>
                <Person src={person}/>
            </Wrapper>
            {is_treasure && <Treasure onClick={() => {openTreasure()}} src={treasure}/>}
            </>   
            }
        {new_badge && <NewBadge src={depth_image[new_badge]} className="scale-up-down-center"/>}
        {new_badge && <GetNewBadge className="scale-up-down-center">{titleWord[new_badge]}를 획득하셨습니다.</GetNewBadge>}
    </React.Fragment>
  );
};

export default MyDepth;

const CategoryWrapper = styled.div`
width:100%;
height:48px;
background:${Color.mainColor};
display:flex;
justify-content:space-around;
align-items:center;
position:relative;
`

const CategoryBar = styled.hr`
position:absolute;
width:23%;
border:1px solid black;
border-radius:1px;
bottom:-8px;
left:6%;
transition:0.5s ease-in-out;
`
const MyLevel = styled.div`
position: absolute;
top: 120px;
border: 1px solid #d7d3d3;
border-radius: 8px;
padding: 8px;
box-shadow: 0 1px 8px 0 rgb(0 0 0 / 12%);
`;
const Depth =styled.div`

`

const Ranking = styled.div`
color:${Color.quote};
`

const Tutorial = styled.div`
color:${Color.quote};
`

const Wrapper = styled.div`
width:100vw;
height:auto;
display:flex;
background: ${Color.black};
box-sizing:border-box;
flex-direction:column;
align-items:center;
justify-content:flex-start;
padding:56px 0px 0px 0px;
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
bottom:5vh;
cursor:pointer;

@media ${(props) => props.theme.mobile} {
    left:20vw;
}

@media ${(props) => props.theme.tablet} {
    margin-left:110px;
    max-width:12rem;
    max-height:12rem;
}
  
@media ${(props) => props.theme.desktop} {
    margin-left:110px;
    max-width:12rem;
    max-height:12rem;
}
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

const Header = styled.div`
width: 100%;
height: 56px;
display:flex;
justify-content:space-between;
align-items:center;
background-color: ${Color.mainColor};
position:fixed;
top:0px;
padding:0px 10px 0px 10px;
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
color:${Color.black};
margin-right:15px;
`

const NewBadge = styled.img`
width:200px;
height:200px;
position:fixed;
bottom:25vh;
z-index:10;

// @media screen and (max-width: 360px) { 
//     width:120px;
//     height:120px;
// }



@media ${(props) => props.theme.mobile} {
    left:20%;
}

@media ${(props) => props.theme.tablet} {
    margin-left:15px;
    bottom:25vh;
    width: 25rem;
}
  
@media ${(props) => props.theme.desktop} {
    margin-left:15px;
    bottom:25vh;
    width: 25rem;
}

`

const GetNewBadge = styled.div`
width:70vw;
height:8vh;
border-radius:20px;
background:${Color.black};
color:${Color.white};
display:flex;
justify-content:center;
align-items:center;
position:fixed;
bottom:8vh;
font-size:16px;

@media ${(props) => props.theme.mobile} {
    left:15vw;
}

@media ${(props) => props.theme.tablet} {
    margin-left:35px;
    width: 350px;
}
  
@media ${(props) => props.theme.desktop} {
    margin-left:35px;
    width: 350px;
}

`