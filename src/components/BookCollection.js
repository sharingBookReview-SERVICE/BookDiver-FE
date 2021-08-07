import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import Color from "../shared/Color";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
        <Collection>
            <UserName><InsertEmoticonIcon/>도비는옷이필요해</UserName>
            <CollectionTitle>
              <TitleText>주니어 UX 디자이너가 커리어를 시작 할... </TitleText>
              <LikeCnt> <FavoriteIcon/> 10개</LikeCnt>
            </CollectionTitle>
          <Swiper
            style ={{margin: "0px 0px 20px 20px"}}
            spaceBetween={1}
            slidesPerView={4}
          >
            <SwiperSlide><BookCard/></SwiperSlide>
            <SwiperSlide><BookCard/></SwiperSlide>
            <SwiperSlide><BookCard/></SwiperSlide>
            <SwiperSlide><BookCard/></SwiperSlide>
          </Swiper>
        </Collection>
      )
}



const Book = styled.div`
display: flex;
flex-direction: column;
align-items: center;

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
font-size: 0.5em;
color : ${Color.white};
padding: 0px 10px 0px 0px;
margin: 0;
`;

const CollectionTitle = styled.div`
display: flex;
padding: 16px;
font-size: 14px;
`;

const TitleText = styled.div`
font-size: 14px;
margin: 0px 20px 0px 0px;
`;

const LikeCnt = styled.div`
display: flex;
`;

const UserName = styled.div`
padding: 16px 16px 5px 16px;
font-size: 14px;
`;

const Collection = styled.div`
color : ${Color.white};
width: 100%;
height: auto;
font-weight: bold;
margin: 0px 0px 30px 0px;
`;
export default BookCollection;