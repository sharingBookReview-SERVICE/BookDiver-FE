import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import Color from "../shared/Color";
import { history } from "../redux/configStore";
import Collection from '../elements/Collection';


SwiperCore.use([Navigation, Pagination])

const BookCollectionMain = (props) =>{
    return(
        <Container>
            <CollectionIntro>테마별로, 혹은 기분으로
                같은 무드의 도서만 모아서</CollectionIntro>
            <Recommend>
                <TitleWrapper>
                    <Title>추천 컬렉션</Title>
                    <More onClick={()=>{history.push('/collectionlist')}}>더보기</More>
                 </TitleWrapper>
                <Swiper
                style ={{margin: "0px 0px 20px 20px"}}
                spaceBetween={-50}
                slidesPerView={2}
                >
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
            </Swiper>
            </Recommend>
            <Recommend>
            <TitleWrapper>
                <Title>최신 컬렉션</Title>
                <More>더보기</More>
            </TitleWrapper>
                <Swiper
                style ={{margin: "0px 0px 20px 20px"}}
                spaceBetween={-50}
                slidesPerView={2}
                >
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
            </Swiper>
            </Recommend>
            <Recommend>
            <TitleWrapper>
                <Title>나의 컬렉션</Title>
                <More>더보기</More>
            </TitleWrapper>
                <Swiper
                style ={{margin: "0px 0px 20px 20px"}}
                spaceBetween={-50}
                slidesPerView={2}
                >
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
            </Swiper>
            </Recommend>
            <MakeBtn onClick={()=>{history.push('/makeCollection')}}>나만의 북 컬렉션 만들기</MakeBtn>
        </Container>
    )
}
const Container = styled.div`
background: ${Color.mainColor};
`;
const MakeBtn = styled.div`
width: 90%;
height: 56px;
background: black;
border-radius: 12px;
position: fixed;
bottom: 10%;
left: 5%;
z-index: 1000;
color: ${Color.mainColor};
text-align: center;
line-height: 56px;
font-size: 20px;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const CollectionIntro = styled.p`
font-family: "Noto Serif KR", serif;
font-size: 21px;
width: 65%;
font-weight: bold;
padding: 44px 20px;
`;


const Recommend = styled.div`
padding-bottom: 20px;
`;
const TitleWrapper = styled.div`
display: flex;
justify-content: space-between;
margin: 20px;
`;
const Title = styled.div`
font-family: "Noto Serif KR", serif;
font-weight : bold;
`;
const More = styled.div`
font-family: "Noto Serif KR", serif;
font-weight : bold;
`;

export default BookCollectionMain;
