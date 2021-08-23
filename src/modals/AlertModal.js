//import 부분
import React from "react";
import styled from "styled-components";
import Color from "../shared/Color";
import { useDispatch } from "react-redux";
import { actionCreators as permitActions } from "../redux/modules/permit";

import { CommonContainer, CommonOverlay, CommonText } from "../shared/styles/modal/CommonModal";

const AlertModal = (props) =>{
  //dispatch와 변수들
  const dispatch = useDispatch();


//뷰

    return(
        <React.Fragment>
         <Container>
         <Text>
         다른 분이 사용하고 있는 닉네임이에요.<br/>
        다른 닉네임을 입력해주세요.
         </Text>
         <Btn onClick={()=>{
            dispatch(permitActions.showModal(false));
            }}>확인했어요</Btn>
    
          
         </Container>
         <Overlay 
            onClick={()=>{
            dispatch(permitActions.showModal(false));
            }}>
            </Overlay>
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

const Btn = styled.div`
text-align: right;
border-radius: 12px;
font-weight: bold;
color: ${Color.fontblack};
font-size: 14px;
padding: 0px 25px 20px 0px;
cursor:pointer;
`;

export default AlertModal;