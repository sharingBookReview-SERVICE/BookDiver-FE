//import 부분
import React, { useState } from "react";
import styled from "styled-components";
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';


const FollowModal = (props) =>{
  //dispatch와 변수들

//useEffect
React.useEffect(()=>{
},[]);



//뷰

    return(
        <React.Fragment>
          <Outter>
         <Container>
            <Btn><PersonAddOutlinedIcon style={{margin: "0px 5px 0px 0px"}}/>‘닉네임닉네임’님 팔로우하기</Btn>
            <Btn><BookmarkBorderOutlinedIcon style={{margin: "0px 5px 0px 0px"}}/>게시물 저장</Btn>
            <Btn><ReportProblemOutlinedIcon style={{margin: "0px 5px 0px 0px"}}/>게시물 신고하기</Btn>
          
         </Container>
         </Outter>
        </React.Fragment>
    )
}



//styled components
const Outter = styled.div`
width: 100vw;
height: 100vh;
background-color:rgba(0, 0, 0, 0.5);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
const Container = styled.div`
width: 328px;
border-radius: 12px;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
border: solid 1px #eeeeee; 
background: #fff;
`;
const Btn = styled.div`
width: 288px;
height: 56px;
display: flex;
line-height: 56px;
align-items: center;
font-weight: 500;
font-size: 14px;
&:hover {
    color: red;
}
`;
export default FollowModal;