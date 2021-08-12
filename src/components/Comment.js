//import 부분
import React, {useEffect, useState} from "react";
import styled from "styled-components"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import {useDispatch, useSelector} from "react-redux";
import {actionCreators as permitActions} from "../redux/modules/permit";
import {actionCreators as commentActions} from "../redux/modules/comment"
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";

import Color from "../shared/Color";

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
                <CommentSizeBox>

                <CommentUserBox>
                    <UserLeftBox>
                        <UserName>{props.user.nickname}</UserName>
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
                </CommentSizeBox>
            </CommentBox>

        </React.Fragment>
        )
    }

    return(
        <React.Fragment>

            <CommentBox>
                <CommentSizeBox>
                <CommentUserBox>
                    <UserLeftBox>
                        <UserName>
                        {props.user.nickname}
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
                    {/* <LikeBox>♡ 좋아요 0개</LikeBox> */}
                </CommentSizeBox>
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
  padding: 0 24px 0 24px;
  box-sizing:border-box;
  line-height: 1.43;
  letter-spacing: -0.28px;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: ${Color.mainColor};
`;

const CommentSizeBox = styled.div`

  width: 100%;
  min-height: 130px;
  height: auto;
  margin: auto;

`;

const CommentUserBox = styled.div`
  display: flex;
  align-items: center;
  margin: 7px auto auto 24px;
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
  margin-right: 30px;
`;

const UserName = styled.p`
font-weight:bold;
margin-right:8px;
`;

const CreatedAt = styled.p`
font-size:12px;
color: ${Color.fontgray}
`;

const Content = styled.p`
  margin: 0px auto auto 24px;
`;
const LikeBox = styled.div`
width: 35%;
  font-size: 15px;
  margin: 13px auto auto 24px;
`;

const EditComplete = styled.div`
font-weight:bold;
color: ${Color.fontblack};
`;

const EditBox = styled.div`
width: 100%;
box-sizing: border-box;
padding-right:24px;
`;

const EditTextarea = styled.textarea`
width: 85%;
height: auto;
  min-height: 96px;
font-size: 14px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1.43;
letter-spacing: -0.28px;
text-align: left;
  margin: 0px auto auto 24px;
border-radius: 12px;
border: 1px solid ${Color.fontblack};
  background-color: ${Color.mainColor};
resize:none;
:focus {
    outline:none;
}
`

export default Comment;
