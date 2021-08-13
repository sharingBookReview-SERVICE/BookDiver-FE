import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//actions
const SHOW_NAV = "permit/SHOW_NAV";
const SHOW_MODAL = "permit/SHOW_MODAL";
const SHOW_MODAL2 = "permit/SHOW_MODAL2";
const BOOK_SELECT = "permit/BOOK_SELECT";
const SHOW_CHECK_MODAL = "permit/SHOW_CHECK_MODAL"
const IS_PADDING = "permit/IS_PADDING"
const IS_TREASURE = "permit/IS_TREASURE"
const SHOW_TREASURE_MODAL = "permit/SHOW_TREASURE_MODAL"
const SHOW_NEW_BADGE = "permit/SHOW_NEW_BADGE"
const SHOW_LOGIN_MODAL = "permit/SHOW_LOGIN_MODAL"
const SHOW_EDIT_MODAL = "permit/SHOW_EDIT_MODAL"


//actioncreator
const showNav = createAction(SHOW_NAV, (is_nav) => ({ is_nav }));
const showModal = createAction(SHOW_MODAL, (is_modal)=>({is_modal}));
const showModal2 = createAction(SHOW_MODAL2, (is_modal)=>({is_modal}));
const bookSelect = createAction(BOOK_SELECT, (is_selected)=> ({ is_selected}));
const showCheckModal = createAction(SHOW_CHECK_MODAL, (is_written) => ({is_written}));
const isPadding = createAction(IS_PADDING, (is_padding) => ({is_padding}));
const isTreasure = createAction(IS_TREASURE, (is_treasure) => ({is_treasure}))
const showTreasureModal = createAction(SHOW_TREASURE_MODAL, (is_treasure) => ({is_treasure}))
const showNewBadge = createAction(SHOW_NEW_BADGE, (new_badge) => ({new_badge}))
const showLoginModal = createAction(SHOW_LOGIN_MODAL, (show_login) => ({show_login}))
const showEditModal = createAction(SHOW_EDIT_MODAL, (is_modal) => ({is_modal}))


//initial
const initialState = {
    is_nav: true,
    is_modal: false,
    is_modal2: false,
    is_selected: false,
    is_written: false,
    is_padding: true,
    is_treasure: false,
    is_treasure_modal: false, 
    new_badge: null,
    show_login:false,
    is_edit_modal: false,
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
        [SHOW_CHECK_MODAL] : (state, action) => 
        produce(state, (draft) => {
          draft.is_written = action.payload.is_written;
        }),
        [IS_PADDING] : (state, action) => 
        produce(state, (draft) => {
          draft.is_padding = action.payload.is_padding;
        }),
        [IS_TREASURE] : (state, action) => 
        produce(state, (draft) => {
          draft.is_treasure = action.payload.is_treasure;
        }),
        [SHOW_TREASURE_MODAL] : (state, action) => 
        produce(state, (draft) => {
          draft.is_treasure_modal = action.payload.is_treasure;
        }),
        [SHOW_NEW_BADGE] : (state, action) => 
        produce(state, (draft) => {
          draft.new_badge = action.payload.new_badge;
        }),
        [SHOW_LOGIN_MODAL] : (state, action) => 
        produce(state, (draft) => {
          draft.show_login = action.payload.show_login;
        }),
        [SHOW_EDIT_MODAL] : (state, action) => 
        produce(state, (draft) => {
          draft.is_edit_modal = action.payload.is_modal;
        }),
    },
    initialState
  );
  

const actionCreators = {
    showNav,
    showModal,
    showModal2,
    bookSelect,
    showCheckModal,
    isPadding,
    isTreasure,
    showTreasureModal,
    showNewBadge,
    showLoginModal,
    showEditModal,
};
  
export { actionCreators };