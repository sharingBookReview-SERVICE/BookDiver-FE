import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";
import { history } from "../configStore";

import { actionCreators as userActions } from "./user";
import { actionCreators as permitActions } from "./permit";

//소켓
import io from "socket.io-client"
const socket = io.connect("https://ohbin.shop")

//actions
const GET_ALL_REVIEW = "review/GET_ALL_REVIEW";
const GET_MORE_REVIEW = "review/GET_MORE_REVIEW"
const ADD_REVIEW = "review/ADD_REVIEW";
const LIKE = "review/LIKE";
const BOOKMARK = "review/BOOKMARK";
const DELETE_REVIEW = "review/DELETE_REVIEW";
const EDIT_REVIEW = "review/EDIT_REVIEW";
const GET_DETAIL_REVIEW = "review/GET_DETAIL_REVIEW";
const GET_FEED_ID = "review/GET_FEED_ID";
const GET_REVIEWS_BOOK_HAVE = "review/GET_REVIEWS_BOOK_HAVE";
const CURRENT_SCROLL = "review/CURRENT_SCROLL";
const SEARCH = "review/Search";
const GET_ALLTAGS = "review/GET_ALLTAGS";

//actioncreator
const getAllReview = createAction(GET_ALL_REVIEW, (review_list) => ({review_list}));
const getMoreReview = createAction(GET_MORE_REVIEW, (review_list) => ({review_list}));
const like = createAction(LIKE, (reviewId) => ({ reviewId }));
const bookMark = createAction(BOOKMARK, (reviewId) => ({ reviewId }));
const addReview = createAction(ADD_REVIEW, (review) => ({ review }));
const deleteReview = createAction(DELETE_REVIEW, (reviewId) => ({ reviewId }));
const editReview = createAction(EDIT_REVIEW, (reviewId, review) => ({reviewId,review}));
const getDetailReview = createAction(GET_DETAIL_REVIEW, (review) => ({review}));
const getFeedId = createAction(GET_FEED_ID, (bookId, reviewId) => ({bookId, reviewId}));
const getReviewsBookHave = createAction(GET_REVIEWS_BOOK_HAVE, (reviews) => ({reviews}));
const saveCurrentScroll = createAction(CURRENT_SCROLL, (location)=>({location}));
const searchReview = createAction(SEARCH, (review)=>({review}));
const getAllTags = createAction(GET_ALLTAGS, (tags)=>({tags}));
//initial
const initialState = {
    all_review_list: [],
    feed_id: {
        bookId: "",
        reviewId: "",
    },
    review_detail: {},
    feed_edit: {
        feed_edit_id: "",
    },
    reviews_which_book_have: [],
    current_scroll : 0,
    serached_review : [],
    all_tags: []
};

//middle
//전체 피드 불러오기
const getAllReviewSV = () => {

    return function (dispatch) {
        instance
            .get("/feeds")
            .then((res) => {
                //돌아온 res가 error인 경우 실행할 내용 
                if(res.data.error){

                    history.push("*")
                    localStorage.clear();
                    dispatch(userActions.logOut())
                    return;
                }
                //res가 정상인 경우 
                dispatch(getAllReview(res.data));
            })
            .catch(error => console.error(error.toJSON()));
    };
};

                // console.log(err)
                // history.push("*")
                // localStorage.clear(); //전체 피드 불러오기가 실패한 경우는 잘못된 토큰이 들어간 것으로 판단 -> token 삭제

const getMoreReviewSV = (lastId) => {

    return function (dispatch) {
        instance
            .get(`/feeds?lastItemId=${lastId}`)
            .then((res) => {
                dispatch(getMoreReview(res.data));
                dispatch(permitActions.isLoading(false))
            })
            .catch((err) => {
                // history.push("*")
                console.log("전체 피드 가져오기 실패", err);
            });
    };
};

