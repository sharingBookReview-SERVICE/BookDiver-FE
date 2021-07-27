//import 부분
import React from "react";
import styled from "styled-components";

//import 이미지
import book_img from "../img/book_img.jpg"

const BookDetail = () => {


//useEffect
    React.useEffect(() => {
    }, []);


//함수


//뷰

    return (
        <React.Fragment>
            <Grid style={{height: "5vh"}}/>
            <Main>
                <LogoHeader>
                    <Logo>LOGO</Logo>
                    <ReviewSearch placeholder={"리뷰 궁금한 책 검색"}></ReviewSearch>
                </LogoHeader>
                <SelectBook>
                    <BookTitle>
                        <BookImg src={book_img}></BookImg>
                        <BookName>
                            달러구트 꿈 백화점
                            <BookAuthor>
                                이미예 지음/ 팩토리나인
                            </BookAuthor>
                        </BookName>
                    </BookTitle>
                </SelectBook>
                <BookIntro>
                    책소개
                </BookIntro>
                <BookContents>
                    100만 독자를 사로잡은 꿈 백화점이 다시 문을 열었다. 달러구트 꿈 백화점 두 번째 이야기.
                    1년차 판매 사원이 된 페니는 첫 연봉협상도 하고 '꿈 산업 종사자'로 인정을 받아 '컴퍼니 구역' 접근 권한도 얻는다.
                    하지만 '민원관리국'에서 페니가 만나게 되는 사람들은 꿈에 대한 불만으로 가득한 이들.
                    꿈자리가 뒤숭숭한 1단계 민원 제기 고객부터 꿈꾸는 자체가 고통스러운 3단계 고객까지, 다양한 불만을 만나며 페니는 꿈을 파는 백화점의 실무에 더 깊이 다가가게 된다.
                    "왜 저에게서 꿈까지 뺏어가려고 하시나요?"라는 메시지를 남기고 떠난 792번 단골 손님. 이 손님에겐 꿈이 왜 고통이 된 걸까?
                </BookContents>
                <Grid/>

                <BookReview>
                    리뷰 (1개)
                </BookReview>

            </Main>
        </React.Fragment>

    )
}
const Grid = styled.div`
width: 100vw;
  height: 2vh;
  background-color: #f5f5f5;
`;
const Main = styled.div`
  width: 100vw;
  height: 100vh;
  flex-grow: 0;
  padding: 20px 0 0;
  background-color: #FFFFFF;
  //border: 1px solid black;
  margin : auto;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
const LogoHeader = styled.div`
  width: 100vw;
  height: 8vh;
  padding: 12px 0 1px;
  //border: 1px solid black;
  margin-top: -2.5vh;
  border-bottom: 1px solid #eeeeee;
`;

const Logo = styled.div`
font-size: 30px;
  font-weight: bolder;
  color: #1168d7;
  margin: 1vh 0 0 5vw;
  position: relative;

`;

const ReviewSearch = styled.input`
  width: 43vw;
  height: 6vh;
  display: flex;
  margin: -5.5vh 0 0 50vw;
  background-color: #f5f5f5;
  border: none;
  border-radius: 10px;
  &::placeholder {
    padding-left: 5px;
  }
`;

const SelectBook = styled.div`
  width: 90vw;
  height: 19vh;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  //border: 1px solid black;
`;

const BookTitle = styled.div`
  width: 80vw;
  height: 15vh;
  flex-grow: 0;
  display: flex;
  align-items: center;
  margin: auto;
  gap: 12px;
  padding: 1em;
  border-radius: 12px;
  border: solid 1px #eeeeee;
  background-color: var(--system-temp-10);
  box-sizing: border-box;
`;

const BookImg = styled.img`
  width: 3.6em;
  height: 80px;
  flex-grow: 0;
  border-radius: 4px;
  background-color: #c4c4c4;
`;

const BookName = styled.div`
  width: 53vw;
  height: 4vh;
  align-self: stretch;
  flex-grow: 0;
  font-family: NotoSansKR;
  font-size: 0.93em;
  font-weight: bolder;
  line-height: 1.43;
  letter-spacing: -0.28px;
  text-align: left;
  //border: 1px solid black;
  margin-top: 1.5vh;
  position: relative;
  color: #1168d7;
`;

const BookAuthor = styled.div`
  width: 53vw;
  height: 3vh;
  flex-grow: 0;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.28px;
  text-align: left;
  color: #9e9e9e;
  margin: 1em 0 0 0;
  display: flex;
  //border: 1px solid black;
`;

const BookIntro = styled.div`
font-size: 1.3em;
  font-weight: bolder;
  margin: 0.2vh 0 0 5vw;
  
`

const BookContents = styled.div`
  width: 90vw;
  margin: 2vh auto;
  font-size: 0.8em;
  
`

const BookReview = styled.div`
  font-size: 1.3em;
  font-weight: bolder;
  margin: 0.5em;
`
export default BookDetail;