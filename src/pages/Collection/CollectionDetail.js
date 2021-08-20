import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as permitActions } from "../../redux/modules/permit";
import { actionCreators as collectionActions } from "../../redux/modules/collection";

import styled from "styled-components";
import Color from "../../shared/Color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { history } from "../../redux/configStore";
import { makeStyles } from "@material-ui/core/styles";
import CollectionBookCard from "../../elements/CollectionBookCard";
import Comment from "../../components/Comment";
import EditModal from "../../modals/EditModal";


const useStyles = makeStyles((theme) => ({
    goback: {
        padding: "0px 20px",
        cursor:"pointer",
    },
    bookCard: {
        width: "90%",
        margin: "0 auto",
        marginBottom: "20px"
    },
    more:{
      position: "absolute",
      top: "12%",
      right: "10%",
      color: "white"
    }
  }));

const CollectionDetail = (props) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const collection_id = props.match.params.collectionid;
    const collection_detail = useSelector(state=> state.collection.collection_detail);
    const is_modal = useSelector(state=> state.permit.is_modal);
    const my_id = useSelector(state=> state.user.user.id);
    const {image, name, user,description, contents, liked_users, comments } = collection_detail;
    const defaultImg = "https://i.pinimg.com/564x/c0/79/44/c07944cff5a97bfa3274236cabee29c7.jpg";
    React.useEffect(()=>{
        dispatch(permitActions.showNav(false));
        dispatch(collectionActions.getCollectionDetailSV(collection_id))
    },[]);

    let is_my_collection = false;
    if(user?.id === my_id){
      is_my_collection = true;
    }
    const showEdit = ()=>{
      dispatch(permitActions.showModal(true));
    }
    return(
        <React.Fragment>
           {
            is_modal && <EditModal is_collection />
          }
          <ComponentWrapper>
            <Container>
            <Head>
                <ArrowBackIcon className={classes.goback}
                onClick = {()=>{history.goBack()}}
                />
            </Head>
                <CollectionOutter>
                     <Overlay/>
                    <Image url={image? image: defaultImg}>
                        <TitleBox>
                        <Title>{name}</Title>
                        <Nickname>{user?.nickname}</Nickname>
                        </TitleBox>
                        {
                          is_my_collection &&
                          <MoreHorizIcon className={classes.more}
                          onClick={()=>{
                            showEdit()
                            dispatch(collectionActions.getCollectionId(collection_id))
                          }}
                          />
                        }
                       
                    </Image>
                  <Wrapper>
                    <Description>{description}</Description>
                    <Wrapper>
                   {
                     contents?.map((content)=>{
                       return(<CollectionBookCard is_collection_detail {...content} key={content.id}/>)
                     })
                   }
                    </Wrapper>
                    <ReactionBar>
                        <Div><FavoriteBorderIcon className={classes.like} />좋아요 {liked_users?.length} 개</Div>
                         <Hr></Hr>
                         <Div>댓글 {comments?.length} 개</Div>
                     </ReactionBar>
                    </Wrapper>
                </CollectionOutter>
                <CommentList>
                  {
                    comments?.map((comment, idx)=>{
                      return(<Comment {...comment} key={idx}/>)
                    })
                  }
                </CommentList>
                <CommentInputBox>
                    <CommentInput/>
                    <CommentWriteButton>
                    게시
                    </CommentWriteButton>
            </CommentInputBox>
            </Container>
            </ComponentWrapper>
        </React.Fragment>
    )
}

const Head = styled.div`
width: 100%;
align-items: center;
display: flex;
padding: 16px 0px;
`;


// const Container = styled.div`
// width: 100vw;
// background: ${Color.mainColor};
// padding-bottom: 100px;

// @media ${(props) => props.theme.tablet} {
//   width: 100%;
// }

// @media ${(props) => props.theme.desktop} {
//   width: 100%;
// }

// `;

const ComponentWrapper = styled.div`
width:100vw;
height:auto;
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
box-sizing:border-box;

@media ${(props) => props.theme.tablet} {
    width: 100%;
  }
  
  @media ${(props) => props.theme.desktop} {
    width: 100%;
  }
`

const CollectionOutter = styled.div`
width: 90%;
border: 1px solid black;
border-radius: 12px;
margin: 0 auto;
margin: 16px;
`;

const Image = styled.div`
width: 100%;
padding-top: 100%;
background-image: url(${(props) => props.url});
background-size: cover;
border-radius: 12px 12px 0px 0px;
`;


const Overlay = styled.div`
width: 90%;
padding-top: 90%;
border-radius: 12px 12px 0px 0px;
background: black;
opacity: 30%;
position: absolute;
`

const TitleBox = styled.div`
position: absolute;
width: 80%;
top: 27%;
left: 10%;
height: auto;
`;
const Title = styled.p`
font-family: "Noto Serif KR", serif;
color: ${Color.white};
font-size: 21px;
`;

const Nickname = styled.p`
color: ${Color.white};
`;

const Wrapper = styled.div`
width: 90%;
margin: 0 auto;
`;

const Description = styled.div`
margin: 0 auto;
padding: 20px 0px;
`;
const ReactionBar = styled.div`
border: 1px solid #242121;
width: 90%;
height: 56px;
border-radius: 24px;
margin: 0 auto;
margin-top: 16px;
margin-bottom: 16px;
display: flex;
align-items: center;
`;
const Div = styled.div`
display: flex;
width: 100%;
height: 100%;
align-items: center;
justify-content: center;
`;
const Hr = styled.div`
width: 1px;
height: 100%;
background: black;

`;
const CommentList = styled.div`
`;

const CommentInputBox = styled.div`
  height: 72px;
  width: 100%;
  padding: 12px 16px;
  box-sizing: border-box;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #c3b4a2;
  background-color: ${Color.mainColor};
  position: fixed;
  bottom: 0;
  @media ${(props) => props.theme.tablet} {
    width: 420px;
}
  
@media ${(props) => props.theme.desktop} {
    width: 420px;
}
`;

const CommentInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 0 0 16px;
  font-size: 16px;
  background-color: ${Color.mainColor};
  border: 1px solid ${Color.fontBlack};
  border-radius: 12px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${(props) => props.color};
    font-family: 'Roboto', sans-serif;
    letter-spacing: -0.5px;
  }
`;

const CommentWriteButton = styled.div`
  cursor: pointer;
  font-size: 16px;
  color: ${Color.fontGray};
  position: absolute;
  right: 30px;
  font-weight: 700;
  height: 20px;
}
`;
export default CollectionDetail;