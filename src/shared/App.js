import React, { useCallback, useEffect, Suspense, lazy } from "react"
import { ConnectedRouter } from "connected-react-router"
import { history } from "../redux/configStore"
import { Route, Switch, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import styled from "styled-components"
import Color from "./Color"
import GlobalStyle from "./GlobalStyle"

import instance from "./Request"
import { actionCreators as userActions } from "../redux/modules/user"
import OAuth2RedirectHandler from "./OAuth2RedirectHandler "

import { BackgroundLayout } from "../elements"
import { Navigation } from "../components"
import Loading from "../pages/ETC/Loading"

//ga
import ReactGA from "react-ga"

//main
const Home = lazy(() => import("../pages/Home"))
const Login = lazy(() => import("../pages/Login"))
const LoginCheck = lazy(() => import("../pages/LoginCheck"))

//modal
const SignoutModal = lazy(() => import("../modals/SignoutModal.js"))

//review
const ReviewDetail = lazy(() => import("../pages/Review/ReviewDetail"))
const ReviewWrite = lazy(() => import("../pages/Review/ReviewWrite"))
const BookDetail = lazy(() => import("../pages/Review/BookDetail.js"))
const Search = lazy(() => import("../pages/Review/Search"))

//my
const MyProfile = lazy(() => import("../pages/My/MyProfile"))
const MyFeed = lazy(() => import("../pages/My/MyFeed"))
const MyReview = lazy(() => import("../pages/My/MyReview"))
const MyReviewFind = lazy(() => import("../pages/My/MyReviewFind"))
const Follow = lazy(() => import("../pages/My/Follow"))
const OtherFollow = lazy(() => import("../pages/My/OtherFollow"))
const MyDepth = lazy(() => import("../pages/My/Diving/MyDepth"))
const Notification = lazy(() => import("../pages/My/Noti/Notification"))
const BookMark = lazy(() => import("../pages/My/BookMark.js"))

//setting
const ChangeName = lazy(() => import("../pages/Setting/ChangeName"))
const ChangeProfileImg = lazy(() => import("../pages/Setting/ChangeProfileImg"))
const Setting = lazy(() => import("../pages/Setting/Setting"))
const VoiceOfCustomer = lazy(() => import("../pages/Setting/VoiceOfCustomer"))

//etc
const ErrorPage = lazy(() => import("../pages/ETC/ErrorPage"))
const LevelHelp = lazy(() => import("../pages/ETC/LevelHelp"))

//collection
const CollectionList = lazy(() => import("../pages/Collection/CollectionList"))
const BookCollectionMain = lazy(() =>
  import("../pages/Collection/BookCollectionMain")
)
const CollectionDetail = lazy(() =>
  import("../pages/Collection/CollectionDetail")
)
const MakeCollection = lazy(() => import("../pages/Collection/MakeCollection"))
const EditCollection = lazy(() => import("../pages/Collection/EditCollection"))

ReactGA.event({
  category: "User",
  action: "Created an Account",
})
ReactGA.exception({
  description: "An error ocurred",
  fatal: true,
})

function App(props) {
  const dispatch = useDispatch()
  const is_nav = useSelector(state => state.permit.is_nav)
  const is_modal = useSelector(state => state.permit.is_modal)
  const user = localStorage.getItem("token") ? true : false
  const token = localStorage.getItem("token")
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`
  const is_padding = useSelector(state => state.permit.is_padding)
  const userId = useSelector(state => state.user.user._id)

  const getUserInfo = useCallback(() => {
    dispatch(userActions.getUserSV(userId))
  }, [userId, dispatch])

  useEffect(() => {
    ReactGA.initialize("UA-205940044-1")
    history.listen(location => {
      ReactGA.set({ page: location.pathname }) // Update the user's current page
      ReactGA.pageview(location.pathname) // Record a pageview for the given page
    })
    // ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(userActions.loginCheck())
      dispatch(userActions.isMe())
    }
  }, [user, dispatch])

  useEffect(() => {
    if (userId) {
      getUserInfo()
    }
  }, [userId, dispatch, getUserInfo])

  const location = useLocation()
  return (
    <React.Fragment>
      <GlobalStyle />
      <BackgroundLayout>
        <Container
          is_modal_opened={is_modal ? "hidden" : "scroll"}
          is_padding={is_padding}
        >
          {/* <TransitionGroup  >
        <CSSTransition key={location.pathname.includes("bookdetail") ||location.pathname.includes("collectiondetail") || location.pathname==="/changename"? location.pathname : null}  
        classNames="slide" timeout={300}> */}
          <ConnectedRouter history={history}>
            <Suspense fallback={Loading}>
              <Switch location={location}>
                <Route path="/" exact component={Home} />

                <Route
                  path="/reviewdetail/:bookid/:reviewid"
                  exact
                  component={ReviewDetail}
                />
                <Route path="/postwrite" exact component={ReviewWrite} />
                <Route
                  path="/postwrite/:bookid/:reviewid"
                  exact
                  component={ReviewWrite}
                />
                <Route
                  path="/bookdetail/:bookid"
                  exact
                  component={BookDetail}
                />
                <Route path="/search" exact component={Search} />

                <Route
                  path="/bookCollectionMain"
                  exact
                  component={BookCollectionMain}
                />
                <Route
                  path="/collectiondetail/:collectionid"
                  exact
                  component={CollectionDetail}
                />
                <Route
                  path="/collectionlist/:type"
                  exact
                  component={CollectionList}
                />
                <Route
                  path="/makeCollection"
                  exact
                  component={MakeCollection}
                />
                <Route
                  path="/editCollection/:collectionid"
                  exact
                  component={EditCollection}
                />

                <Route path="/login" exact component={Login} />
                <Route
                  path="/api/users/kakao/callback"
                  component={OAuth2RedirectHandler}
                />
                <Route path="/logincheck" component={LoginCheck} />
                <Route path="/modal" exact component={SignoutModal} />

                <Route path="/mydepth" exact component={MyDepth} />
                <Route path="/levelhelp" exact component={LevelHelp} />

                <Route path="/myfeed" exact component={MyFeed} />
                <Route path="/bookmark" exact component={BookMark} />
                <Route path="/otherUser/:otherId" exact component={MyFeed} />
                <Route path="/myreview" exact component={MyReview} />
                <Route path="/notification" exact component={Notification} />
                <Route path="/myreviewfind" exact component={MyReviewFind} />

                <Route path="/changename" exact component={ChangeName} />
                <Route path="/myprofile" exact component={MyProfile} />
                <Route path="/following" exact component={Follow} />
                <Route path="/follower" exact component={Follow} />
                <Route
                  path="/following/:otherId"
                  exact
                  component={OtherFollow}
                />
                <Route
                  path="/follower/:otherId"
                  exact
                  component={OtherFollow}
                />
                <Route path="/changeprofileimg" component={ChangeProfileImg} />
                <Route path="/setting" exact component={Setting} />
                <Route
                  path="/voiceOfCustomer"
                  exact
                  component={VoiceOfCustomer}
                />

                <Route path="*" component={ErrorPage} />
              </Switch>
            </Suspense>
          </ConnectedRouter>
          {/* </CSSTransition>
        </TransitionGroup> */}

          {is_nav ? <Navigation /> : ""}
        </Container>
      </BackgroundLayout>
    </React.Fragment>
  )
}

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: ${Color.mainColor};
  overflow-y: ${props => props.is_modal_opened};
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
  padding: ${props => (props.is_padding ? "0px 0px 60px 0px" : "0")};
  position: relative;

  @media ${props => props.theme.tablet} {
    width: 420px;
    height: 100vh;
  }

  @media ${props => props.theme.desktop} {
    width: 420px;
    height: 100vh;
  }
`

export default App
