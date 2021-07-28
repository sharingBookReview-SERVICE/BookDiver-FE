import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import instance from "../../shared/Request";


//actions
const GET_ALL_REVIEW = "GET_ALL_REVIEW";

//actioncreator
const getAllReview = createAction(GET_ALL_REVIEW, (review_list) => ({ review_list }));

//initial
const initialState = {
    all_review_list: [],

};



//middle
//전체 피드 불러오기
const getAllReviewSV = () => {
    return function(dispatch){
    
      instance.get('/todayplan')
        .then((res)=>{
            dispatch(getAllReview(res.data));
        })
        .catch((err)=>{
            window.alert("피드 리뷰 로드 실패");
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
 
    },
    initialState
  );
  

const actionCreators = {
    getAllReviewSV,
};
  
export { actionCreators };