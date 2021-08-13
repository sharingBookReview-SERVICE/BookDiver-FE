//import 부분
import React from "react";
import styled from "styled-components";

//import 이미지
import book_img from "../img/book_img.jpeg"
import Header from "../components/Header"
import SelectBookCard from "../components/SelectBookCard";
import ReviewCard from "../components/ReviewCard";
import { actionCreators as bookActions } from "../redux/modules/book";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as permitActions } from "../redux/modules/permit";
import { useDispatch, useSelector } from "react-redux";

import Color from "../shared/Color";

//feature 사용중 push하기 
const BookDetail = (props) => {
  const dispatch = useDispatch();
  const bookId =  props.match.params.bookid;  
  const book = useSelector(state=> state.book.book);
  const reviews_which_book_have = useSelector(state=> state.review.reviews_which_book_have);
  const review_count = reviews_which_book_have?.length;
  console.log(review_count)

  React.useEffect(()=>{
    dispatch(bookActions.getOneBookSV(bookId));
    dispatch(reviewActions.getReviewsBookHaveSV(bookId));
    dispatch(permitActions.showNav(true));
  },[]);
 
    return (
        <React.Fragment>
                  <Main>
                  <Header/>
                      <BookInfo>
                  <SelectBookCard is_book_detail/>
                      </BookInfo>
                  <BookIntro>
                      책소개
                  </BookIntro>
                  <BookContents>
                    {book.description}
                  </BookContents>

                <BookReview>
                    리뷰({review_count}개)
                </BookReview>
                {
                  reviews_which_book_have &&
                  reviews_which_book_have.map((review)=>{
                    return(
                        <ReviewGrid>
                      <ReviewCard key={review._id} {...review} is_book_detail book={book}/>
                        </ReviewGrid>
                    )
                  })
                }
                {/* <ReviewCard/> */}

            </Main>
        </React.Fragment>

    )
}

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top:90px;
  background-color: ${Color.mainColor};
  //border: 1px solid black;
  margin : auto;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const BookInfo = styled.div`
  margin: 17px -4px 24px -4px;
`;

const BookIntro = styled.div`
font-size: 21px;
  font-family: 'Noto Serif KR', serif;
  font-weight: 800;
  margin: -22px 0 0 24px;
  
`

const BookContents = styled.div`
  width: 86%;
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  margin: 20px auto;

`;

const BookReview = styled.div`
  font-size: 21px;
  font-family: 'Noto Serif KR', serif;
  font-weight: 800;
  margin : 35px 0 0 24px;
  
`;

const ReviewGrid = styled.div`
  margin-top: 12px;
`;
export default BookDetail;