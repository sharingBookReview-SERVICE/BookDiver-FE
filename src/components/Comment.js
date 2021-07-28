//import 부분
import React from "react";
import styled from "styled-components"


const Comment = (props) =>{
  console.log(props)

    return(
        <React.Fragment>

            <CommentBox>

                <CommentTitleBox>
                    <UserName>{props.username}</UserName>
                    <CreatedAt>2021.07.24.21:04</CreatedAt>
                </CommentTitleBox>

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

const CommentTitleBox = styled.div`
display:flex;
align-items:center;
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
