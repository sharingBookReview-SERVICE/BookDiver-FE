import React from "react";
import styled from "styled-components";
import Color from "../shared/Color";

const CollectionDetail = (props) =>{
    return(
        <React.Fragment>
            <Container>
                <HeadBtn>

                </HeadBtn>
                <CollectionOutter>
                    <Image>
                        <TitleBox>
                            <Title>카페에서 가볍게 읽는 자기계발 에세이 모음</Title>
                            <Nickname>도비는 휴식이 필요해</Nickname>
                        </TitleBox>
                      
                    </Image>
                    <Description>
                    카페에서 가볍게 읽는 자기계발 에세이를 모아봤어요. 나의 위에 언덕 비둘기, 까닭이요, 다하지 써 나의 거외다. 북간도에 않은 차 계십니다. 못 차 언덕 이름과, 무엇인지 하나에 토끼, 계십니다. 추억과 다 옥 위에 북간도에 거외다. 다 하나에 위에도 이런 이네들은 속의 겨울이 까닭입니다. 불러 나는 것은 부끄러운 하늘에는 이름자 까닭입니다. 애기 이 사랑과 걱정도 어머님, 못 벌써 있습니다. 사람들의 멀리 이름과, 하나에 아름다운 하늘에는 이네들은 듯합니다. 별빛이 못 무성할 흙으로 불러 있습니다.
                    </Description>
                    <BookCard>

                    </BookCard>
                    <Reaction>

                    </Reaction>
                </CollectionOutter>
                <CommentList>
                    <Comment>

                    </Comment>
                </CommentList>
                <CommentWrite>

                </CommentWrite>
            </Container>
        </React.Fragment>
    )
}

const HeadBtn = styled.div`
`;

const Container = styled.div`
width: 100vw;
height: 100vh;
background: ${Color.mainColor};
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
background-image:URL(https://i.pinimg.com/564x/1d/56/07/1d5607356a13ae7f8eb493bc2510dbf9.jpg);
background-size: cover;
border-radius: 12px 12px 0px 0px;

`;
const TitleBox = styled.div`
position: absolute;
top: 20%;
width: 80%;
padding: 20px;
`;
const Title = styled.p`
font-family: "Noto Serif KR", serif;
color: ${Color.white};
font-size: 21px;
`;
const Nickname = styled.p`
color: ${Color.white};
`;
const Description = styled.div`
width: 90%;
margin: 0 auto;
padding: 16px;
`;
const BookCard = styled.div`
`;
const Reaction = styled.div`
`;
const CommentList = styled.div`
`;
const Comment = styled.div`
`;
const CommentWrite = styled.div`
`;

export default CollectionDetail;