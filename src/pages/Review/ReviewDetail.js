//import 부분
import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import io from "socket.io-client"

import { actionCreators as commentAction } from "../../redux/modules/comment"
import { actionCreators as reviewAction } from "../../redux/modules/review"
import { actionCreators as permitAction } from "../../redux/modules/permit"
import { actionCreators as collectionActions } from "../../redux/modules/collection"

import { history } from "../../redux/configStore"
import { useParams } from "react-router"
import { useLocation } from "react-router-dom"

import styled from "styled-components"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import FavoriteIcon from "@material-ui/icons/Favorite"
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined"
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined"
import BookmarkIcon from "@material-ui/icons/Bookmark"
import LikeLottie from "../../img/lottie/LikeLottie"
import { makeStyles } from "@material-ui/core/styles"

import { EditModal, CommentModal } from "../../modals"
import { Comment, SelectBookCard } from "../../components"

import { images } from "../../shared/Image"
import Color from "../../shared/Color"
import Loading from "../ETC/Loading"

import ReactGA from "react-ga"

const useStyles = makeStyles(theme => ({
  goback: {
    padding: "0px 20px",
    cursor: "pointer",
  },
  icon: {
    margin: "0px 10px",
  },
  smile: {
    fontSize: "30px",
    padding: "0px 20px",
  },
  like: {
    margin: " 0px 5px",
  },
}))

const socket = io.connect("https://ohbin.shop")

