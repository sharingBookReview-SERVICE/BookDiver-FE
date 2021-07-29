//import 부분
import React, { useState } from "react";
import styled from "styled-components";


const LogoutModal = (props) =>{
  //dispatch와 변수들

//useEffect
React.useEffect(()=>{
},[]);



//뷰

    return(
        <React.Fragment>
          <Outter>
         <Container>
         <Text>
         로그아웃 하시겠어요?
         </Text>
         <Hr></Hr>
         <BtnBox>
         <Btn>취소</Btn>
         <Hr/>
         <Btn>로그아웃하기</Btn>
         </BtnBox>
        
          
         </Container>
         </Outter>
        </React.Fragment>
    )
}



//styled components
const Outter = styled.div`
  width: 100vw;
  height: 100vh;
  background-color:rgba(0, 0, 0, 0.5);
  display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
const Container = styled.div`
width: 320px;
height: 145px;
border-radius: 12px;
justify-content: center;
align-items: center;
text-align: center;
border: solid 1px #eeeeee; 
background: #fff;
`;

const Text = styled.p`
font-size: 14px;
line-height: 1.52;
text-align: center;
padding: 24px;
display: block;
letter-spacing: -0.42px;
font-size: 14px;
`;

const BtnBox = styled.div`
display: flex;
`;

const Hr = styled.div`
border: solid 1px #eeeeee; 
`;

const Btn = styled.div`
width: 160px;
font-size: 14px;
font-weight: bold;
margin: 14px 0px;

`;

export default LogoutModal;