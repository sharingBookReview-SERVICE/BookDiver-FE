import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";
import jwt_decode from "jwt-decode";
import { actionCreators as permitActions } from "./permit";

//actions
const GET_USER = "GET_USER";
const DELETE_USER = "DELETE_USER";
const GET_USER_REVIEW = "GET_USER_REVIEW";
const SET_USER = "user/SET_USER";
const LOG_OUT = "user/LOG_OUT";
const IS_ME = "user/IS_ME";
const FOLLOW = "user/FOLLOW";
const GET_FOLLOW_LIST = "user/GET_FOLLOW_LIST";


const GET_FOLLOWER_LIST = "user/GET_FOLLOWER_LIST"
const GET_TREASURE = "user/GET_TREASURE"
const GET_MY_FEED ="user/GET_MY_FEED";
const GET_FOLLOWING_COUNTS = "user/GET_FOLLOWING_COUNTS";
const GET_FOLLOWER_COUNTS = "user/GET_FOLLOWER_COUNTS"
const IS_FOLLOW = "user/IS_FOLLOW"


//actioncreator
const getUser = createAction(GET_USER, (user)=>({user}));
const deleteUser = createAction(DELETE_USER, (userId)=>({userId}));
const setUser = createAction(SET_USER, (user) => ({user}));
const logOut = createAction(LOG_OUT, ()=> ({}));
const isMe = createAction(IS_ME, (is_me)=>({is_me}));
const follow = createAction(FOLLOW, (user) => ({user}));
const getFollowList = createAction(GET_FOLLOW_LIST, (list) => ({list}));
const getFollowerList = createAction(GET_FOLLOWER_LIST, (list) => ({list}))
const getTreasure = createAction(GET_TREASURE, (treasure) => ({treasure}))
const getMyFeed = createAction(GET_MY_FEED, (my_feed)=>({my_feed}));
const getFollowingCounts = createAction(GET_FOLLOWING_COUNTS, (counts) => ({counts}))
const getFollowerCounts = createAction(GET_FOLLOWER_COUNTS, (counts) => ({counts}))
const isFollow = createAction(IS_FOLLOW, (is_follow) => ({is_follow}))


//initial
const initialState = {
    user : {
      _id : "",
      nickname: "",
      token: ""
    },
    review_list: [],
    is_login: false,
    is_me: false,
    follow_list : [],
    get_treasure : false,
    my_feed:[],
    is_follow: false,
};


//한사람의 사용자 정보 불러오기
const getUserSV = ()=>{
  return function(dispatch, getState, {history}){
    instance.get(`/users`)
    .then((res)=>{
      console.log(res)
      //레벨10 단위가 되었는지 지속적으로 확인하기
      dispatch(getFollowingCounts(res.data.followingCount))
      dispatch(getFollowerCounts(res.data.followerCount))
      dispatch(permitActions.showTreasureModal(res.data.treasure))
      dispatch(getUser(res.data.user));
    })
    .catch((err)=>{
      // history.push("*")
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
      dispatch(setUser({_id: userId, nickname: nickname, token: token}));
    } else {
      // history.push("*")
    }
  };
};

//회원정보 등록
const setUserSV = (userId, nickname) => {
  return function(dispatch, getState, {history}){
    
      instance
      .put(`/users`,{
        nickname: nickname
      })
      .then((res)=>{
        console.log(res.data)
        const token = res.data.token;
        if(token){
          localStorage.setItem('token', token);
          dispatch(setUser(res.data.user));
          history.push('/myfeed')
        }
       
      })
    
      .catch((err)=>{
        window.alert("다른 분이 사용중인 닉네임이에요!")
      })
   
    
  
   
  }

}


//회원탈퇴
const deleteUserSV = (id) =>{
  return function(dispatch, getState, {history}){
    instance.delete(`/users`)
    .then((res)=>{
      window.alert("회원탈퇴");
      dispatch(deleteUser(id));
    })
    .catch((err)=>{
      // history.push("*")
    })
  }
}

//팔로우 함수 & 팔로우 취소 함수 
const followSV = (id) => {

  return function(dispatch, getState, {history}){
    instance.put(`follow/${id}`)
    .then((res)=>{
      dispatch(follow(id))
    })
    .catch((err)=>{
      // history.push("*")
    })
  }
}

//나를 팔로우하는 유저 삭제
const deleteFollowerSV = (id) => {

  return function(dispatch, getState, {history}){
    instance.put(`follow/delete/${id}`)
    .then((res)=>{
      dispatch(getFollowerCounts(res.data.followerList.length))
      dispatch(getFollowerList(res.data.followerList))
    })
    .catch((err)=>{
      // history.push("*")
    })
  }
}

const getFollowingListSV = () => {
  return function(dispatch, getState, {history}){
    instance.get(`follow/followingList`)
    .then((res)=>{
      dispatch(getFollowList(res.data.followingList))
    })
    .catch((err)=>{
      // history.push("*")
    })
  }
}

const getFollowerListSV = () => {
  return function(dispatch, getState, {history}){
    instance.get(`follow/followerList`)
    .then((res)=>{
      dispatch(getFollowList(res.data.followerList))
    })
    .catch((err)=>{
      // history.push("*")
    })
  }
}


const getOtherFollowingListSV = (userId) => {
  return function(dispatch, getState, {history}){
    instance.get(`follow/followingList/${userId}`)
    .then((res)=>{
      console.log(res)
      dispatch(getFollowList(res.data.followingList))
    })
    .catch((err)=>{
      // history.push("*")
    })
  }
}


const getOtherFollowerListSV = (userId) => {
  return function(dispatch, getState, {history}){
    instance.get(`follow/followerList/${userId}`)
    .then((res)=>{
      dispatch(getFollowList(res.data.followerList))
    })
    .catch((err)=>{
      // history.push("*")
    })
  }
}





const getTreasureSV = () => {

  return function(dispatch, getState, {history}){
    const userId = getState().user.user._id
    const treasureNum = `treasure_${getState().user.user.level}`.slice(0, -1) // 유저에 줄 보물의 종류를 구하기 
    const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min) + min); // 랜덤한 숫자를 

    //랜덤한 이미지를 내보내는 함수
    const getRandomImg = (treasureNum, randomNum) => {
      const treasureOBJ = {
        treasure_1 : ["image_2", "image_3", "image_4"],
        treasure_2 : ["image_5", "image_6", "image_7"],
        treasure_3 : ["image_8", "image_9", "image_10"],
        treasure_4 : ["image_11", "image_12", "image_13"],
        treasure_5 : ["image_14", "image_15", "image_16"]
      }
      return treasureOBJ[treasureNum][randomNum]
    }

    const randomImg = getRandomImg(treasureNum, getRandomNum(0,3))

    instance.put(`users/profile/image`, {imageName: randomImg})
    .then((res)=>{
      dispatch(permitActions.isTreasure(false))
      dispatch(permitActions.showNewBadge(randomImg))
      getUserSV(userId)
    })
    .catch((err)=>{
      // history.push("*")
    })
  }
}

