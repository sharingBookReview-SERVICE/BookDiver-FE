//import 부분
import React, {useEffect, useState} from "react";
import styled from "styled-components"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import {useDispatch, useSelector} from "react-redux";
import {actionCreators as permitActions} from "../redux/modules/permit";
import {actionCreators as commentActions} from "../redux/modules/comment"
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";

const Comment = (props) =>{
    const dispatch = useDispatch();
    const editId = useSelector(state => state.comment.edit_id)
    const commentId = props._id
    const [editContent, setEditContent] = useState("");

    const getCommentId = () => {
        dispatch(commentActions.getCommentId(commentId))
    }
    
    const showCommentModal = () => {
        dispatch(permitActions.showModal(true))
        getCommentId() // 모달을 띄우면서,edit혹은 delete를 위한 commentId를 받아오기 
    }

    const onChangeComment = (e) => {
        setEditContent(e.target.value)
    }    

    const editComment = (content) => {
        dispatch(commentActions.editCommentSv(content))
    }
    
    if(editId === commentId){
        return(
            <React.Fragment>

            <CommentBox>

                <CommentUserBox>
                    <UserLeftBox>
                        <UserName>
                            닉네임
                        </UserName>
                        <CreatedAt>
                            {props.created_at}
                        </CreatedAt>
                    </UserLeftBox>

                    <UserRightBox>
                        <EditComplete 
                            onClick={()=>{
                            editComment(editContent)
                        }}>수정완료
                        </EditComplete>
                    </UserRightBox>
                </CommentUserBox>
                <EditBox>
                    <EditTextarea 
                    defaultValue={props.content} 
                    onChange={onChangeComment}
                    />
                </EditBox>

            </CommentBox>

        </React.Fragment>
        )
    }

    return(
        <React.Fragment>

            <CommentBox>

                <CommentUserBox>
                    <UserLeftBox>
                        <UserName>
                            닉네임
                        </UserName>
                        <CreatedAt>
                            {props.created_at}
                        </CreatedAt>
                    </UserLeftBox>

                    <UserRightBox>
                        <MoreHorizIcon 
                        style={{color: "#9e9e9e"}} 
                        onClick = {() => {
                            showCommentModal()
                        }}/>
                    </UserRightBox>
                </CommentUserBox>

                <Content>{props.content}</Content>

            </CommentBox>

        </React.Fragment>
    )
}


const CommentBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 24px 24px 0px 24px;
  margin-left:24px;
  box-sizing:border-box;
  background-color:#fff;
`

const CommentUserBox = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px 0px 0px;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`

const UserLeftBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
`

const UserRightBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
`

const UserName = styled.p`
font-size:14px;
font-weight:bold;
margin-right:8px;
`

const CreatedAt = styled.p`
font-size:10px;
color:#9e9e9e;
opacity:0.5;
`

const Content = styled.p`
font-size:14px;
margin:0px;
`

const EditComplete = styled.div`
font-size:14px;
font-weight:bold;
color:#1168d7;
`

const EditBox = styled.div`
width: 100%;
box-sizing: border-box;
padding-right:24px;
`

const EditTextarea = styled.textarea`
width: 100%;
height: auto;
font-family: NotoSansKR;
font-size: 14px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1.43;
letter-spacing: -0.28px;
text-align: left;
padding: 0.7em 0 0 0.5em;
border-radius: 5px;
border: none;
background-color: #f5f5f5;
resize:none;
:focus {
    outline:none;
}
`

export default Comment;
