import React from 'react';
import styled from 'styled-components';
import { history } from "../../../redux/configStore";
import Color from "../../../shared/Color"

import Collection from './Collection';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper/core';
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";


SwiperCore.use([Mousewheel])



const CollectionSlider = ({collection_list, collection_name, desc}) => {

    const toTagCollectionList = ()=>{
        history.push('/collectionlist/tag')
    }

    const toCustomCollectionList = ()=>{
        history.push('/collectionlist/custom')
    }



    return (
        <Recommend>
            <DescBox>
                <Title>{collection_name}</Title>
                <Desc>{desc}</Desc>
            </DescBox>
            {/* <More }>더보기</More> */}
        <Swiper
        style ={{margin: "0px 0px 20px 20px"}}
        freeMode={true}
        spaceBetween={80}
        slidesPerView={2}
        breakpoints={{
            280:{
                spaceBetween:115,
            },
            320:{
                spaceBetween:70,
            },
            360:{
                spaceBetween:35,
            },
            375:{
                spaceBetween:20,
            },
            410:{
                spaceBetween:-15,
            },
            540:{
                spaceBetween:-145,
            },
            541:{
                spaceBetween:-25,
            }
        }}
        >
        {collection_list?.map((collection)=>{
            return(
                <SwiperSlide><Collection is_tag {...collection} key={collection.id}/></SwiperSlide>
            )
            })}
    </Swiper>
    <More 
        onClick={
        () => {collection_name === "최신 컬렉션" ? toCustomCollectionList() : toTagCollectionList()}}>
        목록으로 모아보기
    </More>
    </Recommend>
    );
};

export default CollectionSlider;

const Recommend = styled.div`
padding-top: 15px;
`;

const Title = styled.div`
font-family: "Noto Serif KR", serif;
font-weight : normal;
font-size:18px;
`;

const More = styled.div`
font-weight:500;
width:380px;
height:auto;
margin:20px 20px 0px 20px;
display:flex;
justify-content:center;
align-items:center;
padding:10px 0px;
border:1px solid ${Color.gray3};
border-radius:10px;
cursor:pointer;
transition:0.5s ease-in-out;

@media ${(props) => props.theme.mobile} {
    width: 91%;
}

:hover{
    background:${Color.line};
}
`;

const Desc = styled.div`
font-size:14px;
color:${Color.gray4};
cursor:pointer;
`

const DescBox = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:flex-start;
margin:20px 0px 10px 20px;
`
