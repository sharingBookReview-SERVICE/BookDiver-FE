import React,{useEffect} from "react";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import CollectionsBookmarkOutlinedIcon from "@material-ui/icons/CollectionsBookmarkOutlined";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import Color from "../../shared/Color";
import { makeStyles } from "@material-ui/core/styles";

import {history} from "../../redux/configStore";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router";

import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as permitActions } from "../../redux/modules/permit";

import {images} from "../../shared/Image"
import {titles} from "../../shared/Titles";

import {NotSupport} from "../../modals";


const useStyles = makeStyles((theme) => ({
  icon: {
    marginLeft:"20px",
    color:Color.myFeedMainFont,
    cursor:"pointer",
  },
  eye: {
    marginRight:"2px",
    color:Color.subTextFont,
  },
  follower: {
    fontWeight: "bold", 
    fontSize: "18px", 
    margin: "0px -2px 2px -2px"
  },
  followText: {
    marginTop: "4px"
  }
}));


const MyFeed = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const params = useParams();
    const location = useLocation();
    const is_my_feed = location.pathname
    
    //user-feed-infomation
    const nickname = useSelector(state => state.user.my_feed.user?.nickname);
    const profileImg = useSelector(state => state.user.my_feed.user?.profileImage);
    const level = useSelector(state=> state.user.my_feed.user?.level);
    const my_feed = useSelector(state=> state.user?.my_feed);
    const my_reviews = my_feed.reviews;
    const my_collections = my_feed.collections;
    const followingCounts = useSelector(state => state.user.my_feed.user?.followingCount)
    const followerCounts = useSelector(state => state.user.my_feed.user?.followerCount)
    const userId = useSelector(state => state.user.user?._id)
    const otherUserId = params?.otherId
    const is_follow = useSelector(state=> state.user.my_feed.user?.is_follow);

    //check_modal
    const is_support_modal = useSelector((state) => state.permit.is_support_modal)
 
    const openNotSupportModal = () => {
      dispatch(permitActions.showNotSupport(true))
    }

    const goToFollowing = () => {
      history.push("/following")
    }

    const goToFollower = () => {
      history.push("/follower")
    }

    const goToMyDepth = () => {
      history.push("/mydepth")
    }

    const goToOtherFollowing = (user_id) => {
      history.push(`/following/${user_id}`)
    }

    const goToOtherFollower = (user_id) => {
      history.push(`/follower/${user_id}`)
    }

    const gotochangeProfile = ()=>{
      history.push('/changename')
    }

    useEffect(()=>{
      dispatch(permitActions.showNav(true));
      if(is_my_feed === "/myfeed" && userId){
        dispatch(userActions.getMyFeedSV(userId));
        return;
      }
    },[userId, is_my_feed])

    useEffect(() => {
      if(otherUserId){
        dispatch(userActions.getOtherFeedSV(otherUserId));
        return;
      }
    },[])

//다른 유저의 피드를 확인 할 때
    if(otherUserId){
      return(
        <React.Fragment>
        <Container>
          <NotSupport is_support_modal={is_support_modal}/>
              <UserBox>

                <SearchBox onClick={openNotSupportModal}>
                  <SearchIcon className={classes.search}/>
                  <SearchBar placeholder="내가 작성했던 리뷰를 찾을 수 있어요"/>
                </SearchBox>

                <Wrapper>
                  <ProfileBox>
                        <Header>
                          <SearchIcon className={classes.icon}/>
                          <SettingsOutlinedIcon className={classes.icon}/>
                          <NotificationsNoneIcon className={classes.icon}/>
                        </Header>

                        <DetailBox>
                          <UserName>{nickname}</UserName>
                          <PostCount>작성한 에세이 {my_reviews?.length}개 | 만든 컬렉션 {my_collections?.length}개</PostCount>
                        </DetailBox>
                    </ProfileBox>

                  <MyActivityBox>
                      <MyActivity>
                          <CollectionsBookmarkOutlinedIcon
                              style={{color: Color.myFeedMainFont, fontSize: "23px", marginTop: "6px"}}
                              onClick={openNotSupportModal}
                          />
                          <Text style={{marginTop: "5px"}}>컬렉션</Text>
                      </MyActivity>
                      <MyActivity onClick={() => {goToOtherFollower(otherUserId)}}>
                          <Text className={classes.follower}>{followerCounts}</Text>
                          <Text className={classes.followText}>팔로워</Text>
                      </MyActivity>
                      <MyActivity onClick={() => {goToOtherFollowing(otherUserId)}}>
                          <Text className={classes.follower}>{followingCounts}</Text>
                          <Text className={classes.followText} >팔로잉</Text>
                      </MyActivity>
                  </MyActivityBox>

                  <ProfileBottomBox>
                    <FollowBox onClick={()=>{dispatch(userActions.followSV(otherUserId))}}>{is_follow? "팔로잉" : "팔로우"}</FollowBox>
                  </ProfileBottomBox>
                </Wrapper>
              </UserBox>


          <FeedMain>
          {
            my_reviews?.map((review)=>{
              return(<FeedCard url={review.image} key={review.id} 
                onClick={()=>{ history.push(`/reviewdetail/${review.book}/${review.id}`)}}
                />)
            })
          }
          </FeedMain>

      </Container>
      </React.Fragment>
      )
    }

  
  //본인의 피드를 확인 할 때
    return (
        <React.Fragment>
          <Container>
          <NotSupport is_support_modal={is_support_modal}/>
                <UserBox>
                  <Header>
                    <SearchIcon className={classes.icon}/>
                    <SettingsOutlinedIcon className={classes.icon}/>
                    <NotificationsNoneIcon className={classes.icon}/>
                  </Header>

                  <Wrapper>
                    <ProfileBox>
                          <ImgWrapper onClick={()=>{gotochangeProfile()}}>
                            <ProfileImg src={images[profileImg]} />
                          </ImgWrapper>

                          <DetailBox>
                            <UserName>{nickname}</UserName>
                            <PostCount>작성한 게시물 {my_reviews?.length}개 | 만든 컬렉션 {my_collections?.length}개</PostCount>
                          </DetailBox>
                      </ProfileBox>

                    <MyActivityBox>
                        <MyActivity>
                            <CollectionsBookmarkOutlinedIcon
                                style={{color: Color.myFeedMainFont, fontSize: "23px", marginTop: "6px"}}
                                onClick={openNotSupportModal}
                            />
                            <Text style={{marginTop: "5px"}}>컬렉션</Text>
                        </MyActivity>
                        <MyActivity onClick={() => {goToFollower()}}>
                            {/*<BookmarkOutlinedIcon style={{color: "#1168d7"}}/>*/}
                            {/*<Text>저장한 에세이</Text>*/}
                            <Text className={classes.follower}>{followerCounts}</Text>
                            <Text style={{marginTop: "4px"}}>팔로워</Text>
                        </MyActivity>
                        <MyActivity onClick={() => {goToFollowing()}}>
                            <Text className={classes.follower}>{followingCounts}</Text>
                            <Text style={{marginTop: "4px"}}>팔로잉</Text>
                        </MyActivity>
                    </MyActivityBox>

                  </Wrapper>
                  <FeedCategory>
                      <FeedTitle>내 게시물</FeedTitle>
                      <FeedCategoryButton>
                          <RemoveRedEyeIcon className={classes.eye}/>
                          책장모드
                      </FeedCategoryButton>
                  </FeedCategory>
                </UserBox>


            <FeedMain>
            {
              my_reviews?.map((review)=>{
                return(<FeedCard url={review.image} key={review.id} 
                  onClick={()=>{ history.push(`/reviewdetail/${review.book}/${review.id}`)}}
                  />)
              })
            }
            </FeedMain>

        </Container>
        </React.Fragment>
    )
}

