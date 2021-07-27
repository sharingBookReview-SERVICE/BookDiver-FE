//import 부분
import React, {useRef, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentAction } from "../redux/modules/comment"
import { actionCreators as permitAction } from "../redux/modules/permit";
import {history} from "../redux/configStore";

import styled from "styled-components"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Comment from "../components/Comment"
import SelectBookCard from "../components/SelectBookCard";



const ReviewDetail = (props) =>{
    const dispatch = useDispatch();
    console.log(history.location.pathname)

    const commentList = useSelector(state => state.comment.comment_list)
    const commentContent = useRef();

    //댓글 작성함수
    const writeComment = (comment_info) => {
        dispatch(commentAction.addComment(comment_info))
    }

    //로딩이 되고나면, 네이게이션을 없애주기.
    useEffect(()=>{
        dispatch(permitAction.showNav(false))
    },[])

    return(
        <React.Fragment>

            <BackArrowBox>
                <ArrowBackIcon/>
            </BackArrowBox>

            <CardBox>
                <CommentTitleBox>
                    <UserName>
                        닉네임닉네임
                    </UserName>
                    <CreatedAt>
                        2021.07.24 21:04
                    </CreatedAt>
                </CommentTitleBox>

                <SelectBookCard/>

                <ContentBox>
                    <ContentTitle>"나는 나보다 더 훌륭한 경영자에게 투자한다"</ContentTitle>
                    <Content>따뜻한 간에 위하여 우는 유소년에게서 있다. 보이는 설산에서 가슴이 석가는 그들의 유소년에게서 그와 철환하였는가? 속에서 이것을 스며들어 역사를 더운지라 고동을 것이다. 더운지라</Content>
                    <HashTag>#투자서적 #자기계발 #부자되기</HashTag>
                </ContentBox>

                <LikeCommentButton>
                    <LikeBox>
                        좋아요10개
                    </LikeBox>
                    <WriteCommentBox>
                        댓글 달기
                    </WriteCommentBox>
                </LikeCommentButton>
            </CardBox>

            {commentList.map((comment, idx) => {
                return(
                    <Comment {...comment} key={idx} />
                )
            })}

            <CommentInputBox>
                <CommentInput 
                placeholder="지금 댓글을 남겨보세요" 
                ref={commentContent}/>
                <CommentWriteButton 
                onClick={()=>{
                    const commentInfo = {
                        content : commentContent.current.value,
                        username : "저팔계",
                    }
                    writeComment(commentInfo)
                }}>게시
                </CommentWriteButton>
            </CommentInputBox>

        </React.Fragment>
    )
}


const BackArrowBox = styled.div`
height:56px;
width:100%;
padding: 20px 20px 0px 20px;
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
  padding: 24px;
  padding-bottom:0px;
  box-sizing:border-box;
  background-color:#fff;
`

const CommentTitleBox = styled.div`
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