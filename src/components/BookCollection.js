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
            <BookImage></BookImage>
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
            style ={{margin: "0px 0px 0px 20px"}}
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
height: 0;
flex-grow: 0;
border-radius: 12px;
background: black;
width: 90%;
padding-bottom: 123%;
margin: 10%;
background-image:URL(https://i.pinimg.com/564x/2d/d4/ad/2dd4adce7f6823094e71c600ead7397e.jpg);
background-size: cover;
`;
const BookTitle = styled.p`

`;

export default BookCollection;