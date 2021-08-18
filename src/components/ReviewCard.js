//import 부분
import React from "react";
import styled from "styled-components";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Color from "../shared/Color";

import profile from "../img/profile.svg"
import {images} from "../shared/Image" 

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as permitActions } from "../redux/modules/permit";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configStore";


const ReviewCard = (props) => {
  const dispatch = useDispatch();

  //imformation for reviewCard
  const {
    content,
    hashtags,
    quote,
    created_at,
    book,
    _id,
    myLike,
    likeCount,
    comments,
    image,
    user,
  } = props;
  const bookTitle = book?.title.split("(")[0]
  const bookAuthor = `${book.author} 저`

  //permit check 
  const is_login = useSelector((state) => state.user.is_login);
  const is_follow = useSelector(state => state.user.is_follow)

  const userId = useSelector((state) => state.user.user._id);
  const cardUserId = user.id
  const profileImage = user?.profileImage;

  let is_my_post = false;

  if (cardUserId === userId) {
    is_my_post = true;
  }

  //좋아요 클릭
  const clickLikeButton = () => {
    if(is_login) {
      dispatch(reviewActions.LikeSV(book._id, _id));
      return;
    }else{
      dispatch(permitActions.showLoginModal(true))
    }
  };

  //피드 아이디를 리덕스에 저장하기
  const getFeedId = () => {
    dispatch(reviewActions.getFeedId(book._id, _id));
  };

  //수정 모달 보여주기 
  const showEditModal = () => {
    dispatch(permitActions.showEditModal(true));
  };

  //디테일 페이지로 이동
  const goToReviewDetail = () => {
    if(is_login){
      history.push(`/reviewdetail/${book._id}/${_id}`)
    }else{
      dispatch(permitActions.showLoginModal(true))
    }
  }

  //댓글을 클릭했을 때, 디테일 페이지로 이동
  const goDetailByComment = () => {
    if(is_login){
      history.push(`/reviewdetail/${book._id}/${_id}?comment=true`)
    }else{
      dispatch(permitActions.showLoginModal(true))
    }
  }

  //다른 유저의 피드에 들어가기
  const goToUserFeed = (user_id) => {
    //로그인 하지 않으면 사용 못함
    if(!is_login){
      dispatch(permitActions.showLoginModal(true))
      return;
    }

    if (cardUserId === userId) {
      //내 프로필을 클릭하면 내 피드로 이동
      history.push("/myfeed");
    }else{
      //다른 유저피드이면 다른 유저 피드로 이동 
      history.push(`/otherUser/${user_id}`)
    }
  }


  const follow = () => {
    dispatch(userActions.followSV(user.id))
    dispatch(userActions.isFollow(true))
  }

  return (
    <React.Fragment>
      <CartWrapper>
        <CardBox>
          <CommentUserBox>

            <UserLeftBox>
              <ImgWrapper onClick={()=>goToUserFeed(user.id)}>
                <ProfileImg src={images[profileImage]} />
              </ImgWrapper>

              <Box direction={"column"}>
                <Box direction={"row"}>
                  <UserName onClick={()=>goToUserFeed(user.id)}>{user.nickname}</UserName>
                  {!is_my_post &&  
                  <Follow onClick={()=>{follow()}}>
                    {is_follow ? "팔로잉" : "팔로우"}
                  </Follow>}
                </Box>
                <CreatedAt>{created_at}</CreatedAt>
              </Box>
            </UserLeftBox>

            <UserRightBox>
              
              {is_my_post && (
                <MoreHorizIcon
                  style={{ color: "#9e9e9e" }}
                  onClick={() => {
                    showEditModal();
                    getFeedId();
                  }}
                />
              )}
            </UserRightBox>
          </CommentUserBox>

          <ContentBox
            onClick={() => {
              goToReviewDetail();
            }}
          >
            <BookTitle>
              {bookTitle} | {bookAuthor}
            </BookTitle>
            <Quote >{quote}</Quote>
            <Content>{content}</Content>

            <HashTagBox>
              {hashtags.map((tag, idx) => (
                <HashTag key={idx}>{`#${tag} `}</HashTag>
              ))}
            </HashTagBox>
          </ContentBox>

          <LikeCommentBox>
            <LikeBox>
              {myLike ? (
                <FavoriteIcon
                  style={{ fontSize: "20px", color: Color.mainColor }}
                  onClick={() => {
                    clickLikeButton();
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  style={{ fontSize: "20px", color: Color.mainColor }}
                  onClick={() => {
                    clickLikeButton();
                  }}
                />
              )}
              <LikeText>{likeCount}개</LikeText>
            </LikeBox>
            <WriteCommentBox>
              <CommentCount onClick={() => {goDetailByComment()}}>댓글 {comments.length} 개</CommentCount>
            </WriteCommentBox>
          </LikeCommentBox>

          {image ?
          <ImageBox>
            <Image
              url={image}
              onClick={() => {
                goToReviewDetail();
              }}
            />
          </ImageBox> : ""}
        </CardBox>
      </CartWrapper>
    </React.Fragment>
  );
};

const CartWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardBox = styled.div`
  width: 90vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  margin: 16px 16px 0px 16px;
  background-color: ${Color.mainColor};
  border: 1px solid ${Color.black};
  padding-bottom: 40px;
  border-radius: 16px;
  position: relative;
  overflow:hidden;

  @media ${(props) => props.theme.tablet} {
    width: 90%;
  }

  @media ${(props) => props.theme.desktop} {
    width: 90%;
  }

`;

const CommentUserBox = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`;

const UserLeftBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
`;

const ImgWrapper = styled.div`
width:30px;
height:30px;
border-radius:70%;
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


const Box = styled.div`
display:flex;
flex-direction:${(props) => props.direction};
`

const Follow = styled.div`
font-weight:bold;
font-size:14px;
`

const UserRightBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
`;

const ImageBox = styled.div`
  width:90vw;
  height:90vw;

  @media ${(props) => props.theme.tablet} {
    width:400px;
    height:400px;
  }

  @media ${(props) => props.theme.desktop} {
    width:400px;
    height:400px;
  }
  
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  background-image:url(${(props) => props.url});
  background-size:cover;
  background-position:center center;
`;

const UserName = styled.p`
  font-size: 14px;
  font-weight: normal;
  margin: 0px 8px 0px 0px;
`;

const CreatedAt = styled.p`
  font-size: 10px;
  color: #9e9e9e;
  opacity: 0.5;
  margin: 0px;
`;

const ContentBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  aligh-items: flex-start;
  padding: 0px 24px;
`;

const BookTitle = styled.p`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.9px;
  color: ${Color.black};
  margin: 0px 0px 8px 0px;
`;

const Quote = styled.p`
  font-size: 14px;
  font-weight: bold;
  line-height: 1.43;
  letter-spacing: -0.28px;
  margin: 8px 0px;
  color: ${Color.black};
  font-family: "Noto Serif KR", serif;
  font-weight: 800;
  white-space: pre-line;
  background:${Color.quote};
  padding:12px;
  border-radius:10px;
`;

const Content = styled.p`
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: -0.28px;
  margin: 0px;
  color: ${Color.fontgray};
  white-space: pre-line;
`;

const HashTagBox = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  padding: 15px 0px 10px 0px;
  flex-wrap: wrap;
  margin:0px;
`;

const HashTag = styled.li`
  border: 1px solid ${Color.black};
  border-radius: 10px;
  color: ${Color.black};
  font-size: 14px;
  margin: 0px 5px 8px 0px;
  padding: 8px;
`;

const LikeBox = styled.div`
  display: flex;
  align-items: flex-end;
`;

const LikeText = styled.p`
  font-size: 16px;
  margin: 0px 0px 0px 8px;
  color: ${Color.mainColor};
`;

const LikeCommentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Color.black};
  box-sizing: border-box;
  position: absolute;
  width: 55%;
  height: 36px;
  right: 0;
  bottom: 18px;
  border-radius: 20px 0px 0px 20px;
`;

const WriteCommentBox = styled.div`
  display: flex;
`;

const CommentCount = styled.p`
  font-size: 16px;
  margin: 0px 0px 0px 8px;
  color: ${Color.mainColor};
`;

export default ReviewCard;
