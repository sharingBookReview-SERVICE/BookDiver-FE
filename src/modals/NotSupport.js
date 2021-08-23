//import 부분
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Color from "../shared/Color";
import { actionCreators as permitActions } from "../redux/modules/permit";

const WriteCheckModal = (props) =>{
  //dispatch와 변수들
  const dispatch = useDispatch();
 


    return(
        <React.Fragment>
       
         <Container>
            <Text>
            아직 지원되지 않는 서비스입니다 <br/>
            곧 출시될 버전에서 만나요
            </Text>
            
            <BtnBox>
                <Hr/>
                <Btn onClick={()=>{
                dispatch(permitActions.showNotSupport(false))
                }}>확인했어요</Btn>
            </BtnBox>
         </Container>
        
         <Overlay
          onClick={() => {
              dispatch(permitActions.showNotSupport(false))
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
  cursor:pointer;

  @media ${(props) => props.theme.tablet} {
    width: 420px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 420px;
  }
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
position: fixed;
top: 38%;

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
cursor:pointer;
`;

export default WriteCheckModal;