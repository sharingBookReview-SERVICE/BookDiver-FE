import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";

//스와이퍼
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

//컴포넌트
import Collection from "../elements/Collection";
//css
import Color from "../shared/Color";


//action
import  { actionCreators as collectionActions } from "../redux/modules/collection";
import { actionCreators as permitActions } from "../redux/modules/permit";
import { useDispatch, useSelector } from "react-redux";



SwiperCore.use([Navigation, Pagination])


//북컬렉션 페이지
const BookCollectionMain = (props) =>{
    const dispatch=  useDispatch();

    const tag_collection_list = useSelector(state=> state.collection.tag_collection_list);
    const custom_collection_list = useSelector(state=> state.collection.custom_collection_list);

    const is_login = useSelector(state=> state.user.is_login);

    React.useEffect(()=>{
        dispatch(permitActions.showNav(true))
        dispatch(collectionActions.getTagCollectionsSV());
        dispatch(collectionActions.getCustomCollectionsSV());
    },[])

    const toTagCollectionList = ()=>{
        history.push('/collectionlist/tag')
    }
    const toCustomCollectionList = ()=>{
        history.push('/collectionlist/custom')
    }
    return(
        <Container>
            <CollectionIntro>테마별로, 혹은 기분으로
                같은 무드의 도서만 모아서</CollectionIntro>
            <Recommend>
                <TitleWrapper>
                    <Title>태그 기반 추천 컬렉션</Title>
                    <More onClick={()=>{toTagCollectionList()}}>더보기</More>
                 </TitleWrapper>
                <Swiper
                style ={{margin: "0px 0px 20px 20px"}}
                spaceBetween={50}
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
                <More onClick={()=>{toCustomCollectionList()}}>더보기</More>
            </TitleWrapper>
                <Swiper
                style ={{margin: "0px 0px 20px 20px"}}
                spaceBetween={50}
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
           
           {
               is_login &&  <MakeBtn onClick={()=>{history.push('/makeCollection')}}>나만의 북 컬렉션 만들기</MakeBtn>
           }
           
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
