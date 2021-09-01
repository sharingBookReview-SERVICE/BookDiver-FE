//import 부분
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as permitActions } from "../redux/modules/permit";
import { history } from "../redux/configStore";

import { CommonContainer, CommonOverlay, CommonText } from "../shared/styles/modal/CommonModal";

const SignoutModal = (props) =>{
  const dispatch = useDispatch();
  const userId = useSelector(state=> state.user.user.userId);

//뷰

    return(
        <React.Fragment>
        
         <Container is_show={props.signoutModal}>
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
          is_show={props.signoutModal}
          onClick={()=>{dispatch(permitActions.showModal2(false))}}
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


const Btn = styled.div`
width: 50%;
font-size: 14px;
font-weight: bold;
margin: 14px 0px;
cursor:pointer;
`;

export default SignoutModal;