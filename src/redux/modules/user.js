import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";
import jwt_decode from "jwt-decode";


//actions
const GET_USER = "GET_USER";
const UPDATE_USER = "UPDATE_USER";
const DELETE_USER = "DELETE_USER";
const GET_USER_REVIEW = "GET_USER_REVIEW";
const SET_USER = "user/SET_USER";
const LOG_OUT = "user/LOG_OUT";



//actioncreator
const getUser = createAction(GET_USER, (user)=>({user}));
const updateUser = createAction(UPDATE_USER, (user)=>({user}));
const deleteUser = createAction(DELETE_USER, (userId)=>({userId}));
const getUserReview = createAction(GET_USER_REVIEW, (review_list)=>({review_list}));
const setUser = createAction(SET_USER, (user) => ({user}));
const logOut = createAction(LOG_OUT, ()=> ({}));



//initial
const initialState = {
    user : {
      userId : "",
      nickname: ""
    },
    review_list: [],
    is_login: false,

};

const loginCheck = () => {
  return function (dispatch, getState, { history }) {
    const user = localStorage.getItem('token') ? true : false;
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const userId = decoded.userId;
    const nickname = decoded.nickname;

    //localStorage에 토큰이 있는 상태(이미 로그인을 한 상태라면)
    if (user) {
      dispatch(setUser({userId: userId, nickname: nickname}));
    } else {
      console.log("로그인상태아님");
    }
  };
};

//회원정보 등록
const setUserSV = (userId, nickname) => {
  return function(dispatch, getState, {history}){
    instance
    .put('/users/nickname/'+userId , {
      nickname: nickname
    })
    .then((res)=>{
      dispatch(setUser({userId: userId, nickname: nickname}));
      history.push('/')
    })
    .catch((err)=>{
      console.log(err);
      window.alert('회원정보 등록 실패')
    })

  }
    
}


//한사람의 사용자 정보 불러오기
const getUserSV = (id)=>{
  return function(dispatch, getState, {history}){
    instance.get('/users/'+ id)
    .then((res)=>{
      dispatch(getUser(res.data));
    })
    .catch((err)=>{
      window.alert("사용자 정보 로딩 실패")
    })
  }
}

//닉네임 변경
const updateUserSV = (id, nickname)=>{
  return function(dispatch, getState, {history}){
    instance.put('/users/'+ id, 
    {
      nickname: nickname
    })
    .then((res)=>{
      dispatch(updateUser(nickname));
    })
    .catch((err)=>{
      window.alert("닉네임 정보 변경 실패")
    })
  }
}

//회원탈퇴
const deleteUserSV = (id) =>{
  return function(dispatch, getState, {history}){
    instance.delete('/users/' + id)
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

//reducer
export default handleActions(
    {
        [GET_USER]: (state, action) =>
          produce(state, (draft) => {
            draft.user = action.payload.user;
        }),
        [UPDATE_USER]: (state, action) =>
          produce(state, (draft) => {
            draft.user.nickname = action.payload.user;
        }),
        [DELETE_USER]: (state, action) =>
          produce(state, (draft) => {
            draft.user = [];
            draft.is_login= false;
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
        })
    },
    initialState
  );
  

const actionCreators = {
  getUserSV,
  updateUserSV,
  deleteUserSV,
  getUserReviewSV,
  setUserSV,
  setUser,
  loginCheck,
  logOut
};
  
export { actionCreators };