import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import instance from "../../shared/Request"
import jwt_decode from "jwt-decode"
import { actionCreators as permitActions } from "./permit"

//소켓
import io from "socket.io-client"
const socket = io.connect("https://ohbin.shop")

//actions
const GET_USER = "GET_USER"
const DELETE_USER = "DELETE_USER"
const SET_USER = "user/SET_USER"
const LOG_OUT = "user/LOG_OUT"
const IS_ME = "user/IS_ME"
const FOLLOW = "user/FOLLOW"
const GET_FOLLOW_LIST = "user/GET_FOLLOW_LIST"
const GET_BOOKMARK = "user/GET_BOOKMARK"
const GET_NOTI_LIST = "user/GET_NOTI_LIST"

const GET_FOLLOWER_LIST = "user/GET_FOLLOWER_LIST"
const GET_MY_FEED = "user/GET_MY_FEED"
const GET_FOLLOWING_COUNTS = "user/GET_FOLLOWING_COUNTS"
const GET_FOLLOWER_COUNTS = "user/GET_FOLLOWER_COUNTS"
const IS_FOLLOW = "user/IS_FOLLOW"

//actioncreator
const getUser = createAction(GET_USER, user => ({ user }))
const deleteUser = createAction(DELETE_USER, userId => ({ userId }))
const setUser = createAction(SET_USER, user => ({ user }))
const logOut = createAction(LOG_OUT, () => ({}))
const isMe = createAction(IS_ME, is_me => ({ is_me }))
const follow = createAction(FOLLOW, user => ({ user }))
const getFollowList = createAction(GET_FOLLOW_LIST, list => ({ list }))
const getFollowerList = createAction(GET_FOLLOWER_LIST, list => ({ list }))
const getMyFeed = createAction(GET_MY_FEED, my_feed => ({ my_feed }))
const getFollowingCounts = createAction(GET_FOLLOWING_COUNTS, counts => ({
  counts,
}))
const getFollowerCounts = createAction(GET_FOLLOWER_COUNTS, counts => ({
  counts,
}))
const isFollow = createAction(IS_FOLLOW, is_follow => ({ is_follow }))
const getBookmark = createAction(GET_BOOKMARK, reviews => ({ reviews }))
const getNotiList = createAction(GET_NOTI_LIST, noti_list => ({ noti_list }))

//initial
const initialState = {
  user: {
    _id: "",
    nickname: "",
    token: "",
  },
  review_list: [],
  is_login: false,
  is_me: false,
  follow_list: [],
  get_treasure: false,
  my_feed: [],
  is_follow: false,
  bookmark: [],
  noti_list: [],
}

//한사람의 사용자 정보 불러오기
const getUserSV = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/users`)
      .then(res => {
        //레벨10 단위가 되었는지 지속적으로 확인하기
        dispatch(getFollowingCounts(res.data.followingCount))
        dispatch(getFollowerCounts(res.data.followerCount))
        dispatch(permitActions.showTreasureModal(res.data.treasure))
        dispatch(getUser(res.data.user))
      })
      .catch(err => {
        if (err?.response?.status === 498) {
          localStorage.clear()
          window.location.replace("/")
        }
        // history.push("*")
      })
  }
}

//로그인 한 상태인지 체크
const loginCheck = () => {
  return function (dispatch, getState, { history }) {
    const user = localStorage.getItem("token") ? true : false
    const token = localStorage.getItem("token")
    const decoded = jwt_decode(token)
    const userId = decoded.userId
    const nickname = decoded.nickname

    //localStorage에 토큰이 있는 상태(이미 로그인을 한 상태라면)
    if (user) {
      dispatch(setUser({ _id: userId, nickname: nickname, token: token }))
    } else {
      // history.push("*")
    }
  }
}

//회원정보 등록
const setUserSV = (userId, nickname) => {
  return function (dispatch, getState, { history }) {
    instance
      .put(`/users`, {
        nickname: nickname,
      })
      .then(res => {
        const token = res.data.token
        if (token) {
          localStorage.setItem("token", token)
          dispatch(setUser(res.data.user))
          history.push("/myfeed")
        }
      })

      .catch(err => {
        dispatch(
          permitActions.message(
            "다른 분이 사용중인 닉네임이에요!  다른 닉네임을 입력해주세요."
          )
        )
        dispatch(permitActions.showModal(true))

        // window.alert("다른 분이 사용중인 닉네임이에요!")
      })
  }
}

//회원탈퇴
const deleteUserSV = id => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/users`)
      .then(res => {
        window.alert("회원탈퇴")
        dispatch(deleteUser(id))
      })
      .catch(err => {
        // history.push("*")
      })
  }
}

