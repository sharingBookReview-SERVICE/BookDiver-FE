import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import instance from "../../shared/Request";


//actions
const SET_TODAY_PLAN = "SET_TODAY_PLAN";

//actioncreator
const setTodayPlan = createAction(SET_TODAY_PLAN, (plan_list) => ({ plan_list }));

//initial
const initialState = {
    today_list: [],

};



//middle
const createUserSV = () => {
  return function(dispatch){
    //오늘 목표 불러오기
    instance.post('/users')
      .then((res)=>{

      })
      .catch((err)=>{
          
      })

  }
}

//reducer
export default handleActions(
    {
        [SET_TODAY_PLAN]: (state, action) =>
        produce(state, (draft) => {
          draft.today_list = action.payload.plan_list;
        })
 
    },
    initialState
  );
  

const actionCreators = {
  getPlansSV,
};
  
export { actionCreators };