import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//actions
const SET_PREIVEW = "upload/SET_PREIVEW";
const SHOW_PREVIEW = "permit/SHOW_PREVIEW";

//actioncreator
const setPreview = createAction(SET_PREIVEW, (img_url) => ({ img_url }));
const showPreview = createAction(SHOW_PREVIEW, (is_preview) => ({
  is_preview,
}));

//initial
const initialState = {
  img_url: "",
  is_preview: false,
};

//reducer
export default handleActions(
  {
    [SET_PREIVEW]: (state, action) =>
      produce(state, (draft) => {
        draft.img_url = action.payload.img_url;
      }),
    [SHOW_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.is_preview = action.payload.is_preview;
      }),
  },
  initialState
);

const actionCreators = {
  setPreview,
  showPreview,
};

export { actionCreators };
