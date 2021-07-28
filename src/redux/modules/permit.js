import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//actions
const SHOW_NAV = "permit/SHOW_NAV";

//actioncreator
const showNav = createAction(SHOW_NAV, (is_nav) => ({ is_nav }));

//initial
const initialState = {
    is_nav: true,
};


//reducer
export default handleActions(
    {
        [SHOW_NAV]: (state, action) =>
        produce(state, (draft) => {
          draft.is_nav = action.payload.is_nav;
        })
    },
    initialState
  );
  

const actionCreators = {
    showNav,
};
  
export { actionCreators };