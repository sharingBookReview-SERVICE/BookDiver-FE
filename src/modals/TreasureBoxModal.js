//import 부분
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Color from "../shared/Color";

import { actionCreators as permitActions } from "../redux/modules/permit";
import { actionCreators as userActions } from "../redux/modules/user";

import { CommonContainer, CommonOverlay,CommonText } from "../shared/styles/modal/CommonModal";

const TreasureBoxModal = (props) =>{
  //dispatch와 변수들
  const dispatch = useDispatch();
  const userLevel = useSelector(state => state.user.user.level)
 


    return(
        <React.Fragment>
       
         <Container>
            <Text>
            {userLevel}m 보물상자를 여시겠어요? 
            </Text>
            
            <BtnBox>
                <Hr/>
                <Btn onClick={()=>{
                dispatch(permitActions.showModal(false))
                dispatch(userActions.getTreasureSV())
                }}>열기</Btn>
            </BtnBox>
         </Container>
        
         <Overlay
          onClick={() => {
              dispatch(permitActions.showModal(false))
          }}
         />
        </React.Fragment>
    )
}



//styled components
const Overlay = styled(CommonOverlay)`
`;

const Container = styled(CommonContainer)`
display:block;
top:40%;
`;

const Text = styled(CommonText)`
padding-bottom: 15px;
`;

const BtnBox = styled.div`
display: flex;
justify-content:flex-end;
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
padding-right:20px;
display:flex;
justify-content:flex-end;
cursor:pointer;
`;

export default TreasureBoxModal;