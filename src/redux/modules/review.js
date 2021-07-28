import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import instance from "../../shared/Request";


//actions
const GET_ALL_REVIEW = "GET_ALL_REVIEW";
const ADD_REVIEW = "ADD_REVIEW";
const LIKE = "review/LIKE"
const DELETE_REVIEW = "DELETE_REVIEW";
const EDIT_REVIEW = "EDIT_REVIEW";
const DETAIL_REVIEW = "DETAIL_REVIEW";

//actioncreator
const getAllReview = createAction(GET_ALL_REVIEW, (review_list) => ({ review_list }));
const like = createAction(LIKE, (reviewId) => ({reviewId}))
const addReview = createAction(ADD_REVIEW, (review) => ({review}));
const deleteReview = createAction(DELETE_REVIEW, (review) => ({review}));
const editReview = createAction(EDIT_REVIEW, (bookId, reviewId) => (bookId, reviewId));
const detailReview = createAction(DELETE_REVIEW, (bookId, reviewId) => (bookId, reviewId));


//initial
const initialState = {
    all_review_list: [{
        user:"",
        book:"",
        quote:"",
        content:"",
        hashtag:[],
        createdAt:"",
        comments:[],
        myLike:true,
        likes:10,
    }],

};

//middle
//전체 피드 불러오기
const getAllReviewSV = () => {
    return function(dispatch){

      instance.get('/todayplan')
        .then(function (response) {
            // dispatch(setTodayPlan(response.data));
        })
        .catch(function (error) {
            console.log(error);
        })

    }
}

//포스트 추가하기
const addReviewSV = (review, bookId) => {
    return function(dispatch){
        console.log(review)
        instance.post(`/books/${bookId}/reviews`, {
            quote: review.quote,
            content: review.content,
            hashtags: review.hashtags,
        })
            .then((response) => {
                console.log(response)
                dispatch(addReview(review));
                window.location.reload();
            })
            .catch((error) => {
                console.log("post작성 실패", error);
            })

    }
}

//포스트 삭제하기
const deleteReviewSV = (bookId, reviewId) => {
    return function (dispatch) {
        console.log(bookId, reviewId)
        instance.delete(`/books/${bookId}/reviews/${reviewId}`)
            .then((response) => {
                dispatch(deleteReview(bookId, reviewId));
                console.log(response);
            })
            .catch((error) => {
                console.log("포스트 삭제도중 에러 발생", error);
            });
    };
};

//포스트 수정하기
const editReviewSV = (bookId, reviewId) => {
    return function (dispatch, getState, {history}) {
        console.log(bookId, reviewId)
        instance.put(`/books/${reviewId}/reviews/${reviewId}`)
            .then((response) => {
                dispatch(editReview(response.data.result));
                history.push("/");
                window.location.reload();
            })
            .catch((error) => {
                console.log("포스트 수정중 에러 발생", error);
            })

    }
}

//상세보기
const detailReviewSV = (bookId,reviewId) => {
    return function (dispatch){
        console.log(bookId)
        instance.get(`/books/${bookId}/reviews/${reviewId}`)
            .then((response) => {
                dispatch(detailReview(response.data));
                console.log("detailReviewSV", response);
            })
            .catch((error) => {
                console.log("상세포스트 에러 발생", error);
            })
    }
}

//라이크 버튼
const LikeSV = (bookId, reviewId) => {
    return function(dispatch){
        instance.post(`books/${bookId}/reviews/${reviewId}/like`).then((res)=>{
            console.log(res)
            dispatch(like(reviewId))
        }).catch((err)=>{
            console.log("좋아요 실패", err)
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
        [ADD_REVIEW] : (state, action) =>
            produce(state, (draft) => {
                draft.all_review_list.unshift(action.payload.review);
            }),
        [DELETE_REVIEW] : (state, action) =>
            produce(state, (draft) => {
                let index = draft.all_review_list.findIndex((i) => i.id === action.payload.review);
                if (index !== -1) {
                    draft.all_review_list.splice(index, 1)
                }}),
        [EDIT_REVIEW] : (state, action) =>
            produce(state, (draft) => {
                let index = draft.all_review_list.findIndex((i) => i.id === action.payload.review)
                draft.all_review_list[index] = {...draft.all_review_list[index], ...action.payload.review}
            }),
        [DETAIL_REVIEW] : (state, action) =>
            produce(state, (draft) => {
                draft.review = action.payload.review;
            }),

        [LIKE]: (state, action) => produce(state, (draft) => {
            let idx = draft.all_review_list.findIndex((l) => l.id === action.payload.reviewId);

            if (draft.review[idx].myLike) {
              draft.review[idx].likes = draft.review[idx].likes -1;
              draft.review[idx].myLike = !draft.review[idx].myLike;

            } else {
              draft.review[idx].likes = draft.review[idx].likes +1;
              draft.review[idx].myLike = !draft.review[idx].myLike;
            }

          }),

        [ADD_REVIEW] : (state, action) =>
            produce(state, (draft) => {
                draft.all_review_list.unshift(action.payload.review);
            })
    },
    initialState
  );
  

const actionCreators = {
    getAllReviewSV,
    LikeSV,
    addReviewSV,
    deleteReviewSV,
    editReviewSV,
    detailReviewSV,
};
  
export { actionCreators };