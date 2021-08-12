import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import instance from "../../shared/Request";


//actions
const SELECT_BOOKS = "collection/SELECT_BOOKS";


//actioncreator
const selectBooks = createAction(SELECT_BOOKS, (book) => ({ book }));

//initial
const initialState = {
    selected_Books: [],
};



//middle
//책 하나씩 불러와서 선택한 책 배열에 넣기
const selectBooksSV = (id)=>{
  return function(dispatch){
      instance.get(`/books/${id}`)
      .then((res)=>{
          dispatch(selectBooks(res.data));
      })
      .catch((err)=>{
          window.alert("책 하나 로드 실패");
          console.log("책로드 하나 실패", err)
      })
  }
}



//reducer
export default handleActions(
    {

        [SELECT_BOOKS]: (state, action) =>
        produce(state, (draft) => {
          draft.selected_Books.push(action.payload.book);
        }) 
 
    },
    initialState
  );
  

const actionCreators = {
  selectBooksSV
};
  
export { actionCreators };