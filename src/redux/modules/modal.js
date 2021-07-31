import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//actions
const SHOW_MODAL = "modal/SHOW_MODAL";
const CLOSE_MODAL = "modal/CLOSE_MODAL";

//actioncreator
const showModal = createAction(SHOW_MODAL, (is_modal) => ({ is_modal }));
const closeModal = createAction(CLOSE_MODAL, (is_modal)=> ({is_modal}));

//initial
const initialState = {
    is_modal: false,
};




//reducer
export default handleActions(
    {
        [SHOW_MODAL]: (state, action) =>
        produce(state, (draft) => {
          draft.is_modal = true;
        }),
        [CLOSE_MODAL]: (state, action) =>
        produce(state, (draft) => {
          draft.is_modal = false;
        }),
    },
    initialState
  );
  

const actionCreators = {
    showModal,
    closeModal
};
  
export { actionCreators };