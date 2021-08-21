//import 부분
import React from "react";
import styled from "styled-components";
import Color from "../shared/Color";
import { useDispatch } from "react-redux";
import { actionCreators as permitActions } from "../redux/modules/permit";


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

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color:rgba(0, 0, 0, 0.4);
  z-index: 99;
  position: fixed;
  cursor:pointer;

  @media ${(props) => props.theme.tablet} {
    width: 420px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 420px;
  }
`;

const Container = styled.div`
position:absolute;
top: 35%;
width: 85%;
border-radius: 12px;
justify-content: center;
align-items: center;
text-align: center;
border: solid 1px #eeeeee; 
background: ${Color.mainColor};
z-index: 100;

@media ${(props) => props.theme.mobile} {
  left: 7%;
}

@media ${(props) => props.theme.tablet} {
  width: 390px;
  margin-left:15px;
}

@media ${(props) => props.theme.desktop} {
  width: 390px;
  margin-left:15px;
}

`;

const Text = styled.p`
font-size: 15px;
line-height: 1.52;
text-align: center;
padding: 24px;
display: block;
letter-spacing: -0.42px;
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