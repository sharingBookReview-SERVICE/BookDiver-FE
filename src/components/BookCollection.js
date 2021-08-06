import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
SwiperCore.use([Navigation, Pagination])

const BookCard = (props) =>{
    return(
        <Book>
            <BookImage>bookCard</BookImage>
            <BookTitle>기획의 정석</BookTitle>
        </Book>
       
    )
}
const BookCollection = (props)=>{
    return(
        <div>
            <div>도비는옷이필요해</div>
            <div>주니어 UX 디자이너가 커리어를 시작 할... </div>
          <Swiper
            spaceBetween={1}
            slidesPerView={4}
          >
            <SwiperSlide><BookCard/></SwiperSlide>
            <SwiperSlide><BookCard/></SwiperSlide>
            <SwiperSlide><BookCard/></SwiperSlide>
            <SwiperSlide><BookCard/></SwiperSlide>
          </Swiper>
        </div>
      )
}

const Book = styled.div`
display: flex;
flex-direction: column;
`;
const BookImage = styled.div`
width: 90px;
height: 120px;
flex-grow: 0;
border-radius: 12px;
background: black;
`;
const BookTitle = styled.p`

`;

export default BookCollection;