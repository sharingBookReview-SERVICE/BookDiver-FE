//import 부분
import React, { useRef, useState } from "react";
import styled from "styled-components";
import add_button from "../img/add_button.png";
import left_arrow from "../img/left_arrow.png";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";
import imageCompression from "browser-image-compression";
import instance from "../shared/Request";

import SelectBookModal from "../modals/SelectBookModal";
import SelectBookCard from "../components/SelectBookCard";
import HashTagsInput from "../elements/HashTagsInput";

import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as permitActions } from "../redux/modules/permit";
import { actionCreators as bookActions } from "../redux/modules/book";
import { actionCreators as uploadAcions } from "../redux/modules/upload";

const ReviewWrite = (props) => {
  const dispatch = useDispatch();

  //모달 여부
  const is_modal = useSelector((state) => state.permit.is_modal);

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
  } = reviewDetail;
  const bookId = props.match.params?.bookid;
  const reviewId = props.match.params?.reviewid;

  //글 작성 내용
  const quote = useRef();
  const content = useRef();
  const [hashtags, setHashTags] = useState([]);
  const [image, setImage] = useState();
  const [compressedImage, setCompressedImage] = useState(null);

  //HashTag컴포넌트에서 데이터를 받아올 함수
  const getTags = (tags) => {
    setHashTags(tags);
  };

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

  //FormData로 변환하기
  const sendFormData = async (image) => {
    const formData = new FormData();
    //formData에 압축 이미지, 인용구,내용,해쉬태그 저장
    formData.append("image", image);
    formData.append("quote", quote.current.value);
    formData.append("content", content.current.value);
    formData.append("hashtags", JSON.stringify(hashtags));

    if (books.length === 0) {
      window.alert("책을 선택해주세요!");
      return;
    } else if (!image) {
      window.alert("이미지를 선택해주세요!");
      return;
    }

    await dispatch(reviewActions.addReviewSV(formData, books.isbn));
  };

  //이미지 보내기.
  const submit = async (event) => {
    event.preventDefault();

    await sendFormData(compressedImage);
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

  React.useEffect(() => {
    dispatch(bookActions.resetSelectedBook());
    dispatch(permitActions.showModal(false));
    dispatch(permitActions.bookSelect(false));

    if (reviewId) {
      dispatch(reviewActions.getDetailReviewSV(bookId, reviewId));
    }

    //화면에서 나갈 때는, 이미지 내려놓고 나가기
    return () => {
      dispatch(uploadAcions.showPreview(false));
    };
  }, []);

  //리뷰수정하기
  const editReview = () => {
    const review = {
      quote: quote.current.value,
      content: content.current.value,
      hashtags: hashtags,
    };
    dispatch(reviewActions.editReviewSV(bookId, reviewId, review));
  };

  if (reviewId) {
    return (
      <React.Fragment>
        {/* 책 선택 모달 열기 */}
        {is_modal && <SelectBookModal />}
        <PostWriteBox>
          <StartPost></StartPost>
          <PostHeader>
            <LeftArrow
              src={left_arrow}
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

          {is_preview ? (
            <ImageBox>
              <Image src={preview_url} />
            </ImageBox>
          ) : (
            <BookChoice
              style={{ height: "35vh" }}
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
                인상깊었던 사진을 올려보세요
              </Text>
            </BookChoice>
          )}

          <QuoteBox>
            <Text>인용구 작성하기</Text>
            <QuotesTextarea
              ref={quote}
              defaultValue={editQuote}
              placeholder="책에서 읽었던 인상깊은 구절을 작성해보세요"
            ></QuotesTextarea>
          </QuoteBox>
          <ReviewBox>
            <Text>리뷰작성</Text>
            <QuotesTextarea
              ref={content}
              defaultValue={editContent}
              placeholder="자유로운 리뷰를 작성해보세요.(최대 100자)"
            ></QuotesTextarea>
          </ReviewBox>
          <HashTag>
            <Text>해시태그작성</Text>
            <HashTagsInput
              getTags={getTags}
              defaultValue={editHashtags}
              is_edit
            />
          </HashTag>
        </PostWriteBox>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {/* 책 선택 모달 열기 */}
      {is_modal && <SelectBookModal />}
      <PostWriteBox>
        <StartPost></StartPost>
        <PostHeader>
          <LeftArrow
            src={left_arrow}
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

            <SubmitButton type="submit">게시하기</SubmitButton>
          </UploadForm>
        </PostHeader>

        {/* 책을 선택했으면 선택한 책 표시하기 */}
        {books.length === 0 ? (
          <BookChoice
            onClick={() => {
              dispatch(permitActions.showModal(true));
            }}
          >
            <img src={add_button} alt="add btn" />
            <Text>리뷰할 책 선택하기</Text>
          </BookChoice>
        ) : (
          <SelectBookCard />
        )}

        {is_preview ? (
          <ImageBox>
            <Image src={preview_url} />
          </ImageBox>
        ) : (
          <BookChoice
            style={{ height: "35%" }}
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
              인상깊었던 사진을 올려보세요
            </Text>
          </BookChoice>
        )}

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
          <HashTagsInput getTags={getTags} />
        </HashTag>
      </PostWriteBox>
    </React.Fragment>
  );
};

export default ReviewWrite;

const UploadForm = styled.form``;

const SubmitButton = styled.button`
  width: 20vw;
  height: 5vh;
  flex-grow: 0;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.43;
  float: right;
  display: inline-block;
  margin: 0.2em 0.2em 0 0;
  color: #9e9e9e;
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
  padding: 20px 0 60px 0;
  background-color: #ffffff;
  box-sizing: border-box;
`;

const Text = styled.text`
  font-size: 16px;
  text-align: left;
  letter-spacing: -0.28px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StartPost = styled.div`
  background-color: #f5f5f5;
  width: 100vw;
  height: 3vh;
  margin-top: -3vh;
`;

const PostHeader = styled.div`
  width: 100vw;
  height: 4vh;
  background-color: #ffffff;
  //border: 1px solid black;
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
  height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.3vh;
  margin: auto auto 4% auto;
  border-radius: 12px;
  //border: solid 1px var(--system-temp-30);
  border: 1px solid #efeeee;
  background-color: #ffffff;
  font-weight: bolder;
  color: #1168d7;
  font-size: 0.9em;
  box-sizing: border-box;
  cursor: pointer;
`;

const QuoteBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px;
  background-color: #ffffff;
  box-sizing: border-box;
`;

const QuotesTextarea = styled.textarea`
  width: 98%;
  height: 100%;
  font-family: NotoSansKR;
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: -0.28px;
  text-align: left;
  padding: 7px 0 0 7px;
  border-radius: 5px;
  border: none;
  background-color: #f5f5f5;
  resize: none;
  &::placeholder {
    color: #a8a8a8;
  }
`;

const ReviewBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px;
  background-color: #ffffff;
  box-sizing: border-box;
`;

const HashTag = styled.div`
  width: 100%;
  height: auto;
  padding: 1em;
  // padding-bottom: 140px;
  background-color: #ffffff;
  box-sizing: border-box;
`;

const HashInput = styled.input`
  width: 90vw;
  height: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-top: 1vh;
  padding: 1vh 1vw 1vh 1vw;
  border-radius: 10px;
  background-color: #f5f5f5;
  border: none;
  box-sizing: border-box;
  &::placeholder {
    color: #a8a8a8;
  }
`;

const Upload = styled.input`
  display: none;
`;
