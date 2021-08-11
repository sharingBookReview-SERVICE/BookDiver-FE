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


//reducer
export default handleActions(
    {
        [SELECT_BOOKS]: (state, action) =>
        produce(state, (draft) => {
          draft.selected_Books= action.payload.book;
        })
 
    },
    initialState
  );
  

const actionCreators = {
    selectBooks
};
  
export { actionCreators };