export default MyFeed;

const FeedCategory = styled.div`
width:100%;
display:flex;
justify-content:space-between;
align-items:center;
height:auto;
padding:10px 0px 20px 0px; 
`

const FeedTitle = styled.div`
font-size:18px;
font-weight: 500;
letter-spacing: -0.36px;
font-family: "Noto Serif KR", serif;
`

const FeedCategoryButton = styled.div`
cursor:pointer;
width:85px;
height:34px;
border:1px solid ${Color.line};
border-radius:10px;
display:flex;
justify-content:center;
align-items:center;
color:${Color.subTextFont};
font-size:14px;
`

const Header = styled.div`
width:100%;
height:56px;
display:flex;
justify-content:flex-end;
align-items:center;
`

const ProfileBottomBox = styled.div`
width:100%;
height:36px;
display:grid;
grid-template-columns: 1fr 1fr;
gap:20px;
`

const FollowBox = styled.div`
background:${Color.white};
color:${Color.black};
font-size:14px;
display:flex;
justify-content:center;
align-items:center;
border-radius:10px;
font-weight:bold;
cursor:pointer;
`

const Container = styled.div`
width:100vw;
background:${Color.mainColor};
height: 100vh;
padding-bottom: 100px;

@media ${(props) => props.theme.tablet} {
  width:100%;
  height:100vh;
}

@media ${(props) => props.theme.desktop} {
  width:100%;
  height:100vh;
}
`

const Wrapper = styled.div`
height:70%;
width:100%;
display:flex;
flex-direction:column;
justify-content:space-between;

`

const SearchBox = styled.div`
width:100%;
display:flex;
justify-content:center;
align-items:center;
`


const SearchBar = styled.input`
  width: 100%;
  height: 45px;
  border: 1px solid ${Color.fontGray};
  border-radius: 12px;
  background-color: ${Color.fontBlack};
  padding: 0px 0px 0px 8%;
  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${Color.white};
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 200;
    letter-spacing: 0.8px;
    padding-left: 20px;
  }
`;


const UserBox = styled.div`
  width: 100%;
  height: auto;
  background:${Color.mainColor};
  padding:0px 20px 0px 20px;
  box-sizing:border-box;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-between;
`

const ProfileBox = styled.div`
height:auto;
width:100%;
display:flex;
justify-content:flex-start;
box-sizing:border-box;
margin: 20px 0px;
`

const ImgWrapper = styled.div`
width:72px;
height:72px;
border-radius:70%;
overflow:hidden;
box-sizing:border-box;
`

const ProfileImg = styled.img`
width: 100%;
height: 100%;
object-fit:cover;
`;


const DetailBox = styled.div`
box-sizing:border-box;
width:80%;
height:auto;
margin-left:10px;
`

const UserName = styled.div`
width:100%;
height:auto;
color:${Color.myFeedMainFont};
font-weight:500;
`

const PostCount = styled.div`
width:100%;
height:auto;
color:${Color.subTextFont}
`

const MyActivityBox = styled.div`
  width: 100%;
  height: 68px;
  border-radius: 12px;
  display: flex;
  margin: 10px auto;
  border: 1px solid ${Color.line};
`;

const MyActivity = styled.div`
  width: 33.3%;
  text-align: center;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor:pointer;
`;

const Text = styled.p`
  color: ${Color.myFeedMainFont};
  margin: 5px;
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
`;



const FeedMain = styled.div`
  background-color: #f5f2f0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1px;
  padding-bottom: 100px;
`;

const FeedCard = styled.div`
width: 100%;
padding-top: 100%;
background-image:URL( ${(props)=> (props.url)});
background-size: cover;
background-position: center center;
cursor:pointer;
`;




