import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";

//스와이퍼
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

//css
import Color from "../shared/Color";


//action
import collection, { actionCreators as collectionActions } from "../redux/modules/collection";
import { useDispatch, useSelector } from "react-redux";



SwiperCore.use([Navigation, Pagination])
//컬렉션 하나
const Collection = (props) =>{
    return (
        <Outter onClick={()=>{history.push('/collectiondetail')}}>
            <Image url = {props.image}>
                <Overlay>
                <CollectionTitle>{props.is_tag? `#${props.name}`: `${props.name}`}</CollectionTitle>
                </Overlay>
            </Image>
        </Outter>
    )
}

Collection.defaultProps ={
    image:"https://i.pinimg.com/564x/c0/79/44/c07944cff5a97bfa3274236cabee29c7.jpg"
}
//북컬렉션 페이지
const BookCollectionMain = (props) =>{
    const dispatch=  useDispatch();

    const tag_collection_list = useSelector(state=> state.collection.tag_collection_list);
    const custom_collection_list = useSelector(state=> state.collection.custom_collection_list);

    React.useEffect(()=>{
        dispatch(collectionActions.getTagCollectionsSV());
        dispatch(collectionActions.getCustomCollectionsSV());
    },[])
    return(
        <Container>
            <CollectionIntro>테마별로, 혹은 기분으로
                같은 무드의 도서만 모아서</CollectionIntro>
            <Recommend>
                <TitleWrapper>
                    <Title>태그 기반 추천 컬렉션</Title>
                    <More onClick={()=>{history.push('/collectionlist')}}>더보기</More>
                 </TitleWrapper>
                <Swiper
                style ={{margin: "0px 0px 20px 20px"}}
                spaceBetween={-20}
                slidesPerView={2}
                >
                {
                    tag_collection_list?.map((collection)=>{
                        return(
                            <SwiperSlide><Collection is_tag {...collection} key={collection.id}/></SwiperSlide>
                        )
                      
                    })
                }
            
            </Swiper>
            </Recommend>
            <Recommend>
            <TitleWrapper>
                <Title>최신 컬렉션</Title>
                <More>더보기</More>
            </TitleWrapper>
                <Swiper
                style ={{margin: "0px 0px 20px 20px"}}
                spaceBetween={-20}
                slidesPerView={2}
                >
               {
                    custom_collection_list?.map((collection)=>{
                        return(
                            <SwiperSlide><Collection {...collection} key={collection.id}/></SwiperSlide>
                        )
                      
                    })
                }
            </Swiper>
            </Recommend>
           
            <MakeBtn onClick={()=>{history.push('/makeCollection')}}>나만의 북 컬렉션 만들기</MakeBtn>
        </Container>
    )
}
const Container = styled.div`
background: ${Color.mainColor};
padding-bottom: 100px;
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
const Outter = styled.div`
`;
const Overlay = styled.div`
width: 180px;
height: 180px;
border-radius: 12px;
background: ${Color.overlay};
// position: absolute;
display:flex;
justify-content:center;
align-items:center;
`
const Image = styled.div`
width: 180px;
height: 180px;
border-radius: 12px;
background-image:URL( ${(props)=> (props.url)});
background-size: cover;
`;
const CollectionTitle = styled.p`
font-family: "Noto Serif KR", serif;
color: ${Color.white};
margin: 0px;
text-align:center;
// position: absolute;
// top: 35%;
// left: 2.5%;
// width: 80%;
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
