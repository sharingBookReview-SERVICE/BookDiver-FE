//import 부분
import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import Color from "../shared/Color";

import { actionCreators as permitActions } from "../redux/modules/permit";
import { actionCreators as userActions } from "../redux/modules/user";

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
            console.log("클릭")
              dispatch(permitActions.showModal(false))
          }}
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
height: 145px;
border-radius: 12px;
justify-content: center;
align-items: center;
text-align: center;
border: solid 1px #eeeeee; 
background: ${Color.mainColor};
z-index: 100;
position: absolute;
top: 38%;
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
`;

export default TreasureBoxModal;