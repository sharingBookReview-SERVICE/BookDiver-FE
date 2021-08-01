//import 부분
import React from "react";
import styled from "styled-components"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import {useDispatch} from "react-redux";
import {actionCreators as permitActions} from "../redux/modules/permit";
import {actionCreators as commentActions} from "../redux/modules/comment"

const Comment = (props) =>{
    const dispatch = useDispatch();

    const showCommentModal = () => {
        dispatch(permitActions.showModal(true))
    }
    const getCommentId = () => {
        dispatch(commentActions.getCommentId())
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
                            getCommentId()
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

export default Comment;
