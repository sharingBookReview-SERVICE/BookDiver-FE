import React, { useState } from "react"
import { history } from "../../redux/configStore"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as permitActions } from "../../redux/modules/permit"
import { actionCreators as collectionActions } from "../../redux/modules/collection"

import "../../shared/Transition.css"

import styled from "styled-components"
import Color from "../../shared/Color"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import { makeStyles } from "@material-ui/core/styles"
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye"
//컴포넌트
import { CollectionBookCard } from "../../elements"
import { EditModal } from "../../modals"
import MakeButton from "./component/MakeButton"

const useStyles = makeStyles(theme => ({
  goback: {
    cursor: "pointer",
  },
  bookCard: {
    width: "90%",
    margin: "0 auto",
    marginBottom: "20px",
  },
  more: {
    position: "absolute",
    top: "4%",
    right: "5%",
    color: "white",
  },
  makebtn: {
    margin: "0px 16px",
  },
}))

const CollectionDetail = props => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const collection_id = props.match.params.collectionid
  const collection_detail = useSelector(
    state => state.collection.collection_detail
  )
  const is_modal = useSelector(state => state.permit.is_modal)
  const my_id = useSelector(state => state.user.user.id)
  const { image, name, user, description, contents } = collection_detail
  const defaultImg =
    "https://i.pinimg.com/564x/c0/79/44/c07944cff5a97bfa3274236cabee29c7.jpg"
  //책장모드
  const [bookMode, setBookMode] = useState(false)

  React.useEffect(() => {
    dispatch(permitActions.showNav(true))
    dispatch(collectionActions.getCollectionDetailSV(collection_id))
  }, [collection_id, dispatch])

  let is_my_collection = false
  if (user?.id === my_id) {
    is_my_collection = true
  }
  const showEdit = () => {
    dispatch(permitActions.showModal(true))
  }

  return (
    <ComponentWrapper>
      <EditModal is_collection is_modal={is_modal} />
      <Container>
        <Head>
          <ArrowBackIcon
            className={classes.goback}
            onClick={() => {
              history.goBack()
            }}
          />
          <MakeButton />
        </Head>
        <CollectionOutter>
          <Image url={image ? image : defaultImg}>
            <Overlay />
            <TitleBox>
              <Title>{name}</Title>
              <Nickname>{user?.nickname}</Nickname>
            </TitleBox>
            {is_my_collection && (
              <MoreHorizIcon
                className={classes.more}
                onClick={() => {
                  showEdit()
                  dispatch(collectionActions.getCollectionId(collection_id))
                }}
              />
            )}
          </Image>
          <Wrapper>
            <Description>{description}</Description>
            <Mode>
              추천도서
              {bookMode ? (
                <FeedCategoryButton
                  onClick={() => {
                    setBookMode(false)
                  }}
                >
                  <RemoveRedEyeIcon className={classes.eye} />
                  리뷰모드
                </FeedCategoryButton>
              ) : (
                <FeedCategoryButton
                  onClick={() => {
                    setBookMode(true)
                  }}
                >
                  <RemoveRedEyeIcon className={classes.eye} />
                  책장모드
                </FeedCategoryButton>
              )}
            </Mode>
            <Wrapper>
              {bookMode ? (
                <BookFeedMain count={3}>
                  {contents?.map(content => {
                    return (
                      <BookInfo key={content._id}>
                        <BookImg
                          url={content.book?.image}
                          onClick={() => {
                            history.push(`/bookdetail/${content.book?.isbn}`)
                          }}
                        />
                        <BookTitle>
                          {content.book?.title.split("(")[0]}
                        </BookTitle>
                        <BookAuthor>
                          {content.book?.author.split("(")[0]} 저
                        </BookAuthor>
                      </BookInfo>
                    )
                  })}
                </BookFeedMain>
              ) : (
                <div>
                  {contents?.map(content => {
                    return (
                      <CollectionBookCard
                        is_collection_detail
                        {...content}
                        key={content.id}
                      />
                    )
                  })}
                </div>
              )}
            </Wrapper>
          </Wrapper>
        </CollectionOutter>
      </Container>
    </ComponentWrapper>
  )
}

const Head = styled.div`
  width: 90%;
  align-items: center;
  margin: 0 auto;
  display: flex;
  padding: 16px 0px;
  justify-content: space-between;
`

const ComponentWrapper = styled.div`
  width: 100vw;
  height: auto;
  background: ${Color.mainColor};
  box-sizing: border-box;
  position: absolute;
  @media ${props => props.theme.tablet} {
    width: 100%;
  }

  @media ${props => props.theme.desktop} {
    width: 100%;
  }
`
const FeedCategoryButton = styled.div`
  cursor: pointer;
  width: 85px;
  height: 34px;
  border: 1px solid ${Color.line};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Color.subTextFont};
  font-size: 14px;
`

const Container = styled.div`
  width: 100vw;
  height: auto;
  min-height: 100vh;
  box-sizing: border-box;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  @media ${props => props.theme.tablet} {
    width: 100%;
  }

  @media ${props => props.theme.desktop} {
    width: 100%;
  }
`

const CollectionOutter = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 100px;
`

const Image = styled.div`
  width: 100%;
  padding-top: 100%;
  background-image: url(${props => props.url});
  background-size: cover;
  position: relative;
  background-position: center center;
`

const Overlay = styled.div`
  width: 100%;
  padding-top: 100%;
  background-image: linear-gradient(
    181.3deg,
    rgba(0, 0, 0, 0.75) 23.8%,
    rgba(0, 0, 0, 0.72) 42.2%,
    rgba(0, 0, 0, 0.63) 56.9%,
    rgba(0, 0, 0, 0.42) 75.1%,
    rgba(0, 0, 0, 0) 96.2%
  );
  background-image: linear-gradient(180deg, black, transparent);
  opacity: 80%;
  position: absolute;
  top: 0px;
`

const TitleBox = styled.div`
  position: absolute;
  width: 80%;
  top: 35%;
  left: 10%;
  height: auto;
`

const Title = styled.p`
  font-family: "Noto Serif KR", serif;
  color: ${Color.white};
  font-size: 21px;
`

const Nickname = styled.p`
  color: ${Color.white};
`

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`

const Description = styled.div`
  margin: 0 auto;
  padding: 20px;
  white-space: pre-line;
`

const Mode = styled.div`
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  color: ${Color.subTextFont};
`

const BookFeedMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(
    ${props => (props.count ? props.count : "")},
    210px
  );
  gap: 1px;
  padding-bottom: 100px;
  padding: 0px 20px;
  margin-top: 20px;
`
const BookInfo = styled.div`
  margin: 0 auto;
`
const BookImg = styled.div`
  width: 102px;
  height: 136px;
  background-image: url(${props => (props.url ? props.url : " ")});
  background-size: cover;
  box-sizing: border-box;
  border-radius: 4px;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`
const BookTitle = styled.div`
  font-size: 14px;
  box-sizing: border-box;
  color: ${Color.black};
  width: 102px;
  padding: 5px 0px;
  font-weight: 500;
`

const BookAuthor = styled.div`
  font-size: 12px;
  box-sizing: border-box;
  color: ${Color.subTextFont};
  width: 102px;
`
export default CollectionDetail