//읽은 리뷰 체크하기
const checkIsRead = (reviewId) => {
    return function (dispatch) {
        instance
            .patch(`/feeds/${reviewId}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                // history.push("*")
                console.log("전체 피드 가져오기 실패", err);
            });
    };
}

//포스트 추가하기
const addReviewSV = (formData, bookId) => {

    return function (dispatch) {
        instance
            .post(`/books/${bookId}/reviews`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                if(res.data.error){
                    // history.push("*")
                    return;
                }
                dispatch(addReview(res.data.review));
                dispatch(permitActions.isLoading(false));
                history.push("/");
            })
            .catch((err) => {
                // history.push("*")
                console.log("post작성 실패", err);
            });
    };
};

//포스트 삭제하기
const deleteReviewSV = () => {

    return function (dispatch, getState) {
        const bookId = getState().review.feed_id.bookId;
        const reviewId = getState().review.feed_id.reviewId;

        instance
            .delete(`/books/${bookId}/reviews/${reviewId}`)
            .then((res) => {
                dispatch(deleteReview(reviewId));
                history.push(`/`)
            })
            .catch((err) => {
                // history.push("*")
                console.log("포스트 삭제도중 에러 발생", err);
            });
    };
};

//포스트 수정하기
const editReviewSV = (bookId, reviewId, review) => {
    return function (dispatch, getState) {
        instance
            .put(`/books/${bookId}/reviews/${reviewId}`, {
                quote: review.quote,
                content: review.content,
                hashtags: review.hashtags,
            })
            .then((res) => {
                dispatch(editReview(reviewId, res.data.review))
                history.goBack();
            })
            .catch((err) => {
                // history.push("*")
                console.log("포스트 수정중 에러 발생", err);
            });
    };
};

//상세보기
const getDetailReviewSV = (bookId, reviewId) => {

    return function (dispatch) {
        instance
            .get(`/books/${bookId}/reviews/${reviewId}`)
            .then((res) => {
                dispatch(getDetailReview(res.data.review));
            })
            .catch((err) => {
                // history.push("*")
                console.log("상세포스트 에러 발생", err);
            });
    };
};

//라이크 버튼
const LikeSV = (bookId, reviewId, reviewUserId) => {

    return function (dispatch) {
        instance
            .put(`/books/${bookId}/reviews/${reviewId}/likes`)
            .then((res) => {
                dispatch(like(reviewId));
                socket.emit("like", reviewUserId)//좋아요 성공시 서버에 확인보내주기
            })
            .catch((err) => {
                // history.push("*")
                console.log("좋아요 실패", err);
            });
    };
};

//북마크 버튼
const bookMarkSV = (bookId, reviewId) => {

    return function (dispatch) {
        instance
            .put(`/books/${bookId}/reviews/${reviewId}/bookmark`)
            .then((res) => {
                dispatch(bookMark(reviewId));
            })
            .catch((err) => {
                // history.push("*")
                console.log("북마크 실패", err);
            });
    };
};



//해당 책의 리뷰 가져오기
const getReviewsBookHaveSV = (bookId) => {
    return function (dispatch, getState) {
        instance
            .get(`/books/${bookId}/reviews`)
            .then((res) => {
                dispatch(getReviewsBookHave(res.data.reviews));
            })
            .catch((err) => {
                // history.push("*")
                console.log("해당 책의 리뷰 가져오기 실패", err);
            });
    };
};

const searchReviewSV = (keyword) =>{
    return function(dispatch, getState) {
        instance
        .get(`/search`, {
            params : {
                tag: keyword
            }
        }
  
        )
        .then((res)=>{
        })
        .catch((err)=>{
            console.log("검색 실패", err)
        })
    }
}

const getAllTagsSV = () =>{
    return function(dispatch, getState) {
        instance
        .get(`/search/allTags`)
        .then((res)=>{
            dispatch(getAllTags(res.data.allTags))
        })
        .catch((err)=>{
            console.log("검색 실패", err)
        })
    }
}

//reducer
export default handleActions(
    {
        [GET_ALL_REVIEW]: (state, action) =>
            produce(state, (draft) => {
                draft.all_review_list = action.payload.review_list;
            }),
        [GET_MORE_REVIEW]: (state, action) =>
            produce(state, (draft) => {
                draft.all_review_list.push(...action.payload.review_list);
        }),
        [ADD_REVIEW]: (state, action) =>
            produce(state, (draft) => {
                draft.all_review_list.unshift(action.payload.review);
            }),
        [DELETE_REVIEW]: (state, action) =>
            produce(state, (draft) => {
                draft.all_review_list = draft.all_review_list.filter((l, idx) => {
                    return l._id !== action.payload.reviewId;
                });
            }),
        [EDIT_REVIEW]: (state, action) =>
            produce(state, (draft) => {
                let idx = draft.all_review_list.findIndex(
                    (l) => l._id === action.payload.reviewId
                );
                draft.all_review_list[idx] = action.payload.review;
            }),
        [GET_DETAIL_REVIEW]: (state, action) =>
            produce(state, (draft) => {
                draft.review_detail = action.payload.review;
            }),
        [LIKE]: (state, action) =>
            produce(state, (draft) => {
                //전체
                let idx = draft.all_review_list.findIndex(
                    (l) => l._id === action.payload.reviewId
                );
                
                //리뷰 전체 리스트인 경우 
                if(draft.all_review_list[idx]){
                    if (draft.all_review_list[idx]?.myLike) {
                        draft.all_review_list[idx].likeCount =
                            draft.all_review_list[idx].likeCount - 1;
                        draft.all_review_list[idx].myLike =
                    !draft.all_review_list[idx].myLike;
                    } else {
                        draft.all_review_list[idx].likeCount =
                            draft.all_review_list[idx].likeCount + 1;
                            draft.all_review_list[idx].myLike =
                            !draft.all_review_list[idx].myLike;
                    }
                }


                //상세 페이지인 경우 
                if(draft.review_detail.myLike){
                    draft.review_detail.likeCount = draft.review_detail.likeCount-1;
                    draft.review_detail.myLike = !draft.review_detail.myLike;
                }
                else{
                    draft.review_detail.likeCount = draft.review_detail.likeCount+1;
                    draft.review_detail.myLike = !draft.review_detail.myLike;
                }
            }),
            //북마크
            [BOOKMARK]: (state, action) =>
            produce(state, (draft) => {
                //전체
                let idx = draft.all_review_list.findIndex(
                    (l) => l._id === action.payload.reviewId
                );
                
                //리뷰 전체 리스트인 경우 
                if(draft.all_review_list[idx]){
                    if (draft.all_review_list[idx]?.bookmark) {
                        draft.all_review_list[idx].bookmark = false;
                    } else {
                        draft.all_review_list[idx].bookmark = true;
                    }
                }


                //상세 페이지인 경우 
                if(draft.review_detail.bookmark){
                    draft.review_detail.bookmark = false;
                }
                else{
                    draft.review_detail.bookmark = true;
                }
            }),
        [GET_FEED_ID]: (state, action) =>
            produce(state, (draft) => {
                draft.feed_id.bookId = action.payload.bookId;
                draft.feed_id.reviewId = action.payload.reviewId;
            }),
        [GET_REVIEWS_BOOK_HAVE]: (state, action) =>
            produce(state, (draft) => {
                draft.reviews_which_book_have = action.payload.reviews;
            }),
        [CURRENT_SCROLL]:(state, action) =>
        produce(state, (draft)=>{
            draft.current_scroll = action.payload.location;
        }),
        [SEARCH]:(state, action) =>
        produce(state, (draft)=>{
            draft.serached_review = action.payload.review;
        }),
        [GET_ALLTAGS]:(state, action) =>
        produce(state, (draft)=>{
            draft.all_tags = action.payload.tags;
        }),
    },
    initialState
);

const actionCreators = {
    getAllReviewSV,
    LikeSV,
    addReviewSV,
    deleteReviewSV,
    editReviewSV,
    getDetailReviewSV,
    getFeedId,
    getReviewsBookHaveSV,
    getMoreReviewSV,
    saveCurrentScroll,
    searchReviewSV,
    getAllTagsSV,
    bookMarkSV
};

export { actionCreators };