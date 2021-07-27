//import 부분
import React, { useState } from "react";
import styled from "styled-components";
import {history} from "../redux/configStore";


const ChangeName = (props) =>{

    return(
        <React.Fragment>
                <Background>
                  <HeadBar>
                    <HeadBtn onClick={()=>{history.goBack()}}>뒤로가기</HeadBtn>
                    <HeadBtn>변경완료</HeadBtn>
                  </HeadBar>
                    <ProfileBox>
                        <ImageBox>
                            <ProfileImg></ProfileImg>
                             <Input></Input>
                            <Activity>작성한 리뷰 12개  |  작성한 댓글 9개</Activity>
                        </ImageBox>
                    </ProfileBox>
                </Background>
        </React.Fragment>
    )
}

const Background = styled.div`
width: 100%;
height: 100%;
justify-content: top;
align-items: top;
background: white;

`;
const HeadBar = styled.div`
width: 360px;
height: 56px;
margin: 0 0 4px;
display: flex;
justify-content: space-between;
`;
const HeadBtn = styled.p`
padding: 0px 5px;
font-weight: bold;
&:hover{
  color: #1168d7;
}
`;
const ProfileBox = styled.div`
width: 360px;
height: 216px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

`;
const ImageBox = styled.div`
width: 216px;
height: 192px;
display: flex;
flex-direction:column;
justify-content: center;
align-items: center;

`;

const ProfileImg = styled.div`
width: 72px;
height: 72px;
border-radius: 72px;
background: tomato;
margin: 10px;
`;

const Input = styled.input`
`;
const Activity = styled.p`
    color: #9e9e9e;
    margin: 5px;
    font-size: 13px;
`;

export default ChangeName;