import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";


//actions
const GET_ONE_BOOK = "book/GET_ONE_BOOK"; //책 하나만 불러오기
const GET_SEARCH_BOOKS = "book/GET_SEARCH_BOOKS"; //검색한 책 불러오기
const RESET_SELECTED_BOOK = "book/RESET_SELECTED_BOOK";//선택한 책 초기화

//actioncreator
const getOneBook = createAction(GET_ONE_BOOK, (book)=>({book}));
const getSearchBooks = createAction(GET_SEARCH_BOOKS, (book_list)=>({book_list}));
const resetSelectedBook = createAction(RESET_SELECTED_BOOK, (book)=> ({book}));

//initial
const initialState = {
    book :[],
    search_book_list : []
};



//검색한 책 불러오기
const getSearchBooksSV = (target, query)=>{
    return function(dispatch, getState, {history}){
        instance.get(`/books?target=${target}&query=${query}`)
        .then((res)=>{
            if(!res.data.searchList){
                window.alert("찾으시는 책이 없습니다.")
                return;
            }
            dispatch(getSearchBooks(res.data.searchList));
        })
        .catch((err)=>{
            // history.push("*")
            window.alert("찾으시는 책이 없습니다.")
            console.log("검색 책 로드 실패", err);
        })
    }
}

//책 하나만 불러오기
const getOneBookSV = (id)=>{
    return function(dispatch,{history}){
        instance.get(`/books/${id}`)
        .then((res)=>{
            dispatch(getOneBook(res.data));
        })
        .catch((err)=>{
            // history.push("*")
            console.log("책로드 하나 실패", err)
        })
    }
}



//reducer
export default handleActions(
    {
        //책 하나만 불러오기
        [GET_ONE_BOOK]: (state, action)=>
        produce(state, (draft)=>{
            draft.book = action.payload.book;
        }),
        //검색한 책 불러오기
        [GET_SEARCH_BOOKS]: (state, action) =>
        produce(state, (draft)=>{
            draft.search_book_list = action.payload.book_list;
        }),
        //선택한 책 리셋하기
        [RESET_SELECTED_BOOK]: (state, action) =>
        produce(state,(draft)=>{
            draft.book = [];
            draft.search_book_list = [];
        })
 
    },
    initialState
  );
  

const actionCreators = {
    getOneBookSV,
    getSearchBooksSV,
    resetSelectedBook
};
  
export { actionCreators };