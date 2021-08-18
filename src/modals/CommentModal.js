//import 부분
import React from "react";

import styled from "styled-components";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Color from "../shared/Color";

import { actionCreators as permitActions } from "../redux/modules/permit";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch } from "react-redux";

const CommentModal = (props) =>{
    const dispatch = useDispatch();

    const deleteComment = () => {
        dispatch(commentActions.deleteCommentSV())
    }

    const getEditId = () => {
        //getEditCommentId함수 내부에서 commentId를 editId로 저장하는 작업을 진행함.
        dispatch(commentActions.getEditCommentId())
    }

    return(
        <React.Fragment>

         <Container>
            <Btn 
            onClick={()=> {
                deleteComment()
            }}><DeleteOutlineOutlinedIcon style={{margin: "0px 5px 0px 0px"}}/>댓글 삭제</Btn>
            <Btn
            onClick={()=>{
                getEditId()
            }}>
                <CreateOutlinedIcon style={{margin: "0px 5px 0px 0px"}}/>
            댓글 수정</Btn>
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
  opacity:0.4;
  cursor:pointer;

  @media ${(props) => props.theme.tablet} {
    width: 420px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 420px;
  }

`;

const Container = styled.div`
top:40%;

width: 80vw;
border-radius: 12px;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
border: solid 1px #eeeeee; 
background: ${Color.mainColor};
z-index: 100;
position:fixed;


@media ${(props) => props.theme.mobile} {
    left:10%;
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

const Btn = styled.div`
width: 90%;
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

export default CommentModal;