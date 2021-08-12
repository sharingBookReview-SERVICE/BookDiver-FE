import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import instance from "../../shared/Request";


//actions
const SELECT_BOOKS = "collection/SELECT_BOOKS";
const MORE_SELECT = "collection/MORE_SELECT";


//actioncreator
const selectBooks = createAction(SELECT_BOOKS, (book) => ({ book }));
const moreSelect = createAction(MORE_SELECT, (more_select)=>({more_select}));
//initial
const initialState = {
    selected_Books: [],
    more_select : false,
};



//middle
//책 하나씩 불러와서 선택한 책 배열에 넣기
const selectBooksSV = (id)=>{
  return function(dispatch){
      instance.get(`/books/${id}`)
      .then((res)=>{
          dispatch(selectBooks({
            title: res.data.title,
            image: res.data.image,
            author: res.data.author,
            isbn: res.data.isbn
          }));
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
          let index = draft.selected_Books.findIndex((p) => p.isbn === action.payload.book.isbn);
         if(index>-1){
           window.alert("중복되는 책입니다.");
           return;
         }
          draft.selected_Books.push(action.payload.book);
        }),
        [MORE_SELECT]: (state, action) =>
        produce(state, (draft) => {
          draft.more_select = action.payload.more_select;
        }),
 
    },
    initialState
  );
  

const actionCreators = {
  selectBooksSV,
  moreSelect
};
  
export { actionCreators };