//import 부분
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Color from "../shared/Color";
import { actionCreators as permitActions } from "../redux/modules/permit";

import { CommonContainer, CommonOverlay, CommonText } from "../shared/styles/modal/CommonModal";

const WriteCheckModal = (props) =>{
  //dispatch와 변수들
  const dispatch = useDispatch();
 


    return(
        <React.Fragment>
       
         <Container is_show={props.is_written}>
            <Text>
            게시물을 올리려면 <br/>
            도서선택과 내용은 필수로 작성해주세요.
            </Text>
            
            <BtnBox>
                <Hr/>
                <Btn onClick={()=>{
                dispatch(permitActions.showCheckModal(false))
                }}>확인했어요</Btn>
            </BtnBox>
         </Container>
        
         <Overlay
          is_show={props.is_written}
          onClick={() => {
              dispatch(permitActions.showCheckModal(false))
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

export default React.memo(WriteCheckModal);