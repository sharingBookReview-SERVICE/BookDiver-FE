import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//actions
const GET_TAG = "tag/GET_TAG"
const ADD_TAG = "tag/ADD_TAG";
const REMOVE_TAG = "tag/REMOVE_TAG";
const SET_RECOMMAND_TAG = "tag/SET_RECOMMAND_TAG"
const REMOVE_RECOMMAND_TAG = "tag/REMOVE_RECOMMAND_TAG"

//actioncreator
const getTag = createAction(GET_TAG, (tags) => ({ tags }));
const addTag = createAction(ADD_TAG, (tag)=>({tag}));
const removeTag = createAction(REMOVE_TAG, (index)=> ({index}));
const setRecommandTag = createAction(SET_RECOMMAND_TAG, (tags) => ({tags}))
const removeRecommandTag = createAction(REMOVE_RECOMMAND_TAG, (index) => ({index}))


//initial
const initialState = {
  tags: [],
  recommand_tags:["자기계발","독서","문해력","이어령"],
};

//reducer
export default handleActions(
    {
        [GET_TAG]: (state, action) =>
        produce(state, (draft) => {
          draft.tags = action.payload.tags;
        }),
        [ADD_TAG]: (state, action)=>
        produce(state,(draft)=>{
          draft.tags.push(action.payload.tag);
        }),
        [REMOVE_TAG] : (state, action) =>
        produce(state, (draft)=>{
          draft.tags = draft.tags.filter((_,index) => index !== action.payload.index)
        }),
        [SET_RECOMMAND_TAG] : (state, action) => 
        produce(state, (draft) =>{
          draft.recommand_tags = action.payload.tags
        }),
        [REMOVE_RECOMMAND_TAG] : (state, action) =>
        produce(state, (draft) => {
          draft.recommand_tags = draft.recommand_tags.filter((_,index) => index !== action.payload.index)
        })
    },
    initialState
  );
  

const actionCreators = {
  getTag,
  addTag,
  removeTag,
  setRecommandTag,
  removeRecommandTag,
};
  
export { actionCreators };