import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/core/styles";
import Color from "../../shared/Color";
import ArrowBack from "../../components/ArrowBack";

import { actionCreators as permitActions } from "../../redux/modules/permit";
import { actionCreators as collectionActions } from "../../redux/modules/collection";
import { actionCreators as uploadActions } from "../../redux/modules/upload";


import {SelectBookModal} from "../../modals";
import {CollectionBookCard} from "../../elements";
import AddBook from "./component/AddBook";


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
        fontWeight:"bold",
        fontSize:"16px"

    },
    notice : {
        color:Color.hashTagFont,
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

    //React.memo

    const MemorizedHeader = React.memo(()=>{
        return(
            <Head>
                <ArrowBack/>
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
        )
    })
//주석
    const MemorizedImageChoice = React.memo(()=>{
        return(
            <ImageSelect onClick={()=>{selectImage();}}>
            <AddIcon className={classes.addicon}/>
            <Notice className={classes.font}>컬렉션 배경 사진 업로드</Notice>
            <Notice className={classes.notice} >컬렉션에 어울리는 사진을 올려보세요</Notice>
        </ImageSelect>
        )
    })

    const MemorizedTitle = React.memo(() => {
        return(
            <InputWrapper>
            <Label>
                컬렉션 제목
            </Label>
            <InputBox>
                <TitleInput
                    placeholder="예) 카페에서 가볍게 읽는 자기계발 에세이 모음"
                    maxLength="20"     
                    ref={title}           
                ></TitleInput>
                <InputSpan>
                    <InputI>
                    </InputI>
                </InputSpan>
            </InputBox>

            </InputWrapper>
        )
    })

    const MemorizedDesc = React.memo(() => {
        return(
            <InputWrapper>
            <Label>
                컬렉션 설명
            </Label>
            <InputBox style={{height:"108px"}}>
                <DescTextarea
                placeholder="컬렉션에 대한 설명을 작성해주세요."
                ref={description}    
                >  
                </DescTextarea>
                <InputSpan>
                    <InputI>
                    </InputI>
                </InputSpan>
            </InputBox>

        </InputWrapper>
        )
    })
    

    return(
        <Container>
            {
                is_modal && <SelectBookModal is_make_collection is_modal/>
            }
            <MemorizedHeader/>
            <Wrapper>
                <MemorizedTitle/>
                    {
                        is_preview?
                        <ImageBox onClick={() => {selectImage();}}>
                          <Image src={preview_url} />
                        </ImageBox>
                        :
                       <MemorizedImageChoice/>
                    }
                <MemorizedDesc/>
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
                    <MoreText >책 더 추가하기</MoreText>
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
height: 56px;
align-items: center;
display: flex;
position: fixed;
background: ${Color.mainColor};
justify-content: space-between;
padding-left:5px;
box-sizing:border-box;

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
width: 80px;
height: 40px;
  font-size: 15px;
  font-weight: bold;
  margin: 0 10px 0 0;
  background-color: ${Color.mainColor};
  box-sizing: border-box;
  border: none;
  cursor:pointer;
  transition:0.5s ease-in-out;
  :hover{
      background-color:${Color.line};
      border-radius:10px;
  }
`;

const Wrapper = styled.div`
margin: 0 auto;
padding-top: 100px;
`;
const InputWrapper = styled.div`
width:85%;
margin: 0 auto;
padding-bottom:16px;
`;
const Label = styled.div`
font-weight: bold;
margin-bottom: 8px;
`;
const TitleInput = styled.input`
width: 100%;
height: 68px;
border: 1px solid ${Color.bgColor};
box-sizing: border-box;
background: ${Color.mainColor};
padding: 0px 10px;
:focus{
    outline:none;
}
:focus {
    outline: none;
   ~ span:after{width: 100%; transition: 0.2s; transition-delay: 0.6s;}
   ~ span:before{width: 100%; transition: 0.2s; transition-delay: 0.6s;}
   ~ span:after{transition-delay: 0.2s;}
   ~ span i:after{height: 100%; transition: 0.2s;}
   ~ span i:before{height: 100%; transition: 0.2s;}
   ~ span i:after{transition-delay: 0.4s;}
  }
`;
const ImageSelect = styled.div`
width: 100%;
border-top: 1px solid ${Color.bgColor};
border-bottom: 1px solid ${Color.bgColor};
box-sizing: border-box;
height: 352px;
display: flex;
justify-content: center;
align-items: center;
margin: 16px 0px;
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
border: 1px solid ${Color.bgColor};
height: 108px;
box-sizing: border-box;
font-family: 'Noto Sans KR', sans-serif;
background: ${Color.mainColor};
padding: 10px;
resize:none;
:focus {
    outline: none;
   ~ span:after{width: 100%; transition: 0.2s; transition-delay: 0.6s;}
   ~ span:before{width: 100%; transition: 0.2s; transition-delay: 0.6s;}
   ~ span:after{transition-delay: 0.2s;}
   ~ span i:after{height: 100%; transition: 0.2s;}
   ~ span i:before{height: 100%; transition: 0.2s;}
   ~ span i:after{transition-delay: 0.4s;}
  }
`;

const MoreAddbtn = styled.div`
width: 100%;
height: 48px;
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
cursor:pointer;
color: ${Color.hashTagFont};
`;

const MoreText = styled.div`
font-weight:600;
margin-bottom:3px;
`

const InputBox = styled.div`
width:auto;
height:auto;
position:relative;
`

const InputSpan = styled.span`
:before{content: ""; position: absolute; top: 0; right: 0; width: 0; height: 2px; background-color: ${Color.gray5}; transition: 0.2s; transition-delay: 0.2s;}
:after{content: ""; position: absolute; top: 0; right: 0; width: 0; height: 2px; background-color: ${Color.gray5}; transition: 0.2s; transition-delay: 0.2s;}
:after{top: auto; bottom: 0; right: auto; left: 0; transition-delay: 0.6s;}
`

const InputI = styled.i`
:after{content: ""; position: absolute; top: 0; left: 0; width: 2px; height: 0; background-color: ${Color.gray5}; transition: 0.2s;}
:before{content: ""; position: absolute; top: 0; left: 0; width: 2px; height: 0; background-color: ${Color.gray5}; transition: 0.2s;}
:after{left: auto; right: 0; top: auto; bottom: 0; transition-delay: 0.4s;}
` 


export default MakeCollection;