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
import { actionCreators as uploadActions } from "../../redux/modules/upload";

import SelectBookModal from "../../modals/SelectBookModal";
import CollectionBookCard from "../../elements/CollectionBookCard";
import AddBook from "./AddBook";


import imageCompression from "browser-image-compression";

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
    addicon: {
        fontSize: "40px"
    },
    moreaddicon: {
        fontSize: "30px"
    },
  
  }));





//컬렉션 만들기 페이지
const MakeCollection = (props) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    
    //책 선택
    const is_modal = useSelector(state=> state.permit.is_modal);
    const selected_Books = useSelector(state=> state.collection.selected_Books);
    const more_select = useSelector(state=> state.collection.more_select);

    //이미지
    const is_preview = useSelector((state) => state.upload.is_preview);
    const preview_url = useSelector((state) => state.upload.img_url);
    const fileInput = React.useRef();
    const [compressedImage, setCompressedImage] = useState(null);

   
    
    useEffect(()=>{
        dispatch(collectionActions.resetSelected())
        dispatch(permitActions.showModal(false));
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
        if(selected_Books.length<10){
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


     //FormData로 변환하기
    const sendFormData = async (image) => {
        const formData = new FormData();
        //formData에 압축 이미지, 인용구,내용,해쉬태그 저장
        formData.append("image", image);
        formData.append("name", title.current.value);
        formData.append("description", description.current.value);
        formData.append("contents", JSON.stringify(selected_Books));

    
        if (selected_Books.length === 0) {
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
                    maxLength="20"     
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
                   selected_Books.length===0? 
                   <AddBook/> 
                   :
                   selected_Books.map((book)=>{
                       return(<CollectionBookCard key={book.isbn} {...book}/>)
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


export default MakeCollection;