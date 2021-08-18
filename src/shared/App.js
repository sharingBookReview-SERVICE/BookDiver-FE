import React, {useCallback, useEffect, useMemo} from "react";
import styled from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";

import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import instance from "./Request";

import Color from "./Color";

import ReviewDetail from "../pages/ReviewDetail";
import Home from "../pages/Home";
import Navigation from "../components/Navigation";
import Login from "../pages/Login";
import MyProfile from "../pages/MyProfile";
import ChangeName from "../pages/ChangeName";
import MyReview from "../pages/MyReview";
import ReviewWrite from "../pages/ReviewWrite";
import BookDetail from "../pages/BookDetail";
import MyReviewFind from "../pages/MyReviewFind";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler ";
import Spinner from "../components/Spinner";
import BookCollectionMain from "../pages/Collection/BookCollectionMain";
import CollectionDetail from "../pages/Collection/CollectionDetail";
import MakeCollection from "../pages/Collection/MakeCollection";
import Setting from "../pages/Setting";
import Notification from "../pages/Notification";
import LevelHelp from "../pages/LevelHelp";
import ChangeProfileImg from "../pages/ChangeProfileImg"

import { actionCreators as userActions } from "../redux/modules/user";
import SignoutModal from "../modals/SignoutModal";
import GlobalStyle from "./GlobalStyle";
import MyFeed from "../pages/MyFeed";
import CollectionList from "../pages/Collection/CollectionList"
import Follow from "../pages/Follow"
import MyDepth from "../pages/MyDepth";

import ErrorPage from "../pages/ETC/ErrorPage";

import TreasureModal from "../modals/TreasureModal";
import Collection from '../elements/Collection';


function App(props) {
  const dispatch = useDispatch();
  const is_nav = useSelector((state) => state.permit.is_nav);
  const is_modal = useSelector((state) => state.permit.is_modal);
  const user = localStorage.getItem("token") ? true : false;
  const token = localStorage.getItem('token');
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const is_padding = useSelector(state => state.permit.is_padding)
  const is_treasure = useSelector(state => state.permit.is_treasure_modal)
  const userId = useSelector(state => state.user.user._id)

  const getUserInfo = useCallback(() => {dispatch(userActions.getUserSV(userId))}, [userId])
  

  useEffect(() => {
    if (user) {
      dispatch(userActions.loginCheck());
      dispatch(userActions.isMe());
      console.log("로그인 확인을 합니다. ")
    }
  }, [user]);


  useEffect(() => {
    if (userId) {
      getUserInfo()
    }
  }, [userId]);


  return (
    <React.Fragment>
      <GlobalStyle />
      <Container is_modal_opened={is_modal ? "hidden" : "scroll"} is_padding={is_padding}>
        <ConnectedRouter history={history}>

          <Switch>
          <Route path="/" exact component={Home} />


          <Route path="/reviewdetail/:bookid/:reviewid" exact component={ReviewDetail}/>
          <Route path="/postwrite" exact component={ReviewWrite} />
          <Route path="/postwrite/:bookid/:reviewid" exact component={ReviewWrite}/>
          <Route path="/bookdetail/:bookid" exact component={BookDetail} />


          <Route path="/bookCollectionMain" exact component={BookCollectionMain} />
          <Route path="/collectiondetail/:collectionid" exact component={CollectionDetail}/>
          <Route path="/collectionlist/:type" exact component={CollectionList}/>
          <Route path="/makeCollection" exact component ={MakeCollection}/>


          <Route path="/login" exact component={Login} />
          <Route path="/api/users/kakao/callback" component={OAuth2RedirectHandler} />
          <Route path="/logincheck" component={Spinner} />
          <Route path="/modal" exact component={SignoutModal} />


          <Route path="/mydepth" exact component={MyDepth}/>
          <Route path="/levelhelp" exact component ={LevelHelp}/>

          <Route path="/myfeed" exact component={MyFeed} />
          <Route path="/otherUser/:otherId" exact component={MyFeed} />
          <Route path="/myreview" exact component={MyReview} />
          <Route path="/notification" exact component ={Notification}/>
          <Route path="/myreviewfind" exact component={MyReviewFind} />


          <Route path="/changename" exact component={ChangeName} />
          <Route path="/myprofile" exact component={MyProfile} />
          <Route path="/following" exact component={Follow}/>
          <Route path="/follower" exact component={Follow}/>
          <Route path="/changeprofileimg" component ={ChangeProfileImg}/>
          <Route path="/setting" exact component={Setting}/>

          <Route path="*" component={ErrorPage}/>

          </Switch>
          </ConnectedRouter>
        {is_nav ? <Navigation /> : ""}
        {is_treasure && <TreasureModal/>}
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${Color.mainColor};
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
  padding: ${(props) => props.is_padding ? "0px 0px 60px 0px" : "0"};
  position: relative;


  @media ${(props) => props.theme.tablet} {
    width:420px;
    height:100vh;
  }

  @media ${(props) => props.theme.desktop} {
    width:420px;
    height:100vh;
  }

`;

export default App;