//팔로우 함수 & 팔로우 취소 함수
const followSV = id => {
  return function (dispatch, getState, { history }) {
    instance
      .put(`follow/${id}`)
      .then(res => {
        dispatch(follow(id))

        const userId = getState().user.user.id
        if (userId === id) {
          return
        }
        socket.emit("follow", id) // 팔로우 성공시 팔로우 한 유저의 아이디 보내기
      })
      .catch(err => {
        // history.push("*")
      })
  }
}

//나를 팔로우하는 유저 삭제
const deleteFollowerSV = id => {
  return function (dispatch, getState, { history }) {
    instance
      .put(`follow/delete/${id}`)
      .then(res => {
        dispatch(getFollowerCounts(res.data.followerList.length))
        dispatch(getFollowerList(res.data.followerList))
      })
      .catch(err => {
        // history.push("*")
      })
  }
}

const getFollowingListSV = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`follow/followingList`)
      .then(res => {
        dispatch(getFollowList(res.data.followingList))
      })
      .catch(err => {
        // history.push("*")
      })
  }
}

const getFollowerListSV = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`follow/followerList`)
      .then(res => {
        dispatch(getFollowList(res.data.followerList))
      })
      .catch(err => {
        // history.push("*")
      })
  }
}

const getOtherFollowingListSV = userId => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`follow/followingList/${userId}`)
      .then(res => {
        dispatch(getFollowList(res.data.followingList))
      })
      .catch(err => {
        // history.push("*")
      })
  }
}

const getOtherFollowerListSV = userId => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`follow/followerList/${userId}`)
      .then(res => {
        dispatch(getFollowList(res.data.followerList))
      })
      .catch(err => {
        // history.push("*")
      })
  }
}

const getTreasureSV = () => {
  return function (dispatch, getState, { history }) {
    const userId = getState().user.user._id
    const userLevel = getState().user.user.level // 유저에 줄 보물의 종류를 구하기

    //랜덤한 이미지를 내보내는 함수
    const getImgByLevel = userLevel => {
      let image = ""
      switch (true) {
        case userLevel < 5:
          image = "image_2"
          break
        case userLevel < 10:
          image = "image_3"
          break
        case userLevel < 15:
          image = "image_4"
          break
        case userLevel < 20:
          image = "image_5"
          break
        case userLevel < 25:
          image = "image_6"
          break
        case userLevel < 30:
          image = "image_7"
          break
        case userLevel < 35:
          image = "image_8"
          break
        case userLevel < 40:
          image = "image_9"
          break
        case userLevel < 45:
          image = "image_10"
          break
        case userLevel < 50:
          image = "image_11"
          break
        case userLevel < 55:
          image = "image_12"
          break
        case userLevel < 60:
          image = "image_13"
          break
        case userLevel < 65:
          image = "image_14"
          break
        case userLevel < 70:
          image = "image_15"
          break
        case userLevel < 75:
          image = "image_16"
          break
        default:
          image = "image_1"
          break
      }
      return image
    }

    instance
      .put(`users/profile/image`, { imageName: getImgByLevel(userLevel) })
      .then(res => {
        dispatch(permitActions.isTreasure(false)) // 잠수페이지에서 보물 이미지 없애주기
        dispatch(permitActions.newTreasureModal(true)) // 얻게 된 보물이 뭔지 보여주기
        dispatch(permitActions.showNewBadge(getImgByLevel(userLevel))) // 어떤 이미지를 얻게 되었는지 알려주기

        setTimeout(() => {
          getUserSV(userId)
        }, 1000)
      })
      .catch(err => {
        // history.push("*")
      })
  }
}

const changeProfileSV = image => {
  return function (dispatch, getState, { history }) {
    instance
      .put(`users`, { profileImage: image })
      .then(res => {
        console.lof(res)
      })
      .catch(err => {
        // history.push("*")
      })
  }
}

