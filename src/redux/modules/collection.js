import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import instance from "../../shared/Request";
import { history } from "../configStore";


//actions
const IS_MAKE_COLLECTION = "collection/IS_MAKE_COLLECTION";
const SELECT_BOOKS = "collection/SELECT_BOOKS";
const DELETE_SELECTED_BOOK = "collection/DELETE_SELECTED_BOOK";
const ADD_BOOK_DESCRIPTION = "collection/ADD_BOOK_DESCRIPTION";
const GET_SELECTED_BOOKS = "collection/GET_SELECTED_BOOKS";
const MORE_SELECT = "collection/MORE_SELECT";
const RESET_SELECTED = "collection/RESET_SELECTED";
const GET_TAG_COLLECTIONS = "collection/GET_TAG_COLLECTIONS";
const GET_CUSTOM_COLLLECTIONS = "collection/GET_CUSTOM_COLLLECTIONS";
const ADD_COLLECTION = "collection/ADD_COLLECTION";
const GET_COLLECTION_DETAIL ="collection/GET_COLLECTION_DETAIL";
const DELETE_COLLECTION = "collection/DELETE_COLLECTION";
const EDIT_COLLECTION = "collection/EDIT_COLLECTION";
const GET_COLLECTION_ID = "collection/GET_COLLECTION_ID";


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

//initial
const initialState = {
    selected_Books: [],
    more_select : false,
    tag_collection_list : [],
    custom_collection_list: [],
    is_make_collection : false,
    collection_detail:[],
    collection_id : "",
};



//middle
//책 하나씩 불러와서 선택한 책 배열에 넣기
const selectBooksSV = (id)=>{
  return function(dispatch,{history}){
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
        history.push("*")
          console.log("책로드 하나 실패", err)
      })
  }
}


//태그 기반 collection불러오기
const getTagCollectionsSV = ()=>{
  return function(dispatch,{history}){
    instance.get('/collections',{
      params: {
        type: "tag"
      }
    })
    .then((res)=>{
      dispatch(getTagCollections(res.data.collections));
    })
    .catch((err)=>{
      history.push("*")
    })
  }
}

//사용자가 올린 collection불러오기
const getCustomCollectionsSV = ()=>{
  return function(dispatch,{history}){
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
      history.push("*")
    })
  }
}

//collection추가하기
const addCollectionSV = (formData)=>{
  return function(dispatch,{hitory}){
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
    history.push("*")
    console.log("post작성 실패", err);
   
  })
  }
}

//컬렉션 하나 상세보기
const getCollectionDetailSV = (id)=>{
  return function(dispatch,{history}){
    instance.get(`/collections/${id}`)
    .then((res)=>{
      const contents = res.data.collection.contents;
      const _contents =[];
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
  return function(dispatch,{history}){
    instance.put(`/collections/${id}`,{
      name: collection.name,
      description: collection.description,
      contents : collection.contents
    })
    .then((res)=>{
      history.push(`/collectiondetail/${id}`)
    })
    .catch((err)=>{
      history.push("*")
      console.log("콜렉션수정 실패", err)
    })
  }
}

//컬렉션 삭제하기
const deleteCollectionSV = ()=>{
  return function(dispatch, getState, {history}){
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


//reducer
export default handleActions(
    {
      [IS_MAKE_COLLECTION]: (state, action) =>
      produce(state, (draft) => {
        draft.is_make_collection = action.payload.is_make_collection;
      }),
      [SELECT_BOOKS]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.selected_Books.findIndex((p) => p.isbn === action.payload.book.isbn);
        if(index>-1){
          window.alert("중복되는 책입니다.");
          return;
        }
        draft.selected_Books.push(action.payload.book);

      }),
      [DELETE_SELECTED_BOOK]:(state, action)=>
      produce(state, (draft)=>{
        draft.selected_Books = draft.selected_Books.filter((l, idx) => {
          return l.isbn !== action.payload.bookId;
        });
      }),
      [ADD_BOOK_DESCRIPTION]:(state, action)=>
      produce(state, (draft)=>{
        let idx = draft.selected_Books.findIndex((l) => l.isbn === action.payload.content.isbn);
        if(idx>-1){
          draft.selected_Books[idx].book_description = action.payload.content.book_description;
        }
      }),
      [GET_SELECTED_BOOKS]:(state, action)=>
      produce(state, (draft)=>{
       draft.selected_Books = action.payload.books;
      }),
      [MORE_SELECT]: (state, action) =>
      produce(state, (draft) => {
        draft.more_select = action.payload.more_select;
      }),
      [RESET_SELECTED]: (state, action) =>
      produce(state, (draft) => {
        draft.selected_Books = [];
      }),
      [GET_TAG_COLLECTIONS]:(state, action)=>
      produce(state, (draft)=>{
        draft.tag_collection_list = action.payload.collection_list;
      }),
      [GET_CUSTOM_COLLLECTIONS]:(state, action)=>
      produce(state, (draft)=>{
        draft.custom_collection_list = action.payload.collection_list;
      }),
      [ADD_COLLECTION]:(state, action)=>
      produce(state, (draft)=>{
        draft.custom_collection_list.push(action.payload.collection);
      }),
     
      //컬렉션 상세 보기
      [GET_COLLECTION_DETAIL]:(state, action)=>
      produce(state, (draft)=>{
        draft.collection_detail = action.payload.collection;
      }),
     
      [DELETE_COLLECTION]:(state, action)=>
      produce(state, (draft)=>{
        draft.custom_collection_list = draft.custom_collection_list.filter((l, idx) => {
          return l.id !== action.payload.collectionId;
        });
      }),
      [GET_COLLECTION_ID]: (state, action)=>
      produce(state, (draft)=>{
        draft.collection_id = action.payload.collectionId;
      })

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
  editCollectionDetailSV
};
  
export { actionCreators };