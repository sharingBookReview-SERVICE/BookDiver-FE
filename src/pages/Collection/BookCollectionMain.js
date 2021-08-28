import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";

//스와이퍼
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper/core';
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
  


//컴포넌트
import {Collection} from "../../elements";
import WhatCollection from "./component/WhatCollection"
import CollectionSlider from "./component/CollectionSlider"
//css
import Color from "../../shared/Color";
// import bookCollectionLogo from "../../img/bookCollectionLogo.svg"


//action
import  { actionCreators as collectionActions } from "../../redux/modules/collection";
import { actionCreators as permitActions } from "../../redux/modules/permit";
import { useDispatch, useSelector } from "react-redux";


import ReactGA from "react-ga";
SwiperCore.use([Mousewheel])


//북컬렉션 페이지
const BookCollectionMain = (props) =>{
    const dispatch=  useDispatch();

    const tag_collection_list = useSelector(state=> state.collection.tag_collection_list);
    const custom_collection_list = useSelector(state=> state.collection.custom_collection_list);

    const is_login = useSelector(state=> state.user.is_login);

    React.useEffect(()=>{
        dispatch(permitActions.showNav(true))
        dispatch(collectionActions.getTagCollectionsSV());
        dispatch(collectionActions.getCustomCollectionsSV());
    },[])


    return(
        <Wrapper>
        <Container>
            <LogoBox>
                {/* <Logo src={bookCollectionLogo}/> */}
            </LogoBox>

            <WhatCollection/>

            <CollectionSlider 
                collection_list={custom_collection_list} 
                collection_name={"최신 컬렉션"}
                desc={"다이버들이 만든 따끈따끈한 북컬렉션"}
            />

            <CollectionSlider 
                collection_list={tag_collection_list} 
                collection_name={"태그 추천 컬렉션"}
                desc={"작성된 리뷰 태그에 관련된 컬렉션을 모아봤어요."}
            />


           {/* {
               is_login &&  <MakeBtn onClick={()=>{
                   history.push('/makeCollection')
                   ReactGA.event({
                    category: "Button",
                    action: "make collection",
                    label: "collection",
                  });
                }}>북컬렉션 만들기</MakeBtn>
           } */}
           
        </Container>
        </Wrapper>
    )
}
const LogoBox = styled.div`
width:100%;
height:56px;
display:flex;
justify-content:flex-start;
align-items:center;
padding: 0px 20px;
`

const Logo = styled.img`
width:auto;
height:auto;
max-width:150px;
max-height:24px;
`

const Wrapper = styled.div`
width:100vw;
height:auto;
background: ${Color.mainColor};
box-sizing:border-box;
position: absolute;
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
min-height:130vh;
padding-bottom: 100px;

@media ${(props) => props.theme.tablet} {
    width: 100%;
    min-height:100vh;
  }
  
  @media ${(props) => props.theme.desktop} {
    width: 100%;
    min-height:100vh;
  }
`

const MakeBtn = styled.div`
cursor:pointer;
height: 46px;
background: ${Color.black};
border-radius: 12px;
position: fixed;
bottom: 70px;
z-index: 1000;
display:flex;
justify-content:center;
align-items:center;
color: ${Color.mainColor};
font-weight:500;
text-align: center;
line-height: 56px;
font-size: 16px;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
transition: 0.3s ease-in-out;

:hover{
    transform:translateY(-5px);
}

@media ${(props) => props.theme.mobile} {
    width: 50%;
    left:25%;
}
  

@media ${(props) => props.theme.tablet} {
    margin-left:135px;
    width: 150px;
    position: fixed;
  }

  @media ${(props) => props.theme.desktop} {
    margin-left:135px;
    width: 150px;
    position: fixed;
  }

`;


export default BookCollectionMain;




