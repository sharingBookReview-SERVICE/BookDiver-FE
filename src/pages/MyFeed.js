import React,{useEffect} from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from '@material-ui/icons/List';


import Color from "../shared/Color";
import CollectionsBookmarkOutlinedIcon from "@material-ui/icons/CollectionsBookmarkOutlined";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";

import {history} from "../redux/configStore";
import {useDispatch, useSelector} from "react-redux";

import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as permitActions } from "../redux/modules/permit";
import {images} from "../shared/Image"
import {titles} from "../shared/Titles";

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  search: {
    width: "18px",
    position: "absolute",
    left: "10px",
    color: "#f5f2f0",
    marginLeft: "9%"
  },
}));


const MyFeed = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const location = useLocation();

    const nickname = useSelector(state => state.user.user.nickname);
    const profileImg = useSelector(state => state.user.my_feed.user.profileImage);
    const level = useSelector(state=> state.user.my_feed.user.level);
    const my_feed = useSelector(state=> state.user.my_feed);
    const my_reviews = my_feed.reviews;
    const my_collections = my_feed.collections;
    const followingCounts = useSelector(state => state.user.my_feed.user.followingCount)
    const followerCounts = useSelector(state => state.user.my_feed.user.followerCount)
    const userId = useSelector(state => state.user.user._id)
    console.log(followerCounts)

    const goToFollowing = () => {
      history.push("/following")
    }

    const goToFollower = () => {
      history.push("/follower")
    }

    const goToMyDepth = () => {
      history.push("/mydepth")
    }


    useEffect(()=>{
      dispatch(permitActions.showNav(true));
      if(userId){
        dispatch(userActions.getMyFeedSV(userId));
      }
    },[userId])

    return (
        <React.Fragment>
          <Container>
                <UserBox>

                  <SearchBox>
                    <SearchIcon className={classes.search}/>
                    <SearchBar placeholder="내가 작성했던 리뷰를 찾을 수 있어요"/>
                  </SearchBox>

                  <Wrapper>
                    <ProfileBox>
                          <ImgWrapper>
                            <ProfileImg src={images[profileImg]} />
                          </ImgWrapper>

                          <DetailBox>
                            <UserTitle>{titles[profileImg]}</UserTitle>
                            <UserName>{nickname}</UserName>
                            <PostCount>작성한 에세이 {my_reviews?.length}개 | 만든 컬렉션 {my_collections?.length}개</PostCount>
                          </DetailBox>
                      </ProfileBox>

                    <MyActivityBox>
                        <MyActivity>
                            <CollectionsBookmarkOutlinedIcon
                                style={{color: "#f5f2f0", fontSize: "23px", marginTop: "6px"}}/>
                            <Text style={{marginTop: "5px"}}>컬렉션</Text>
                        </MyActivity>
                        <MyActivity onClick={() => {goToFollower()}}>
                            {/*<BookmarkOutlinedIcon style={{color: "#1168d7"}}/>*/}
                            {/*<Text>저장한 에세이</Text>*/}
                            <Text
                                style={{fontWeight: "bold", fontSize: "18px", margin: "0px -2px 2px -2px"}}>{followerCounts}</Text>
                            <Text style={{marginTop: "4px"}}>팔로워</Text>
                        </MyActivity>
                        <MyActivity onClick={() => {goToFollowing()}}>
                            <Text
                                style={{fontWeight: "bold", fontSize: "18px", margin: "0px -2px 2px -2px"}}>{followingCounts}</Text>
                            <Text style={{marginTop: "4px"}}>팔로잉</Text>
                        </MyActivity>
                    </MyActivityBox>

                    <LevelDetail  onClick={()=>{goToMyDepth()}}>'수심 {level}m 잠수 중' 자세히보기</LevelDetail> 
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

export default MyFeed;

const Container = styled.div`
width:100vw;
background:${Color.mainColor};
height: 100vh;
padding-bottom: 100px;
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
  height: 55vh;
  background:${Color.black};
  padding:20px 20px 30px 20px;
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
border: 1px solid ${Color.secondColor};
`


const ProfileImg = styled.img`
width: 100%;
height: 100%;
object-fit:cover;
`;

const UserTitle = styled.div`
width:100%;
height:auto;
color:${Color.white};
font-family: "Noto Serif KR", serif;
`

const DetailBox = styled.div`
box-sizing:border-box;
width:80%;
height:auto;
margin-left:10px;
`

const UserName = styled.div`
width:100%;
height:auto;
color:${Color.white};
font-family: "Noto Serif KR", serif;
`

const PostCount = styled.div`
width:100%;
height:auto;
color:${Color.fontGray}
`

const MyActivityBox = styled.div`
  width: 100%;
  height: 68px;
  border-radius: 12px;
  display: flex;
  margin: 10px auto;
  border: 1px solid ${Color.fontGray};
`;

const MyActivity = styled.div`
  width: 33.3%;
  text-align: center;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Text = styled.p`
  color: ${Color.white};
  margin: 5px;
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
`;



const FeedMain = styled.div`
  background-color: #f5f2f0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1px;
`;

const FeedCard = styled.div`
width: 100%;
padding-top: 100%;
background-image:URL( ${(props)=> (props.url)});
background-size: cover;
background-position: center center;
`;
const LevelDetail = styled.div`
width:100%;
height:36px;
border-radius:13px;
display:flex;
justify-content:center;
align-items:center;
box-sizing:border-box;
background:${Color.gray};
color:${Color.white};
`



