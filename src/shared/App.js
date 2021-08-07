import React from "react";
import styled from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";

import ReviewDetail from "../pages/ReviewDetail";
import Home from "../pages/Home";
import Navigation from "../components/Navigation";
import Login from "../pages/Login";
import MyProfile from "../pages/MyProfile";
import ChangeName from "../pages/ChangeName";
import MyReview from "../pages/MyReview";
import ReviewWrite from "../pages/ReviewWrite";
import BookDetail from "../pages/BookDetail";
import CommentModal from "../modals/CommentModal";
import MyReviewFeed from "../pages/MyReviewFeed";
import MyReviewFind from "../pages/MyReviewFind";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler ";
import Spinner from "../components/Spinner";
import BookCollectionMain from "../pages/BookCollectionMain";
import CollectionDetail from "../pages/CollectionDetail";
import Setting from "../pages/Setting";
import { actionCreators as userActions } from "../redux/modules/user";
import GlobalStyle from "./GlobalStyle";
import UserFeedInfo from "../pages/UserFeedInfo";

function App() {
  const dispatch = useDispatch();
  const is_nav = useSelector((state) => state.permit.is_nav);
  const is_modal = useSelector((state) => state.permit.is_modal);
  const user = localStorage.getItem("token") ? true : false;

  React.useEffect(() => {
    if (user) {
      dispatch(userActions.loginCheck());
      dispatch(userActions.isMe());
    }
    console.log(user);
  }, [user]);

  return (
    <React.Fragment>
      <GlobalStyle />
      <Container is_modal_opened={is_modal ? "hidden" : "scroll"}>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Home} />
          <Route path="/reviewdetail/:bookid/:reviewid" exact component={ReviewDetail}/>
          <Route path="/postwrite" exact component={ReviewWrite} />
          <Route path="/postwrite/:bookid/:reviewid" exact component={ReviewWrite}/>
          <Route path="/bookdetail/:bookid" exact component={BookDetail} />
          <Route path="/login" exact component={Login} />
          <Route path="/myprofile" exact component={MyProfile} />
          <Route path="/changename" exact component={ChangeName} />
          <Route path="/myreview" exact component={MyReview} />
          <Route path="/modal" exact component={CommentModal} />
          <Route path="/MyReview" exact component={MyReview} />
          <Route path="/myreviewfeed" exact component={MyReviewFeed} />
          <Route path="/myreviewfind" exact component={MyReviewFind} />
          <Route path="/api/users/kakao/callback" component={OAuth2RedirectHandler} />
          <Route path="/logincheck" component={Spinner} />
          <Route path="/bookCollectionMain" exact component={BookCollectionMain} />
          <Route path="/collectiondetail" exact component={CollectionDetail}/>
          <Route path="/setting" exact component={Setting}/>
          </ConnectedRouter>
        {is_nav ? <Navigation /> : ""}
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
  overflow-y: ${(props) => props.is_modal_opened};
  overflow-x: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 0px 0px 60px 0px;
  position: relative;
`;

export default App;
