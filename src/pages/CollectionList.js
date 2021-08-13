//import 부분
import React, { useRef, useState } from "react";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as collectionActions } from "../redux/modules/collection";
import { actionCreators as permitActions } from "../redux/modules/permit";

import styled from "styled-components";
import Color from "../shared/Color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    arrow: {
      position: "absolute",
      left:"20px",
      top: "30px",
      color: Color.black,
    },
  }));


  const OneCollection = (props) => {

    return(
        <Box  onClick={()=>{history.push(`/collectiondetail/${props.id}`)}}>
            <Image url={props.image}/>
            <DescriptionBox>
                <Title>{props.name}</Title>
                <LikeComment>
                    좋아요 {props.liked_users.length}개 | 댓글 {props.comments.length}개
                </LikeComment>

            </DescriptionBox>
        </Box>
    )
}

OneCollection.defaultProps={
  image :"https://i.pinimg.com/564x/8d/13/4b/8d134bac5126c22c6cb3f19271b7c35e.jpg"
}

const CollectionList = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const type = props.match.params.type;

    const tag_collection_list = useSelector(state=> state.collection.tag_collection_list);
    const custom_collection_list = useSelector(state=> state.collection.custom_collection_list);


    React.useEffect(()=>{
      dispatch(permitActions.showNav(true));
      if(type==="tag"){
        dispatch(collectionActions.getTagCollectionsSV());
      }
      else if(type==="custom"){
        dispatch(collectionActions.getCustomCollectionsSV());
      }
    },[])


if(type==="tag"){
  return (
    <React.Fragment>
        <Wrapper>
            <Header>
                <ArrowBackIcon className={classes.arrow} onClick={()=>{history.goBack()}}/> 
                <HeaderText>태그 추천 컬렉션</HeaderText>
            </Header>
            {
              tag_collection_list?.map((collection)=>{
                return(<OneCollection key={collection.id} {...collection}/>)
              })
            }

        </Wrapper>


    </React.Fragment>
  );
}

if(type==="custom"){
  return (
    <React.Fragment>
        <Wrapper>
            <Header>
                <ArrowBackIcon className={classes.arrow} onClick={()=>{history.goBack()}}/> 
                <HeaderText>최신 컬렉션</HeaderText>
            </Header>
            {
              custom_collection_list?.map((collection)=>{
                return(<OneCollection key={collection.id} {...collection}/>)
              })
            }
        </Wrapper>


    </React.Fragment>
  );
}
  
};

//oneCollection
const Box = styled.div`
width:100%;
height:auto;
display:flex;
justify-content:flex-start;
box-sizing:border-box;
margin-bottom:10px;
`


const Image = styled.div`
width:80px;
height:80px;
background-image: url(${(props) => props.url});
border-radius:10px;
background-size: cover;
overflow:hidden;
margin-right:15px;
box-sizing:border-box;
`

const DescriptionBox = styled.div`
height:auto;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:flex-start;
`

const Title = styled.div`
width:auto;
height:auto;
font-size:14px;
font-weight:bold;
margin-bottom:10px;
font-family: "Noto Serif KR", serif;
`

const LikeComment = styled.div`
color:${Color.fontGray};
height:auto;
font-size:13px;
`
//collection list

const Wrapper = styled.div`
width:100vw;
display:flex;
flex-direction:column;
align-items:center;
justify-content:flex-start;
background: ${Color.mainColor};
padding:80px 15px 0px 15px;
padding-bottom: 50px;
box-sizing:border-box;
`

const Header = styled.div`
width: 100%;
height: 80px;
display:flex;
justify-content:center;
align-items:center;
background-color: ${Color.mainColor};
position:fixed;
top:0px;
font-family: "Noto Serif KR", serif;
`

const HeaderText = styled.div`
font-size:16px;
color:${Color.black};
`

export default CollectionList;