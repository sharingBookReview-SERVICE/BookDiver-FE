//import 부분
import React from "react";
import { history } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as collectionActions } from "../../redux/modules/collection";
import { actionCreators as permitActions } from "../../redux/modules/permit";

import styled from "styled-components";
import Color from "../../shared/Color";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";

import {EditModal} from "../../modals";
import MakeButton from "./component/MakeButton";
import {ArrowBack} from "../../components/index"

const useStyles = makeStyles((theme) => ({
  
    serifFont: {
      fontFamily: "Noto Serif KR"
    },
    goback:{
      cursor:"pointer",
    }
  }));


  const OneCollection = (props) => {
    const dispatch = useDispatch();
    const user_id = useSelector(state=> state.user.user._id);
    const is_login = useSelector(state=> state.user.is_login);

    let is_my_collection= false;
    if(props.user===user_id){
      is_my_collection = true;
    }
 
    
    const showEdit = ()=>{
      dispatch(permitActions.showModal(true));
    }
    return(
     
        <Box>
            <DescWrapper>
              <Image url={props.image} 
              onClick={()=>{
                is_login?
                history.push(`/collectiondetail/${props.id}`)
                : history.push('/login')
              }}/>

              <DescriptionBox onClick={()=>{  
                is_login?
                history.push(`/collectiondetail/${props.id}`)
                : history.push('/login')}}>
                  <Title>{props.name}</Title>
                  <LikeComment>
                      좋아요 {props.liked_users.length}개 | 댓글 {props.comments.length}개
                  </LikeComment>
              </DescriptionBox>
            </DescWrapper>
            {
              is_my_collection && 
              <MoreHorizIcon 
              onClick={()=>{
                showEdit()
                dispatch(collectionActions.getCollectionId(props.id))
              }}
              />
            }

            
        </Box>
    )
}

OneCollection.defaultProps={
  image :"https://i.pinimg.com/564x/c0/79/44/c07944cff5a97bfa3274236cabee29c7.jpg"
}

const CollectionList = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const is_modal = useSelector(state=> state.permit.is_modal);

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
          <Container>
            <Header>
                <ArrowBack/>
                <MakeButton/>
            </Header>
            <TitleBox>
              <HeaderText h1 className={classes.serifFont}>태그 추천 컬렉션</HeaderText>
              <HeaderText>작성된 리뷰 태그에 관련된 컬렉션을 모아봤어요.</HeaderText>
            </TitleBox>
            {
              tag_collection_list?.map((collection)=>{
                return(<OneCollection key={collection.id} {...collection}/>)
              })
            }
          </Container>
        </Wrapper>


    </React.Fragment>
  );
}

if(type==="custom"){
  return (
    <React.Fragment>
        {
            is_modal && <EditModal is_collection />
          }
        <Wrapper>
          <Container>
             <Header>
                <ArrowBack/>
            </Header>
            <TitleBox>
              <HeaderText h1 className={classes.serifFont} >최신 컬렉션</HeaderText>
              <HeaderText>다이버들이 만든 따끈따끈한 북컬렉션</HeaderText>
            </TitleBox>
            {
              custom_collection_list?.map((collection)=>{
                return(<OneCollection key={collection.id} {...collection}/>)
              })
            }
          </Container>
        </Wrapper>


    </React.Fragment>
  );
}
  
};

//oneCollection
const Box = styled.div`
cursor:pointer;
width:100%;
height:auto;
display:flex;
justify-content:space-between;
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

const DescWrapper = styled.div`
width:90%:
height:auto;
display:flex;
padding:0px 20px;
`

const DescriptionBox = styled.div`
height:auto;
width: auto;
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

const Wrapper = styled.div`
width:100vw;
height:auto;
display:flex;
background: ${Color.mainColor};
box-sizing:border-box;

@media ${(props) => props.theme.tablet} {
  width: 100%;
}

@media ${(props) => props.theme.desktop} {
  width: 100%;
}
`

const Container = styled.div`
width:100vw;
height:auto;
min-height:100vh;
flex-direction:column;
align-items:center;
justify-content:flex-start;
padding:65px 30px 0px 0px;
box-sizing:border-box;

@media ${(props) => props.theme.tablet} {
    width: 100%;
  }
  
  @media ${(props) => props.theme.desktop} {
    width: 100%;
  }
`


const Header = styled.div`
width: 90%;
height: 56px;
display:flex;
background-color: ${Color.mainColor};
position:fixed;
box-sizing:border-box;
padding:0px 20px;
top:0px;
justify-content: space-between;
align-items: center;
@media ${(props) => props.theme.tablet} {
  width: 420px;
}

@media ${(props) => props.theme.desktop} {
  width: 420px;
}

`

const TitleBox = styled.div`
width:auto;
height:auto;
padding:0px 20px;
`

const HeaderText = styled.div`
color:${Color.black};
font-size: ${(props) => props.h1? "18px": "14px"};
width: 100%;
margin-bottom: ${(props) => props.h1? "": "16px"};
color:  ${(props) => props.h1? "": "#9a9090"};
`


export default CollectionList;