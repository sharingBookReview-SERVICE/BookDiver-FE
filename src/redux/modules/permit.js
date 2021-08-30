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
const IS_LOADING = "permit/IS_LOADING"
const SHOW_NOT_SUPPORT = "permit/SHOW_NOT_SUPPORT";
const MESSAGE = "permit/MESSAGE";
const NEW_TREASURE_MODAL ="permit/NEW_TREASURE_MODAL"
const IS_LOADED = "permit/IS_LOADED"
const REVIEW_LOADING = "permit/REVIEW_LOADING"
const FINISH_REVIEW = "permit/FINISH_REVIEW"
const SHOW_NOTfOUND_MODAL = "permit/SHOW_NOTfOUND_MODAL"
const FEED_TYPE = "permit/FEED_TYPE"

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
const isLoading = createAction(IS_LOADING, (is_loading) => ({is_loading})); 
const showNotSupport = createAction(SHOW_NOT_SUPPORT, (is_support) => ({is_support}))
const message = createAction(MESSAGE, (message) => ({message}))
const newTreasureModal = createAction(NEW_TREASURE_MODAL, (is_new_treasure) => ({is_new_treasure}))
const isLoaded = createAction(IS_LOADED, (is_loaded) =>({is_loaded}))
const reviewLoading = createAction(REVIEW_LOADING, (review_loading) => ({review_loading}))
const finishReview = createAction(FINISH_REVIEW, (finish_review) => ({finish_review}))
const showNotfoundModal = createAction(SHOW_NOTfOUND_MODAL, (is_not_found) => ({is_not_found}))
const feedType = createAction(FEED_TYPE, (feed_type) => ({feed_type}) )

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
    is_loading: false, 
    is_support_modal: false,
    message:"",
    is_new_treasure:false,
    is_loaded:false,
    review_loading:false,
    finish_review: false,
    is_not_found:false,
    feed_type:"recent",
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
        [IS_LOADING] : (state, action) => 
        produce(state, (draft) => {
          draft.is_loading = action.payload.is_loading;
        }),
        [SHOW_NOT_SUPPORT] : (state, action) => 
        produce(state, (draft) => {
          draft.is_support_modal = action.payload.is_support;
        }),
        [MESSAGE] : (state, action) => 
        produce(state, (draft) => {
          draft.message = action.payload.message;
        }),
        [NEW_TREASURE_MODAL] : (state, action) => 
        produce(state, (draft) => {
          draft.is_new_treasure = action.payload.is_new_treasure;
        }),
        [IS_LOADED] : (state, action) => 
        produce(state, (draft) => {
          draft.is_loaded = action.payload.is_loaded;
        }),
        [REVIEW_LOADING] : (state, action) => 
        produce(state, (draft) => {
          draft.review_loading = action.payload.review_loading;
        }),
        [FINISH_REVIEW] : (state, action) => 
        produce(state, (draft) => {
          draft.finish_review = action.payload.finish_review;
        }),
        [SHOW_NOTfOUND_MODAL] : (state, action) => 
        produce(state, (draft) => {
          draft.is_not_found = action.payload.is_not_found;
        }),
        [FEED_TYPE] : (state, action) => 
        produce(state, (draft) => {
          draft.feed_type = action.payload.feed_type;
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
    isLoading,
    showNotSupport,
    message,
    newTreasureModal,
    isLoaded,
    reviewLoading,
    finishReview,
    showNotfoundModal,
    feedType,
};
  
export { actionCreators };