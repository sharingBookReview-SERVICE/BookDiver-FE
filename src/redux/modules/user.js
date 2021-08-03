import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

const {Kakao} = window;

//actions
const KAKAO_LOGIN = "KAKAO_LOGIN";
const CREATE_USER = "CREATE_USER";
const GET_USER = "GET_USER";
const UPDATE_USER = "UPDATE_USER";
const DELETE_USER = "DELETE_USER";
const GET_USER_REVIEW = "GET_USER_REVIEW";

//actioncreator
const kakaoLogin = createAction(KAKAO_LOGIN, (user)=>({user}));
const createUser = createAction(CREATE_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user)=>({user}));
const updateUser = createAction(UPDATE_USER, (user)=>({user}));
const deleteUser = createAction(DELETE_USER, (user)=>({user}));
const getUserReview = createAction(GET_USER_REVIEW, (review_list)=>({review_list}));

//initial
const initialState = {
    user : [],
    review_list: []
};

//middle
//회원가입(소셜 로그인) - 수정필요
const kakaoLoginSV= (code)=>{
  return function(dispatch, getState, {history}){
    console.log("회원가입")

        instance.get(`/api/users/kakao/callback/kakao?code=${code}`)
        .then((res)=>{
          console.log(res);
        })
        .catch((err)=>{
          console.log(err)
        })
      
  }
}

const createUserSV = () => {
    return function(dispatch, getState, {history}){
      //오늘 목표 불러오기
      instance.post('/users')
        .then((res)=>{

        })
        .catch((err)=>{

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
        [CREATE_USER]: (state, action) =>
          produce(state, (draft) => {
        }),
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
        }),
        [GET_USER_REVIEW]: (state, action) =>
          produce(state, (draft) => {
            draft.review_list = action.payload.review_list;
        }),
    },
    initialState
  );
  

const actionCreators = {
  createUserSV,
  getUserSV,
  updateUserSV,
  deleteUserSV,
  getUserReviewSV,
  kakaoLoginSV
};
  
export { actionCreators };