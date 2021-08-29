import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import styled from "styled-components"

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

// import Swiper core and required modules
import SwiperCore, {
  Navigation
} from 'swiper';

import {tutorials} from "../shared/Image"
import _ from "lodash";

// install Swiper modules
SwiperCore.use([Navigation]);

const Tutorial = () => {

    console.log(tutorials[0])

    return (
        <Wrapper>
            <Image url={tutorials[0]}/>
        {/* <Swiper
        slidesPerView={1} 
        navigation={true} className="mySwiper">

            {tutorials.map((url,idx) => {
            return( 
            <SwiperSlide>
                <ImageContainer url={url}></ImageContainer>
            </SwiperSlide>)
            })}

        </Swiper> */}
        </Wrapper>
    );
};

export default Tutorial;

const Image = styled.div`
width:100%;
height:100%;
background-image: url(${(props) => props.url});
background-size:cover;
background-position:center center;
`

const ImageContainer = styled.div`
width:100%;
height:100%:
background-image: url(${(props) => props.url});
background-size:cover;
`


const Wrapper = styled.div`
width:100%;
height:100%;

`
