import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import instance from "../../shared/Request";


//actions
const GET_ALL_REVIEW = "GET_ALL_REVIEW";
const LIKE = "review/LIKE"

//actioncreator
const getAllReview = createAction(GET_ALL_REVIEW, (review_list) => ({ review_list }));
const like = createAction(LIKE, (reviewId) => ({reviewId}))

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
    
      instance.get('/')
        .then((res)=>{
            dispatch(getAllReview(res.data));
        })
        .catch((err)=>{
            window.alert("피드 리뷰 로드 실패");
        })

    }
}

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
 
    },
    initialState
  );
  

const actionCreators = {
    getAllReviewSV,
    LikeSV,
};
  
export { actionCreators };