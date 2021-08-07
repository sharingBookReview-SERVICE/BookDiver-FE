//import 부분
import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import Color from "../shared/Color";

const LogoutModal = (props) =>{
  //dispatch와 변수들
  const dispatch = useDispatch();
  const {logooutPop, setLogOutPop} = props;


//useEffect
React.useEffect(()=>{
},[]);



//뷰

    return(
        <React.Fragment>
       
         <Container>
         <Text>
         로그아웃 하시겠어요?
         </Text>
        
         <BtnBox>
         <Btn onClick={()=>{setLogOutPop(false)}}>취소</Btn>
         <Hr/>
         <Btn onClick={()=>{
           setLogOutPop(false)
           dispatch(userActions.logOut());
           localStorage.removeItem('token')
           history.push('/')
           }}>로그아웃하기</Btn>
         </BtnBox>
         </Container>
        
         <Overlay>

         </Overlay>
        </React.Fragment>
    )
}



//styled components
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color:rgba(0, 0, 0, 0.5);
  z-index: 99;
  position: fixed;
`;

const Container = styled.div`
width: 85%;
height: 145px;
border-radius: 12px;
justify-content: center;
align-items: center;
text-align: center;
border: solid 1px #eeeeee; 
background: ${Color.mainColor};
z-index: 100;
position: absolute;
top: 35%;
left: 7%;
`;

const Text = styled.p`
font-size: 14px;
line-height: 1.52;
text-align: center;
padding: 24px;
display: block;
letter-spacing: -0.42px;
font-size: 14px;
border-bottom: 1px solid ${Color.hashtag};
margin-bottom: 0px;
padding-bottom: 30px;
`;

const BtnBox = styled.div`
display: flex;
padding: 5px;
`;

const Hr = styled.div`
background:${Color.hashtag}; 
`;

const Btn = styled.div`
width: 50%;
font-size: 14px;
font-weight: bold;
margin: 14px 0px;

`;

export default LogoutModal;