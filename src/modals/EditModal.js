//import 부분
import React from "react";
import styled from "styled-components";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Color from "../shared/Color";
import { makeStyles } from "@material-ui/core/styles";

import { actionCreators as permitActions } from "../redux/modules/permit";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as collectionActions } from "../redux/modules/collection";
import { useDispatch, useSelector } from "react-redux";
import {history} from "../redux/configStore"

const useStyles = makeStyles((theme) => ({
  icon: {
    margin: "0px 5px 0px 0px"
  },
}));



const EditModal = (props) =>{
    const dispatch = useDispatch();
    const classes = useStyles();
    const bookId = useSelector(state => state.review.feed_id.bookId)
    const reviewId = useSelector(state => state.review.feed_id.reviewId)
    const collectionId = useSelector(state=> state.collection.collection_id)

    if(props.is_collection){
      return(
        <React.Fragment>

            <Container>
              <Btn
               onClick={()=>{
                history.push(`/editCollection/${collectionId}`)
              }}
              ><CreateOutlinedIcon className={classes.icon}/>컬렉션 수정</Btn>
          
              <Btn
                onClick={()=>{
                  dispatch(collectionActions.deleteCollectionSV())
                  dispatch(permitActions.showModal(false))
                }}
              
              ><DeleteOutlineOutlinedIcon className={classes.icon} />컬렉션 삭제</Btn>
            </Container>

            <Overlay 
            onClick={()=>{
            dispatch(permitActions.showModal(false))
            }}>
            </Overlay>
        </React.Fragment>
    )
    }
    else{
      return(
        <React.Fragment>

            <Container>
              <Btn onClick={() => {
                history.push(`/postwrite/${bookId}/${reviewId}`)
              }}><CreateOutlinedIcon style={{margin: "0px 5px 0px 0px"}}/>게시물 수정</Btn>
              {/* <Btn><BookmarkBorderOutlinedIcon style={{margin: "0px 5px 0px 0px"}}/>게시물 저장</Btn>
              <Btn><LockOutlinedIcon style={{margin: "0px 5px 0px 0px"}}/>게시물 비공개로 전환</Btn> */}
              <Btn onClick={() => { 
                dispatch(reviewActions.deleteReviewSV())
                dispatch(permitActions.showEditModal(false))
              }
              }><DeleteOutlineOutlinedIcon style={{margin: "0px 5px 0px 0px"}} />게시물 삭제</Btn>
            </Container>

            <Overlay 
            onClick={()=>{
            dispatch(permitActions.showEditModal(false))
            }}>
            </Overlay>

        </React.Fragment>
    )
    }
}


const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color:black;
  z-index: 9999;
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
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
border: solid 1px #eeeeee; 
background: ${Color.mainColor};
z-index: 10000;
position:fixed;
border-radius: 12px;

@media ${(props) => props.theme.mobile} {
  left:5%;
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
width: 288px;
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

export default EditModal;