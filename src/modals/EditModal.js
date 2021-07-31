//import 부분
import React, { useState } from "react";
import styled from "styled-components";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import { actionCreators as permitActions } from "../redux/modules/permit";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { useDispatch } from "react-redux";


const EditModal = (props) =>{
    const dispatch = useDispatch();


    return(
        <React.Fragment>

            <Container>
              <Btn><CreateOutlinedIcon style={{margin: "0px 5px 0px 0px"}}/>게시물 수정</Btn>
              <Btn><BookmarkBorderOutlinedIcon style={{margin: "0px 5px 0px 0px"}}/>게시물 저장</Btn>
              <Btn onClick={() => { 
                dispatch(reviewActions.deleteReviewSV())}
              }><DeleteOutlineOutlinedIcon style={{margin: "0px 5px 0px 0px"}} />게시물 삭제</Btn>
            </Container>

            <Overlay 
            onClick={()=>{
            dispatch(permitActions.showModal(false));
            }}>
            </Overlay>
        </React.Fragment>
    )
}

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color:black;
  z-index: 99;
  position: fixed;
  opacity:0.5;
`;

const Container = styled.div`
top:38%;
left:10%;
width: 80vw;
border-radius: 12px;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
border: solid 1px #eeeeee; 
background: #fff;
z-index: 100;
position:fixed;
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
export default EditModal;