//import 부분
import React from "react";
import styled from "styled-components"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookImg from "../img/bookImg2.jpg"
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as reviewAction } from "../redux/modules/comment"
import {history} from "../redux/configStore";

const ReviewCard = (props) =>{
  //dispatch와 변수들
  const dispatch = useDispatch();

  const reviewList = useSelector(state => state.review.all_review_list)
  const is_liked = useSelector(state => state.review.all_review_list[0].myLike)

  //서버 들어오기 전 임의로 좋아요 갯수 구하는 형식 만들어놓기
//   const reviewId = 1;
//   const idx = reviewList.findIndex((l) => l.id === reviewId);
//   const likesCount = reviewList[idx].likes

  //좋아요 클릭 
  const clickLikeButton = () => {
    //props로부터 bookId와 reviewId를 받아오기
    dispatch(reviewAction.LikeSV());
  }


    return(
        <React.Fragment>
            <CardBox>

                <CommentUserBox>
                    <UserLeftBox>
                      <UserName>
                          닉네임닉네임
                      </UserName>
                      <CreatedAt>
                          2021.07.24 21:04
                      </CreatedAt>
                    </UserLeftBox>

                    <UserRightBox>
                      <BookmarkBorderIcon style={{color:"#9e9e9e", marginRight:"10px"}}/>
                      <MoreHorizIcon style={{color:"#9e9e9e"}}/>
                    </UserRightBox>
                </CommentUserBox>

                <Image src={BookImg} onClick={()=>{
                  history.push('/reviewdetail')
                }}/>

                <ContentBox onClick={()=>{
                  history.push('/reviewdetail')
                }}>
                    <BookTitle>돈의 속성 | 김승호 저</BookTitle>
                    <Quote>"나는 나보다 더 훌륭한 경영자에게 투자한다"</Quote>
                    <Content>따뜻한 간에 위하여 우는 유소년에게서 있다. 보이는 설산에서 가슴이 석가는 그들의 유소년에게서 그와 철환하였는가? 속에서 이것을 스며들어 역사를 더운지라 고동을 것이다. 더운지라</Content>
                    <HashTag>#투자서적 #자기계발 #부자되기</HashTag>
                </ContentBox>

                <LikeCommentBox>
                    <LikeBox>
                        {is_liked ?
                        <FavoriteIcon style={{fontSize:"18px", color:"#1168d7"}}/>
                        : <FavoriteBorderIcon style={{fontSize:"18px", color:"#1168d7"}}/> }
                        
                        <LikeText>좋아요 {reviewList[0].likes}개</LikeText>
                    </LikeBox>
                    <WriteCommentBox>
                        <CommentCount>
                            댓글 0개
                        </CommentCount>
                    </WriteCommentBox>
                </LikeCommentBox>
            </CardBox>
            

        </React.Fragment>
    )
}


const CardBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing:border-box;
  margin:0px 0px 6px 0px;
  background-color:#fff;
`

const CommentUserBox = styled.div`
display:flex;
align-items:center;
padding:16px 24px;
justify-content:space-between;
width:100%;
box-sizing:border-box;
`

const UserLeftBox = styled.div`
width:auto;
height:auto;
display:flex;
align-items:center;
`

const UserRightBox = styled.div`
width:auto;
height:auto;
display:flex;
align-items:center;
`

const Image = styled.img`
  width:auto;
  height:auto;
  max-width:100%;
  max-height:100%;
`

const UserName = styled.p`
font-size:14px;
font-weight:bold;
margin:0px 8px 0px 0px;
`

const CreatedAt = styled.p`
font-size:10px;
color:#9e9e9e;
opacity:0.5;
margin:0px;
`


const ContentBox = styled.div`
width:100%;
box-sizing:border-box;
height:auto;
display:flex;
flex-direction:column;
justify-content:flex-start;
aligh-items:flex-start;
padding:0px 24px;
`

const BookTitle = styled.p`
font-size:14px;
line-height:20px;
letter-spacing: -0.28px;
color:#1168d7;
font-weight:bold;
margin:16px 0px 8px 0px;
`

const Quote = styled.p`
font-size:14px;
font-weight: bold;
  line-height: 1.43;
  letter-spacing: -0.28px;
  margin:0px 0px 16px 0px;
`

const Content = styled.p`
font-size:14px;
  line-height: 1.43;
  letter-spacing: -0.28px;
  margin:0px;
`

const HashTag = styled.div`
padding:15px 0px;
color:#1168d7;
font-size:14px;
`

const LikeBox = styled.div`
display:flex;
align-items:flex-end;
`

const LikeText = styled.p`
font-size:14px;
margin: 0px 0px 0px 8px;
color:#1168d7;
`

const LikeCommentBox = styled.div`
display:flex;
padding:10px 24px 18px 24px;
`

const WriteCommentBox = styled.div`
display:flex;
`

const CommentCount = styled.p`
font-size:14px;
margin: 0px 0px 0px 8px;
color: #b5b5b5;
`

export default ReviewCard;