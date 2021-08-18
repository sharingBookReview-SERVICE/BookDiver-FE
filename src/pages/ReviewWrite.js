//import 부분
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";
import styled from "styled-components";
import imageCompression from "browser-image-compression";

import add_button from "../img/add_button.png";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Color from "../shared/Color";
import { makeStyles } from "@material-ui/core/styles";
import SelectBookModal from "../modals/SelectBookModal";
import WriteCheckModal from "../modals/WriteCheckModal"
import SelectBookCard from "../components/SelectBookCard";
import HashTagsInput from "../elements/HashTagsInput";
import RecommandHashTags from '../elements/RecommandHashTags';
import Loading from "../pages/ETC/Loading"

import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as permitActions } from "../redux/modules/permit";
import { actionCreators as bookActions } from "../redux/modules/book";
import { actionCreators as uploadAcions } from "../redux/modules/upload";
import { actionCreators as tagActions } from "../redux/modules/tag";

const useStyles = makeStyles((theme) => ({
  arrow: {
    cursor:"pointer",
    margin:"0px 0px 0px 20px",
  },
}));


const ReviewWrite = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  //Permit check
  const is_modal = useSelector((state) => state.permit.is_modal);
  const is_written = useSelector((state) => state.permit.is_written);
  const is_loading = useSelector((state) => state.permit.is_loading)

  //이미지 관련
  const is_preview = useSelector((state) => state.upload.is_preview);
  const preview_url = useSelector((state) => state.upload.img_url);
  const fileInput = React.useRef();

  //책 관련
  const books = useSelector((state) => state.book.book);
  const reviewDetail = useSelector((state) => state.review.review_detail);
  const {
    hashtags: editHashtags,
    quote: editQuote,
    content: editContent,
    book,
    image,
  } = reviewDetail;
  const bookId = props.match.params?.bookid;
  const reviewId = props.match.params?.reviewid;
  const recommandTags = books?.topTags


  //글 작성 내용
  const quote = useRef();
  const content = useRef();
  const hashtags = useSelector(state => state.tag.tags)
  const [compressedImage, setCompressedImage] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [quoteCount, setQuoteCount] = useState(0);

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
      dispatch(uploadAcions.showPreview(true));
      dispatch(uploadAcions.setPreview(reader.result));
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
    formData.append("quote", quote.current.value);
    formData.append("content", content.current.value);
    formData.append("hashtags", JSON.stringify(hashtags));

    if (books.length === 0) {
      dispatch(permitActions.showCheckModal(true))
      return;
    } else if (!image) {
      dispatch(permitActions.showCheckModal(true))
      return;
    }
    
    dispatch(permitActions.isLoading(true))
    await dispatch(reviewActions.addReviewSV(formData, books.isbn));
  };

  //이미지 보내기.
  const submit = async (event) => {
    event.preventDefault();

    await sendFormData(compressedImage);
  };

  //리뷰수정하기
  const editReview = () => {
    const review = {
      quote: quote.current.value,
      content: content.current.value,
      hashtags: hashtags,
    };
    dispatch(reviewActions.editReviewSV(bookId, reviewId, review));
  };
  

  useEffect(() => {
    dispatch(bookActions.resetSelectedBook());
    dispatch(permitActions.showModal(false));
    dispatch(permitActions.bookSelect(false));
    
    if (reviewId) {
      dispatch(reviewActions.getDetailReviewSV(bookId, reviewId));
      dispatch(tagActions.getTag(editHashtags));
      quote.current.value = editQuote;
      content.current.value = editContent;
    }


    return () => {
      dispatch(uploadAcions.showPreview(false)); //화면에서 나갈 때는, 이미지 내려놓고 나가기
      dispatch(tagActions.getTag([])) //나갈때는 태그를 지우고 나가기
    };
  }, [editQuote]);

  const test = () => {
    dispatch(tagActions.setRecommandTag(recommandTags))
  }

  useEffect(() => {
    dispatch(tagActions.setRecommandTag(recommandTags))
  },[recommandTags])

  if(is_loading) {
    return(<Loading/>)
  }


  //수정하기
  if (reviewId) {
    return (
      <React.Fragment>
        <PostWriteBox>
          <PostHeader>
            <ArrowBackIcon
              className={classes.arrow}
              onClick={() => {
                history.goBack();
              }}
            />
            <SubmitButton
              onClick={() => {
                editReview();
              }}
            >
              수정하기
            </SubmitButton>
          </PostHeader>

          <SelectBookCard {...book} is_editReviewPage />

          <ImageBox>
            <Image src={image} />
          </ImageBox>

          <QuoteBox>
            <Text>인용구 작성하기</Text>
            <QuotesTextarea
              ref={quote}
              placeholder="책에서 읽었던 인상깊은 구절을 작성해보세요"
            ></QuotesTextarea>
          </QuoteBox>

          <ReviewBox>
            <Text>리뷰작성</Text>
            <QuotesTextarea
              ref={content}
              placeholder="자유로운 리뷰를 작성해보세요.(최대 100자)"
            ></QuotesTextarea>
          </ReviewBox>

          <HashTag>
            <Text>해시태그작성</Text>
            <HashTagsInput
              defaultValue={editHashtags}
              is_edit
            />
          </HashTag>

        </PostWriteBox>
      </React.Fragment>
    );
  }

