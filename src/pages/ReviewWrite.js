import React from "react";
import styled from "styled-components";
import add_button from "../img/add_button.png"
import left_arrow from "../img/left_arrow.png"
const ReviewWrite = () => {

    return (
        <React.Fragment>
            <ReviewWriteBox>
                <StartReview></StartReview>
                <ReviewHeader>
                    <LeftArrow src={left_arrow}/>
                    <ReviewHeaderText>게시하기</ReviewHeaderText>
                </ReviewHeader>
                <BookChoice>
                    <img src={add_button}/>
                    <Text>리뷰할 책 선택하기</Text>
                </BookChoice>
                <InputQuotes>
                    <Text>인용구 작성하기</Text>
                    <QuotesTextarea placeholder="책에서 읽었던 인상깊은 구절을 작성해보세요">
                    </QuotesTextarea>
                </InputQuotes>
                <AddReview>
                    <Text>리뷰작성</Text>
                    <QuotesTextarea placeholder="자유로운 리뷰를 작성해보세요.(최대 100자)">
                    </QuotesTextarea>
                </AddReview>
                <HashTag>
                    <Text>해시태그작성</Text><br/>
                    <HashInput placeholder="예) #자기계발"></HashInput>

                </HashTag>
            </ReviewWriteBox>
        </React.Fragment>
    )
}

export default ReviewWrite;
const Text = styled.text`
font-size: 14px;
  text-align: left;
  letter-spacing: -0.28px;
  font-weight: bolder;
`;

const StartReview = styled.div`
  background-color: #f5f5f5;
  height: 3%;
  margin-top: -5.7%;
`;
const ReviewWriteBox = styled.div`
  width: 100%;
  height: 720px;
  flex-grow: 0;
  padding: 20px 0 0;
  background-color: #FFFFFF;
  border: 1px solid black;
  margin : auto;
  box-sizing: border-box;
`;
const ReviewHeader = styled.div`
  width: 100%;
  height: 56px;
  background-color: #ffffff;
  
  //border: 1px solid black;
`;
const LeftArrow = styled.img`
  width: 13%;
  height: 24px;
  flex-grow: 0;
  object-fit: contain;
  float:left;
  

`;
const ReviewHeaderText = styled.div`
  width: 60px;
  height: 20px;
  flex-grow: 0;
  font-family: Roboto;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  float:right; 
  display:inline-block;
  margin: 0.2em 1em 0 0;
  color: #9e9e9e;
  box-sizing: border-box;
`;

const BookChoice = styled.div`
  width: 90%;
  height: 112px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0px;
  margin: auto;
  border-radius: 12px;
  //border: solid 1px var(--system-temp-30);
  border: 1px solid #EFEEEE;
  background-color: #ffffff;
  font-weight: bolder;
  color: #1168d7;
  font-size: 0.9em;
  box-sizing: border-box;
`;
const InputQuotes = styled.div`
  width: 100%;
  height: 168px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  margin: 16px 0 0;
  padding: 16px;
  background-color: #ffffff;
  //border: 1px solid black;
  box-sizing: border-box;
`;

const QuotesTextarea = styled.textarea`
  width: 98%;
  height: 108px;
  flex-grow: 0;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.28px;
  text-align: left;
  padding: 0.7em 0 0 0.5em;
  border-radius: 5px;
  border: none;
  background-color: #f5f5f5;
  &::placeholder{
    color: #A8A8A8;
  }
`;

const AddReview = styled.div`
  width: 100%;
  height: 168px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  padding: 16px;
  background-color: #ffffff;
//border: 1px solid blue;
  box-sizing: border-box;
`;

const HashTag = styled.div`
  width: 100%;
  height: 15%;
  padding: 12px 16px;
  background-color: #ffffff;
box-sizing: border-box;
// border: 1px solid red;
`;

const HashInput = styled.input`
  width: 99%;
  height: 3.3em;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin: 8px 0 0;
  padding: 14px 16px 14px 8px;
  border-radius: 10px;
  background-color: #f5f5f5;
  border: none;
  box-sizing: border-box;
    `;