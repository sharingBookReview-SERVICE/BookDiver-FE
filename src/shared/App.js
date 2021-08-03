import React from "react";
import styled from "styled-components";
import {ConnectedRouter} from 'connected-react-router';
import {Route} from "react-router-dom";
import {history} from "../redux/configStore";
import {useSelector} from "react-redux";

import ReviewDetail from "../pages/ReviewDetail";
import Home from "../pages/Home"
import Navigation from "../components/Navigation";
import Login from "../pages/Login";
import MyProfile from "../pages/MyProfile";
import ChangeName from "../pages/ChangeName";
import MyReview from "../pages/MyReview";
import ReviewWrite from "../pages/ReviewWrite"
import BookDetail from "../pages/BookDetail";
import CommentModal from "../modals/CommentModal";
import MyReviewFeed from "../pages/MyReviewFeed";
import MyReviewFind from "../pages/MyReviewFind";
import ImageUpload from "../components/ImageUpload"


function App() {
    const is_nav = useSelector(state => state.permit.is_nav)

  return (
    <React.Fragment>
      <Container>
         <ConnectedRouter history={history}>
          <Route path="/" exact component={Home} />
          <Route path="/reviewdetail/:bookid/:reviewid" exact component={ReviewDetail} />
          <Route path="/postwrite" exact component={ReviewWrite} />
          <Route path="/bookdetail" exact component={BookDetail} />
          <Route path="/login" exact component={Login} />
          <Route path="/myprofile" exact component={MyProfile} />
          <Route path="/changename" exact component={ChangeName} />
          <Route path="/myreview" exact component={MyReview} />
          <Route path="/modal" exact component={CommentModal}/>
          <Route path="/MyReview" exact component={MyReview} />
          <Route path="/myreviewfeed" exact component={MyReviewFeed} />
          <Route path="/myreviewfind" exact component={MyReviewFind} />
          <Route path="/imageupload" exact component={ImageUpload}/>
         </ConnectedRouter>
        {is_nav ? <Navigation/> : ""}
       </Container>
    </React.Fragment>
  );

}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
  overflow-y: scroll;
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
  padding: 0px 0px 40px 0px;
  position: relative;
`;


export default App;

