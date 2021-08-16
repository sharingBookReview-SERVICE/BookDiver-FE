//import 부분
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as commentAction } from "../redux/modules/comment";
import {actionCreators as reviewAction } from "../redux/modules/review";
import { actionCreators as permitAction } from "../redux/modules/permit";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configStore";
import { useParams } from "react-router";

import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import profile from "../img/profile.svg"
import EditModal from "../modals/EditModal";

import { makeStyles } from "@material-ui/core/styles";
import Comment from "../components/Comment";
import SelectBookCard from "../components/SelectBookCard";
import CommentModal from "../modals/CommentModal";

import {images} from "../shared/Image"
import Color from "../shared/Color";

const useStyles = makeStyles((theme) => ({
  goback: {
      padding: "0px 20px"
  },
  icon: {
      margin: "0px 10px",
      
  },
  smile :{
    fontSize: "30px",
    padding: "0px 20px"
  },
  like : {
    margin:" 0px 5px"
  }
}));


const ReviewDetail = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const params = useParams();
  const bookId = params.bookid;
  const reviewId = params.reviewid;
  
  const is_modal = useSelector((state) => state.permit.is_modal);
  const is_edit_modal = useSelector((state) => state.permit.is_edit_modal)
  const is_editting = useSelector((state) => state.comment.edit_id);
  const [commentContent, setCommentContent] = useState("");
  const reviewDetail = useSelector((state) => state.review.review_detail);
  const {book, comments, content, created_at,hashtags, image, likes, myLike, quote, user } = reviewDetail;

  const userId = useSelector((state) => state.user.user._id);
  const nickname = useSelector((state) => state.user.user.nickname);
  const profileImage = useSelector((state) => state.user.user.profileImage)

  const [is_empty, setIsEmpty] = useState(false)
  const bottomRef = useRef();

  const token = localStorage.getItem('token');
  if(!token){
    history.push('/login')
    dispatch(permitAction.showNav(true));
  }

  const toBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" })
  }


  const follow = () => {
    dispatch(userActions.followSV(user.id))
  }
  //내 포스트인지 확인
  let is_my_post = false;

  if(userId === user?.id){
    is_my_post = true;
  }

  //피드의 아이디 가져오기 
  const getFeedId = () => {
    dispatch(reviewAction.getFeedId(bookId, reviewId));
  };

  //수정하기 모달을 띄우기
  const showEditModal = () => {
    dispatch(permitAction.showEditModal(true));
  };

  //뒤로가기 
  const goBack = () => {
    history.push("/");
  };

  //댓글 작성함수
  const writeComment = () => {
    if(commentContent ===  ""){
      setIsEmpty(true)
      return;
    } 
    const comment_info = {
      comment: commentContent,
      bookId: bookId,
      reviewId: reviewId,
      userInfo: nickname,
    };
    dispatch(commentAction.addCommentSV(comment_info));
    setCommentContent("");
    toBottom()
  };

  //좋아요 클릭
  const clickLikeButton = () => {
    dispatch(reviewAction.LikeSV(bookId, reviewId));
  };

  //네비게이션을 없애고, 리뷰 상세를 불러오기
  useEffect(() => {
    dispatch(permitAction.showNav(false));
    dispatch(reviewAction.getDetailReviewSV(bookId, reviewId));
    dispatch(reviewAction.getFeedId(bookId, reviewId)); // 수정 및 삭제를 위한 feedId

    return () => {
      dispatch(permitAction.showEditModal(false));
    }
  }, []);


  
  return (
    <React.Fragment>
      <Container> 
         {is_edit_modal && <EditModal/>}
         {is_modal && <CommentModal />}
            <Head>
                <ArrowBackIcon className={classes.goback}
                onClick = {()=>{goBack()}}
                />
            </Head>
            <Outter>

            <CommentUserBox>

            <UserLeftBox>
              <ImgWrapper>
                <ProfileImg src={images[profileImage]} />
              </ImgWrapper>

              <Box direction={"column"}>
                <Box direction={"row"}>
                  <UserName>{user?.nickname}</UserName>
                  {!is_my_post && <Follow onClick={()=>{follow()}}>팔로우</Follow>}
                </Box>
                <CreatedAt >{created_at}</CreatedAt>
              </Box>

            </UserLeftBox>

            <UserRightBox>
              
              {is_my_post && 
                <MoreHorizIcon
                  style={{ color: "#9e9e9e" }}
                  onClick={() => {
                    showEditModal();
                    getFeedId();
                  }}
                />
              }
            </UserRightBox>
          </CommentUserBox>



                <SelectBookCard {...book} is_reviewDetail />
                <ReviewContent>
                  <Quote> {quote}</Quote>
                  <Content>{content}</Content>
                  <HashTagBox>
                  {hashtags?.map((tag) => {
                      return `#${tag} `;
                    })}
                  </HashTagBox>
                  <ImageBox>
                    <Image src={image}/>
                  </ImageBox>
                </ReviewContent>
                <ReactionBar>
                  {
                    myLike ?
                    <Div onClick={() => {
                      clickLikeButton();
                    }}><FavoriteIcon className={classes.like}   
                   />좋아요 {likes} 개</Div>
                    :
                    <Div onClick={() => {
                      clickLikeButton();
                    }} ><FavoriteBorderIcon className={classes.like} 
                    />좋아요 {likes} 개</Div>
                  }
                  
                   <Hr></Hr>
                   <Div>댓글 {comments?.length} 개</Div>
                </ReactionBar>

            </Outter>
            <CommentWrapper>
                    {
                      comments?
                    comments.map((comment, idx) => {
                      return <Comment {...comment} key={comment._id} />;
                    }):""}
                    </CommentWrapper>
            {is_editting === "" ? (
              <CommentInputBox>
                <CommentInput
                    className={is_empty ? 'shake-horizontal' : null}
                    placeholder={is_empty ? "댓글 내용을 작성해주세요" : "지금 댓글을 남겨보세요"}
                    color={is_empty ? "red" : Color.fontGray}
                    onChange={(e) => {
                      setCommentContent(e.target.value);
                    }}
                    onFocus={()=>{setIsEmpty(false)}}
                    value={commentContent}
                    onKeyPress={(e) => (e.key === "Enter" ? writeComment() : null)}
                />
                <CommentWriteButton
                    onClick={() => {
                      writeComment();
                    }}
                >
                  게시
                </CommentWriteButton>
              </CommentInputBox>
          ) : (
              ""
          )}

      </Container>
      <BottomDiv ref={bottomRef}></BottomDiv>
      </React.Fragment>
  );
};

