import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

import { actionCreators as reviewActions } from "./review";
import { actionCreators as permitActions } from "./permit";

//소켓
import io from "socket.io-client"
const socket = io.connect("https://ohbin.shop")
  

//actions
const GET_COMMENT = "comment/GET_COMMENT";
const ADD_COMMENT = "comment/ADD_COMMENT";
const EDIT_COMMENT = "comment/EDIT_COMMENT";
const DELETE_COMMENT = "comment/DELETE_COMMENT";
const GET_COMMENT_ID = "comment/GET_COMMENT_ID"
const GET_EDIT_ID = "comment/GET_EDIT_ID"


//actioncreator
const getComment = createAction(GET_COMMENT, (comment_list) => ({ comment_list }));
const addComment = createAction(ADD_COMMENT, (comment_info) => ({ comment_info }));
const editComment = createAction(EDIT_COMMENT, (id, comment) => ({id, comment}));
const deleteComment = createAction(DELETE_COMMENT, (id) => ({id}));
const getCommentId = createAction(GET_COMMENT_ID, (comment_id) => ({comment_id}))
const getEditId = createAction(GET_EDIT_ID, (edit_id) => ({edit_id}))

//initial
const initialState = {
    comment_list:[{
        username:"닉네임",
        content:"정말 감명깊은 리뷰입니다",
    }],
    comment_id:{
      commentId:"",
    },
    edit_id:"",
};


//comment를 서버에 add 하는 함수를 만들던중.
const addCommentSV = (commentInfo) => {
    const targetuser_id = commentInfo.userInfo; //해당 게시물의 유저 아이디 
    const comment = commentInfo.comment;
    const bookId = commentInfo.bookId;
    const reviewId = commentInfo.reviewId;

    return function(dispatch,{history}){
      instance.post(`/books/${bookId}/reviews/${reviewId}/comments`,{
          username:"",
          content: comment,
      })
        .then((res) => {
            const comment_info = {
              username:"저팔계",
              content:comment,
            }
            dispatch(addComment(comment_info));
            socket.emit("comment", targetuser_id)// 댓글 작성 성공시 소켓으로 아이디 보내주기
        })
        .then((res) => {
          dispatch(reviewActions.getDetailReviewSV(bookId, reviewId))
        })
        .catch((err) =>{
          history.push("*")
            console.log("댓글 추가 실패",err);
        })
    }
}

//댓글 수정
const editCommentSv = (content) => {

  return function (dispatch, getState, {history}){

    const commentId = getState().comment.comment_id
    const bookId = getState().review.feed_id.bookId
    const reviewId = getState().review.feed_id.reviewId


    instance
    .patch(`books/${bookId}/reviews/${reviewId}/comments/${commentId}`,
    {content : content})
    .then((res) => {
      // dispatch(editComment(content))
      dispatch(getEditId(""))// 댓글작성인풋 다시 화면에 나오게 만들기 
    })
    .then((res) => {
      dispatch(reviewActions.getDetailReviewSV(bookId, reviewId))
    })
    .catch((err)=>{
      history.push("*")
      console.log("댓글 수정 실패",err)

    })
  }
}

//댓글 삭제
const deleteCommentSV = (comment_info) => {

  console.log("삭제 기능이 실행됩니다.")

  return function (dispatch, getState, {history}){

    const commentId = getState().comment.comment_id
    const bookId = getState().review.feed_id.bookId
    const reviewId = getState().review.feed_id.reviewId
  

    instance
    .delete(`books/${bookId}/reviews/${reviewId}/comments/${commentId}`)
    .then((res)=>{
    })
    .then((res) => {
      dispatch(reviewActions.getDetailReviewSV(bookId, reviewId)) // 새로운 댓글 리스트를 불러오기
      dispatch(permitActions.showModal(false)) // 모달 닫아주기
    })
    .catch((err)=> {
      history.push("*")
      console.log("댓글 삭제 실패",err)

    })
    dispatch(deleteComment(commentId))
  }
}

const getEditCommentId = () => {
  return async function (dispatch, getState, {history}){
    const commentId = getState().comment.comment_id
    const bookId = getState().review.feed_id.bookId
    const reviewId = getState().review.feed_id.reviewId

    await dispatch(getEditId(commentId))
    await dispatch(reviewActions.getDetailReviewSV(bookId, reviewId)) 
    await dispatch(permitActions.showModal(false))
  }
}



//reducer
export default handleActions(
    {
        [GET_COMMENT]: (state, action) =>
        produce(state, (draft) => {
          draft.comment_list = action.payload.comment_list;
        }),
        [ADD_COMMENT]: (state, action) =>
        produce(state, (draft) => {
          draft.comment_list.unshift(action.payload.comment_info);
        }),
        [EDIT_COMMENT]: (state, action) => produce(state, (draft) => {
          let idx = draft.comment_list.findIndex((l) => l.id === action.payload.id);
          draft.comment_list[idx].comment = action.payload.comment;
        }),
        [DELETE_COMMENT]: ( state, action) => produce(state, (draft) => {
          draft.comment_list = draft.comment_list.filter((l,idx) => {
            return l.id !== action.payload.id
          })
        }),
        [GET_COMMENT_ID]: (state, action) => 
        produce(state, (draft) => {
          draft.comment_id = action.payload.comment_id
        }),
        [GET_EDIT_ID]: (state, action) => 
        produce(state, (draft) => {
          draft.edit_id = action.payload.edit_id
        })
    },
    initialState
  );
  

const actionCreators = {
    addComment,
    getComment,
    addCommentSV,
    editCommentSv,
    deleteCommentSV,
    getCommentId,
    getEditCommentId,
};
  
export { actionCreators };