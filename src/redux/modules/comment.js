import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";
import {history} from "../configStore"

//actions
const GET_COMMENT = "comment/GET_COMMENT";
const ADD_COMMENT = "comment/ADD_COMMENT";
const EDIT_COMMENT = "comment/EDIT_COMMENT";
const DELETE_COMMENT = "comment/DELETE_COMMENT";

//actioncreator
const getComment = createAction(GET_COMMENT, (comment_list) => ({ comment_list }));
const addComment = createAction(ADD_COMMENT, (comment) => ({ comment }));
const editComment = createAction(EDIT_COMMENT, (id, comment) => ({id, comment}));
const deleteComment = createAction(DELETE_COMMENT, (id) => ({id}));

//initial
const initialState = {
    comment_list:[{
        username:"닉네임",
        content:"정말 감명깊은 리뷰입니다",
    }]
};


//comment를 서버에 add 하는 함수를 만들던중.
const addCommentSV = (commentInfo) => {
    const userInfo = commentInfo.userInfo;
    const comment = commentInfo.comment;
    const bookId = commentInfo.bookId;
    const reviewId = commentInfo.reviewId;

    return function(dispatch){
      instance.post(`/books/${bookId}/reviews/${reviewId}/comments`,{
          user:userInfo,
          content: comment,
      })
        .then((res) => {
            console.log(res);
            dispatch(addComment(res.data));
        })
        .catch((err) =>{
            console.log("댓글 추가 실패",err);
        })
    }
}

//댓글 수정
const updateCommentSV = (comment_info) => {
    const commentId = comment_info.commentId;
    const bookId = comment_info.bookId;
    const reviewId = comment_info.reviewId;
    const comment = comment_info.comment;

  return function (dispatch, getState, {history}){
    instance
    .put(`books/${bookId}/reviews/${reviewId}/comments/${commentId}`,
    {content : comment})
    .then((res) => {
      console.log(res.data)
      dispatch(editComment())

    }).catch((err)=>{
      console.log("댓글 수정 실패",err)

    })
  }
}

//댓글 삭제
const deleteCommentSV = (comment_info) => {
  const commentId = comment_info.commentId;
  const bookId = comment_info.bookId;
  const reviewId = comment_info.reviewId;


  return function (dispatch, getState, {history}){
    instance
    .delete(`books/${bookId}/reviews/${reviewId}/comments/${commentId}`)
    .then((res)=>{

    })
    .catch((err)=> {
      console.log("댓글 삭제 실패",err)

    })
    dispatch(deleteComment(commentId))
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
          draft.comment_list.unshift(action.payload.comment);
        }),
        [EDIT_COMMENT]: (state, action) => produce(state, (draft) => {
          let idx = draft.comment_list.findIndex((l) => l.id === action.payload.id);
          draft.comment_list[idx].comment = action.payload.comment;
        }),
        [DELETE_COMMENT]: ( state, action) => produce(state, (draft) => {
          draft.comment_list = draft.comment_list.filter((l,idx) => {
            return l.id !== action.payload.id
          })
        })
    },
    initialState
  );
  

const actionCreators = {
    addComment,
    getComment,
    addCommentSV,
    updateCommentSV,
    deleteCommentSV,
};
  
export { actionCreators };