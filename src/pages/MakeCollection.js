import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { useSelector, useDispatch } from "react-redux";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";
import Color from "../shared/Color";
import AddIcon from '@material-ui/icons/Add';

import { actionCreators as permitActions } from "../redux/modules/permit";
import { actionCreators as collectionActions } from "../redux/modules/collection";
import { actionCreators as uploadActions } from "../redux/modules/upload";

import SelectBookModal from "../modals/SelectBookModal";
import SelectBookCard from "../components/SelectBookCard";


import imageCompression from "browser-image-compression";

//스타일 정의
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


//책 추가하기 컴포넌트
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

//책 카드 컴포넌트
export const BookCard = (props) =>{
    const dispatch = useDispatch();
    const [book_description, setBookDescription] = useState("");
    const bookTitle = props.title?.split("(")[0]
    const content = {
        isbn: props.isbn,
        book_description: book_description,
    }
    return(
        <BookInfoWrapper>
            <BookInfoBox>
                <BookImg url={props.image}/>
                <BookDescBox>
                <BookTitle >{bookTitle}</BookTitle>
                    <BookWriter>{props.author} 저</BookWriter>
                </BookDescBox>
            </BookInfoBox>
            <Recommend 
            placeholder="책 마다 추천이유를 적어보세요(최대30자)"
            maxLength="30"
            onChange={(e)=>{setBookDescription(e.target.value)}}
            onBlur={(e) => {
                dispatch(collectionActions.addCollection_content(content))
              }}
           
            >
            </Recommend>
        </BookInfoWrapper>
    )
}