const BottomDiv = styled.div`
height:70px;
display:invisible;
width:1px;
`

const UserRightBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
`;

const ImgWrapper = styled.div`
width:30px;
height:30px;
border-radius:50%;
overflow:hidden;
box-sizing:border-box;
border: 1px solid ${Color.secondColor};
background:${Color.black};
margin-right:10px;
`

const ProfileImg = styled.img`
width: 100%;
height: 100%;
object-fit:cover;
`;

const CommentUserBox = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`;

const Box = styled.div`
display:flex;
flex-direction:${(props) => props.direction};
justify-content:flex-start;
`

const UserLeftBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: normal;
  margin: 0px 8px 0px 0px;
  width:auto;
  height:auto;
  min-width:30px;
`;

const CreatedAt = styled.p`
  font-size: 10px;
  color: #9e9e9e;
  opacity: 0.5;
  margin: 0px;
`;

const Container = styled.div`
background: ${Color.mainColor};
width: 100vw;
height: auto;
padding-bottom: 100px;
`;

const Head = styled.div`
width: 100%;
align-items: center;
display: flex;
margin: 30px 0px;
`;

const Outter = styled.div`
width: 90%;
height: auto;
border: 1px solid ${Color.black};
margin: 0 auto;
border-radius: 16px;
`;


const Follow = styled.div`
font-weight: bold;
font-size:14px;
width: auto;
`;


const ReviewContent = styled.div`
`;

const Quote = styled.div`
margin-bottom: 16px;
padding: 12px;
font-family: "Noto Serif KR", serif;
font-weight: bold;
white-space: pre-line;
background:${Color.quote};
margin:0px 20px 16px 20px;
border-radius:10px;
`;

const Content = styled.div`
margin-bottom: 16px;
padding: 0px 20px;
`;

const HashTagBox = styled.div`
padding: 0px 20px;
margin-bottom: 16px;
`;
const ImageBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
`;
const ReactionBar = styled.div`
border: 1px solid #242121;
width: 90%;
height: 56px;
border-radius: 24px;
margin: 0 auto;
margin-top: 16px;
margin-bottom: 16px;
display: flex;
align-items: center;
`;
const Div = styled.div`
display: flex;
width: 100%;
height: 100%;
align-items: center;
justify-content: center;
`;
const Hr = styled.div`
width: 1px;
height: 100%;
background: black;

`;

const CommentWrapper = styled.div`
width:100%;
height:auto;
`;

const CommentInputBox = styled.div`
  height: 72px;
  width: 100%;
  padding: 12px 16px;
  box-sizing: border-box;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #c3b4a2;
  background-color: ${Color.mainColor};
  position: fixed;
  bottom: 0;
`;

const CommentInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 0 0 16px;
  font-size: 16px;
  background-color: ${Color.mainColor};
  border: 1px solid ${Color.fontBlack};
  border-radius: 12px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${(props) => props.color};
    font-family: 'Roboto', sans-serif;
    letter-spacing: -0.5px;
  }
`;

const CommentWriteButton = styled.div`
  cursor: pointer;
  font-size: 16px;
  color: ${Color.fontGray};
  position: absolute;
  right: 30px;
  font-weight: 700;
  height: 20px;
}
`;
export default ReviewDetail;