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

//feature 사용중 push하기 
const BookDetail = (props) => {
  const dispatch = useDispatch();
  const bookId =  props.match.params.bookid;  
  const book = useSelector(state=> state.book.book);
  const reviews_which_book_have = useSelector(state=> state.review.reviews_which_book_have);
  const review_count = reviews_which_book_have.length;

  React.useEffect(()=>{
    dispatch(bookActions.getOneBookSV(bookId));
    dispatch(reviewActions.getReviewsBookHaveSV(bookId));
    dispatch(permitActions.showNav(true));
  },[]);
 
    return (
        <React.Fragment>
            <Grid style={{height: "5vh"}}/>

                  <Main>
                  <Header/>
                  <SelectBookCard is_book_detail/>
                  <BookIntro>
                      책소개
                  </BookIntro>
                  <BookContents>
                    {book.description}
                  </BookContents>
                  <Grid/>

                <BookReview>
                    리뷰 ({review_count}개)
                </BookReview>
                {
                  reviews_which_book_have &&
                  reviews_which_book_have.map((review)=>{
                    return(
                      <ReviewCard key={review._id} {...review} is_book_detail book={book}/>
                    )
                  })
                }
                {/* <ReviewCard/> */}

            </Main>
        </React.Fragment>

    )
}
const Grid = styled.div`
width: 100vw;
  height: 2vh;
  background-color: #f5f5f5;
`;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  flex-grow: 0;
  padding: 20px 0 0;
  background-color: #FFFFFF;
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

const BookIntro = styled.div`
font-size: 1.3em;
  font-weight: bolder;
  margin: 0.2vh 0 0 5vw;
  
`

const BookContents = styled.div`
  width: 90vw;
  margin: 2vh auto;
  font-size: 0.8em;
  
`

const BookReview = styled.div`
  font-size: 1.3em;
  font-weight: bolder;
  margin: 0.5em;
`
export default BookDetail;