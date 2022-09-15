import React from "react"
import styled from "styled-components"

//스와이퍼
import SwiperCore, { Mousewheel } from "swiper/core"
import "swiper/swiper.scss"
import "swiper/components/navigation/navigation.scss"
import "swiper/components/pagination/pagination.scss"

//컴포넌트
import WhatCollection from "./component/WhatCollection"
import CollectionSlider from "./component/CollectionSlider"
//css
import Color from "../../shared/Color"
// import bookCollectionLogo from "../../img/bookCollectionLogo.svg"

//action
import { actionCreators as collectionActions } from "../../redux/modules/collection"
import { actionCreators as permitActions } from "../../redux/modules/permit"
import { useDispatch, useSelector } from "react-redux"

SwiperCore.use([Mousewheel])

//북컬렉션 페이지
const BookCollectionMain = props => {
  const dispatch = useDispatch()

  const tag_collection_list = useSelector(
    state => state.collection.tag_collection_list
  )
  const custom_collection_list = useSelector(
    state => state.collection.custom_collection_list
  )

  const collectionLogo = "https://ifh.cc/g/Y1nowl.png"

  React.useEffect(() => {
    dispatch(permitActions.showNav(true))
    dispatch(collectionActions.getTagCollectionsSV())
    dispatch(collectionActions.getCustomCollectionsSV())
  }, [])

  return (
    <Wrapper>
      <Container>
        <LogoBox>
          <Logo src={collectionLogo} />
        </LogoBox>

        <WhatCollection />

        <CollectionSlider
          key={1}
          collection_list={custom_collection_list}
          collection_name={"최신 컬렉션"}
          desc={"다이버들이 만든 따끈따끈한 북컬렉션"}
        />

        <CollectionSlider
          key={2}
          is_tag
          collection_list={tag_collection_list}
          collection_name={"태그 추천 컬렉션"}
          desc={"작성된 리뷰 태그에 관련된 컬렉션을 모아봤어요."}
        />
      </Container>
    </Wrapper>
  )
}
const LogoBox = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 20px;
`

const Logo = styled.img`
  height: auto;
  width: auto;
  max-width: 204px;
  max-height: 24px;
`

const Wrapper = styled.div`
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

const Container = styled.div`
  width: 100vw;
  height: auto;
  min-height: 130vh;
  padding-bottom: 100px;

  @media ${props => props.theme.tablet} {
    width: 100%;
    min-height: 100vh;
  }

  @media ${props => props.theme.desktop} {
    width: 100%;
    min-height: 100vh;
  }
`

export default BookCollectionMain
