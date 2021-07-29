import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from '@material-ui/icons/List';

//확인용
import FeedCard from "../components/FeedCard";

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
`

const SearchBarBox = styled.div`
  width: 70vw;
  height: 100%;
  padding: 12px 0px 12px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

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
`
const Menu = styled.div`
  margin: 25% 0 0 40%;
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
  margin: 0 auto;
`;