const ReviewDetail = props => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const params = useParams()
  const bookId = params.bookid
  const reviewId = params.reviewid

  // 코멘트로 들어온것인지 아닌지 쿼리스트링으로 확인하기
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const is_comment = JSON.parse(queryParams.get("comment"))

  //permit boolean
  const is_modal = useSelector(state => state.permit.is_modal)
  const is_edit_modal = useSelector(state => state.permit.is_edit_modal)
  const is_editting = useSelector(state => state.comment.edit_id)
  const is_loading = useSelector(state => state.permit.is_loading)

  const [commentContent, setCommentContent] = useState("")
  const reviewDetail = useSelector(state => state.review.review_detail)
  const {
    book,
    comments,
    content,
    koreaTime,
    hashtags,
    image,
    likeCount,
    myLike,
    quote,
    user,
    bookmark,
  } = reviewDetail

  const userId = useSelector(state => state.user.user._id) //내 아이디
  const profileImage = user?.profileImage

  const [is_empty, setIsEmpty] = useState(false)

  const token = localStorage.getItem("token")
  if (!token) {
    history.push("/login")
    dispatch(permitAction.showNav(true))
  }

  const topRef = useRef() //화면에 들어왔을 때, 가장 상단을 먼저 보여주기
  const bottomRef = useRef() // 댓글을 작성했을 때, 가장 최신의 댓글을 보여주기 위한 ref
  const topComment = useRef() // 댓글로 화면에 들어왔을 경우, 첫번째 댓글을 보여주기 위한 ref

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollTopComment = () => {
    topComment.current?.scrollIntoView({ behavior: "smooth" })
  }

  //내 포스트인지 확인
  let is_my_post = false

  if (userId === user?.id) {
    is_my_post = true
  }

  //피드의 아이디 가져오기
  const getFeedId = () => {
    dispatch(reviewAction.getFeedId(bookId, reviewId))
  }

  //수정하기 모달을 띄우기
  const showEditModal = () => {
    dispatch(permitAction.showEditModal(true))
  }

  //뒤로가기
  const goBack = () => {
    history.goBack()
  }

  //댓글 작성함수
  const writeComment = () => {
    if (commentContent === "") {
      setIsEmpty(true)
      return
    }
    const comment_info = {
      comment: commentContent,
      bookId: bookId,
      reviewId: reviewId,
      userInfo: user?._id,
    }

    dispatch(commentAction.addCommentSV(comment_info))

    setCommentContent("") // 댓글 작성 후 빈칸 만들기
    scrollToBottom() // 댓글 작성후 최신 댓글로 스크롤 이동
  }

  //lottie 좋아요
  const [likebtn, setLikeBtn] = useState(false)
  //좋아요 클릭
  const clickLikeButton = () => {
    const reviewUserId = user?._id
    //리뷰 디테일에 들어왔다는 것은 로그인을 했다는 의미이니 로그인 체크 x
    dispatch(reviewAction.LikeSV(bookId, reviewId, reviewUserId))

    if (!myLike) {
      setLikeBtn(true)
      setTimeout(() => {
        setLikeBtn(false)
      }, 3000)
    }
  }

  //북마크 클릭
  const clickBookMarkButton = () => {
    dispatch(reviewAction.bookMarkSV(bookId, reviewId))
  }

  //프로필 사진 클릭 시 피드 보러가기
  const gotoFeed = user_id => {
    if (is_my_post) {
      history.push("/myfeed")
    } else {
      history.push(`/otherUser/${user_id}`)
    }
  }

  //태그 선택하면 컬렉션 검색
  const searchCollection = hashtag => {
    dispatch(collectionActions.searchCollectionSV(hashtag))
  }

  useEffect(() => {
    //처음 들어오면, 접속한 유저의 토큰을 보내기
    socket.emit("token", `Bearer ${localStorage.getItem("token")}`)
  }, [])

  //네비게이션을 없애고, 리뷰 상세를 불러오기
  useEffect(() => {
    dispatch(permitAction.showNav(false))
    dispatch(reviewAction.getDetailReviewSV(bookId, reviewId))
    dispatch(reviewAction.getFeedId(bookId, reviewId)) // 수정 및 삭제를 위한 feedId
    setTimeout(() => {
      dispatch(permitAction.isLoading(false))
    }, 200)
    if (is_comment) {
      //comment를 통해서 들어왔을 때는 comment 위치로 이동.
      scrollTopComment()
    } else {
      //그냥 들어왔을 때는 상단으로 scroll을 이동.
      scrollToTop()
    }

    return () => {
      dispatch(permitAction.showEditModal(false))
    }
  }, [bookId, dispatch, is_comment, reviewId])

  useEffect(() => {
    if (is_comment) {
      //comment를 통해서 들어왔을 때는 comment 위치로 이동.
      scrollTopComment()
    } else {
      //그냥 들어왔을 때는 상단으로 scroll을 이동.
      scrollToTop()
    }
  }, [is_loading, is_comment])

  return (
    <React.Fragment>
      {is_loading ? (
        <Loading />
      ) : (
        <Container>
          <EditModal is_edit_modal={is_edit_modal} />
          <CommentModal is_modal={is_modal} />
          <Head>
            <ArrowBackIcon
              ref={topRef}
              className={classes.goback}
              onClick={() => {
                goBack()
              }}
            />
          </Head>
          <Outter>
            <CommentUserBox>
              <UserLeftBox>
                <ImgWrapper
                  onClick={() => {
                    gotoFeed(user?.id)
                  }}
                >
                  <ProfileImg src={images[profileImage]} />
                </ImgWrapper>

                <Box direction={"row"}>
                  <Box direction={"row"}>
                    <UserName>{user?.nickname}</UserName>
                  </Box>
                  <CreatedAt>{koreaTime}</CreatedAt>
                </Box>
              </UserLeftBox>

              <UserRightBox>
                {is_my_post && (
                  <MoreHorizIcon
                    style={{ color: "#9e9e9e", cursor: "pointer" }}
                    onClick={() => {
                      showEditModal()
                      getFeedId()
                    }}
                  />
                )}
              </UserRightBox>
            </CommentUserBox>

            <SelectBookCard {...book} is_reviewDetail />
            <ReviewContent>
              {quote ? <Quote> {quote}</Quote> : ""}
              {content ? <Content>{content}</Content> : ""}

              <ImageBox>
                {likebtn && <LikeLottie />}
                <Image src={image} />
              </ImageBox>
            </ReviewContent>

            <HashTagBox>
              {hashtags?.map((tag, idx) => {
                return (
                  <HashTag
                    onClick={() => {
                      searchCollection(tag)
                      ReactGA.event({
                        category: "Button",
                        action: "click hashtag button",
                        label: "hashtag",
                      })
                    }}
                    key={idx}
                  >{`#${tag} `}</HashTag>
                )
              })}
            </HashTagBox>

            <LikeCommentBox>
              <CountBox>
                {myLike ? (
                  <FavoriteIcon
                    style={{
                      fontSize: "20px",
                      color: "#67332e",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      clickLikeButton()
                    }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    style={{
                      fontSize: "20px",
                      color: Color.fontBlack,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      clickLikeButton()
                      ReactGA.event({
                        category: "Button",
                        action: "click like button",
                        label: "like",
                      })
                    }}
                  />
                )}
                <CountText>{likeCount}개</CountText>
              </CountBox>

              <CountBox>
                <SmsOutlinedIcon
                  style={{
                    fontSize: "20px",
                    color: Color.fontBlack,
                    cursor: "pointer",
                  }}
                />
                <CountText> {comments?.length} 개</CountText>
              </CountBox>

              <CountBox>
                {bookmark ? (
                  <BookmarkIcon
                    style={{
                      fontSize: "20px",
                      color: Color.fontBlack,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      clickBookMarkButton()
                    }}
                  />
                ) : (
                  <BookmarkBorderOutlinedIcon
                    style={{
                      fontSize: "20px",
                      color: Color.fontBlack,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      clickBookMarkButton()
                    }}
                  />
                )}

                <CountText> 스크랩</CountText>
              </CountBox>
            </LikeCommentBox>
          </Outter>
          <CommentWrapper ref={topComment}>
            {comments
              ? comments.map((comment, idx) => {
                  return <Comment {...comment} key={comment._id} />
                })
              : ""}
          </CommentWrapper>
          {is_editting === "" ? (
            <CommentInputBox>
              <InputBox>
                <CommentInput
                  className={is_empty ? "shake-horizontal" : null}
                  placeholder={
                    is_empty
                      ? "댓글 내용을 작성해주세요"
                      : "지금 댓글을 남겨보세요"
                  }
                  color={is_empty ? "#e53935" : Color.fontGray}
                  onChange={e => {
                    setCommentContent(e.target.value)
                  }}
                  onFocus={() => {
                    setIsEmpty(false)
                  }}
                  value={commentContent}
                  maxLength="150"
                  onKeyPress={e => (e.key === "Enter" ? writeComment() : null)}
                />
                <InputSpan>
                  <InputI></InputI>
                </InputSpan>
              </InputBox>
              <CommentWriteButton
                onClick={() => {
                  writeComment()
                  ReactGA.event({
                    category: "Button",
                    action: "write comment",
                    label: "comment",
                  })
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
    </React.Fragment>
  )
}

const BottomDiv = styled.div`
  height: 70px;
  display: invisible;
  width: 1px;
`

const UserRightBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
`

const ImgWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  box-sizing: border-box;
  margin-right: 10px;
`

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const CommentUserBox = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`

const Box = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: flex-start;
  align-items: center;
`

const UserLeftBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
`

const UserName = styled.div`
  font-size: 14px;
  font-weight: normal;
  margin: 0px 8px 0px 0px;
  width: auto;
  height: auto;
  min-width: 30px;
`

const CreatedAt = styled.p`
  font-size: 10px;
  color: #9e9e9e;
  opacity: 0.5;
  margin: 0px;
`

const Container = styled.div`
  background: ${Color.mainColor};
  width: 100vw;
  height: auto;
  margin-bottom: 70px;
  position: absolute;

  @media ${props => props.theme.mobile} {
    padding-bottom: 150px;
  }

  @media ${props => props.theme.tablet} {
    width: 100%;
    padding-bottom: 130px;
  }

  @media ${props => props.theme.desktop} {
    width: 100%;
    padding-bottom: 130px;
  }
`

const Head = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  height: 56px;
`

const Outter = styled.div`
  width: 100%;
  height: auto;
  // border: 1px solid ${Color.black};
  margin: 0 auto;
  border-radius: 16px;
`

const ReviewContent = styled.div``

const Quote = styled.div`
  margin-bottom: 16px;
  font-size: 14px;
  font-family: "Noto Serif KR", serif;
  font-weight: bold;
  white-space: pre-line;
  margin: 0px 20px 16px 20px;
  border-radius: 10px;
  color: ${Color.quote};
`

const Content = styled.div`
  margin-bottom: 16px;
  padding: 0px 20px;
  white-space: pre-line;
  font-size: 14px;
`

const HashTagBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  padding: 15px 20px 10px 20px;
  flex-wrap: wrap;
  margin: 0px;
  border-bottom: 1px solid ${Color.CardHashTag};
`

const HashTag = styled.div`
  border: 1px solid ${Color.CardHashTag};
  border-radius: 10px;
  color: ${Color.hashTagFont};
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
  position: relative;
`

const Image = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
`

const CommentWrapper = styled.div`
  width: 100%;
  height: auto;
`

const CommentInputBox = styled.div`
  width: 100%;
  height: 72px;
  box-sizing: border-box;
  margin-top: 20px;
  border-top: 1px solid ${Color.gray3};
  background-color: ${Color.mainColor};
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${props => props.theme.mobile} {
    width: 100vw;
  }

  @media ${props => props.theme.tablet} {
    width: 420px;
  }

  @media ${props => props.theme.desktop} {
    width: 420px;
  }
`
//확인
const InputBox = styled.div`
  position: relative;
  width: 90%;
  height: 45px;
  border-radius: 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CommentInput = styled.input`
  @media ${props => props.theme.mobile} {
    width: 90vw;
  }

  @media ${props => props.theme.tablet} {
    width: 90%;
  }

  @media ${props => props.theme.desktop} {
    width: 90%;
  }
  height: 45px;
  padding: 0 40px 0 16px;
  font-size: 14px;
  background-color: ${Color.mainColor};
  border: none;
  border: 1px solid ${Color.line};
  ::placeholder {
    color: ${props => props.color};
    font-family: "Roboto", sans-serif;
    letter-spacing: -0.5px;
    font-size: 14px;
  }

  :focus {
    outline: none;
    ~ span:after {
      width: 100%;
      transition: 0.2s;
      transition-delay: 0.6s;
    }
    ~ span:before {
      width: 100%;
      transition: 0.2s;
      transition-delay: 0.6s;
    }
    ~ span:after {
      transition-delay: 0.2s;
    }
    ~ span i:after {
      height: 100%;
      transition: 0.2s;
    }
    ~ span i:before {
      height: 100%;
      transition: 0.2s;
    }
    ~ span i:after {
      transition-delay: 0.4s;
    }
  }
`

const InputSpan = styled.span`
  :before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 1px;
    background-color: ${Color.gray5};
    transition: 0.2s;
    transition-delay: 0.2s;
  }
  :after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 1px;
    background-color: ${Color.gray5};
    transition: 0.2s;
    transition-delay: 0.2s;
  }
  :after {
    top: auto;
    bottom: 0;
    right: auto;
    left: 0;
    transition-delay: 0.6s;
  }
`

const InputI = styled.i`
  :after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 0;
    background-color: ${Color.gray5};
    transition: 0.2s;
  }
  :before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 0;
    background-color: ${Color.gray5};
    transition: 0.2s;
  }
  :after {
    left: auto;
    right: 0;
    top: auto;
    bottom: 0;
    transition-delay: 0.4s;
  }
`

const CommentWriteButton = styled.div`
  cursor: pointer;
  font-size: 16px;
  color: ${Color.fontGray};
  position: absolute;
  right: 30px;
  top: 23px;
  font-weight: 700;
  height: 20px;
`

const CountBox = styled.div`
  display: flex;
  align-items: flex-end;
`

const CountText = styled.p`
  font-size: 14px;
  margin: 0px 0px 0px 8px;
  cursor: pointer;
  color: ${Color.fontBlack};
`

const LikeCommentBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${Color.mainColor};
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid ${Color.CardHashTag};
`

export default ReviewDetail
