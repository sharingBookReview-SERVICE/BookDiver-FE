import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";
import { history } from "../configStore";

//actions
const GET_ALL_REVIEW = "review/GET_ALL_REVIEW";
const ADD_REVIEW = "review/ADD_REVIEW";
const LIKE = "review/LIKE";
const DELETE_REVIEW = "review/DELETE_REVIEW";
const EDIT_REVIEW = "review/EDIT_REVIEW";
const GET_DETAIL_REVIEW = "review/GET_DETAIL_REVIEW";
const GET_FEED_ID = "review/GET_FEED_ID";
const GET_REVIEWS_BOOK_HAVE = "review/GET_REVIEWS_BOOK_HAVE";

//actioncreator
const getAllReview = createAction(GET_ALL_REVIEW, (review_list) => ({
    review_list,
}));
const like = createAction(LIKE, (reviewId) => ({ reviewId }));
const addReview = createAction(ADD_REVIEW, (review) => ({ review }));
const deleteReview = createAction(DELETE_REVIEW, (reviewId) => ({ reviewId }));
const editReview = createAction(EDIT_REVIEW, (reviewId, review) => ({
    reviewId,
    review,
}));
const getDetailReview = createAction(GET_DETAIL_REVIEW, (review) => ({
    review,
}));
const getFeedId = createAction(GET_FEED_ID, (bookId, reviewId) => ({
    bookId,
    reviewId,
}));
const getReviewsBookHave = createAction(GET_REVIEWS_BOOK_HAVE, (reviews) => ({
    reviews,
}));

//initial
const initialState = {
    all_review_list: [],
    feed_id: {
        bookId: "",
        reviewId: "",
    },
    review_detail: {
        user: "",
        book: "",
        quote: "",
        content: "",
        hashtags: [""],
        createdAt: "",
        comments: [""],
        myLike: false,
        likes: 0,
    },
    feed_edit: {
        feed_edit_id: "",
    },
    reviews_which_book_have: [],
};

//middle
//전체 피드 불러오기
const getAllReviewSV = () => {

    return function (dispatch) {
        instance
            .get("/feeds")
            .then((res) => {
                dispatch(getAllReview(res.data));
            })
            .catch((err) => {
                console.log("전체 피드 가져오기 실패", err);
            });
    };
};

//포스트 추가하기
const addReviewSV = (formData, bookId) => {

    console.log("----------북아이디", bookId);
    return function (dispatch) {
        instance
            .post(`/books/${bookId}/reviews`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                dispatch(addReview(res.data.review));
                history.push("/");
            })
            .catch((err) => {
                console.log("post작성 실패", err);
            });
    };
};

//포스트 삭제하기
const deleteReviewSV = () => {

    return function (dispatch, getState) {
        const bookId = getState().review.feed_id.bookId;
        const reviewId = getState().review.feed_id.reviewId;
        console.log("-----------삭제 함수를 실행합니다");

        instance
            .delete(`/books/${bookId}/reviews/${reviewId}`)
            .then((res) => {
                console.log("-----------------------", res);
                dispatch(deleteReview(reviewId));
            })
            .catch((err) => {
                console.log("포스트 삭제도중 에러 발생", err);
            });
    };
};

//포스트 수정하기
const editReviewSV = (bookId, reviewId, review) => {
    return function (dispatch, getState, { history }) {
        instance
            .put(`/books/${bookId}/reviews/${reviewId}`, {
                quote: review.quote,
                content: review.content,
                hashtags: review.hashtags,
            })
            .then((res) => {
                // dispatch(editReview(reviewId, reviewObj));
                history.goBack();
            })
            .catch((err) => {
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
                console.log(res.data)
                dispatch(getDetailReview(res.data.review));
            })
            .catch((err) => {
                console.log("상세포스트 에러 발생", err);
            });
    };
};

//라이크 버튼
    const LikeSV = (bookId, reviewId) => {
        console.log(bookId, reviewId)
        return function (dispatch) {
            instance
                .put(`/books/${bookId}/reviews/${reviewId}/likes`)
                .then((res) => {
                    console.log(res);
                    dispatch(like(reviewId));
                })
                .catch((err) => {
                    console.log("좋아요 실패", err);
                });
        };
    };


//해당 책의 리뷰 가져오기
const getReviewsBookHaveSV = (bookId) => {
    return function (dispatch, getState, { history }) {
        instance
            .get(`/books/${bookId}/reviews`)
            .then((res) => {
                dispatch(getReviewsBookHave(res.data.review));
            })
            .catch((err) => {
                console.log("해당 책의 리뷰 가져오기 실패", err);
            });
    };
};

//reducer
export default handleActions(
    {
        [GET_ALL_REVIEW]: (state, action) =>
            produce(state, (draft) => {
                draft.all_review_list = action.payload.review_list;
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
                let idx = draft.all_review_list.findIndex(
                    (l) => l._id === action.payload.reviewId
                );
                if (draft.all_review_list[idx].myLike) {
                    draft.all_review_list[idx].likes =
                        draft.all_review_list[idx].likes - 1;
                    draft.all_review_list[idx].myLike =
                        !draft.all_review_list[idx].myLike;
                } else {
                    draft.all_review_list[idx].likes =
                        draft.all_review_list[idx].likes + 1;
                    draft.all_review_list[idx].myLike =
                        !draft.all_review_list[idx].myLike;
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
};

export { actionCreators };