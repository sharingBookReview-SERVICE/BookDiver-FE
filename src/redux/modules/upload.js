import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';

//actions
const SET_PREIVEW = "upload/SET_PREIVEW";
const SHOW_PREVIEW = "upload/SHOW_PREVIEW";
const GET_UNSPLASH = "upload/GET_UNSPLASH"

//actioncreator
const setPreview = createAction(SET_PREIVEW, (img_url) => ({ img_url }));
const showPreview = createAction(SHOW_PREVIEW, (is_preview) => ({is_preview,}));
const getUnsplash = createAction(GET_UNSPLASH, (image_list) => ({image_list}));

//initial
const initialState = {
  img_url: "",
  is_preview: false,
  image_list: [],
};

const getUnsplashSV = (keyword) => {

  return function (dispatch, getState) {
    const accessKey = "7RkaL4LU96aZySVcQBoBxQe0qu3LI5yzpx4_BjrtN3w"

    axios
    .get(`https://api.unsplash.com/search/photos?page=1&per_page=35&query=${keyword}&client_id=${accessKey}`)
    .then((res) => {
      const result = res.data.results
      let imageList = []
  
      result.forEach((image,idx) => {
        imageList.push(image.urls.regular)
      })
  
      dispatch(getUnsplash(imageList))
    })
};

}

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
    [GET_UNSPLASH]: (state, action) =>
    produce(state, (draft) => {
      draft.image_list = action.payload.image_list;
    }),
  },
  initialState
);

const actionCreators = {
  setPreview,
  showPreview,
  getUnsplashSV,
};

export { actionCreators };
