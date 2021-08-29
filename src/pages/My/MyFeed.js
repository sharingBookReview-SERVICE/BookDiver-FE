import React,{useEffect,useState} from "react";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import CollectionsBookmarkOutlinedIcon from "@material-ui/icons/CollectionsBookmarkOutlined";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import Badge from '@material-ui/core/Badge';
import Color from "../../shared/Color";
import { makeStyles } from "@material-ui/core/styles";

//소켓
import io from "socket.io-client"


import {history} from "../../redux/configStore";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router";

import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as permitActions } from "../../redux/modules/permit";

import {images} from "../../shared/Image"
import {titles} from "../../shared/Titles";

import {NotSupport, CheckTreasureModal} from "../../modals";
import Loading from "../ETC/Loading"

const socket = io.connect("https://ohbin.shop")

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

    const is_alarm = useSelector((state) => state.user.user.check_alert)
    const [is_socket, setIsSocket] = useState(false)
    const otherUserId = params?.otherId

    const is_follow = useSelector(state=> state.user.my_feed.user?.is_follow);
    const is_loading = useSelector(state => state.permit.is_loading)
    const is_treasure = useSelector(state => state.permit.is_treasure_modal)
    console.log(is_treasure);

    //책장모드
    const [bookMode, setBookMode] = useState(false);
    const book_count = parseInt(my_reviews?.length/4 +1);

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

    const goToSetting = () => {
      history.push("/setting")
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

    const gotoBookMark = ()=>{
      history.push('/bookmark')
    }

    const gotoNoti = ()=>{
      history.push('/notification')
    }

    //알람을 읽었다는 데이터 보내기
    const setReaded = () => {
      dispatch(userActions.checkAlertSV())
    }

    useEffect(()=>{
      dispatch(userActions.checkTreasureSV())
      dispatch(permitActions.showNav(true))
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

    useEffect(() => {
      //처음 들어오면, 접속한 유저의 토큰을 보내기
      const is_token = localStorage.getItem("token")
      if(is_token){
        socket.emit("token", `Bearer ${localStorage.getItem("token")}`)
      }
    },[])
  
    useEffect(() => {
      socket.on("alert", (payload) => {
        setIsSocket(payload)
        console.log(payload)
        //알람이 생기면, 유저 정보를 새로 불러오기 
        // dispatch(userAction.getUserSV())
      })
    })

//다른 유저의 피드를 확인 할 때
    if(otherUserId){
      return(
        <React.Fragment>
        <Container>
          <NotSupport is_support_modal={is_support_modal}/>
              <UserBox>
                  <Header>
                  </Header>
                <Wrapper>
                  <ProfileBox>
                          <ImgWrapper >
                            <ProfileImg src={images[profileImg]} />
                            {profileImg === "image_1" || <TitleImg src={titles[profileImg]}/>}
                          </ImgWrapper>

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
                    <FollowBox
                    is_follow={is_follow} 
                    onClick={()=>{dispatch(userActions.followSV(otherUserId))}}>
                      {is_follow? "팔로잉" : "팔로우"}
                      </FollowBox>
                    <LevelBox>수심 {level}m에서 잠수 중</LevelBox> 
                  </ProfileBottomBox>
                     <FeedCategory>
                     <FeedTitle>{nickname}님의 게시물</FeedTitle>
                      {
                        bookMode?
                        <FeedCategoryButton onClick ={()=>{setBookMode(false)}}>
                          <RemoveRedEyeIcon className={classes.eye}/>
                          리뷰모드
                      </FeedCategoryButton>
                      :
                          <FeedCategoryButton onClick ={()=>{setBookMode(true)}}>
                          <RemoveRedEyeIcon className={classes.eye}/>
                          책장모드
                      </FeedCategoryButton>
                      }
                    
                  </FeedCategory>
                </Wrapper>
              </UserBox>

    {
              bookMode ?
            <BookFeedMain count={book_count}>
                {
                  my_reviews?.map((review)=>{
                    return(
                    <BookImg url={review.book?.image} key={review.id} 
                      onClick={()=>{ history.push(`/reviewdetail/${review.book}/${review.id}`)}}
                      ></BookImg>)
                  })
                }
              </BookFeedMain>
              :
              <FeedMain>
                  {
                    my_reviews?.map((review)=>{
                      return(<FeedCard url={review.image} key={review.id} 
                        onClick={()=>{ history.push(`/reviewdetail/${review.book}/${review.id}`)}}
                        />)
                    })
                  }
              </FeedMain>
            }

      </Container>
      </React.Fragment>
      )
    }

  
  //본인의 피드를 확인 할 때
    return (
        <React.Fragment>
      {is_loading ? <Loading/> : 
          <Container>
          <NotSupport is_support_modal={is_support_modal}/>
                <UserBox>
                  <Header>
                    <BookmarkBorderOutlinedIcon  onClick={()=>{gotoBookMark()}}className={classes.icon}/>
                    <SettingsOutlinedIcon onClick={goToSetting} className={classes.icon}/>
                    <Badge color="secondary" variant="dot" invisible={is_socket ? !is_socket : !is_alarm}>
                        <NotificationsNoneIcon
                        onClick={()=>{
                          gotoNoti()
                          setReaded()
                        }}
                        className={classes.icon}/>
                        
                    </Badge>
  
                  </Header>

                  <Wrapper>
                    <ProfileBox>
                          <ImgWrapper onClick={()=>{gotochangeProfile()}}>
                            <ProfileImg src={images[profileImg]} />
                            {profileImg === "image_1" || <TitleImg src={titles[profileImg]}/>}
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
                      {
                        bookMode?
                        <FeedCategoryButton onClick ={()=>{setBookMode(false)}}>
                          <RemoveRedEyeIcon className={classes.eye}/>
                          리뷰모드
                      </FeedCategoryButton>
                      :
                          <FeedCategoryButton onClick ={()=>{setBookMode(true)}}>
                          <RemoveRedEyeIcon className={classes.eye}/>
                          책장모드
                      </FeedCategoryButton>
                      }
                    
                  </FeedCategory>
                </UserBox>


            {
              bookMode ?
            <BookFeedMain count={book_count}>
                {
                  my_reviews?.map((review)=>{
                    return(
                    <BookImg url={review.book?.image} key={review.id} 
                      onClick={()=>{ history.push(`/reviewdetail/${review.book}/${review.id}`)}}
                      >
                      <BookTitle>{review.book?.title.split("(")[0]}</BookTitle>
                      </BookImg>)
                  })
                }
              </BookFeedMain>
              :
              <FeedMain>
                  {
                    my_reviews?.map((review)=>{
                      return(<FeedCard url={review.image} key={review.id} 
                        onClick={()=>{ history.push(`/reviewdetail/${review.book}/${review.id}`)}}
                        />)
                    })
                  }
              </FeedMain>
            }
         

        </Container>}
        <CheckTreasureModal is_treasure={is_treasure}/>
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
font-size:16px;
font-weight: 400;
letter-spacing: -0.36px;
color:${Color.subTextFont};
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
padding: 10px 0px 20px 0px;
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
box-sizing:border-box;
position:relative;
cursor:pointer;
`

const TitleImg = styled.img`
position:absolute;
left:-7%;
top:23px;
width:80px;
height:80px;
`

const ProfileImg = styled.img`
width: 100%;
height: 100%;
`;


const DetailBox = styled.div`
box-sizing:border-box;
width:80%;
height:auto;
margin-left:10px;
display:flex;
flex-direction:column;
justify-content:center;
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

const BookFeedMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr; 
  grid-template-rows: repeat(${(props)=> props.count? props.count : ""}, 140px);
  gap: 1px;
  padding-bottom: 100px;
  place-items: center;
  padding:0px 20px;
`;

const FollowBox = styled.div`
color:${Color.black};
font-size:14px;
display:flex;
justify-content:center;
align-items:center;
border-radius:10px;
font-weight:bold;
cursor:pointer;
${(props) => props.is_follow ? 
`
background:${Color.line}`: 
`
border:1px solid ${Color.line};
`};
`

const BookImg = styled.div`
  width: 80px;
  height: 110px;
  background-image: url(${(props) => props.url ? props.url : " "});
  background-size: cover;
  box-sizing: border-box;
  border-radius: 4px;
  transition:0.5s ease-in-out;
  cursor:pointer;
  &:hover{
    opacity:0.6;
  }
 
`
const BookTitle = styled.div`
display:flex;
align-items:center;
justify-content:center;
font-size:12px;
padding:10px;
box-sizing:border-box;
color:${Color.black};
  width: 80px;
  height: 110px;
  transition:0.5s ease-in-out;
  opacity : 0;
&:hover{
  opacity:1;
}
`;

const LevelBox = styled.div`
border:1px solid ${Color.line};
color:${Color.subTextFont};
font-size:14px;
display:flex;
justify-content:center;
align-items:center;
border-radius:10px;
`





