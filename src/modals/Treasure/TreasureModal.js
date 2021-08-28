//import 부분
import React from "react";
import styled from "styled-components";
import Color from "../../shared/Color";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as permitActions } from "../../redux/modules/permit";
import {history} from "../../redux/configStore"

import { CommonContainer, CommonOverlay } from "../../shared/styles/modal/CommonModal";
import { depth_image } from "../../shared/Image";
import {DescList} from "./DescList"

const TreasureModal = ({new_badge}) =>{
  const dispatch = useDispatch()
  const is_new_treasure = useSelector(state => state.permit.is_new_treasure)

const closeModal = () => {
  dispatch(permitActions.newTreasureModal(false))
}

const goToProfileChange = () => {
  history.push("/changeprofileimg")
}

//뷰

    return(
        <React.Fragment>
          
         <Container is_show={is_new_treasure}>
           <Treasure src={depth_image[new_badge]}/>
           <Desc>{DescList[new_badge]}</Desc>


           <ButtonBox>
             <CloseBtn 
             onClick={() => {
               closeModal()
             }}>
                닫기
             </CloseBtn>
             <ApplyBtn 
             onClick={() => {
               goToProfileChange();
               closeModal();
              }}>
                프로필 변경하기
             </ApplyBtn>
           </ButtonBox>
         </Container>
       
         <Overlay 
            is_show={is_new_treasure}
         onClick={() => {closeModal()}}>
         </Overlay>
        </React.Fragment>
    )
}

export default TreasureModal;

//styled components
const Overlay = styled(CommonOverlay)`
`;


const Container = styled(CommonContainer)`
padding:20px 55px 20px 55px;
box-sizing:border-box;
${(props) => props.is_show ? 
  `opacity:1;
  top: 30%;`
  :
  `opacity:0;
  top:-40%;`
  }
`;


const Treasure = styled.img`
width:150px;
height:150px;
`

const Desc = styled.div`
color:${Color.fontBlack};
font-size:14px;
text-align:center;
margin:15px 0px;
`

const ButtonBox = styled.div`
width:100%;
height:auto;
display:flex;
justify-content:space-around;
`

const CloseBtn = styled.div`
border:1px solid ${Color.line};
border-radius:10px;
display:flex;
justify-content:center;
align-items:center;
width:72px;
height:48px;
cursor:pointer;
`

const ApplyBtn = styled.div`
border-radius:10px;
width:160px;
height:48px;
display:flex;
justify-content:center;
align-items:center;
color:${Color.mainColor};
font-weight:bold;
background:${Color.black};
cursor:pointer;
`


