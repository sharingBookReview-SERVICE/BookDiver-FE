import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";


const MyReviewFind = () => {

    return (
        <React.Fragment>
            <FindReviewBox>
            <Text>
                그동안 작성했던 리뷰를 찾고 있나요?
            </Text>
            <Header>
                <SearchBarBox>
                    <SearchIcon
                        style={{width: "16px", height: "16px", position: "absolute", left: "10px", color: "#9e9e9e"}}/>
                    <SearchBar placeholder="책이름, 저자명 등으로 검색해보세요"/>
                </SearchBarBox>

            </Header>
            </FindReviewBox>

        </React.Fragment>
    )
}

export default MyReviewFind;

const Text = styled.text`
  font-size: 0.9em;
  text-align: left;
  font-family: NotoSansKR;
  font-weight: bolder;
  line-height: 1.43;
  letter-spacing: -0.28px;
`;

const FindReviewBox = styled.div`
    margin: 3vh 0 0 5vw;
`;

const Header = styled.div`
  height: 72px;
  width: 100%;
  display: grid;
  flex-direction: row;
  grid-template-columns: 75% 25%;
  box-sizing: border-box;
  background-color: #fff;
  padding: 0px 20px;
`;

const SearchBarBox = styled.div`
  width: 90vw;
  height: 100%;
  padding: 12px 0px 12px 0px;
  margin: 0 0 0 -6vw;
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
  color: #9e9e9e;
  :focus {
    outline: none;
  }
  &::placeholder {
    color: #A8A8A8;
  }

  padding: 0px 0px 0px 30px;
`;
