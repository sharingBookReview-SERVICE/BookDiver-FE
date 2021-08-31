import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import instance from "../../shared/Request";
import { history } from "../configStore";
import { actionCreators as permitActions } from "./permit";


//actions
const IS_MAKE_COLLECTION = "collection/IS_MAKE_COLLECTION"; //이 페이지가 컬렉션 만들기인지 확인하는 액션
const SELECT_BOOKS = "collection/SELECT_BOOKS"; //책 선택하기
const DELETE_SELECTED_BOOK = "collection/DELETE_SELECTED_BOOK"; //선택한 책에서 하나 삭제하기
const ADD_BOOK_DESCRIPTION = "collection/ADD_BOOK_DESCRIPTION"; //선택한 책에서 추천설명 추가하기
const GET_SELECTED_BOOKS = "collection/GET_SELECTED_BOOKS"; // 올렸던 컬렉션에서 책만 받아오기
const MORE_SELECT = "collection/MORE_SELECT"; // 책을 더 선택할지 여부
const RESET_SELECTED = "collection/RESET_SELECTED"; //선택한 책 배열 초기화
const GET_TAG_COLLECTIONS = "collection/GET_TAG_COLLECTIONS"; //태그 기반 추천 컬렉션 가져오기
const GET_CUSTOM_COLLLECTIONS = "collection/GET_CUSTOM_COLLLECTIONS"; //사용자가 만든 컬렉션 가져오기
const ADD_COLLECTION = "collection/ADD_COLLECTION"; //컬렉션 작성
const GET_COLLECTION_DETAIL ="collection/GET_COLLECTION_DETAIL"; // 컬렉션 상세 보기
const DELETE_COLLECTION = "collection/DELETE_COLLECTION"; //컬렉션 삭제
const EDIT_COLLECTION = "collection/EDIT_COLLECTION"; //컬렉션 수정
const GET_COLLECTION_ID = "collection/GET_COLLECTION_ID"; //해당 컬렉션 아이디 가져오기
const SEARCH_COLLECTION ="collection/SEARCH_COLLECTION"; // 태그기반으로 컬렉션 검색하기


//actioncreator
const isMakeCollection = createAction(IS_MAKE_COLLECTION, (is_make_collection)=>({is_make_collection}));
const selectBooks = createAction(SELECT_BOOKS, (book) => ({ book }));
const deleteSelectedBook = createAction(DELETE_SELECTED_BOOK, (bookId)=>({bookId}));
const addBookDescription = createAction(ADD_BOOK_DESCRIPTION, (content)=> ({content}));
const getSelectedBooks = createAction(GET_SELECTED_BOOKS, (books)=>({books}));
const moreSelect = createAction(MORE_SELECT, (more_select)=>({more_select}));
const resetSelected =  createAction(RESET_SELECTED, (book)=>({book}));
const getTagCollections = createAction(GET_TAG_COLLECTIONS, (collection_list)=> ({collection_list}));
const getCustomCollections = createAction(GET_CUSTOM_COLLLECTIONS, (collection_list)=> ({collection_list}));
const addCollection = createAction(ADD_COLLECTION, (collection)=>({collection}));
const getCollectionDetail = createAction(GET_COLLECTION_DETAIL, (collection)=>({collection}));
const deleteCollection = createAction(DELETE_COLLECTION, (collectionId)=>({collectionId}));
const editCollection = createAction(EDIT_COLLECTION, (collectionId)=>({collectionId}));
const getCollectionId = createAction(GET_COLLECTION_ID, (collectionId)=>({collectionId}));
const searchCollection = createAction(SEARCH_COLLECTION, (collection)=>({collection}));

//initial
const initialState = {
    selected_Books: [],
    more_select : false,
    tag_collection_list : [],
    custom_collection_list: [],
    is_make_collection : false,
    collection_detail:[],
    collection_id : "",
    searched_collection : [],
};



