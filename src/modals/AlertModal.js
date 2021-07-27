//import 부분
import React, { useState } from "react";
import styled from "styled-components";


const AlertModal = (props) =>{
  //dispatch와 변수들

//useEffect
React.useEffect(()=>{
},[]);



//뷰

    return(
        <React.Fragment>
         <Container>
         <Text>
         다른 분이 사용하고 있는 닉네임이에요.
        다른 닉네임을 입력해주세요.
         </Text>
         <Btn>확인했어요</Btn>
    
          
         </Container>
        </React.Fragment>
    )
}



//styled components
const Container = styled.div`
width: 320px;
border-radius: 12px;
justify-content: center;
align-items: center;
text-align: center;
border: solid 1px #eeeeee; 
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

const Btn = styled.div`
width: 280px;
height: 48px;
text-align: right;
line-height: 48px;
border-radius: 12px;
font-weight: bold;
color: #1168d7;
font-size: 14px;
`;

export default AlertModal;