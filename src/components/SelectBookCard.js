//import 부분
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as bookActions } from "../redux/modules/book";
import { actionCreators as permitActions } from "../redux/modules/permit";
import { history } from "../redux/configStore";

import Color from "../shared/Color"

const SelectBookCard = (props) =>{
  const {title, author, image, isbn, is_reviewDetail, is_editReviewPage, is_book_detail} = props;
  const dispatch = useDispatch();
  const book = useSelector(state=> state.book.book);
  const is_selected = useSelector(state=> state.permit.is_selected);
  const bookTitle = title?.split("(")[0]
  const selectedBookTitle = book?.title?.split("(")[0]

  const selectBook = ()=>{
    dispatch(bookActions.getOneBookSV(isbn));
    dispatch(permitActions.bookSelect(true));
  }

    const reviewDetailInfo = useSelector(state=> state.review.review_detail);
  
  
  if(is_reviewDetail || is_editReviewPage){
    return(
      <BookInfoWrapper onClick={()=>{
        history.push(`/bookdetail/${reviewDetailInfo.book._id}`)
        
      }}>
        <BookInfoBox>
          <BookImg url={image}/>
          <BookDescBox>
          <BookTitle dangerouslySetInnerHTML={{__html: bookTitle}}></BookTitle>
              <BookWriter dangerouslySetInnerHTML={{__html: author}}></BookWriter>
          </BookDescBox>
        </BookInfoBox>
      </BookInfoWrapper>
    )
  }

    // book detail 에서 보는 화면 
  if(is_book_detail){
    return(
      <BookInfoWrapper>
        <BookInfoBox>
          <BookImg url={book.image}/>
          <BookDescBox>
          <BookTitle >{book.title}</BookTitle>
              <BookWriter>{book.author} 저</BookWriter>
          </BookDescBox>
        </BookInfoBox>
      </BookInfoWrapper>
    )
  }

    return(
      <BookInfoWrapper>
        {/* 책이 이미 선택된 것인지, 검색한 목록이 나오는 것인지에 따른 조건부 렌더링 */}
        {
          is_selected ?
            <BookInfoBox
              onClick={()=>{
              dispatch(permitActions.showModal(true));
              dispatch(permitActions.bookSelect(false));
              }}>
              <BookImg url={book.image}/>
              <BookDescBox>
                  <BookTitle dangerouslySetInnerHTML={{__html: selectedBookTitle}}></BookTitle>
                  <BookWriter>{book.author} 저</BookWriter>
              </BookDescBox>
            </BookInfoBox>
            :
            // 검색할때 나오는 책 카드
            <BookInfoBox 
              onClick={()=>{
                selectBook();
                dispatch(permitActions.showModal(false));
                
              }}>
              <BookImg url={image}/>
              <BookDescBox>
                  <BookTitle dangerouslySetInnerHTML={{__html: bookTitle}}></BookTitle>
                  <BookWriter dangerouslySetInnerHTML={{__html: author}}></BookWriter>
              </BookDescBox>
            </BookInfoBox>
        }

      </BookInfoWrapper>
    )
}

const BookInfoWrapper = styled.div`
width:100%;
box-sizing:border-box;
padding:0px 20px 16px 20px;
`

const BookInfoBox = styled.div`
width: 100%;
height: 112px;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
gap: 12px;
padding: 16px;
border-radius: 12px;
border: solid 1px ${Color.secondColor};
box-sizing: border-box;
`

const BookImg = styled.div`
width:60px;
height:80px;
border-radius:4px;
background-color: #c4c4c4;
background-image:url(${(props) => props.url ? props.url : " "});
background-size: cover;
box-sizing:border-box;
`

const BookDescBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing:border-box;
  max-width:70%;
`

const BookTitle = styled.div`
  width:100%;
  height: auto;
  color:#1168d7;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: -0.28px;
  line-height: 1.43;
  margin: 0px 0px 5px 0px;
  text-align: left;
`

const BookWriter = styled.div`
font-size: 13px;
line-height: 1.43;
letter-spacing: -0.28px;
text-align: left;
color:#c7c7c7;
line-height: 1.43;
margin:0px;
`


export default SelectBookCard;