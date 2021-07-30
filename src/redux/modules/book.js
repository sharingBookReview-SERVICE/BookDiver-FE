import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";


//actions
const GET_ALL_BOOKS = "book/GET_ALL_BOOKS";
const GET_ONE_BOOK = "book/GET_ONE_BOOK";
const GET_BESTSELLER = "book/GET_BESTSELLER";

//actioncreator
const getAllBooks = createAction(GET_ALL_BOOKS, (book_list) => ({ book_list }));
const getOneBook = createAction(GET_ONE_BOOK, (book)=>({book}));
const getBestSeller = createAction(GET_BESTSELLER, (book_list) =>({book_list}));

//initial
const initialState = {
    all_book_list: [],
    book :[],
    best_seller : [],
};

//middle
//전체 책 불러오기
const getAllBookSV = () => {
    return function(dispatch){
    
      instance.get('/books')
        .then((res)=>{
            console.log(res)
            dispatch(getAllBooks(res.data));
        })
        .catch((err)=> {
            window.alert("책 로드 실패");
            console.log("책로드 실패", err)
        })

    }
}

//책 하나만 불러오기
const getOneBookSV = (id)=>{
    return function(dispatch){
        instance.get('/books/'+ id)
        .then((res)=>{
            dispatch(getOneBook(res.data));
        })
        .catch((err)=>{
            window.alert("책 하나 로드 실패");
            console.log("책로드 하나 실패", err)
        })
    }
}

//베스트 셀러 불러오기
const getBestSellerSV = ()=>{
    return function(dispatch){
        instance.get('/book/bestseller')
        .then((res)=>{
            dispatch(getBestSeller(res.data));
        })
        .catch((err)=>{
            window.alert("베스트셀러 로드 실패!")
            console.log("베스트셀러 로드 실패", err)
        })
    }
}

//reducer
export default handleActions(
    {
        [GET_ALL_BOOKS]: (state, action) =>
        produce(state, (draft) => {
          draft.all_book_list = action.payload.book_list;
        }),
        [GET_ONE_BOOK]: (state, action)=>
        produce(state, (draft)=>{
            draft.book = action.payload.book;
        }),
        [GET_BESTSELLER]:(state, action) =>
        produce(state, (draft)=>{
            draft.best_seller = action.payload.book_list;
        }),
 
    },
    initialState
  );
  

const actionCreators = {
    getAllBookSV,
    getOneBookSV,
    getBestSellerSV,
};
  
export { actionCreators };