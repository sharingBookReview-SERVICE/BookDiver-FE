import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as permitActions } from "../redux/modules/permit";

import styled from "styled-components";
import Color from "../shared/Color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { history } from "../redux/configStore";
import { makeStyles } from "@material-ui/core/styles";
import { BookCard } from "./MakeCollection";
import Comment from "../components/Comment";

const useStyles = makeStyles((theme) => ({
    goback: {
        padding: "0px 20px"
    },
    bookCard: {
        width: "90%",
        margin: "0 auto",
        marginBottom: "20px"
    }
  }));

const CollectionDetail = (props) =>{
    const classes = useStyles();
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(permitActions.showNav(false));
    },[]);
    return(
        <React.Fragment>
            <Container>
            <Head>
                <ArrowBackIcon className={classes.goback}
                onClick = {()=>{history.goBack()}}
                />
            </Head>
                <CollectionOutter>
                     <Overlay/>
                    <Image>
                        <TitleBox>
                        <Title>카페에서 가볍게 읽는 자기계발 에세이 모음</Title>
                        <Nickname>도비는 휴식이 필요해</Nickname>
                        </TitleBox>
                        
                    </Image>
                  <Wrapper>
                    <Description>
                    카페에서 가볍게 읽는 자기계발 에세이를 모아봤어요. 나의 위에 언덕 비둘기, 까닭이요, 다하지 써 나의 거외다. 북간도에 않은 차 계십니다. 못 차 언덕 이름과, 무엇인지 하나에 토끼, 계십니다. 추억과 다 옥 위에 북간도에 거외다. 다 하나에 위에도 이런 이네들은 속의 겨울이 까닭입니다. 불러 나는 것은 부끄러운 하늘에는 이름자 까닭입니다. 애기 이 사랑과 걱정도 어머님, 못 벌써 있습니다. 사람들의 멀리 이름과, 하나에 아름다운 하늘에는 이네들은 듯합니다. 별빛이 못 무성할 흙으로 불러 있습니다.
                    </Description>
                    <Wrapper>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    </Wrapper>
                    <ReactionBar>
                        <Div><FavoriteBorderIcon className={classes.like} />좋아요 0 개</Div>
                         <Hr></Hr>
                         <Div>댓글 0 개</Div>
                     </ReactionBar>
                    </Wrapper>
                </CollectionOutter>
                <CommentList>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                </CommentList>
                <CommentInputBox>
                    <CommentInput/>
                    <CommentWriteButton>
                    게시
                    </CommentWriteButton>
            </CommentInputBox>
            </Container>
        </React.Fragment>
    )
}

const Head = styled.div`
width: 100%;
align-items: center;
display: flex;
padding: 16px 0px;
`;


const Container = styled.div`
width: 100vw;
background: ${Color.mainColor};
padding-bottom: 100px;
`;
const CollectionOutter = styled.div`
width: 90%;
border: 1px solid black;
border-radius: 12px;
margin: 0 auto;
margin: 16px;
`;

const Image = styled.div`
width: 100%;
padding-top: 100%;
background-image:url(https://i.pinimg.com/564x/1d/56/07/1d5607356a13ae7f8eb493bc2510dbf9.jpg);
background-size: cover;
border-radius: 12px 12px 0px 0px;
`;


const Overlay = styled.div`
width: 90%;
padding-top: 90%;
border-radius: 12px 12px 0px 0px;
background: black;
opacity: 30%;
position: absolute;
`

const TitleBox = styled.div`
position: absolute;
width: 80%;
top: 27%;
left: 10%;
height: auto;
`;
const Title = styled.p`
font-family: "Noto Serif KR", serif;
color: ${Color.white};
font-size: 21px;
`;
const Nickname = styled.p`
color: ${Color.white};
`;

const Wrapper = styled.div`
width: 90%;
margin: 0 auto;
`;
const Description = styled.div`
margin: 0 auto;
padding: 20px 0px;
`;
const ReactionBar = styled.div`
border: 1px solid #242121;
width: 90%;
height: 56px;
border-radius: 24px;
margin: 0 auto;
margin-top: 16px;
margin-bottom: 16px;
display: flex;
align-items: center;
`;
const Div = styled.div`
display: flex;
width: 100%;
height: 100%;
align-items: center;
justify-content: center;
`;
const Hr = styled.div`
width: 1px;
height: 100%;
background: black;

`;
const CommentList = styled.div`
`;

const CommentInputBox = styled.div`
  height: 72px;
  width: 100%;
  padding: 12px 16px;
  box-sizing: border-box;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #c3b4a2;
  background-color: ${Color.mainColor};
  position: fixed;
  bottom: 0;
`;

const CommentInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 0 0 16px;
  font-size: 16px;
  background-color: ${Color.mainColor};
  border: 1px solid ${Color.fontBlack};
  border-radius: 12px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${(props) => props.color};
    font-family: 'Roboto', sans-serif;
    letter-spacing: -0.5px;
  }
`;

const CommentWriteButton = styled.div`
  cursor: pointer;
  font-size: 16px;
  color: ${Color.fontGray};
  position: absolute;
  right: 30px;
  font-weight: 700;
  height: 20px;
}
`;
export default CollectionDetail;