//import 부분
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as userActions } from "../redux/modules/user";
import permit, { actionCreators as permitActions } from "../redux/modules/permit";
import { history } from "../redux/configStore";
import Color from "../shared/Color";


const SignoutModal = (props) =>{
  const dispatch = useDispatch();
  const userId = useSelector(state=> state.user.user.userId);

//뷰

    return(
        <React.Fragment>
        
         <Container>
         <Text>
         회원탈퇴를 하시겠어요?<br/>
            회원탈퇴 시 작성되었던 모든 리뷰 및 댓글, 관련된 회원정보는 삭제됩니다.
         </Text>
     
         <BtnBox>
         <Btn onClick={()=>{ dispatch(permitActions.showModal2(false))}}>취소</Btn>
     
         <Btn onClick={()=>{
           dispatch(permitActions.showModal2(false));
           dispatch(userActions.deleteUserSV(userId));
           localStorage.removeItem('token');
           history.push('/') 
           }}>회원탈퇴하기</Btn>
         </BtnBox>
        
          
         </Container>
        
         <Overlay
          onClick={()=>{dispatch(permitActions.showModal2(false))}}
         />
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
border-radius: 12px;
justify-content: center;
align-items: center;
text-align: center;
border: solid 1px #eeeeee; 
background: ${Color.mainColor};
z-index: 100;
position: absolute;
top: 30%;
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
margin-bottom: 0px;
padding-bottom: 30px;
border-bottom: 1px solid ${Color.hashtag};
`;

const BtnBox = styled.div`
display: flex;
padding: 5px;
`;


const Btn = styled.div`
width: 50%;
font-size: 14px;
font-weight: bold;
margin: 14px 0px;

`;

export default SignoutModal;