//middle
//책 하나씩 불러와서 선택한 책 배열에 넣기
const selectBooksSV = (id)=>{
  return function(dispatch){
      instance.get(`/books/${id}`)
      .then((res)=>{
        
        const _book = {
          isbn: res.data.isbn,
          book: res.data.isbn,
          image: res.data.image,
          title: res.data.title,
          author: res.data.author,
          book_description: ""
        }
        dispatch(selectBooks(_book))
      })
      .catch((err)=>{
        // history.push("*")
          console.log("책로드 하나 실패", err)
      })
  }
}


//태그 기반 collection불러오기
const getTagCollectionsSV = ()=>{
  return function(dispatch){
    instance.get('/collections',{
      params: {
        type: "tag"
      }
    })
    .then((res)=>{
      dispatch(getTagCollections(res.data.collections));
    })
    .catch((err)=>{
      // history.push("*")
    })
  }
}

//사용자가 올린 collection불러오기
const getCustomCollectionsSV = ()=>{
  return function(dispatch){
    instance.get('/collections',{
      params: {
        type: "custom"
      }
    })
    .then((res)=>{
      console.log(res.data)
      dispatch(getCustomCollections(res.data.collections));
    })
    .catch((err)=>{
      // history.push("*")
    })
  }
}

//collection추가하기
const addCollectionSV = (formData)=>{
  return function(dispatch){
    instance.post('/collections', formData, {
      headers: {
          "Content-Type": "multipart/form-data",
      },
  })
  .then((res)=>{
    dispatch(addCollection(res.data))
    history.push('/bookCollectionMain')
  })
  .catch((err) => {
    // history.push("*")
    console.log("post작성 실패", err);
   
  })
  }
}

//컬렉션 하나 상세보기
const getCollectionDetailSV = (id)=>{
  return function(dispatch){
    instance.get(`/collections/${id}`)
    .then((res)=>{
      const contents = res.data.collection.contents;
      const _contents = [];
      for (let i = 0; i < contents.length; i++) { 
        _contents.push({
            isbn: contents[i].book.isbn,
            book: contents[i].book.isbn,
            image: contents[i].book.image,
            author: contents[i].book.author,
            title: contents[i].book.title,
            book_description: contents[i].book_description
        })
        }
        dispatch(getCollectionDetail(res.data.collection))
        dispatch(getSelectedBooks(_contents))
    })
    .catch((err)=>{
      // history.push("*")
      console.log("콜렉션상세보기 실패", err)
    })
  }
}

//컬렉션 수정하기
const editCollectionDetailSV = (id, collection)=>{
  return function(dispatch){
    instance.put(`/collections/${id}`,{
      name: collection.name,
      description: collection.description,
      contents : collection.contents
    })
    .then((res)=>{
      dispatch(getCollectionDetail(res.data))
      history.push(`/bookCollectionMain`)
    })
    .catch((err)=>{
      history.push("*")
      console.log("콜렉션수정 실패", err)
    })
  }
}

//컬렉션 삭제하기
const deleteCollectionSV = ()=>{
  return function(dispatch, getState){
    const id = getState().collection.collection_id;
    instance.delete(`collections/${id}`)
    .then((res)=>{
      dispatch(deleteCollection(id))
      history.push('/bookCollectionMain')
    })
    .catch((err)=>{
      history.push("*")
      console.log("컬렉션 삭제 실패", err)
    })
  }
}

//컬렉션 하나 검색

const searchCollectionSV = (keyword) =>{
  return function(dispatch, getState) {
      instance
      .get(`/search`, {
          params : {
              tag: keyword
          }
      }

      )
      .then((res)=>{
          dispatch(searchCollection(res.data.result[0]))
          history.push(`/collectiondetail/${getState().collection.searched_collection._id}`)
      })
      .catch((err)=>{
          console.log("검색 실패", err)
          // window.alert("아직 컬렉션이 준비되지 않았어요!")
          dispatch(permitActions.showNotfoundModal(true))
      })
  }
}

