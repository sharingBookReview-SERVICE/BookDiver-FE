//import 부분
import React from "react";
import styled from "styled-components"
import SearchIcon from '@material-ui/icons/Search';


const ReviewCard = (props) =>{
  //dispatch와 변수들

    return(
        <React.Fragment>
            <CardBox>

                <CommentTitleBox>
                    <UserName>
                        닉네임닉네임
                    </UserName>
                    <CreatedAt>
                        2021.07.24 21:04
                    </CreatedAt>
                </CommentTitleBox>

                <ContentBox>
                    <BookTitle>돈의 속성 | 김승호 저</BookTitle>
                    <Quote>"나는 나보다 더 훌륭한 경영자에게 투자한다"</Quote>
                    <Content>따뜻한 간에 위하여 우는 유소년에게서 있다. 보이는 설산에서 가슴이 석가는 그들의 유소년에게서 그와 철환하였는가? 속에서 이것을 스며들어 역사를 더운지라 고동을 것이다. 더운지라</Content>
                    <HashTag>#투자서적 #자기계발 #부자되기</HashTag>
                </ContentBox>
                
            </CardBox>
            

        </React.Fragment>
    )
}


const CardBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 24px;
  padding-bottom:0px;
  box-sizing:border-box;
  margin:0px 0px 6px 0px;
  background-color:#fff;
`

const CommentTitleBox = styled.div`
display:flex;
align-items:center;
`

const UserName = styled.p`
font-size:14px;
font-weight:bold;
margin:0px 8px 0px 0px;
`

const CreatedAt = styled.p`
font-size:10px;
color:#9e9e9e;
opacity:0.5;
margin:0px;
`


const ContentBox = styled.div`
width:100%;
box-sizing:border-box;
height:auto;
display:flex;
flex-direction:column;
justify-content:flex-start;
aligh-items:flex-start;
`

const BookTitle = styled.p`
margin:0px;
font-size:14px;
line-height:20px;
letter-spacing: -0.28px;
color:#1168d7;
font-weight:bold;
margin:7px 0px;
`

const Quote = styled.p`
font-size:14px;
font-weight: bold;
  line-height: 1.43;
  letter-spacing: -0.28px;
  margin:0px 0px 16px 0px;
`

const Content = styled.p`
font-size:14px;
  line-height: 1.43;
  letter-spacing: -0.28px;
  margin:0px;
`

const HashTag = styled.div`
padding:15px 0px;
color:#1168d7;
font-size:14px;
`



export default ReviewCard;