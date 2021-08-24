
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Color from "../shared/Color";
import ClearIcon from '@material-ui/icons/Clear';


import { actionCreators as collectionActions } from "../redux/modules/collection";

const defaultProps = {
    book:{
        image:"https://i.pinimg.com/564x/aa/1b/2d/aa1b2d3836d313f0e36ad341de810543.jpg",
        title:"나는 착한 딸을 그만두기로 했다.",
        author:"아사쿠라 마유미",
    }
}
//책 카드 컴포넌트
 const CollectionBookCard = (props) =>{
    const dispatch = useDispatch();

    const book = props.book? props.book : defaultProps.book;
    const book_descriptionSV = props.book_description? props.book_description : "";
    //책 추천 내용 저장하기 관련
    const [book_description, setBookDescription] = useState(book_descriptionSV);
    const bookTitle = props.title?.split("(")[0]
    const content = {
        isbn: props.isbn,
        book_description: book_description,
    }

    const deleteCard = (id)=>{
        dispatch(collectionActions.deleteSelectedBook(id))
    }
  
    const saveBookDescription = (content)=>{
        dispatch(collectionActions.addBookDescription(content))
    }

    //collection detail에서 보는 페이지
    if(props.is_collection_detail){
        return(
            <BookInfoWrapper>
                <BookInfoBox>
                <Wrapper>
                    <BookImg url={book?.image}/>
                    <BookDescBox>
                    <BookTitle >{book?.title.split("(")[0]}</BookTitle>
                        <BookWriter>{book?.author} 저</BookWriter>
                    </BookDescBox>
                </Wrapper>
                {
                    props.is_edit_collection &&  <ClearIcon onClick={()=>{deleteCard(book.id)}}/>
                }
                </BookInfoBox>
                <Recommend 
                value={book_descriptionSV} disabled
                >
                </Recommend>
            </BookInfoWrapper>
        )
    }

   
    else{
        return(
            <BookInfoWrapper>
                <BookInfoBox>
                    <Wrapper>
                    <BookImg url={props.image}/>
                    <BookDescBox>
                    <BookTitle >{bookTitle}</BookTitle>
                        <BookWriter>{props.author} 저</BookWriter>
                    </BookDescBox>
                    </Wrapper>
                    <ClearIcon onClick={()=>{deleteCard(props.isbn)}}/>
                </BookInfoBox>
                <Recommend 
                value={book_description}
                placeholder="책 마다 추천이유를 적어보세요(최대30자)"
                maxLength="30"
                onChange={(e)=>{setBookDescription(e.target.value)}}
                onBlur={(e) => {
                    saveBookDescription(content)
                  }}
               
                />
                
            </BookInfoWrapper>
        )
    }
    
}



//BookCard
const BookInfoWrapper = styled.div`
width: 100%;
box-sizing: border-box;
border-radius: 12px;
border: solid 1px ${Color.secondColor};
margin-bottom: 20px;
`
const BookInfoBox = styled.div`
width: 100%;
height: 112px;
display: flex;
flex-direction: row;
justify-content: flex-start;
gap: 12px;
padding: 16px;
box-sizing: border-box;

`
const Wrapper = styled.div`
width: 100%;
display: flex;
align-items: center;
box-sizing: border-box;
`;

const BookImg = styled.div`
  width: 60px;
  height: 80px;
  border-radius: 4px;
  background-color: #c4c4c4;
  background-image: url(${(props) => props.url ? props.url : " "});
  background-size: cover;
  box-sizing: border-box;
`

const BookDescBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 70%;
  margin-left: 10px;
`

const BookTitle = styled.div`
  width: 100%;
  height: auto;
  color: ${Color.fontBlack};
  font-size: 14px;
  letter-spacing: -0.28px;
  line-height: 1.43;
  margin: 0 0 5px 2px;
  text-align: left;
  font-weight: bolder;
  font-family: 'Noto Serif KR', serif;
`

const BookWriter = styled.div`
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: -0.28px;
  text-align: left;
  color: ${Color.fontGray};
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.43;
  margin: 0px 0px 5px 2px;
`

const Recommend = styled.input`
height: 36px;
width: 90%;
border-radius: 8px;
background: ${Color.hashtag};
box-sizing: border-box;
margin: 0 auto;
margin-left: 5%;
border: none;
margin-bottom: 20px;
padding-left: 10px;
`;
export default CollectionBookCard;