import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//actions
const SHOW_NAV = "permit/SHOW_NAV";
const SHOW_MODAL = "permit/SHOW_MODAL";
const SHOW_MODAL2 = "permit/SHOW_MODAL2";
const BOOK_SELECT = "permit/BOOK_SELECT";


//actioncreator
const showNav = createAction(SHOW_NAV, (is_nav) => ({ is_nav }));
const showModal = createAction(SHOW_MODAL, (is_modal)=>({is_modal}));
const showModal2 = createAction(SHOW_MODAL2, (is_modal)=>({is_modal}));
const bookSelect = createAction(BOOK_SELECT, (is_selected)=> ({ is_selected}));


//initial
const initialState = {
    is_nav: true,
    is_modal: false,
    is_modal2: false,
    is_selected: false,

};


//reducer
export default handleActions(
    {
        [SHOW_NAV]: (state, action) =>
        produce(state, (draft) => {
          draft.is_nav = action.payload.is_nav;
        }),
        [SHOW_MODAL]: (state, action)=>
        produce(state,(draft)=>{
          draft.is_modal = action.payload.is_modal;
        }),
        [SHOW_MODAL2]: (state, action)=>
        produce(state,(draft)=>{
          draft.is_modal2 = action.payload.is_modal;
        }),
        [BOOK_SELECT] : (state, action) =>
        produce(state, (draft)=>{
          draft.is_selected = action.payload.is_selected;
        }),
    },
    initialState
  );
  

const actionCreators = {
    showNav,
    showModal,
    showModal2,
    bookSelect,
};
  
export { actionCreators };