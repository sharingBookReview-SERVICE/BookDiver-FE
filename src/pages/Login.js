//import 부분
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import KaKaoLogin from 'react-kakao-login';
import { KAKAO_AUTH_URL} from "../shared/OAuth";
import { useHistory } from "react-router-dom";
import Color from "../shared/Color";



const Login = (props) =>{

    
    const dispatch = useDispatch();

   
    return(
        <React.Fragment>
        
                <Background>
                <LoginText>
                        로그인 후<br/> 
                        직접 에세이를<br/> 
                        작성해보세요</LoginText>
                    
                    <LoginBox>
                     
                        <KaKaoBtn 
                        href={KAKAO_AUTH_URL}
                        >카카오톡으로 시작하기</KaKaoBtn>
                        <GoogleBtn>구글로 시작하기</GoogleBtn>
                    </LoginBox>
                </Background>
           
        </React.Fragment>
    )
}

//styled components


const Background = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: ${Color.mainColor};
padding-bottom:70px;
box-sizing:border-box;
@media ${(props) => props.theme.tablet} {
    width: 420px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 420px;
  }
`;

const LoginBox = styled.div`
width: 100%;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 0 auto;
display: flex;
`;

const LoginText = styled.p`
width: 75%;
font-size: 18px;
font-weight: bold;
line-height: 1.52;
padding: 24px;
display: block;
letter-spacing: -0.42px;
font-family: "Noto Serif KR", serif;
font-size: 21px;
`;


const KaKaoBtn = styled.a`
width: 75%;
color: black;
height: 48px;
margin: 0 auto;
text-align: center;
line-height: 48px;
border-radius: 12px;
background-color: #f9e57e;
font-weight: bold;
text-decoration:none;
&:visited{
    text-decoration:none;
    color: black;
}
`;

const GoogleBtn = styled.div`
width: 75%;
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