const changeProfileSV = (image) => {
  return function(dispatch, getState, {history}){
    instance.put(`users`,{profileImage: image})
    .then((res)=>{
      console.lof(res)
    })
    .catch((err)=>{
      // history.push("*")
  })
}}


  //내가 쓴 리뷰와 컬렉션
const getMyFeedSV = (id)=>{
  return function(dispatch, getState, {history}){
    instance.get(`/users/feeds`)
    .then((res)=>{
      console.log(res)
      dispatch(getMyFeed(res.data));
    })
    .catch((err)=>{
      // history.push("*")
    })
  }
}

const getOtherFeedSV = (userId) => {

  return function(dispatch, getState, {history}){
    instance.get(`/users/feeds/${userId}`)
    .then((res)=>{
      console.log(res)
      dispatch(getMyFeed(res.data));
    })
    .catch((err)=>{
      // history.push("*")
    })
  }
}

const checkTreasureSV = () => {
  return function(dispatch, getState, {history}){

    instance.get(`users/profile/treasure`)
    .then((res)=>{
      dispatch(permitActions.isTreasure(res.data.treasure))
    })
    .catch((err)=>{
      // history.push("*")
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
        [FOLLOW] : (state, action)=>
        produce(state, (draft)=>{
          //팔로우여부 바꾸기
          if(draft.my_feed.user.is_follow){
            draft.my_feed.user.is_follow = false;
            draft.my_feed.user.followerCount = draft.my_feed.user.followerCount-1;
          }
          else{
            draft.my_feed.user.is_follow = true;
            draft.my_feed.user.followerCount = draft.my_feed.user.followerCount+1;
          }

        }),
        [GET_FOLLOW_LIST] : (state, action)=>
        produce(state, (draft)=>{
          draft.follow_list = action.payload.list;
        }),
        [GET_FOLLOWER_LIST] : (state, action)=>
        produce(state, (draft)=>{
          draft.follow_list = action.payload.list
        }),
        [GET_MY_FEED] : (state, action)=>
        produce(state, (draft)=>{
          draft.my_feed = action.payload.my_feed;
        }),
        [GET_FOLLOWING_COUNTS] : (state, action)=>
        produce(state, (draft)=>{
          draft.following_counts = action.payload.counts;
        }),
        [GET_FOLLOWER_COUNTS] : (state, action)=>
        produce(state, (draft)=>{
          draft.follower_counts = action.payload.counts;
        }),
        [IS_FOLLOW] : (state, action)=>
        produce(state, (draft)=>{
          draft.is_follow = action.payload.is_follow;
        }),
    },
    initialState
  );
  

const actionCreators = {
  getUserSV,
  deleteUserSV,
  setUserSV,
  setUser,
  loginCheck,
  logOut,
  isMe,
  followSV,
  getFollowingListSV,
  getFollowerListSV,
  getTreasureSV,
  changeProfileSV,
  getMyFeedSV,
  deleteFollowerSV,
  checkTreasureSV,
  isFollow,
  getOtherFeedSV,
  getOtherFollowingListSV,
  getOtherFollowerListSV,
};
  
export { actionCreators };