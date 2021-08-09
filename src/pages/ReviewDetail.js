//import 부분
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentAction } from "../redux/modules/comment";
import {actionCreators as reviewAction } from "../redux/modules/review";
import { actionCreators as permitAction } from "../redux/modules/permit";
import { history } from "../redux/configStore";

import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import Comment from "../components/Comment";
import SelectBookCard from "../components/SelectBookCard";
import CommentModal from "../modals/CommentModal";
import Color from "../shared/Color";
import smile from "../img/smile.svg";

const ReviewDetail = (props) => {
  const dispatch = useDispatch();
  const is_modal = useSelector((state) => state.permit.is_modal);
  const is_editting = useSelector((state) => state.comment.edit_id);
  const [commentContent, setCommentContent] = useState("");
  const bookId = props.match.params.bookid;
  const reviewId = props.match.params.reviewid;
  const reviewDetail = useSelector((state) => state.review.review_detail);
  const { hashtags, quote, content, comments, book, image, likes, myLike, _id } = reviewDetail;
  const nickname = useSelector((state) => state.user);

  //댓글 작성함수
  const writeComment = () => {
    if(commentContent === "") return;
    const comment_info = {
      comment: commentContent,
      bookId: bookId,
      reviewId: reviewId,
      userInfo: "저팔계",
    };
    dispatch(commentAction.addCommentSV(comment_info));
    setCommentContent("");
  };

  //좋아요 클릭
  const clickLikeButton = () => {
    dispatch(reviewAction.LikeSV(book._id, _id));
  };

  //네비게이션을 없애고, 리뷰 상세를 불러오기
  useEffect(() => {
    dispatch(permitAction.showNav(false));
    dispatch(reviewAction.getDetailReviewSV(bookId, reviewId));
    dispatch(reviewAction.getFeedId(bookId, reviewId)); // 수정 및 삭제를 위한 feedId
  }, []);


  return (
      <React.Fragment>
        <ReviewDetailWrapper>
          <BackArrowBox>
            <ArrowBackIcon
                onClick={() => {
                  history.goBack();
                }}
            />
          </BackArrowBox>
          <ReviewDetailCard>
          <CardBox>
            <CommentUserBox>
              <UserLeftBox>
                <SmileImg src={smile}/><UserName>닉네임닉네임</UserName>
                <CreatedAt>2021.07.24 21:04</CreatedAt>
              </UserLeftBox>

              <UserRightBox>
                <BookmarkBorderIcon
                    style={{ color: "#9e9e9e", marginRight: "10px" }}
                />
                <MoreHorizIcon style={{ color: "#9e9e9e" }} />
              </UserRightBox>
            </CommentUserBox>

            <SelectBookCard {...book} is_reviewDetail />
            <ContentBox>
              <ContentTitle>{quote}</ContentTitle>
              <Content>{content}</Content>
              <HashTag>
                {hashtags.map((tag) => {
                  return `#${tag} `;
                })}
              </HashTag>
            </ContentBox>
            <Image src={image} />

            <LikeCommentWrapper>
              <LikeCommentButton>
                {myLike? ( <LikeBox onClick={() => {
                      clickLikeButton();
                    }}><a style={{color:"red"}}>❤</a> 좋아요 {likes}개</LikeBox>
                    ):
                ( <LikeBox onClick={() => {
                      clickLikeButton();
                    }}>♡ 좋아요 {likes}개</LikeBox>
                )}
                <WriteCommentBox>댓글 5개</WriteCommentBox>
              </LikeCommentButton>
            </LikeCommentWrapper>
          </CardBox>
          </ReviewDetailCard>
          <CommentWrapper>
          {comments.map((comment, idx) => {
            return <Comment {...comment} key={comment._id} />;
          })}
          </CommentWrapper>

          {is_editting === "" ? (
              <CommentInputBox>
                <CommentInput
                    placeholder="지금 댓글을 남겨보세요"
                    onChange={(e) => {
                      setCommentContent(e.target.value);
                    }}
                    value={commentContent}
                    onKeyUp={(e) => (e.key === "Enter" ? writeComment() : null)}
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
        </ReviewDetailWrapper>

        {is_modal && <CommentModal />}
      </React.Fragment>
  );
};

const SmileImg = styled.img`
  width: 13%;
  margin: 16px 8px 8px 0;
  
`;

const ReviewDetailWrapper = styled.div`
  width: 100%;
  height: 200%;
  background-color: ${Color.mainColor};
  box-sizing: border-box;
  padding-bottom: 50px;
  font-family: 'Noto Sans KR', sans-serif;
`;

const ReviewDetailCard = styled.div`
  width: 90%;
  height: auto;
  border: 1px solid black;
  margin: auto auto 16px auto;
  border-radius: 16px;
`;
const BackArrowBox = styled.div`
  height: 56px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px 0 20px;
  display: flex;
  align-items: center;
  background-color: ${Color.mainColor};
  
`;

const CardBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: ${Color.mainColor};
`;

const Image = styled.img`
  width: auto;
  height: auto;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
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
  align-items: center;
`;

const UserRightBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
`;

const UserName = styled.p`
  font-weight: bold;
  margin: -50px 8px 0 2.5em;
`;

const CreatedAt = styled.p`
  font-size: 10px;
  color: ${Color.fontGray};
  margin: 2px 8px 0 2.5rem;
`;

const ContentBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: auto;
  display: flex;
  flex-direction: column;

`;

const ContentTitle = styled.p`
  font-size: 14px;
  font-weight: bold;
  line-height: 1.43;
  letter-spacing: -0.28px;
  margin: -10px 20px 0 20px;
`;

const Content = styled.p`
  font-size: 14px;
  letter-spacing: -0.28px;
  color: ${Color.fontGray};
  margin: 8px 20px 0 20px;
  line-height: 1.43;
`;

const HashTag = styled.div`
  padding: 15px 0;
  color: ${Color.fontBlack};
  margin: 0 20px 0 20px;
  font-size: 14px;
`;

const LikeCommentWrapper = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0 24px;
`;

const LikeCommentButton = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid ${Color.fontBlack};
  border-radius: 25px;
  margin: 16px 8px 16px auto;
  display: grid;
  flex-direction: row;
  grid-template-columns: 1fr 1fr;
  box-sizing: border-box;
`;

const LikeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  color: ${Color.fontblack};
  letter-spacing: -0.28px;
  border-right: 1px solid ${Color.fontBlack};
`;

const WriteCommentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  color: ${Color.fontblack};
  letter-spacing: -0.28px;
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
  background-color: ${Color.mainColor};
  border: 1px solid ${Color.fontBlack};
  border-radius: 12px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${Color.fontGray};
    font-family: 'Roboto', sans-serif;
    letter-spacing: -0.5px;

  }
`;

const CommentWriteButton = styled.div`
  cursor: pointer;
  color: ${Color.fontGray};
  position: absolute;
  right: 30px;
  font-size: 14px;
  font-weight: 700;
  height: 20px;
}
`;

const CommentWrapper = styled.div`
width:100%;
height:auto;
padding-bottom:70px;
`

export default ReviewDetail;