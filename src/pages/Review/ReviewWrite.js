//import 부분
import React, { useRef, useState, useEffect, lazy, Suspense } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import imageCompression from "browser-image-compression"

import AddIcon from "@material-ui/icons/Add"
import Color from "../../shared/Color"

import { SelectBookCard, ArrowBack } from "../../components"
import { HashTagsInput, RecommandHashTags } from "../../elements"
import OpenUnsplashButton from "./element/OpenUnsplashButton"
import { Loading } from "../ETC"

import { actionCreators as reviewActions } from "../../redux/modules/review"
import { actionCreators as permitActions } from "../../redux/modules/permit"
import { actionCreators as bookActions } from "../../redux/modules/book"
import { actionCreators as uploadAcions } from "../../redux/modules/upload"
import { actionCreators as tagActions } from "../../redux/modules/tag"

const SelectBookModal = lazy(() => import("../../modals/SelectBookModal"))
const WriteCheckModal = lazy(() => import("../../modals/WriteCheckModal"))
const UnsplashModal = lazy(() => import("../../modals/UnsplashModal"))

const ReviewWrite = props => {
  const dispatch = useDispatch()

  //Permit check
  const is_modal = useSelector(state => state.permit.is_modal)
  const is_written = useSelector(state => state.permit.is_written)
  const is_loading = useSelector(state => state.permit.is_loading)
  const is_unsplash_modal = useSelector(state => state.permit.is_unsplash_modal)
  const is_unsplash_selected = useSelector(
    state => state.permit.is_unsplash_selected
  )

  //이미지 관련
  const is_preview = useSelector(state => state.upload.is_preview)
  const preview_url = useSelector(state => state.upload.img_url)
  const fileInput = React.useRef()

  //책 관련
  const books = useSelector(state => state.book.book)
  const reviewDetail = useSelector(state => state.review.review_detail)
  const {
    hashtags: editHashtags,
    quote: editQuote,
    content: editContent,
    book,
    image,
  } = reviewDetail
  const bookId = props.match.params?.bookid
  const reviewId = props.match.params?.reviewid
  const recommandTags = books?.topTags

  //글 작성 내용
  const quote = useRef()
  const content = useRef()
  const hashtags = useSelector(state => state.tag.tags)
  const [compressedImage, setCompressedImage] = useState(null)
  const [reviewCount, setReviewCount] = useState(0)
  const [quoteCount, setQuoteCount] = useState(0)

  //업로드 버튼 클릭하기
  const selectImage = () => {
    fileInput?.current.click()
  }

  //이미지 가져오기
  const getImage = event => {
    const reader = new FileReader()
    const file = event.target.files[0]
    actionImgCompress(file)

    reader.readAsDataURL(file)
    reader.onloadend = () => {
      dispatch(uploadAcions.showPreview(true))
      dispatch(uploadAcions.setPreview(reader.result))
    }
  }

  //이미지 압축하기
  const actionImgCompress = async fileSrc => {
    //압축할 옵션 내용
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }

    try {
      //imageCompression함수의 첫번째 인자는 파일, 두번째 인자는 옵션
      const compressedFile = await imageCompression(fileSrc, options)
      setCompressedImage(compressedFile)
    } catch (error) {
      console.log(error)
    }
  }

  //FormData로 변환하기
  const sendFormData = async image => {
    const formData = new FormData()
    //formData에 압축 이미지, 인용구,내용,해쉬태그 저장
    formData.append("quote", quote.current.value)
    formData.append("content", content.current.value)
    formData.append("hashtags", JSON.stringify(hashtags))

    if (is_unsplash_selected) {
      //언스플레시 사진을 선택했을 때
      formData.append("imageUrl", preview_url)
    } else {
      //개인사진 파일을 선택했을 때
      formData.append("image", image)
    }

    if (books.length === 0) {
      dispatch(permitActions.showCheckModal(true))
      return
    } else if (!image && !is_unsplash_selected) {
      dispatch(permitActions.showCheckModal(true))
      return
    }

    dispatch(permitActions.isLoading(true))
    await dispatch(reviewActions.addReviewSV(formData, books.isbn))
  }

  //이미지 보내기.
  const submit = async event => {
    event.preventDefault()

    await sendFormData(compressedImage)
  }

  //리뷰수정하기
  const editReview = () => {
    const review = {
      quote: quote.current.value,
      content: content.current.value,
      hashtags: hashtags,
    }
    dispatch(reviewActions.editReviewSV(bookId, reviewId, review))
  }

  useEffect(() => {
    dispatch(bookActions.resetSelectedBook())
    dispatch(permitActions.showModal(false))
    dispatch(permitActions.bookSelect(false))
    setTimeout(() => {
      dispatch(permitActions.isLoading(false))
    }, 600)

    if (reviewId && !is_loading) {
      dispatch(reviewActions.getDetailReviewSV(bookId, reviewId))
      dispatch(tagActions.getTag(editHashtags))
      quote.current.value = editQuote
      content.current.value = editContent
    }

    return () => {
      dispatch(uploadAcions.showPreview(false)) //화면에서 나갈 때는, 이미지 내려놓고 나가기
      dispatch(tagActions.getTag([])) //나갈때는 태그를 지우고 나가기
    }
  }, [
    editQuote,
    is_loading,
    dispatch,
    bookId,
    editContent,
    editHashtags,
    reviewId,
  ])

  useEffect(() => {
    dispatch(tagActions.setRecommandTag(recommandTags))
  }, [dispatch, recommandTags])

  if (is_loading) {
    return <Loading />
  }

  //수정하기
  if (reviewId) {
    return (
      <React.Fragment>
        <PostWriteBox>
          <PostHeader>
            <ArrowBack />
            <SubmitButton
              onClick={() => {
                editReview()
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
            <Text>인용구 작성</Text>
            <QuotesTextarea
              maxLength="300"
              ref={quote}
              placeholder="책에서 읽었던 인상깊은 구절을 작성해보세요"
            ></QuotesTextarea>
          </QuoteBox>

          <ReviewBox>
            <Text>리뷰작성</Text>
            <QuotesTextarea
              maxLength="300"
              ref={content}
              placeholder="자유로운 리뷰를 작성해보세요.(최대 300자)"
            ></QuotesTextarea>
          </ReviewBox>

          <HashTag>
            <Text>해시태그작성</Text>
            <HashTagsInput defaultValue={editHashtags} is_edit />
          </HashTag>
        </PostWriteBox>
      </React.Fragment>
    )
  }
  //React.memo

  const MemorizedHeader = React.memo(() => {
    return (
      <PostHeader>
        <ArrowBack />
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
    )
  })

  const MemorizedSelectBook = React.memo(() => {
    return (
      <BookChoice
        onClick={() => {
          dispatch(permitActions.showModal(true))
        }}
      >
        <AddIcon />
        <Text>리뷰할 책 선택하기</Text>
      </BookChoice>
    )
  })

  const MemorizedImageChoice = React.memo(() => {
    return (
      <ImageChoice style={{ height: "312px" }}>
        <OpenUnsplashButton />
        <ImageUpload
          onClick={() => {
            selectImage()
          }}
        >
          <AddIcon />
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
        </ImageUpload>
      </ImageChoice>
    )
  })

  //작성하기
  return (
    <React.Fragment>
      <Suspense fallback={Loading}>
        <WriteCheckModal is_written={is_written} />
        <SelectBookModal is_modal={is_modal} />
        <UnsplashModal is_unsplash_modal={is_unsplash_modal} />
      </Suspense>
      <PostWriteBox>
        <MemorizedHeader />
        {books.length === 0 ? (
          <MemorizedSelectBook />
        ) : (
          <SelectBookCard is_write_page />
        )}

        {is_preview ? (
          <ImageBox
            onClick={() => {
              selectImage()
            }}
          >
            <Image src={preview_url} />
          </ImageBox>
        ) : (
          <MemorizedImageChoice />
        )}

        <QuoteBox>
          <TextWrapper>
            <Text>인용구 작성</Text>
          </TextWrapper>

          <OutlineBox>
            <QuotesTextarea
              ref={quote}
              maxLength="300"
              onChange={e => setQuoteCount(e.target.value.length)}
              placeholder="책에서 읽었던 인상깊은 구절을 작성해보세요"
            ></QuotesTextarea>
            <InputSpan>
              <InputI></InputI>
            </InputSpan>
          </OutlineBox>

          <CountBox>{quoteCount}/300</CountBox>
        </QuoteBox>

        <ReviewBox>
          <TextWrapper>
            <Text>리뷰작성</Text>
            <Notice>*필수작성</Notice>
          </TextWrapper>

          <OutlineBox>
            <QuotesTextarea
              ref={content}
              maxLength="300"
              onChange={e => setReviewCount(e.target.value.length)}
              placeholder="자유로운 리뷰를 작성해보세요. (최대 300자)"
            ></QuotesTextarea>
            <InputSpan>
              <InputI></InputI>
            </InputSpan>
          </OutlineBox>

          <CountBox>{reviewCount}/300</CountBox>
        </ReviewBox>

        <HashTag>
          <TextWrapper>
            <Text>해시태그작성</Text>
          </TextWrapper>

          <HashTagsInput />
        </HashTag>

        {recommandTags ? (
          <RecommandHashTagBox>
            <TextWrapper>
              <Text>이 책에 대해 다른 사람들이 사용한 해시태그</Text>
            </TextWrapper>

            <RecommandHashTags />
          </RecommandHashTagBox>
        ) : (
          ""
        )}
      </PostWriteBox>
    </React.Fragment>
  )
}

export default ReviewWrite

const ImageUpload = styled.div`
  width: auto;
  height: auto;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: content;
  align-items: center;
`

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  padding: 0px 8px 10px 8px;
  box-sizing: border-box;
`

const Text = styled.div`
  font-size: 14px;
  letter-spacing: -0.7px;
  text-align: center;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  color: ${Color.fontblack};
`

const Text1 = styled.div`
  color: ${Color.fontGray};
`

const UploadForm = styled.form``

const SubmitButton = styled.button`
  width: 80px;
  height: 40px;
  font-size: 15px;
  font-weight: bold;
  margin: 0 5px 0 0;
  background-color: ${Color.mainColor};
  box-sizing: border-box;
  border: none;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  :hover {
    border-radius: 10px;
    background-color: ${Color.line};
  }
`

const ImageBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d7d3d3;
`

const Image = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
`

const PostWriteBox = styled.div`
  width: 100%;
  height: auto;
  padding: 70px 0 50px 0;
  background-color: ${Color.mainColor};
  box-sizing: border-box;
  position: absolute;
`

const PostHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${Color.mainColor};
  position: fixed;
  top: 0px;
  padding: 0px 10px 0px 0px;
  box-sizing: border-box;

  @media ${props => props.theme.tablet} {
    width: 420px;
  }

  @media ${props => props.theme.desktop} {
    width: 420px;
  }
`

const BookChoice = styled.div`
  width: 100%;
  height: 112px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.3vh;
  border-top: 1px solid #d7d3d3;
  font-weight: bolder;
  color: ${Color.fontgray};
  background-color: ${Color.mainColor};
  font-size: 0.9em;
  box-sizing: border-box;
  cursor: pointer;
`

const ImageChoice = styled.div`
  width: 100%;
  height: 112px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.3vh;
  border-top: 1px solid #d7d3d3;
  border-bottom: 1px solid #d7d3d3;
  font-weight: bolder;
  color: ${Color.fontgray};
  background-color: ${Color.mainColor};
  font-size: 0.9em;
  box-sizing: border-box;
  position: relative;
`

const QuoteBox = styled.div`
  width: 92%;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 18px auto auto auto;
  background-color: ${Color.mainColor};
  box-sizing: border-box;
  position: relative;
`

const OutlineBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const QuotesTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  font-family: "Noto Sans KR", sans-serif;
  line-height: 1.43;
  letter-spacing: -0.28px;
  text-align: left;
  padding: 7px;
  box-sizing: border-box;
  border: 1px solid rgba(37, 33, 33, 0.2);
  background-color: ${Color.mainColor};
  resize: none;
  font-size: 15px;
  ::placeholder {
    color: ${Color.fontgray};
    padding: 4px 0 0 6px;
    font-size: 15px;
  }
  :focus {
    outline: none;
    ~ span:after {
      width: 100%;
      transition: 0.2s;
      transition-delay: 0.6s;
    }
    ~ span:before {
      width: 100%;
      transition: 0.2s;
      transition-delay: 0.6s;
    }
    ~ span:after {
      transition-delay: 0.2s;
    }
    ~ span i:after {
      height: 100%;
      transition: 0.2s;
    }
    ~ span i:before {
      height: 100%;
      transition: 0.2s;
    }
    ~ span i:after {
      transition-delay: 0.4s;
    }
  }
`

const InputSpan = styled.span`
  :before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 2px;
    background-color: ${Color.gray5};
    transition: 0.2s;
    transition-delay: 0.2s;
  }
  :after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 2px;
    background-color: ${Color.gray5};
    transition: 0.2s;
    transition-delay: 0.2s;
  }
  :after {
    top: auto;
    bottom: 0;
    right: auto;
    left: 0;
    transition-delay: 0.6s;
  }
`

const InputI = styled.i`
  :after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 0;
    background-color: ${Color.gray5};
    transition: 0.2s;
  }
  :before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 0;
    background-color: ${Color.gray5};
    transition: 0.2s;
  }
  :after {
    left: auto;
    right: 0;
    top: auto;
    bottom: 0;
    transition-delay: 0.4s;
  }
`

const ReviewBox = styled.div`
  width: 92%;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 18px auto auto auto;
  background-color: ${Color.mainColor};
  box-sizing: border-box;
  position: relative;
`

const Notice = styled.div`
  font-size: 14px;
`

const HashTag = styled.div`
  width: 100%;
  height: auto;
  padding: 16px 17px 16px 17px;
  background-color: ${Color.mainColor};
  box-sizing: border-box;
`

const RecommandHashTagBox = styled.div`
  width: 100%;
  height: auto;
  padding: 0px 16px;
  background-color: ${Color.mainColor};
  box-sizing: border-box;
`

const Upload = styled.input`
  display: none;
`

const CountBox = styled.div`
  font-size: 11px;
  color: ${Color.fontGray};
  position: absolute;
  bottom: -15px;
  right: 0px;
`
