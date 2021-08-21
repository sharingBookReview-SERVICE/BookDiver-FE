//import 부분
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client"

import { Transition } from 'react-transition-group';
import "../shared/Transition.css";

import { actionCreators as commentAction } from "../redux/modules/comment";
import {actionCreators as reviewAction } from "../redux/modules/review";
import { actionCreators as permitAction } from "../redux/modules/permit";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configStore";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom"

import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditModal from "../modals/EditModal";

import { makeStyles } from "@material-ui/core/styles";
import Comment from "../components/Comment";
import SelectBookCard from "../components/SelectBookCard";
import CommentModal from "../modals/CommentModal";

import {images} from "../shared/Image"
import Color from "../shared/Color";

const useStyles = makeStyles((theme) => ({
  goback: {
      padding: "0px 20px",
      cursor:"pointer",
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

const socket = io.connect("http://13.209.10.67")

const ReviewDetail = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();


  const params = useParams();
  const bookId = params.bookid;
  const reviewId = params.reviewid;

  // 코멘트로 들어온것인지 아닌지 쿼리스트링으로 확인하기 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const is_comment = JSON.parse(queryParams.get("comment")) 

  //permit boolean
  const is_modal = useSelector((state) => state.permit.is_modal);
  const is_edit_modal = useSelector((state) => state.permit.is_edit_modal)
  const is_editting = useSelector((state) => state.comment.edit_id);


  const [commentContent, setCommentContent] = useState("");
  const reviewDetail = useSelector((state) => state.review.review_detail);
  const {book, comments, content, koreaTime,hashtags, image, likeCount, myLike, quote, user } = reviewDetail;

  const userId = useSelector((state) => state.user.user._id); //내 아이디
  const nickname = useSelector((state) => state.user.user.nickname);
  const profileImage = useSelector((state) => state.user.user.profileImage)



  const [is_empty, setIsEmpty] = useState(false)


  const token = localStorage.getItem('token');
  if(!token){
    history.push('/login')
    dispatch(permitAction.showNav(true));
  }

  const topRef = useRef();  //화면에 들어왔을 때, 가장 상단을 먼저 보여주기
  const bottomRef = useRef(); // 댓글을 작성했을 때, 가장 최신의 댓글을 보여주기 위한 ref
  const topComment = useRef(); // 댓글로 화면에 들어왔을 경우, 첫번째 댓글을 보여주기 위한 ref

  const scrollToTop = () => {
    topRef.current.scrollIntoView({behavior:"smooth"})
  }

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" })
  }

  const scrollTopComment = () => {
    topComment.current.scrollIntoView({behavior:"smooth"})
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

    const noti_info = {
      review : reviewId,
      writer : userId,
      target : user?.id,
    }
    socket.emit("comment", noti_info)
    setCommentContent("");
    scrollToBottom()
  };

  //좋아요 클릭
  const clickLikeButton = () => {
    //리뷰 디테일에 들어왔다는 것은 로그인을 했다는 의미이니 로그인 체크 x
    dispatch(reviewAction.LikeSV(bookId, reviewId));
  };

  //프로필 사진 클릭 시 피드 보러가기
  const gotoFeed = (user_id)=>{
    if(is_my_post){
      history.push('/myfeed')
    }
    else{
      history.push(`/otherUser/${user_id}`)
    }
  }

  //네비게이션을 없애고, 리뷰 상세를 불러오기
  useEffect(() => {
    dispatch(permitAction.showNav(false));
    dispatch(reviewAction.getDetailReviewSV(bookId, reviewId));
    dispatch(reviewAction.getFeedId(bookId, reviewId)); // 수정 및 삭제를 위한 feedId
    
    socket.on("comment", () => {
      console.log("-------소켓이 연결되었는가요?",socket.connected)
    })

    if(is_comment) {
      //comment를 통해서 들어왔을 때는 comment 위치로 이동.
      scrollTopComment()
    }else{
      //그냥 들어왔을 때는 상단으로 scroll을 이동. 
      scrollToTop()
    }

    return () => {
      dispatch(permitAction.showEditModal(false));
    }
  }, []);


  
  return (
    <Transition in={true} timeout={200} appear>
      {(status)=>(
      <Container className={`pageSlider pageSlider-${status}`}> 
         {is_edit_modal && <EditModal/>}
         {is_modal && <CommentModal />}
            <Head>
                <ArrowBackIcon 
                ref={topRef}
                className={classes.goback}
                onClick = {()=>{goBack()}}
                />
            </Head>
            <Outter>

            <CommentUserBox>

            <UserLeftBox>
              <ImgWrapper onClick={()=>{gotoFeed(user?.id)}}>
                <ProfileImg src={images[profileImage]} />
              </ImgWrapper>

              <Box direction={"column"}>
                <Box direction={"row"}>
                  <UserName>{user?.nickname}</UserName>
                 
                </Box>
                <CreatedAt >{koreaTime}</CreatedAt>
              </Box>

            </UserLeftBox>

            <UserRightBox>
              
              {is_my_post && 
                <MoreHorizIcon
                  style={{ color: "#9e9e9e", cursor:"pointer" }}
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
                  {hashtags?.map((tag, idx) => {
                     return <HashTag key={idx}>{`#${tag} `}</HashTag>
                    })}
                  </HashTagBox>
                  <ImageBox>
                    <Image src={image}/>
                  </ImageBox>
                </ReviewContent>
                <ReactionBar>
                  {
                    myLike ?
                    <Div 
                    style={{cursor:"pointer"}}
                    onClick={() => {
                      clickLikeButton();
                    }}><FavoriteIcon className={classes.like}   
                   />좋아요 {likeCount} 개</Div>
                    :
                    <Div onClick={() => {
                      clickLikeButton();
                    }} ><FavoriteBorderIcon className={classes.like} 
                    />좋아요 {likeCount} 개</Div>
                  }
                  
                   <Hr></Hr>
                   <Div>댓글 {comments?.length} 개</Div>
                </ReactionBar>

            </Outter>
            <CommentWrapper ref={topComment}>
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
        <BottomDiv ref={bottomRef}></BottomDiv>
      </Container>
      )}
      {/* <BottomDiv ref={bottomRef}></BottomDiv> */}
      
      </Transition>
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

@media ${(props) => props.theme.tablet} {
  width: 100%;
}

@media ${(props) => props.theme.desktop} {
  width: 100%;
}
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
font-size:14px;
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
white-space: pre-line;
font-size:14px;
`;

const HashTagBox = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
list-style: none;
padding: 15px 20px 10px 20px;
flex-wrap: wrap;
margin:0px;
`;

const HashTag = styled.div`
border: 1px solid ${Color.black};
border-radius: 10px;
color: ${Color.black};
font-size: 14px;
margin: 0px 8px 8px 0px;
padding: 5px 7px;
`

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

  @media ${(props) => props.theme.tablet} {
    width: 420px;
  }
  
  @media ${(props) => props.theme.desktop} {
    width: 420px;
  }
`;

const CommentInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 45px 0 16px;
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