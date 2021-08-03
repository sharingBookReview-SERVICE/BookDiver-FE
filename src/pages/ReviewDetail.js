//import 부분
import React, {useState, useEffect, useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentAction } from "../redux/modules/comment"
import { actionCreators as reviewAction } from "../redux/modules/review";
import { actionCreators as permitAction } from "../redux/modules/permit";
import {history} from "../redux/configStore";

import styled from "styled-components"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import Comment from "../components/Comment"
import SelectBookCard from "../components/SelectBookCard";
import BookImg from "../img/bookImg2.jpg"
import CommentModal from "../modals/CommentModal";



const ReviewDetail = (props) =>{
    const dispatch = useDispatch();
    const is_modal = useSelector(state => state.permit.is_modal);
    const is_editting = useSelector(state => state.comment.edit_id)
    const [commentContent, setCommentContent] = useState("");
    const bookId = props.match.params.bookid;
    const reviewId = props.match.params.reviewid;
    const reviewDetail = useSelector(state => state.review.review_detail);
    const {hashtags, quote, content, comments, book,} = reviewDetail;


    //댓글 작성함수
    const writeComment = () => {
        const comment_info = {
            comment: commentContent,
            bookId: bookId,
            reviewId: reviewId,
            userInfo: "저팔계"}
        dispatch(commentAction.addCommentSV(comment_info))
        setCommentContent("")
    }

//네비게이션을 없애고, 리뷰 상세를 불러오기
    useEffect(()=>{
        dispatch(permitAction.showNav(false))
        dispatch(reviewAction.getDetailReviewSV(bookId,reviewId))
        dispatch(reviewAction.getFeedId(bookId, reviewId)) // 수정 및 삭제를 위한 feedId
    },[])



    return(
        <React.Fragment>
            <ReviewDetailWrapper>

                <BackArrowBox>
                    <ArrowBackIcon onClick={()=>{
                        history.goBack();
                    }}/>
                </BackArrowBox>

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

                    <SelectBookCard {...book} is_reviewDetail/>
                    <Image src={BookImg}/>

                    <ContentBox>
                        <ContentTitle>{quote}</ContentTitle>
                        <Content>{content}</Content>
                        <HashTag>{hashtags.map((tag)=> {
                            return(`#${tag} `)
                        })}</HashTag>
                    </ContentBox>

                    <LikeCommentWrapper>
                        <LikeCommentButton>
                            <LikeBox>
                                좋아요10개
                            </LikeBox>
                            <WriteCommentBox>
                                댓글 달기
                            </WriteCommentBox>
                        </LikeCommentButton>
                    </LikeCommentWrapper>

                </CardBox>

                {comments.map((comment, idx) => {
                    return(
                        <Comment {...comment} key={comment._id}  />
                    )
                })}

                {is_editting === "" ? 
                <CommentInputBox>
                    <CommentInput 
                    placeholder="지금 댓글을 남겨보세요" 
                    onChange={(e)=>{setCommentContent(e.target.value)}}
                    value={commentContent}/>
                    <CommentWriteButton 
                    onClick={()=>{
                        writeComment()
                    }}>게시
                    </CommentWriteButton>
                </CommentInputBox> 
                : ""
                }

            </ReviewDetailWrapper>

            { is_modal && <CommentModal/>}
        </React.Fragment>
    )
}

const ReviewDetailWrapper = styled.div`
width:100%;
height:auto;
box-sizing:border-box;
padding-bottom:50px;
`


const BackArrowBox = styled.div`
height:56px;
width:100%;
box-sizing:border-box;
padding: 10px 20px 0px 20px;
display:flex;
align-items:center;
background-color:#fff;
`

const CardBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing:border-box;
  background-color:#fff;
`

const Image = styled.img`
  width:auto;
  height:auto;
  max-width:100%;
  max-height:100%;
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

const UserName = styled.p`
font-size:14px;
font-weight:bold;
margin:0px 8px 0px 0px;
`

const CreatedAt = styled.p`
font-size:10px;
color:#9e9e9e;
opacity:0.5;
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

const ContentTitle = styled.p`
font-size:14px;
font-weight: bold;
  line-height: 1.43;
  letter-spacing: -0.28px;
  margin-bottom:16px;
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

const LikeCommentWrapper = styled.div`
width:100%;
height:auto;
box-sizing:border-box;
padding:0px 24px;
`

const LikeCommentButton = styled.div`
width:100%;
height:40px;
border: solid 1px #eeeeee;
border-radius: 12px;
display:grid;
flex-direction:row;
grid-template-columns: 1fr 1fr;
box-sizing:border-box;
`

const LikeBox = styled.div`
display:flex;
align-items:center;
justify-content:center;
border-right:solid 1px #eeeeee;
height:100%;
font-size:14px;
color:#1168d7;
letter-spacing: -0.28px;
`

const WriteCommentBox = styled.div`
display:flex;
align-items:center;
justify-content:center;
height:100%;
font-size:14px;
font-weight:bold;
color:#cbcbcb;
letter-spacing: -0.28px;
`

const CommentInputBox = styled.div`
height:72px;
width:100%;
padding: 12px 16px;
box-sizing: border-box;
display:flex;
justify-content:center;
align-items:center;
border-top:1px solid #f2f2f2;
background-color:#fff;
position:fixed;
bottom:0;
`

const CommentInput = styled.input`
width:100%;
height:100%;
padding:0 0 0 16px;
background-color:#f5f5f5;
border:none;
border-radius:12px;
:focus{
    outline:none;
}
`

const CommentWriteButton = styled.div`
cursor:pointer;
color:#acacac;
position:absolute;
right:30px;
font-size:14px;
font-weight:700;
`


export default ReviewDetail;