//작성하기
  return (
    <React.Fragment>
      {is_written && <WriteCheckModal/>}
      {is_modal && <SelectBookModal />}
      <PostWriteBox>
        <PostHeader>
          <ArrowBackIcon
            className={classes.arrow}
            onClick={() => {
              history.goBack();
            }}
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
            style={{
              cursor:"pointer",
              backGroundColor: Color.mainColor,
              color: Color.fontgray,
            }}>게시하기</SubmitButton>
          </UploadForm>
        </PostHeader>

        {books.length === 0 ? (
          <BookChoice
            onClick={() => {
              dispatch(permitActions.showModal(true));
            }}
          >
            <img src={add_button} alt="add btn" />
            <Text >리뷰할 책 선택하기</Text>
          </BookChoice>
        ) : (
          <SelectBookCard />
        )}

        {is_preview ? (
          <ImageBox
          onClick={() => {
            console.log("클릭")
            selectImage();
          }}>
            <Image src={preview_url} />
          </ImageBox>
        ) : (
          <BookChoice
            style={{ height: "312px" }}
            onClick={() => {
              selectImage();
            }}
          >
            <img src={add_button} alt="add btn" />
            <Text>책 사진 업로드</Text>
            <Text
              style={{
                color: "#9e9e9e",
                fontWeight: "normal",
                fontSize: "1em",
              }}
            >
              <Text1>인상깊었던 페이지 사진을 올려보세요</Text1>
            </Text>
          </BookChoice>
        )}

        <QuoteBox>
          <TextWrapper>
            <Text>인용구 작성하기</Text>
          </TextWrapper>

          <QuotesTextarea
            ref={quote}
            maxLength="300"
            onChange={e => setQuoteCount(e.target.value.length)}
            placeholder="책에서 읽었던 인상깊은 구절을 작성해보세요"
          ></QuotesTextarea>

          <CountBox>{quoteCount}/300</CountBox>
        </QuoteBox>

        <ReviewBox>
          <TextWrapper>
            <Text>리뷰작성</Text>
            <Notice>*필수작성</Notice>
          </TextWrapper>

          <QuotesTextarea
            ref={content}
            maxLength="100"
            onChange={e => setReviewCount(e.target.value.length)}
            placeholder="자유로운 리뷰를 작성해보세요. (최대 100자)"
          ></QuotesTextarea>

          <CountBox>{reviewCount}/100</CountBox>
        </ReviewBox>

        <HashTag>
          <TextWrapper>
            <Text>해시태그작성</Text>
          </TextWrapper>

          <HashTagsInput/>
        </HashTag>
        
        {recommandTags ? 
        <RecommandHashTagBox>
          <TextWrapper>
            <Text>추천 해시태그</Text>
          </TextWrapper>

          <RecommandHashTags />
        </RecommandHashTagBox> : ""}

      </PostWriteBox>
    </React.Fragment>
  );
};

export default ReviewWrite;

const TextWrapper = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
width:100%;
height:auto;
margin-bottom:7px;
padding:0px 8px;
box-sizing:border-box;
`

const Text = styled.div`
  font-size: 14px;
  letter-spacing: -0.7px;
  text-align: center;
  font-weight: bold;
  font-family: 'Noto Serif KR', serif;
  display:flex;
  justify-content:flex-start;
  color: ${Color.fontblack};
`;

const Text1 = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  color: ${Color.fontGray};
`;

const UploadForm = styled.form``;

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

const PostWriteBox = styled.div`
  width: 100%;
  height: auto;
  padding: 70px 0 30px 0;
  background-color: ${Color.mainColor};
  box-sizing: border-box;
`;

const PostHeader = styled.div`
  width: 100%;
  height: 60px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  background-color: ${Color.mainColor};
  position:fixed;
  top:0px;

  @media ${(props) => props.theme.tablet} {
    width: 420px;
  }
  
  @media ${(props) => props.theme.desktop} {
    width: 420px;
  }

`;

const LeftArrow = styled.img`
  width: 10vw;
  height: 3vh;
  flex-grow: 0;
  object-fit: contain;
  float: left;
`;

const BookChoice = styled.div`
  width: 90%;
  height: 112px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.3vh;
  margin: auto auto 16px auto;
  border-radius: 12px;
  border: 1px solid #252121;
  font-weight: bolder;
  color: ${Color.fontgray};
  background-color: ${Color.mainColor};
  font-size: 0.9em;
  box-sizing: border-box;
  cursor: pointer;
`;

const QuoteBox = styled.div`
  width: 95%;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 36px auto auto auto;
  background-color: ${Color.mainColor};
  box-sizing: border-box;
  position:relative;
`;

const QuotesTextarea = styled.textarea`
  width: 95%;
  height: 250px;
  margin: auto;
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.43;
  letter-spacing: -0.28px;
  text-align: left;
  padding: 7px;
  box-sizing:border-box;
  border-radius: 12px;
  border: 1px solid rgba(37, 33, 33, 0.2);
  background-color: ${Color.mainColor};
  resize: none;
  font-size:15px;
  ::placeholder {
    color: ${Color.fontgray};
    padding: 4px 0 0 6px;
    font-size:15px;
  }
  :focus {
    outline:none;
  }
  
`;

const ReviewBox = styled.div`
  width: 95%;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 36px auto auto auto;
  background-color: ${Color.mainColor};
  box-sizing: border-box;
  position:relative;
`;

const Notice = styled.div`
  font-size:14px;
`;

const HashTag = styled.div`
  width: 100%;
  height: auto;
  padding: 16px;
  background-color: ${Color.mainColor};
  box-sizing: border-box;
`;

const RecommandHashTagBox = styled.div`
width: 100%;
height: auto;
padding: 0px 16px;
background-color: ${Color.mainColor};
box-sizing: border-box;
`

const Upload = styled.input`
  display: none;
`;

const CountBox = styled.div`
  font-size:13px;
  color:${Color.fontGray};
  position:absolute;
  bottom:5px;
  right:15px;
`