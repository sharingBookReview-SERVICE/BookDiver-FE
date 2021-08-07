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
        <React.Fragment>
            <Image>

            </Image>
        </React.Fragment>
    )
}
const BookCollectionMain = (props) =>{
    return(
        <React.Fragment>
            <div>추천 컬렉션</div>
            <Swiper
            style ={{margin: "0px 0px 20px 20px"}}
            spaceBetween={1}
            slidesPerView={2}
            >
            <SwiperSlide>slide</SwiperSlide>
            <SwiperSlide>slide</SwiperSlide>
            <SwiperSlide>slide</SwiperSlide>
            <SwiperSlide>slide</SwiperSlide>
                </Swiper>
        </React.Fragment>
    )
}

const Image = styled.div`
width: 160px;
height: 160px;
background: pink;
`;

export default BookCollectionMain;
