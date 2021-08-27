//import 부분
import React from "react";
import styled from "styled-components";


import {Header, SelectBookCard, ReviewCard} from "../../components"
import { actionCreators as bookActions } from "../../redux/modules/book";
import { actionCreators as reviewActions } from "../../redux/modules/review";
import { actionCreators as permitActions } from "../../redux/modules/permit";
import { useDispatch, useSelector } from "react-redux";

import Color from "../../shared/Color";

//feature 사용중 push하기 
const BookDetail = (props) => {
  const dispatch = useDispatch();
  const bookId =  props.match.params.bookid;  
  const book = useSelector(state=> state.book.book);
  const reviews_which_book_have = useSelector(state=> state.review.reviews_which_book_have);
  const review_count = reviews_which_book_have?.length;
 
  React.useEffect(()=>{
    dispatch(bookActions.getOneBookSV(bookId));
    dispatch(reviewActions.getReviewsBookHaveSV(bookId));
    dispatch(permitActions.showNav(true));
  },[]);
 
    return (
        <React.Fragment>
                  <Main>
                  <Header/>
                  <Container>
                    <BookInfo>
                      <SelectBookCard is_book_detail/>
                    </BookInfo>
                    <BookIntro>
                        책소개
                    </BookIntro>
                    <BookContents>
                      {book.description}
                    </BookContents>
                  </Container>

                <BookReview>
                    게시물({review_count}개)
                </BookReview>
                {
                  reviews_which_book_have &&
                  reviews_which_book_have.map((review)=>{
                    return(
                        <ReviewGrid key={review.id}>
                          <ReviewCard  {...review} is_book_detail book={book}/>
                        </ReviewGrid>
                    )
                  })
                }


            </Main>
        </React.Fragment>

    )
}

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top:56px;
  background-color: ${Color.bgColor};
  margin : auto;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  @media ${(props) => props.theme.mobile} {
    padding-bottom:0px;
  }

  @media ${(props) => props.theme.tablet} {
    width: 100%;
    padding-bottom:0px;
}
  
@media ${(props) => props.theme.desktop} {
    width: 100%;
    padding-bottom:0px;
}


`;

const Container = styled.div`
padding:0px 0px 15px 0px;
width:100%;
height:auto;
background-color: ${Color.mainColor};
`

const BookInfo = styled.div`
`;

const BookIntro = styled.div`
  font-size: 21px;
  font-family: 'Noto Serif KR', serif;
  font-weight: 800;
  padding:0px 30px;
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
  font-weight: 600;
  padding:10px 20px 10px 20px;
  background:${Color.mainColor};
  margin:10px 0px 1px 0px;
`;

const ReviewGrid = styled.div`
`;
export default BookDetail;