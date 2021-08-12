import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";
import jwt_decode from "jwt-decode";
import axios from "axios";


//actions
const GET_USER = "GET_USER";
const DELETE_USER = "DELETE_USER";
const GET_USER_REVIEW = "GET_USER_REVIEW";
const SET_USER = "user/SET_USER";
const LOG_OUT = "user/LOG_OUT";
const IS_ME = "user/IS_ME";
const FOLLOW = "user/FOLLOW"
const GET_FOLLOWING_LIST = "user/GET_FOLLOWING_LIST"
const GET_FOLLOWER_LIST = "user/GET_FOLLOWER_LIST"



//actioncreator
const getUser = createAction(GET_USER, (user)=>({user}));
const deleteUser = createAction(DELETE_USER, (userId)=>({userId}));
const getUserReview = createAction(GET_USER_REVIEW, (review_list)=>({review_list}));
const setUser = createAction(SET_USER, (user) => ({user}));
const logOut = createAction(LOG_OUT, ()=> ({}));
const isMe = createAction(IS_ME, (is_me)=>({is_me}));
const follow = createAction(FOLLOW, (user) => ({user}))
const getFollowingList = createAction(GET_FOLLOWING_LIST, (list) => ({list}))
const getFollowerList = createAction(GET_FOLLOWER_LIST, (list) => ({list}))



//initial
const initialState = {
    user : {
      userId : "",
      nickname: "",
      token: ""
    },
    review_list: [],
    is_login: false,
    is_me: false,
    follow_list : [],
};


//한사람의 사용자 정보 불러오기
const getUserSV = (id)=>{
  return function(dispatch, getState, {history}){
    instance.get(`/users/${id}`)
    .then((res)=>{
      console.log(res)
      dispatch(getUser(res.data));
    })
    .catch((err)=>{
      window.alert("사용자 정보 로딩 실패")
    })
  }
}



//로그인 한 상태인지 체크
const loginCheck = () => {
  return function (dispatch, getState, { history }) {
    const user = localStorage.getItem('token') ? true : false;
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const userId = decoded.userId;
    const nickname = decoded.nickname;

    //localStorage에 토큰이 있는 상태(이미 로그인을 한 상태라면)
    if (user) {
      dispatch(setUser({id: userId, nickname: nickname, token: token}));
    } else {
      console.log("로그인상태아님");
    }
  };
};

//회원정보 등록
const setUserSV = (userId, nickname) => {
  return function(dispatch, getState, {history}){
    instance
    .put(`/users/nickname/${userId}` , {
      nickname: nickname
    })
    .then((res)=>{
      const token = res.data;
      localStorage.setItem('token', token);
      dispatch(setUser({userId: userId, nickname: nickname, token: token}));
      history.push('/')
    })
    .catch((err)=>{
      console.log(err);
      window.alert('회원정보 등록 실패')
    })

  }
    
}


//회원탈퇴
const deleteUserSV = (id) =>{
  return function(dispatch, getState, {history}){
    instance.delete(`/users/${id}`)
    .then((res)=>{
      window.alert("회원탈퇴");
      console.log(res)
      dispatch(deleteUser(id));
    })
    .catch((err)=>{
      window.alert("회원탈퇴 실패");
    })
  }
}

//회원이 쓴 리뷰 불러오기
const getUserReviewSV = (id)=>{
  return function(dispatch, getState, {history}){
    instance.get(`users/${id}/reviews`)
    .then((res)=>{
      dispatch(getUserReview(res.data));
    })
    .catch((err)=>{
      window.alert("리뷰 불러오기 실패 ")
    })
  }
}

const followSV = (id) => {
  console.log("팔로우를 하겠습니다",id)
  return function(dispatch, getState, {history}){
    instance.put(`follow/${id}`)
    .then((res)=>{

    })
    .catch((err)=>{
      window.alert("팔로우 실패 ",err)
    })
  }
}

const getFollowingListSV = () => {
  return function(dispatch, getState, {history}){
    instance.get(`follow/followingList`)
    .then((res)=>{
      dispatch(getFollowingList(res.data.followingList))
    })
    .catch((err)=>{
      window.alert("팔로우 실패 ",err)
    })
  }
}

const getFollowerListSV = () => {
  return function(dispatch, getState, {history}){
    instance.get(`follow/followerList`)
    .then((res)=>{
      dispatch(getFollowerList(res.data.followerList))
    })
    .catch((err)=>{
      window.alert("팔로우 실패 ",err)
    })
  }
}



//reducer
export default handleActions(
    {
        [GET_USER]: (state, action) =>
          produce(state, (draft) => {
            draft.user = action.payload.user;
        }),
        [DELETE_USER]: (state, action) =>
          produce(state, (draft) => {
            draft.user = [];
            draft.is_login= false;
            draft.is_me = false;
        }),
        [GET_USER_REVIEW]: (state, action) =>
          produce(state, (draft) => {
            draft.review_list = action.payload.review_list;
        }),
        [SET_USER]: (state, action)=>
        produce(state,(draft)=>{
          draft.user = action.payload.user;
          draft.is_login = true;
        }),
        [LOG_OUT] : (state, action)=>
        produce(state,(draft)=>{
          draft.is_login = false;
          draft.user = [];
          draft.is_me = false;
        }),
        [IS_ME] : (state, action)=>
        produce(state, (draft)=>{
          const token = localStorage.getItem('token');
          const decoded = jwt_decode(token);
          if(draft.user.userId === decoded.userId){
            draft.is_me = true;
          }
        }),
        [GET_FOLLOWING_LIST] : (state, action)=>
        produce(state, (draft)=>{
          draft.follow_list = action.payload.list
        }),
        [GET_FOLLOWER_LIST] : (state, action)=>
        produce(state, (draft)=>{
          draft.follow_list = action.payload.list
        }),
    },
    initialState
  );
  

const actionCreators = {
  getUserSV,
  deleteUserSV,
  getUserReviewSV,
  setUserSV,
  setUser,
  loginCheck,
  logOut,
  isMe,
  followSV,
  getFollowingListSV,
  getFollowerListSV,
};
  
export { actionCreators };