//import 부분
import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { useDispatch } from "react-redux";
import Color from "../shared/Color";
import { actionCreators as permitActions } from "../redux/modules/permit";

import { CommonContainer, CommonOverlay, CommonText } from "../shared/styles/modal/CommonModal";

const CheckTreasureModal = (props) =>{
  //dispatch와 변수들
  const dispatch = useDispatch();
 
    return(
        <React.Fragment>
       
         <Container is_show={props.is_treasure}>
         <Text>
         보물을 얻으셨습니다
         </Text>
        
         <BtnBox>
         <Btn onClick={()=>{dispatch(permitActions.showTreasureModal(false))}} >취소</Btn>
         <Hr/>
         <Btn onClick={()=>{
           dispatch(permitActions.showTreasureModal(false))
           history.push('/mydepth')
           }}>확인하러가기</Btn>
         </BtnBox>
         </Container>
        
         <Overlay
          is_show={props.is_treasure}
          onClick={()=>{dispatch(permitActions.showTreasureModal(false))}} 
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

export default React.memo(CheckTreasureModal);