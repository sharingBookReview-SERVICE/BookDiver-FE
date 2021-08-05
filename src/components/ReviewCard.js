//import 부분
import React from "react";
import styled from "styled-components";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookImg from "../img/bookImg2.jpg";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { useDispatch } from "react-redux";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as permitActions } from "../redux/modules/permit";
import { history } from "../redux/configStore";

const ReviewCard = (props) => {
  //dispatch와 변수들
  const {
    content,
    hashtags,
    quote,
    created_at,
    book,
    _id,
    is_book_detail,
    likes,
    comments,
    image,
  } = props;
  const dispatch = useDispatch();

  //좋아요 클릭
  const clickLikeButton = (props) => {
    //props로부터 book와 reviewId를 받아오기
    dispatch(reviewActions.LikeSV(book._id, _id, likes));
    console.log(book._id, _id, likes);
  };

  const getFeedId = () => {
    dispatch(reviewActions.getFeedId(book._id, _id));
    console.log("----------카드에서", book._id, _id);
  };

  const showEditModal = () => {
    dispatch(permitActions.showModal(true));
  };

  return (
    <React.Fragment>
      <CardBox>
        <CommentUserBox>
          <UserLeftBox>
            <UserName>닉네임닉네임</UserName>
            <CreatedAt>{created_at}</CreatedAt>
          </UserLeftBox>

          <UserRightBox>
            <BookmarkBorderIcon
              style={{ color: "#9e9e9e", marginRight: "10px" }}
            />
            <MoreHorizIcon
              style={{ color: "#9e9e9e" }}
              onClick={() => {
                showEditModal();
                getFeedId();
              }}
            />
          </UserRightBox>
        </CommentUserBox>

        <ImageBox>
          <Image
            src={image}
            onClick={() => {
              history.push(`/reviewdetail/${book._id}/${_id}`);
            }}
          />
        </ImageBox>

        <ContentBox
          onClick={() => {
            history.push(`/reviewdetail/${book._id}/${_id}`);
          }}
        >
          <BookTitle>
            {book.title} | {book.author}{" "}
          </BookTitle>
          <Quote>{quote}</Quote>
          <Content>{content}</Content>
          <HashTag>
            {hashtags.map((tag) => {
              return `#${tag} `;
            })}
          </HashTag>
        </ContentBox>

        <LikeCommentBox>
          <LikeBox>
            <FavoriteIcon
              style={{ fontSize: "18px", color: "#1168d7" }}
              onClick={clickLikeButton}
            />
            <FavoriteBorderIcon
              style={{ fontSize: "18px", color: "#1168d7" }}
              onClick={clickLikeButton}
            />
            <LikeText>{likes}개</LikeText>
          </LikeBox>
          <WriteCommentBox>
            <CommentCount>댓글 개</CommentCount>
          </WriteCommentBox>
        </LikeCommentBox>
      </CardBox>
    </React.Fragment>
  );
};

const CardBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  margin: 0px 0px 6px 0px;
  background-color: #fff;
  position: relative;
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

const UserRightBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
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

const UserName = styled.p`
  font-size: 14px;
  font-weight: bold;
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
  letter-spacing: -0.28px;
  color: #1168d7;
  font-weight: bold;
  margin: 16px 0px 8px 0px;
`;

const Quote = styled.p`
  font-size: 14px;
  font-weight: bold;
  line-height: 1.43;
  letter-spacing: -0.28px;
  margin: 0px 0px 16px 0px;
`;

const Content = styled.p`
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: -0.28px;
  margin: 0px;
`;

const HashTag = styled.div`
  padding: 15px 0px;
  color: #1168d7;
  font-size: 14px;
`;

const LikeBox = styled.div`
  display: flex;
  align-items: flex-end;
`;

const LikeText = styled.p`
  font-size: 14px;
  margin: 0px 0px 0px 8px;
  color: #1168d7;
`;

const LikeCommentBox = styled.div`
  display: flex;
  padding: 10px 24px 18px 24px;
`;

const WriteCommentBox = styled.div`
  display: flex;
`;

const CommentCount = styled.p`
  font-size: 14px;
  margin: 0px 0px 0px 8px;
  color: #b5b5b5;
`;

export default ReviewCard;