//내가 쓴 리뷰와 컬렉션
const getMyFeedSV = id => {
  return function (dispatch, getState, { history }) {
    dispatch(permitActions.isLoading(true))
    instance
      .get(`/users/feeds`)
      .then(res => {
        dispatch(getMyFeed(res.data))
        setTimeout(() => {
          dispatch(permitActions.isLoading(false))
        }, 600)
      })
      .catch(err => {
        if (err.response.status === 498) {
          localStorage.clear()
          window.location.replace("/")
        }
      })
  }
}

const getOtherFeedSV = userId => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/users/feeds/${userId}`)
      .then(res => {
        console.log(res)
        dispatch(getMyFeed(res.data))
      })
      .catch(err => {
        // history.push("*")
      })
  }
}

const checkTreasureSV = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`users/profile/treasure`)
      .then(res => {
        dispatch(permitActions.isTreasure(res.data.treasure))
        dispatch(permitActions.showTreasureModal(res.data.treasure))
      })
      .catch(err => {
        // history.push("*")
      })
  }
}

//북마크 한 리뷰 가져오기

const getBookmarkSV = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/users/profile/bookmark`)
      .then(res => {
        dispatch(getBookmark(res.data.bookmark_reviews))
      })
      .catch(err => {
        // history.push("*")
      })
  }
}

const checkAlertSV = () => {
  return function (dispatch, getState, { history }) {
    instance
      .put(`/users/checkAlert`)
      .then(res => {})
      .catch(err => {
        console.log(err)
        history.push("*")
      })
  }
}

const getNotiListSV = () => {
  console.log("함수 실행")
  return function (dispatch, getState, { history }) {
    instance
      .get(`/users/alerts`)
      .then(res => {
        dispatch(getNotiList(res.data.alerts))
      })
      .catch(err => {
        console.log(err)
        history.push("*")
      })
  }
}

//reducer
export default handleActions(
  {
    [GET_USER]: (state, action) =>
      produce(state, draft => {
        draft.user = action.payload.user
      }),
    [DELETE_USER]: (state, action) =>
      produce(state, draft => {
        draft.user = []
        draft.is_login = false
        draft.is_me = false
      }),
    [SET_USER]: (state, action) =>
      produce(state, draft => {
        draft.user = action.payload.user
        draft.is_login = true
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, draft => {
        draft.is_login = false
        draft.user = []
        draft.is_me = false
      }),
    [IS_ME]: (state, action) =>
      produce(state, draft => {
        const token = localStorage.getItem("token")
        const decoded = jwt_decode(token)
        if (draft.user.userId === decoded.userId) {
          draft.is_me = true
        }
      }),
    [FOLLOW]: (state, action) =>
      produce(state, draft => {
        //팔로우여부 바꾸기
        if (draft.my_feed.user.is_follow) {
          draft.my_feed.user.is_follow = false
          draft.my_feed.user.followerCount =
            draft.my_feed.user.followerCount - 1
        } else {
          draft.my_feed.user.is_follow = true
          draft.my_feed.user.followerCount =
            draft.my_feed.user.followerCount + 1
        }
      }),
    [GET_FOLLOW_LIST]: (state, action) =>
      produce(state, draft => {
        draft.follow_list = action.payload.list
      }),
    [GET_FOLLOWER_LIST]: (state, action) =>
      produce(state, draft => {
        draft.follow_list = action.payload.list
      }),
    [GET_MY_FEED]: (state, action) =>
      produce(state, draft => {
        draft.my_feed = action.payload.my_feed
      }),
    [GET_FOLLOWING_COUNTS]: (state, action) =>
      produce(state, draft => {
        draft.following_counts = action.payload.counts
      }),
    [GET_FOLLOWER_COUNTS]: (state, action) =>
      produce(state, draft => {
        draft.follower_counts = action.payload.counts
      }),
    [IS_FOLLOW]: (state, action) =>
      produce(state, draft => {
        draft.is_follow = action.payload.is_follow
      }),
    [GET_BOOKMARK]: (state, action) =>
      produce(state, draft => {
        draft.bookmark = action.payload.reviews
      }),
    [GET_NOTI_LIST]: (state, action) =>
      produce(state, draft => {
        draft.noti_list = action.payload.noti_list
      }),
  },
  initialState
)

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
  getBookmarkSV,
  checkAlertSV,
  getNotiListSV,
}

export { actionCreators }
