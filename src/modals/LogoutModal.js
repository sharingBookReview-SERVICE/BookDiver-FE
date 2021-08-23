//import 부분
import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import Color from "../shared/Color";
import { actionCreators as permitActions } from "../redux/modules/permit";

import { CommonContainer, CommonOverlay, CommonText } from "../shared/styles/modal/CommonModal";

const LogoutModal = (props) =>{
  //dispatch와 변수들
  const dispatch = useDispatch();
 


    return(
        <React.Fragment>
       
         <Container is_show={props.logoutModal}>
         <Text>
         로그아웃 하시겠어요?
         </Text>
        
         <BtnBox>
         <Btn onClick={()=>{dispatch(permitActions.showModal(false))}} >취소</Btn>
         <Hr/>
         <Btn onClick={()=>{
           dispatch(permitActions.showModal(false))
           dispatch(userActions.logOut());
           localStorage.removeItem('token')
           history.push('/')
           }}>로그아웃하기</Btn>
         </BtnBox>
         </Container>
        
         <Overlay
          is_show={props.logoutModal}
          onClick={()=>{dispatch(permitActions.showModal(false))}} 
         />
        </React.Fragment>
    )
}



//styled components
const Overlay = styled(CommonOverlay)`
`;

const Container = styled(CommonContainer)`
display:block;
`;

const Text = styled(CommonText)`
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
cursor:pointer;
`;

export default LogoutModal;