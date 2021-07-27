//import 부분
import React, { useState } from "react";
import styled from "styled-components";


const LoginModal = (props) =>{
  //dispatch와 변수들

//useEffect
React.useEffect(()=>{
},[]);



//뷰

    return(
        <React.Fragment>
         <Container>
         
           <Btns>
           <LoginText>리뷰작성을 위해선 로그인이 필요합니다.</LoginText>
           <KakaoBtn>카카오톡으로 시작하기</KakaoBtn>
           <GoogleBtn>구글로 시작하기</GoogleBtn>
           <CancelBtn>다음에 할게요</CancelBtn>
           </Btns>
          
         </Container>
        </React.Fragment>
    )
}



//styled components
const Container = styled.div`
width: 328px;
border-radius: 12px;
display:flex;
justify-content: center;
align-items: center;
text-align: center;
border: solid 1px #eeeeee; 
background: #fff;
`;

const LoginText = styled.p`
font-size: 14px;
line-height: 1.52;
text-align: center;
padding: 24px;
display: block;
letter-spacing: -0.42px;
`;

const Btns = styled.div`
`;

const KakaoBtn = styled.div`
width: 280px;
height: 48px;
text-align: center;
line-height: 48px;
border-radius: 12px;
background-color: #f9e57e;
font-weight: bold;
`;

const GoogleBtn = styled.div`
width: 280px;
height: 48px;
margin: 8px 0px;
text-align: center;
line-height: 48px;
border-radius: 12px;
border: solid 1px #eeeeee;
background-color: #fff;
font-weight: bold;
`;

const CancelBtn = styled.div`
 color: #9e9e9e;
 margin: 10px;
 width: 280px;
height: 48px;
text-align: center;
line-height: 48px;
`;
export default LoginModal;