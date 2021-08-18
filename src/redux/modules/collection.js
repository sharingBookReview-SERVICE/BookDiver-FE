import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import instance from "../../shared/Request";
import { history } from "../configStore";


//actions
const IS_MAKE_COLLECTION = "collection/IS_MAKE_COLLECTION";
const SELECT_BOOKS = "collection/SELECT_BOOKS";
const MORE_SELECT = "collection/MORE_SELECT";
const RESET_SELECTED = "collection/RESET_SELECTED";
const GET_TAG_COLLECTIONS = "collection/GET_TAG_COLLECTIONS";
const GET_CUSTOM_COLLLECTIONS = "collection/GET_CUSTOM_COLLLECTIONS";
const ADD_COLLECTION = "collection/ADD_COLLECTION";
const ADD_COLLECTION_CONTENTS = "collection/ADD_COLLECTION_CONTENTS";
const GET_COLLECTION_CONTENTS = "collection/GET_COLLECTION_CONTENTS";
const DELETE_COLLECTION_CONTENTS = "collection/DELETE_COLLECTION_CONTENTS";
const GET_COLLECTION_DETAIL ="collection/GET_COLLECTION_DETAIL";
const GET_COLLECTION_DETAIL_CONTENTS = "collection/GET_COLLECTION_DETAIL_CONTENTS";
const DELETE_COLLECTION = "collection/DELETE_COLLECTION";
const EDIT_COLLECTION = "collection/EDIT_COLLECTION";
const GET_COLLECTION_ID = "collection/GET_COLLECTION_ID";


//actioncreator
const isMakeCollection = createAction(IS_MAKE_COLLECTION, (is_make_collection)=>({is_make_collection}));
const selectBooks = createAction(SELECT_BOOKS, (book) => ({ book }));
const moreSelect = createAction(MORE_SELECT, (more_select)=>({more_select}));
const resetSelected =  createAction(RESET_SELECTED, (book)=>({book}));
const getTagCollections = createAction(GET_TAG_COLLECTIONS, (collection_list)=> ({collection_list}));
const getCustomCollections = createAction(GET_CUSTOM_COLLLECTIONS, (collection_list)=> ({collection_list}));
const addCollection = createAction(ADD_COLLECTION, (collection)=>({collection}));
const addCollection_content = createAction(ADD_COLLECTION_CONTENTS, (collection)=>({collection}));
const getCollection_content = createAction(GET_COLLECTION_CONTENTS, (collection)=>({collection}));
const deleteCollection_content = createAction(DELETE_COLLECTION_CONTENTS , (collectionId)=>({collectionId}));
const getCollectionDetail = createAction(GET_COLLECTION_DETAIL, (collection)=>({collection}));
const getCollectionDetailContent = createAction(GET_COLLECTION_DETAIL_CONTENTS, (contents)=>({contents}));
const deleteCollection = createAction(DELETE_COLLECTION, (collectionId)=>({collectionId}));
const editCollection = createAction(EDIT_COLLECTION, (collectionId)=>({collectionId}));
const getCollectionId = createAction(GET_COLLECTION_ID, (collectionId)=>({collectionId}));

//initial
const initialState = {
    selected_Books: [],
    more_select : false,
    tag_collection_list : [],
    custom_collection_list: [],
    collection_contents :[],
    is_make_collection : false,
    collection_detail:[],
    collection_id : "",
    collection_detail_contents:[]
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
          dispatch(addCollection_content({
            isbn: res.data.isbn,
            book_description:""
          }))
      })
      .catch((err)=>{
          window.alert("책 하나 로드 실패");
          console.log("책로드 하나 실패", err)
      })
  }
}

const deleteSelectedBook = (id)=>{
  return function(dispatch, getState){
    try{
      dispatch(deleteCollection_content(id))
    }
    catch(err){
      console.log("컬렉션 컨텐츠 삭제 실패", err)
    }
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
      console.log(err)
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
      console.log(err)
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
    console.log("post작성 실패", err);
   
  })
  }
}

//컬렉션 하나 상세보기
const getCollectionDetailSV = (id)=>{
  return function(dispatch){
    instance.get(`/collections/${id}`)
    .then((res)=>{
      const collection = res.data.collection;
      const contents = collection.contents;
      dispatch(getCollectionDetail(collection));
      dispatch(getCollectionDetailContent(contents));
      const collection_contents = [];
    
      contents.map((p)=>{
        return (
          collection_contents.push({
            isbn: p.book?.id,
            book_description: p.book_description
          })
        )
      })

      dispatch(getCollection_content(collection_contents));
      
    })
    .catch((err)=>{
      console.log("콜렉션상세보기 실패", err)
    })
  }
}

//컬렉션 수정하기
const editCollectionDetailSV = (id)=>{
  return function(dispatch){
    instance.put(`/collections/${id}`)
    .then((res)=>{
      dispatch(getCollectionDetail(res.data.collection));
    })
    .catch((err)=>{
      console.log("콜렉션상세보기 실패", err)
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
    })
    .catch((err)=>{
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
      [ADD_COLLECTION_CONTENTS]:(state, action)=>
      produce(state, (draft)=>{
        //아무것도 없으면 그냥 push
        if(draft.collection_contents.length===0){
          draft.collection_contents.push(action.payload.collection);
        }
        //뭐라도 있으면 edit
        else{
          let idx = draft.collection_contents.findIndex((l) => l.isbn === action.payload.collection.isbn);
            if(idx>-1){
              draft.collection_contents[idx] = action.payload.collection;
            }
            else{
              draft.collection_contents.push(action.payload.collection);
            }
            
        }
      
        
      }),
      [GET_COLLECTION_CONTENTS]:(state, action) =>
      produce(state, (draft)=>{
        draft.collection_contents = action.payload.collection;
      }),
      [DELETE_COLLECTION_CONTENTS]:(state, action)=>
      produce(state, (draft)=>{
        draft.collection_contents = draft.collection_contents.filter((l, idx) => {
          return l.isbn !== action.payload.collectionId;
        });
        draft.selected_Books = draft.selected_Books.filter((l, idx) => {
          return l.isbn !== action.payload.collectionId;
        });
        draft.collection_detail_contents = draft.collection_detail_contents.filter((l, idx)=>{
          return l.book?.id !== action.payload.collectionId;
        })
      }),
      //컬렉션 상세 보기
      [GET_COLLECTION_DETAIL]:(state, action)=>
      produce(state, (draft)=>{
        draft.collection_detail = action.payload.collection;
      }),
      [GET_COLLECTION_DETAIL_CONTENTS]:(state, action)=>
      produce(state, (draft)=>{
        draft.collection_detail_contents = action.payload.contents;
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
  moreSelect,
  resetSelected,
  getTagCollectionsSV,
  getCustomCollectionsSV,
  addCollectionSV,
  addCollection_content,
  deleteSelectedBook,
  getCollectionDetailSV,
  deleteCollectionSV,
  getCollectionId
};
  
export { actionCreators };