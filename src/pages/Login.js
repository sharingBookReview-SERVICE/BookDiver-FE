//import 부분
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import KaKaoLogin from 'react-kakao-login';
import { KAKAO_AUTH_URL} from "../shared/OAuth";
import { useHistory } from "react-router-dom";



const Login = (props) =>{

    
    const dispatch = useDispatch();

   
    return(
        <React.Fragment>
            <Container>
                <Background>
                    <LoginBox>
                        <LoginText
                        
                        >로그인하고 리뷰를 작성해보세요</LoginText>
                   
                        <KaKaoBtn 
                        href={KAKAO_AUTH_URL}
                        >카카오톡으로 시작하기</KaKaoBtn>
                        <GoogleBtn>구글로 시작하기</GoogleBtn>
                    </LoginBox>
                </Background>
            </Container>
        </React.Fragment>
    )
}

//styled components
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    
`;

const Background = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background-color: #fff;

`;

const LoginBox = styled.div`
width: 100%;
height: 100%;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 0 auto;
display: flex;
`;

const LoginText = styled.p`
font-size: 18px;
font-weight: bold;
line-height: 1.52;
text-align: center;
padding: 24px;
display: block;
letter-spacing: -0.42px;
color: #1168d7;
`;

// const KakaoBtn = styled.button`
// width: 280px;
// height: 48px;
// margin: 0 auto;
// text-align: center;
// line-height: 48px;
// border-radius: 12px;
// background-color: #f9e57e;
// font-weight: bold;
// `;

const KaKaoBtn = styled.a`
  display: flex;
  height: 50px;
  background-color: #ffe500;
  text-align: center;
  border-radius: 4px;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
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


export default Login;