
import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as bookActions } from "../redux/modules/book";
import { actionCreators as permitActions } from "../redux/modules/permit";
import { actionCreators as collectionActions } from "../redux/modules/collection";
import { history } from "../redux/configStore";

import Color from "../shared/Color"

const SelectBookCard = (props) =>{
  const {title, author, image, isbn, is_reviewDetail, is_editReviewPage, is_book_detail, is_make_collection,is_write_page} = props;
  const dispatch = useDispatch();
  const book = useSelector(state=> state.book.book);
  const is_selected = useSelector(state=> state.permit.is_selected);
  const bookTitle = title?.split("(")[0]
  const selectedBookTitle = book?.title?.split("(")[0]


  const selectBook = ()=>{
    if(is_make_collection){
      dispatch(collectionActions.selectBooksSV(isbn));
      dispatch(collectionActions.moreSelect(false));
    }
    else{
      dispatch(bookActions.getOneBookSV(isbn));
      dispatch(permitActions.bookSelect(true));
    }
   
  }

  const reviewDetailInfo = useSelector(state=> state.review.review_detail);

  if(is_editReviewPage){
    return(
      <BookInfoWrapper onClick={()=>{
        window.alert("책은 수정할 수 없습니다")
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
  
  
  if(is_reviewDetail){
    return(
      <BookInfoWrapper
      style={{
        borderTop:`1px solid ${Color.CardHashTag}`,
        borderBottom:`1px solid ${Color.CardHashTag}`,
        padding: "0px 20px 0px 20px",
        marginBottom:"15px",

      }}
      onClick={()=>{
        history.push(`/bookdetail/${reviewDetailInfo.book._id}`)
      }}>
        <BookInfoBox 
          style={{
            border:"none",
            padding:"0px",
          }}>
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
      <BookInfoWrapper
      style={{
        borderTop:`1px solid ${Color.CardHashTag}`,
        borderBottom:`1px solid ${Color.CardHashTag}`,
        padding: "0px 20px 0px 35px",
        marginBottom:"15px",
      }}
      >
        <BookInfoBox 
        style={{borderRadius:"0px"}}
        >
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
      <BookInfoWrapper is_write_page={is_write_page}>
        {/* 책이 이미 선택된 것인지, 검색한 목록이 나오는 것인지에 따른 조건부 렌더링 */}
        {
          is_selected ?
            <BookInfoBox
            style={{
              borderTop: `solid 1px ${Color.CardHashTag}`,
              padding: "16px 16px 16px 35px",
            }}
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
            style={{
              borderRadius: "12px",
              border: `solid 1px ${Color.CardHashTag}`,
              padding: "16px"
            }} 
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
  width: 100%;
  box-sizing: border-box;
  padding: 0px 20px 16px 20px; 

  ${(props) => props.is_write_page ? `padding:0px`: ""};
`

const BookInfoBox = styled.div`
width: 100%;
height: 112px;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
gap: 12px;
box-sizing: border-box;
cursor:pointer;

`

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
  height:80%;
  overflow-x:hidden;
  overflow-y:scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
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


export default SelectBookCard;