//컬렉션 만들기 페이지
const MakeCollection = (props) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    
    //책 선택
    const is_modal = useSelector(state=> state.permit.is_modal);
    const collection_book_list = useSelector(state=> state.collection.selected_Books);
    const more_select = useSelector(state=> state.collection.more_select);

    //이미지
    const is_preview = useSelector((state) => state.upload.is_preview);
    const preview_url = useSelector((state) => state.upload.img_url);
    const fileInput = React.useRef();
    const [compressedImage, setCompressedImage] = useState(null);

    useEffect(()=>{
        dispatch(collectionActions.isMakeCollection(true));
        dispatch(permitActions.bookSelect(false));
        return ()=>{
            dispatch(collectionActions.resetSelected())
            dispatch(uploadActions.showPreview(false));
            dispatch(collectionActions.isMakeCollection(false));
        }
    },[]);

    //컬렉션 작성
    const title = useRef();
    const description = useRef();



    //책 더 추가하기
    const addMoreBtn = ()=>{
        if(collection_book_list.length<10){
            dispatch(collectionActions.moreSelect(true))
        }
        else{
            window.alert("최대 10개까지 추가할 수 있습니다!")
        }   
    }

  //업로드 버튼 클릭하기
    const selectImage = () => {
        fileInput?.current.click();
      };

    //이미지 가져오기
    const getImage = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        actionImgCompress(file);

        reader.readAsDataURL(file);
        reader.onloadend = () => {
        dispatch(uploadActions.showPreview(true));
        dispatch(uploadActions.setPreview(reader.result));
        };
    };
    //이미지 압축하기
    const actionImgCompress = async (fileSrc) => {
        //압축할 옵션 내용
        const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        };

        try {
        //imageCompression함수의 첫번째 인자는 파일, 두번째 인자는 옵션
        const compressedFile = await imageCompression(fileSrc, options);
        setCompressedImage(compressedFile);
        } catch (error) {
        console.log(error);
        }
    };

    const contents = useSelector(state=> state.collection.collection_contents);

     //FormData로 변환하기
    const sendFormData = async (image) => {
        const formData = new FormData();
        //formData에 압축 이미지, 인용구,내용,해쉬태그 저장
        formData.append("image", image);
        formData.append("name", title.current.value);
        formData.append("description", description.current.value);
        formData.append("contents", JSON.stringify(contents));

        if (collection_book_list.length === 0) {
            dispatch(permitActions.showCheckModal(true))
            return;
          } else if (!image) {
            dispatch(permitActions.showCheckModal(true))
            return;
          }

        await dispatch(collectionActions.addCollectionSV(formData));
     
    };
      //이미지 보내기.
    const submit = async (event) => {
        event.preventDefault();
        await sendFormData(compressedImage);
    };

    return(
        <Container>
            {
                is_modal && <SelectBookModal is_make_collection />
            }
            <Head>
                <ArrowBackIcon className={classes.goback}
                onClick = {()=>{history.goBack()}}
                />
                 <UploadForm onSubmit={submit}>
                    <Upload
                    type="file"
                    ref={fileInput}
                    onChange={getImage}
                    accept="image/*"
                    />

                    <SubmitButton 
                    type="submit"
                  >게시하기</SubmitButton>
                </UploadForm>

                {/* <Text>게시하기</Text> */}
            </Head>
            <Wrapper>
                <Label>
                    컬렉션 제목
                </Label>
                <TitleInput
                    placeholder="예) 카페에서 가볍게 읽는 자기계발 에세이 모음"
                    maxLength="30"     
                    ref={title}           
                ></TitleInput>
                
                    {
                        is_preview?
                        <ImageBox onClick={() => {selectImage();}}>
                          <Image src={preview_url} />
                        </ImageBox>
                        :
                        <ImageSelect onClick={()=>{selectImage();}}>
                            <AddIcon className={classes.addicon}/>
                            <Notice className={classes.font}>컬렉션 배경 사진 업로드</Notice>
                            <Notice >컬렉션에 어울리는 사진을 올려보세요</Notice>
                        </ImageSelect>
                    }
                
                <Label>
                    컬렉션 설명
                </Label>
                <DescTextarea
                placeholder="컬렉션에 대한 설명을 작성해주세요."
                ref={description}    
                ></DescTextarea>
                {
                   collection_book_list.length===0? 
                   <AddBook/> 
                   :
                   collection_book_list.map((book)=>{
                       return(<BookCard key={book.isbn} {...book}/>)
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
`;
const Head = styled.div`
width: 100%;
height: 10%;
align-items: center;
display: flex;
position: fixed;
background: ${Color.mainColor};
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
  margin: 0 5px 0 0;
  background-color: ${Color.mainColor};
  box-sizing: border-box;
  border: none;
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


//BookCard
const BookInfoWrapper = styled.div`
width: 100%;
box-sizing: border-box;
border-radius: 12px;
border: solid 1px ${Color.secondColor};
margin-bottom: 20px;
`
const BookInfoBox = styled.div`
width: 100%;
height: 112px;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
gap: 12px;
padding: 16px;
box-sizing: border-box;

`

const BookImg = styled.div`
  width: 60px;
  height: 80px;
  border-radius: 4px;
  background-color: #c4c4c4;
  background-image: url(${(props) => props.url ? props.url : " "});
  background-size: cover;
  box-sizing: border-box;
`

const BookDescBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 70%;
`

const BookTitle = styled.div`
  width: 100%;
  height: auto;
  color: ${Color.fontBlack};
  font-size: 14px;
  letter-spacing: -0.28px;
  line-height: 1.43;
  margin: 0 0 5px 2px;
  text-align: left;
  font-weight: bolder;
  font-family: 'Noto Serif KR', serif;
`

const BookWriter = styled.div`
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: -0.28px;
  text-align: left;
  color: ${Color.fontGray};
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.43;
  margin: 0px 0px 5px 2px;
`

const Recommend = styled.input`
height: 36px;
width: 90%;
border-radius: 8px;
background: ${Color.hashtag};
box-sizing: border-box;
margin: 0 auto;
margin-left: 5%;
border: none;
margin-bottom: 20px;
padding-left: 10px;
`;

export default MakeCollection;