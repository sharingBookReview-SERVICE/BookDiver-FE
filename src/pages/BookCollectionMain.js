import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import Color from "../shared/Color";


SwiperCore.use([Navigation, Pagination])
const Collection = (props) =>{
    return (
        <Outter>
           
            <Overlay/>
            <Image>
              <CollectionTitle>
                카페에서 가볍게 읽는 자기계발 에세이 모음
                </CollectionTitle>
            </Image>
        </Outter>
    )
}
const BookCollectionMain = (props) =>{
    return(
        <Container>
            <CollectionIntro>테마별로, 혹은 기분으로
                같은 무드의 도서만 모아서</CollectionIntro>
            <Recommend>
            <Title>추천 컬렉션</Title>
                <Swiper
                style ={{margin: "0px 0px 20px 20px"}}
                spaceBetween={1}
                slidesPerView={2}
                >
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
            </Swiper>
            </Recommend>
            <Recommend>
            <Title>최신 컬렉션</Title>
                <Swiper
                style ={{margin: "0px 0px 20px 20px"}}
                spaceBetween={1}
                slidesPerView={2}
                >
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
            </Swiper>
            </Recommend>
            <Recommend>
            <Title>나의 컬렉션</Title>
                <Swiper
                style ={{margin: "0px 0px 20px 20px"}}
                spaceBetween={1}
                slidesPerView={2}
                >
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
                <SwiperSlide><Collection/></SwiperSlide>
            </Swiper>
            </Recommend>
        </Container>
    )
}
const Container = styled.div`
background: ${Color.mainColor};
`;
const CollectionIntro = styled.p`
font-family: "Noto Serif KR", serif;
font-size: 21px;
width: 65%;
font-weight: bold;
padding: 44px 20px;
`;
const Outter = styled.div`
`;
const Overlay = styled.div`
width: 160px;
height: 160px;
border-radius: 12px;
background: black;
opacity: 30%;
position: absolute;
`
const Image = styled.div`
width: 160px;
height: 160px;
border-radius: 12px;
background-image:URL(https://i.pinimg.com/564x/1d/56/07/1d5607356a13ae7f8eb493bc2510dbf9.jpg);
background-size: cover;
`;
const CollectionTitle = styled.p`
font-family: "Noto Serif KR", serif;
color: ${Color.white};
margin: 0px;
position: absolute;
top: 35%;
left: 2.5%;
width: 80%;
`;

const Recommend = styled.div`
padding-bottom: 20px;
`;
const Title = styled.div`
margin: 20px;
font-family: "Noto Serif KR", serif;
font-weight : bold;
`;

export default BookCollectionMain;
