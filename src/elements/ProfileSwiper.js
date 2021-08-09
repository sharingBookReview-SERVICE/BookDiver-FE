import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import styled from "styled-components"
import Color from "../shared/Color"
import { makeStyles } from "@material-ui/core/styles";

import Library from "../img/alfons-morales-YLSwjSy7stw-unsplash.jpg" 
import Europe from "../img/alex-vasey-3lxrM5yvkcI-unsplash.jpg"
import Money from "../img/sharon-mccutcheon-8lnbXtxFGZw-unsplash.jpg"

const useStyles = makeStyles((theme) => ({
    swiper: {
      width:"90px",
      margin:"0px 5px 0px 0px",
    },
  }));


const ProfileSwiper =(props) => {

    const classes = useStyles();
    const {title} = props;
  
  return (
    <SwiperWrapper>
    <SwiperTitle>{title}</SwiperTitle>
    <Swiper 
    className="mySwiper"
    spaceBetween={-35}
    slidesPerView={3}
    slidesPerGroup={1}>
        <SwiperSlide className={classes.swiper}>
            <Content url={Library}>
                <Overlay>
                    <Title>
                        비오는 날 읽기 좋은 소설 모음
                    </Title>
                </Overlay>
            </Content>
        </SwiperSlide>
        <SwiperSlide>
            <Content url={Europe}>
                <Overlay>
                    <Title>
                        유럽 배낭여행 다니며 읽기 좋은 에세이 모음
                    </Title>
                </Overlay>
            </Content>
        </SwiperSlide>
        <SwiperSlide>
            <Content url={Money}>
                <Overlay>
                    <Title>
                        비오는 날 읽기 좋은 소설 모음
                    </Title>
                </Overlay>
            </Content>
        </SwiperSlide>
        <SwiperSlide>
            <Content url={Library}>
                <Overlay>
                    <Title>
                        비오는 날 읽기 좋은 소설 모음
                    </Title>
                </Overlay>
            </Content>
        </SwiperSlide>
  </Swiper>
  </SwiperWrapper>
  )
}

export default ProfileSwiper;

const SwiperWrapper = styled.div`
width:auto;
height:auto;
`

const SwiperTitle = styled.div`
color:${Color.black};
font-size:16px;
font-family: "Noto Serif KR", serif;
font-weight:bold;
display:flex;
justify-content:flex-start;
margin-bottom:6px;
`

const Content = styled.div`
width:100px;
height:100px;
background-image: url(${(props) => props.url});
border-radius:10px;
border:1px solid ${Color.black};
background-size: cover;
z-index:3;
overflow:hidden;
mix-blend-mode: darken;
`

const Overlay = styled.div`
width:100%;
height:100%;
background: ${Color.overlay};
z-index:4;
`

const Title = styled.div`
width:100%;
height:100%;
color:white;
font-family: "Noto Serif KR", serif;
display:flex;
align-items:center;
text-align:center;
z-index:5;
font-weight:600;
`