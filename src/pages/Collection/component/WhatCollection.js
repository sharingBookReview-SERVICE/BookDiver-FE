import styled from "styled-components"
import Color from "../../../shared/Color"

const  WhatCollection = () => {
    return(
        <CollectionGuideBox>
            <GuideBox>
                <GuideTitle>북컬렉션이 뭔가요?</GuideTitle>
                <GuideDesc>북컬렉션은 다이버 유저들이 만든 책 모음집이에요. <br/> 유저들이 직접 추천하는 도서모음을 구경해보세요.</GuideDesc>
                <GuideMakeButton>나만의 북 컬렉션 만들기</GuideMakeButton>
            </GuideBox>
        </CollectionGuideBox>
    )
}

export default WhatCollection;

const CollectionGuideBox = styled.div`
width:380px;
height:166px;
border-radius:10px;
border:1px solid ${Color.line};
display:flex;
justify-content:center;
align-items:center;
margin:0px 20px;

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
border-radius:10px;
`