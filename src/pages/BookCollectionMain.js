import React from "react";
import styled from "styled-components";
import BookCollection from "../components/BookCollection";
import Color from "../shared/Color";
import Header from "../components/Header";
import SearchIcon from '@material-ui/icons/Search';

const BookCollectionMain = (props)=>{
    return(
        <Outter>
            <SearchBarBox>
                <SearchBar placeholder="리뷰궁금한 책 검색"></SearchBar>
            </SearchBarBox>
          <Intro>테마별로 혹은 같은 무드의 
          도서만 모아, 추천 컬렉션 </Intro>
        <BookCollection></BookCollection>
        <BookCollection></BookCollection>
        <BookCollection></BookCollection>
        <MoreBtn>추천 컬렉션 더보기</MoreBtn>
        </Outter>
      )
}

const Outter = styled.div`
width: 100vw;
padding: 0px 0px 100px 0px;
background: ${Color.black};
`;

const Intro = styled.div`
font-family: "Noto Serif KR", serif;
color: ${Color.white};
font-size: 21px;
padding: 40px 20px 30px 20px;
letter-spacing: -0.42px;
font-weight: bold;
line-height: 1.52;
width: 70%;
`;

const MoreBtn = styled.div`
width: 85%;
height: 36px;
color: ${Color.white};
border-radius: 12px;
border: solid 1px rgba(195, 180, 162, 0.2);
text-align: center;
line-height: 36px;
margin: 0 auto;
`;

const SearchBarBox = styled.div`
text-align: right;
margin: 30px 0px;
`
const SearchBar = styled.input`
border:none;
margin: 10px;
border-radius:12px;
background-color:#f5f5f5;
:focus {
    outline:none;
}
padding:0px 0px 0px 30px;
height: 40px;
`

export default BookCollectionMain;