import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { useSelector, useDispatch } from "react-redux";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";
import Color from "../../shared/Color";
import AddIcon from '@material-ui/icons/Add';

import { actionCreators as permitActions } from "../../redux/modules/permit";
import { actionCreators as collectionActions } from "../../redux/modules/collection";


import SelectBookModal from "../../modals/SelectBookModal";
import CollectionBookCard from "../../elements/CollectionBookCard";
import AddBook from "./AddBook";


//스타일 정의
const useStyles = makeStyles((theme) => ({
    goback: {
        cursor:"pointer",
        padding: "0px 20px"
    },
    icon: {
        position: "absolute",
        right: "20px"
    },
    font: {
        fontFamily: "'Noto Serif KR', serif",
        fontWeight:"bold",
        fontSize:"1.1rem"

    },
    moreaddicon: {
        fontSize: "30px"
    },
  
  }));


  


const EditCollection = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const collection_id = props.match.params.collectionid;
    const collection_detail = useSelector(state=> state.collection.collection_detail);
    const selected_Books = useSelector(state=> state.collection.selected_Books);
    const more_select = useSelector(state=> state.collection.more_select);
    
    const is_modal = useSelector(state=> state.permit.is_modal);
    console.log("반영")
    
    const _name = useRef(collection_detail?.name);
    const _description = useRef(collection_detail?.description);

     //책 더 추가하기
     const addMoreBtn = ()=>{
        if(selected_Books.length<10){
            dispatch(collectionActions.moreSelect(true))
        }
        else{
            window.alert("최대 10개까지 추가할 수 있습니다!")
        }   
    }

    const editCollection = ()=>{
        const collection = {
            name: _name.current.value,
            description: _description.current.value,
            contents: selected_Books
        }
        console.log(collection)
        dispatch(collectionActions.editCollectionDetailSV(collection_id, collection))
    }

//detail 가져오기
   useEffect(()=>{
    dispatch(permitActions.showModal(false));
    dispatch(collectionActions.isMakeCollection(true));
    dispatch(collectionActions.getCollectionDetailSV(collection_id));
    
   },[]);

//원래 있던 content리덕스에 넣기
   useEffect(()=>{
     _name.current.value = collection_detail?.name;
     _description.current.value = collection_detail?.description;

    },[collection_detail])
  
    return(
        <Container>
            {
                is_modal && <SelectBookModal />
            }
        <Head>
            <ArrowBackIcon className={classes.goback}
            onClick = {()=>{history.goBack()}}
            />
            <SubmitButton 
            onClick={() => {editCollection()}}
            >게시하기
            </SubmitButton>
        </Head>
        <Wrapper>
            <Label>
                컬렉션 제목
            </Label>
            <TitleInput
               ref={_name}
            ></TitleInput>
            
            <ImageBox >
                <Image src={collection_detail?.image} />
            </ImageBox>
              
            
            <Label>
                컬렉션 설명
            </Label>
            <DescTextarea
                ref={_description}
            ></DescTextarea>
           
              {
                  selected_Books?.map((book)=>{
                      return(<CollectionBookCard is_edit_collection {...book} key={book.isbn}/>)
                  })
              }
             {
                  more_select &&    <AddBook/> 
                }
            <MoreAddbtn onClick={()=>{addMoreBtn()}}>
                <Notice className={classes.font}>책 더 추가하기</Notice>
                <AddIcon className={classes.moreaddicon}/>
            </MoreAddbtn>
        </Wrapper>
    </Container>
    )
}

const Container = styled.div`
background: ${Color.mainColor};
width: 100vw;
height: auto;
padding-bottom: 100px;
overflow: scroll;

@media ${(props) => props.theme.tablet} {
    width: 100%;
}
  
@media ${(props) => props.theme.desktop} {
    width: 100%;
}
`;
const Head = styled.div`
width: 100%;
height: 10%;
align-items: center;
display: flex;
position: fixed;
background: ${Color.mainColor};
justify-content: space-between;
@media ${(props) => props.theme.tablet} {
    width: 420px;
}
  
@media ${(props) => props.theme.desktop} {
    width: 420px;
}
`;

const UploadForm = styled.form``;

const Upload = styled.input`
  display: none;
`;
const SubmitButton = styled.button`
  width: auto;
  height: 30px;
  font-size: 15px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  // float: right;
  // display: inline-block;
  margin: 0 10px 0 0;
  background-color: ${Color.mainColor};
  box-sizing: border-box;
  border: none;
  cursor:pointer;
`;
const Text = styled.div`
width: 80%;
text-align: right;
`;
const Wrapper = styled.div`
width: 85%;
margin: 0 auto;
padding-top: 100px;
`;
const Label = styled.div`
font-family: 'Noto Serif KR', serif;
font-weight: bold;
margin-bottom: 8px;
`;
const TitleInput = styled.input`
width: 100%;
height: 68px;
border-radius: 12px;
border: 1px solid black;
box-sizing: border-box;
margin-bottom: 16px;
background: ${Color.mainColor};
padding: 0px 10px;
:focus{
    outline:none;
}
`;
const ImageSelect = styled.div`
width: 100%;
border: 1px solid black;
border-radius: 12px;
box-sizing: border-box;
height: 352px;
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 16px;
flex-direction: column;
cursor:pointer;
`;

const ImageBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
`;

const Notice = styled.div`
`;
const DescTextarea = styled.textarea`
width: 100%;
border: 1px solid black;
height: 108px;
box-sizing: border-box;
border-radius: 12px;
background: ${Color.mainColor};
margin-bottom: 16px;
padding: 10px;
font-family: 'Noto Sans KR', sans-serif;
resize:none;
:focus{
    outline:none;
}
`;
const AddBookBox= styled.div`
width: 100%;
border-radius: 12px;
height: 112px;
border: 1px solid black;
box-sizing: border-box;
margin-bottom: 16px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
cursor:pointer;
`;
const MoreAddbtn = styled.div`
width: 100%;
height: 48px;
box-sizing: border-box;
border-radius: 12px;
border: 1px solid black;
display: flex;
justify-content: center;
align-items: center;
cursor:pointer;
`;


export default EditCollection;