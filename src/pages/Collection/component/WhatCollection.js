import styled from "styled-components"
import Color from "../../../shared/Color"
import { history } from "../../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";

const  WhatCollection = () => {
    const is_login = useSelector(state=> state.user.is_login);
    return(
        <Wrapper>
            <CollectionGuideBox>
                <GuideBox>
                    <GuideTitle>북컬렉션이 뭔가요?</GuideTitle>
                    <GuideDesc>북컬렉션은 다이버 유저들이 만든 책 모음집이에요. <br/> 유저들이 직접 추천하는 도서모음을 구경해보세요.</GuideDesc>
                    <GuideMakeButton
                    onClick={()=>{
                        is_login?
                        history.push('/makeCollection'):
                        history.push('/login')
                    }}
                    >나만의 북 컬렉션 만들기</GuideMakeButton>
                </GuideBox>
            </CollectionGuideBox>
        </Wrapper>
    )
}

export default WhatCollection;

const Wrapper = styled.div`
width:100%;
height:auto;
display:flex;
justify-content:center;
`

const CollectionGuideBox = styled.div`
width:380px;
height:166px;
border-radius:10px;
border:1px solid ${Color.line};
display:flex;
justify-content:center;
align-items:center;

@media ${(props) => props.theme.mobile} {
    width:91%;
    height:166px;
  }
`

const GuideBox = styled.div`
width:auto;
height:auto;
display:flex;
flex-direction:column;
align-items:center;
`

const GuideTitle = styled.div`
font-size:18px;
color:${Color.fontBlack};
font-weight:normal;
font-family: "Noto Serif KR", serif;
`

const GuideDesc = styled.div`
font-size:12px;
color:${Color.subTextFont};
margin:10px 0px;
`

const GuideMakeButton = styled.div`
width:85%;
height:40px;
color:${Color.fontBlack};
display:flex;
justify-content:center;
align-items:center;
font-weight:bold;
background:${Color.gray3};
border:1px solid rgba(0,0,0,0);
border-radius:10px;
cursor:pointer;
transition:0.5s ease-in-out;

:hover{
    background:transparent;
    border:1px solid ${Color.gray3};
}
`