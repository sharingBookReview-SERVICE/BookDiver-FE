import React from "react";
import styled from "styled-components";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { history } from "../redux/configStore";
import { makeStyles } from "@material-ui/core/styles";
import Color from "../shared/Color";
import AddIcon from '@material-ui/icons/Add';
import { actionCreators as permitActions } from "../redux/modules/permit";
import { actionCreators as collectionActions } from "../redux/modules/collection";
import SelectBookModal from "../modals/SelectBookModal";
import SelectBookCard from "../components/SelectBookCard";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    goback: {
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
    addicon: {
        fontSize: "40px"
    },
    moreaddicon: {
        fontSize: "30px"
    },
  
  }));

const AddBook = (props) =>{
    const classes = useStyles();
    const dispatch = useDispatch();

    const showSelectBookModal = ()=>{
        dispatch(permitActions.showModal(true));
    }
    return(
        <AddBookBox onClick={()=>{
            showSelectBookModal()
            }}>
        <AddIcon className={classes.addicon}/>
        <Notice className={classes.font}>추가할 책 선택하기</Notice>
        </AddBookBox>
    )
}

const MakeCollection = (props) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const is_modal = useSelector(state=> state.permit.is_modal);
    const collection_book_list = useSelector(state=> state.collection.selected_Books);

    const addMoreBtn = ()=>{
        return(
            <AddBook/>
        )
    }

    return(
        <Container>
            {
                is_modal && <SelectBookModal is_make_collection />
            }
            <Head>
                <ArrowBackIcon className={classes.goback}
                onClick = {()=>{history.goBack()}}
                />
                <Text>게시하기</Text>
            </Head>
            <Wrapper>
                <Label>
                    컬렉션 제목
                </Label>
                <TitleInput
                    placeholder="예) 카페에서 가볍게 읽는 자기계발 에세이 모음"                
                ></TitleInput>
                <ImageSelect>
                    <AddIcon className={classes.addicon}/>
                    <Notice className={classes.font}>컬렉션 배경 사진 업로드</Notice>
                    <Notice >컬렉션에 어울리는 사진을 올려보세요</Notice>
                </ImageSelect>
                <Label>
                    컬렉션 설명
                </Label>
                <DescTextarea
                placeholder="컬렉션에 대한 설명을 작성해주세요."></DescTextarea>
                {
                   collection_book_list.length===0? 
                   <AddBook/> 
                   :
                   collection_book_list.map((book)=>{
                       return(<SelectBookCard key={book.isbn} {...book}/>)
                   })
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
`;
const Head = styled.div`
width: 100%;
height: 10%;
align-items: center;
display: flex;
position: fixed;
background: ${Color.mainColor};
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
padding-top: 16px;
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
`;
export default MakeCollection;