//import 부분
import React from "react";

import styled from "styled-components";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Color from "../shared/Color";

import { actionCreators as permitActions } from "../redux/modules/permit";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch } from "react-redux";

import { CommonContainer, CommonOverlay } from "../shared/styles/modal/CommonModal";


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

         <Container is_show={props.is_modal}>
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
            is_show={props.is_modal} 
            onClick={()=>{
            dispatch(permitActions.showModal(false));
            }}>
            </Overlay>
        </React.Fragment>
    )
}



const Overlay = styled(CommonOverlay)`
`;

const Container = styled(CommonContainer)`
`;

const Btn = styled.div`
width: 90%;
height: 56px;
display: flex;
line-height: 56px;
align-items: center;
font-weight: 500;
font-size: 14px;
cursor:pointer;
&:hover {
    color: red;
}
`;

export default CommentModal;