//reducer
export default handleActions(
    {
      
      //이 페이지가 컬렉션 만들기인지 확인하는 액션
      [IS_MAKE_COLLECTION]: (state, action) =>
      produce(state, (draft) => {
        draft.is_make_collection = action.payload.is_make_collection;
      }),
       //책 선택하기
      [SELECT_BOOKS]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.selected_Books.findIndex((p) => p.isbn === action.payload.book.isbn);
        if(index>-1){
          window.alert("중복되는 책입니다.");
          return;
        }
        draft.selected_Books.push(action.payload.book);

      }),
      //선택한 책에서 하나 삭제하기
      [DELETE_SELECTED_BOOK]:(state, action)=>
      produce(state, (draft)=>{
        draft.selected_Books = draft.selected_Books.filter((l, idx) => {
          return l.isbn !== action.payload.bookId;
        });
      }),
       //선택한 책에서 추천설명 추가하기
      [ADD_BOOK_DESCRIPTION]:(state, action)=>
      produce(state, (draft)=>{
        let idx = draft.selected_Books.findIndex((l) => l.isbn === action.payload.content.isbn);
        if(idx>-1){
          draft.selected_Books[idx].book_description = action.payload.content.book_description;
        }
      }),
      // 올렸던 컬렉션에서 책만 받아오기
      [GET_SELECTED_BOOKS]:(state, action)=>
      produce(state, (draft)=>{
       draft.selected_Books = action.payload.books;
      }),
      // 책을 더 선택할지 여부
      [MORE_SELECT]: (state, action) =>
      produce(state, (draft) => {
        draft.more_select = action.payload.more_select;
      }),
      //선택한 책 배열 초기화
      [RESET_SELECTED]: (state, action) =>
      produce(state, (draft) => {
        draft.selected_Books = [];
      }),
       //태그 기반 추천 컬렉션 가져오기
      [GET_TAG_COLLECTIONS]:(state, action)=>
      produce(state, (draft)=>{
        draft.tag_collection_list = action.payload.collection_list;
      }),
       //사용자가 만든 컬렉션 가져오기
      [GET_CUSTOM_COLLLECTIONS]:(state, action)=>
      produce(state, (draft)=>{
        draft.custom_collection_list = action.payload.collection_list;
      }),
       //컬렉션 작성
      [ADD_COLLECTION]:(state, action)=>
      produce(state, (draft)=>{
        draft.custom_collection_list.push(action.payload.collection);
      }),
     
      //컬렉션 상세 보기
      [GET_COLLECTION_DETAIL]:(state, action)=>
      produce(state, (draft)=>{
        draft.collection_detail = action.payload.collection;
      }),
     //컬렉션 삭제
      [DELETE_COLLECTION]:(state, action)=>
      produce(state, (draft)=>{
        draft.custom_collection_list = draft.custom_collection_list.filter((l, idx) => {
          return l.id !== action.payload.collectionId;
        });
      }),
      //해당 컬렉션 아이디 가져오기
      [GET_COLLECTION_ID]: (state, action)=>
      produce(state, (draft)=>{
        draft.collection_id = action.payload.collectionId;
      }),
      // 태그기반으로 컬렉션 검색하기
      [SEARCH_COLLECTION]: (state, action)=>
      produce(state, (draft)=>{
        draft.searched_collection = action.payload.collection;
      }),

    },
    initialState
  );
  

const actionCreators = {
  isMakeCollection,
  selectBooksSV,
  deleteSelectedBook,
  addBookDescription,
  getSelectedBooks,
  moreSelect,
  resetSelected,
  getTagCollectionsSV,
  getCustomCollectionsSV,
  addCollectionSV,
  getCollectionDetailSV,
  deleteCollectionSV,
  getCollectionId,
  editCollectionDetailSV,
  searchCollectionSV
};
  
export { actionCreators };