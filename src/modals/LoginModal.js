//import 부분
import React from "react";
import styled from "styled-components";
import Color from "../shared/Color";
import { useDispatch } from "react-redux";
import { actionCreators as permitActions } from "../redux/modules/permit";
import { KAKAO_AUTH_URL} from "../shared/OAuth";


const LoginModal = (props) =>{
  const dispatch = useDispatch()

const closeModal = () => {
  dispatch(permitActions.showLoginModal(false))
}



//뷰

    return(
        <React.Fragment>
          
         <Container>
         
           <Btns>
            <LoginText>해당 서비스를 위해서는 로그인이 필요합니다.</LoginText>
            <KakaoBtn href={KAKAO_AUTH_URL}>카카오톡으로 시작하기</KakaoBtn>
            <GoogleBtn>구글로 시작하기</GoogleBtn>
            <CancelBtn onClick={() => {closeModal()}}>다음에 할게요</CancelBtn>
           </Btns>
          
         </Container>
       
         <Overlay onClick={() => {closeModal()}}>

         </Overlay>
        </React.Fragment>
    )
}



//styled components
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color:rgba(0, 0, 0, 0.4);
  z-index: 99;
  position: fixed;

  cursor:pointer;

  @media ${(props) => props.theme.tablet} {
    width: 420px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 420px;
  }
`;

const Container = styled.div`
width: 85%;
position:fixed;
top: 32%;
border-radius: 12px;
display:flex;
justify-content: center;
align-items: center;
text-align: center;
border: solid 1px #eeeeee; 
background: ${Color.mainColor};
z-index: 100;

@media ${(props) => props.theme.mobile} {
  left: 7%;
}

@media ${(props) => props.theme.tablet} {
  width: 390px;
  margin-left:15px;
}

@media ${(props) => props.theme.desktop} {
  width: 390px;
  margin-left:15px;
}
`;

const LoginText = styled.p`
font-size: 14px;
line-height: 1.52;
text-align: center;
padding: 12px;
display: block;
letter-spacing: -0.42px;
`;

const Btns = styled.div`
width:auto;
height:auto;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;

const KakaoBtn = styled.a`
width: 90%;
height: 48px;
text-align: center;
line-height: 48px;
border-radius: 12px;
background-color: #f9e57e;
font-weight: bold;
margin:0px;
text-decoration:none;
cursor:pointer;
color:${Color.black};
`;

const GoogleBtn = styled.div`
width: 90%;
height: 48px;
margin: 8px 0px;
text-align: center;
line-height: 48px;
border-radius: 12px;
border: solid 1px #eeeeee;
background-color: #fff;
font-weight: bold;
cursor:pointer;
`;

const CancelBtn = styled.div`
 color: #9e9e9e;
 margin: 10px;
 width: 280px;
height: 48px;
text-align: center;
line-height: 48px;
cursor:pointer;
`;
export default LoginModal;