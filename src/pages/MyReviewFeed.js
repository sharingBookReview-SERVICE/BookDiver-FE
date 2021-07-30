import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from '@material-ui/icons/List';

//확인용
import FeedCard from "../components/FeedCard";
import CollectionsBookmarkOutlinedIcon from "@material-ui/icons/CollectionsBookmarkOutlined";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import {history} from "../redux/configStore";

const MyReviewFeed = () => {


    return (
        <React.Fragment>
            <Header>
                <SearchBarBox>
                    <SearchIcon
                        style={{width: "16px", height: "16px", position: "absolute", left: "10px", color: "#9e9e9e"}}/>
                    <SearchBar placeholder="내가 작성했던 리뷰를 찾을 수 있어요"/>
                </SearchBarBox>
                <Menu>
                    <ListIcon style={{fontSize: "xx-large"}}/>
                </Menu>
            </Header>
            <Background>
                <ProfileBox>
                    <ImageBox>
                        <ProfileImg></ProfileImg>
                        <Name>닉네임</Name>
                        <Activity>작성한 리뷰 12개 | 작성한 댓글 9개</Activity>
                    </ImageBox>
                    <MyActivityBox>
                        <MyActivity>
                            <CollectionsBookmarkOutlinedIcon style={{color: "#1168d7"}}/>
                            <Text>내 컬렉션</Text>
                        </MyActivity>
                        <MyActivity>
                            <BookmarkOutlinedIcon style={{color: "#1168d7"}}/>
                            <Text>저장한 에세이</Text>
                        </MyActivity>
                        <MyActivity>
                            <Text style={{fontWeight: "bold", fontSize: "21px", margin: "-2px"}}>9,999</Text>
                            <Text>팔로워</Text>
                        </MyActivity>
                    </MyActivityBox>
                </ProfileBox>
            </Background>
            <FeedMain>
                <FeedCard/>
                <FeedCard/>
                <FeedCard/>
                <FeedCard/>
                <FeedCard/>
                <FeedCard/>
                <FeedCard/>
                <FeedCard/>
                <FeedCard/>
                <FeedCard/>
            </FeedMain>
            <CollectButton>
                나만의 북 컬렉션 만들기
            </CollectButton>
        </React.Fragment>
    )
}

export default MyReviewFeed;

const Header = styled.div`
  height: 72px;
  width: 100%;
  display: grid;
  flex-direction: row;
  grid-template-columns: 75% 25%;
  box-sizing: border-box;
  border-bottom: 1px solid #f3f3f3;
  background-color: #fff;
  padding: 0px 20px;
`;

const SearchBarBox = styled.div`
  width: 70vw;
  height: 100%;
  padding: 12px 0px 12px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
  background-color: #f5f5f5;
  :focus {
    outline: none;
  }
  padding: 0px 0px 0px 30px;
`;

const Menu = styled.div`
  margin: 25% 0 0 40%;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
`;

const ProfileBox = styled.div`
  width: 360px;
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: -5vh 0 -2vh 0;

`;

const ImageBox = styled.div`
  width: 216px;
  height: 192px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0 -1vh 0;
`;

const ProfileImg = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 72px;
  background: tomato;
`;

const Name = styled.p`
  font-weight: bold;
  margin: 5px;
`;

const Activity = styled.p`
  color: #9e9e9e;
  margin: 5px;
  font-size: 13px;
`;

const MyActivityBox = styled.div`
  width: 312px;
  height: 92px;
  border-radius: 12px;
  display: flex;
  border: 1px solid #1168d7;
  margin: 0px 0px;
`;

const MyActivity = styled.div`
  width: 104px;
  text-align: center;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Text = styled.p`
  color: #1168d7;
  margin: 5px;
  font-size: 13px;
`;

const FeedMain = styled.div`
  width: 93%;
  margin: 1vh auto;
  height: auto;
  //border: 1px solid black;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4px;
`;

const CollectButton = styled.button`
  width: 85%;
  height: 7%;
  position: fixed;
  margin:0 auto;
  top: 93vh;
  left:0;
  right:0;
  z-index: 100;
  border: none;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 69px;
  border-radius: 12px;
  background-color: #1168d7;
  color: #ffffff;
  font-size: 1em;
  font-weight: bold;
  margin: -10vh auto;
  display: flex;
`;



