//import 부분
import React, { useEffect, useState } from "react"

import styled from "styled-components"
import Color from "../../shared/Color"
import { OwnImages } from "../../elements"

import { actionCreators as userActions } from "../../redux/modules/user"
import { actionCreators as permitActions } from "../../redux/modules/permit"
import { useDispatch, useSelector } from "react-redux"
import { ArrowBack } from "../../components/index"
import LottieCheck from "../../img/lottie/LottieCheck"

const ChangeProfileImg = props => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.user.user._id)
  const ownImages = useSelector(state => state.user.user.own_image)
  const [showCheck, setShowCheck] = useState(false)

  useEffect(() => {
    if (userId) {
      dispatch(userActions.getUserSV(userId))
    }
    return () => {
      dispatch(permitActions.newTreasureModal(false))
    }
  }, [dispatch, userId])

  //작성하기
  return (
    <React.Fragment>
      <Wrapper>
        <Container>
          {showCheck && <LottieCheck />}
          <Header>
            <ArrowBack />
          </Header>
          {ownImages?.map((image, idx) => {
            return (
              <OwnImages
                image={image}
                key={idx}
                level={idx}
                setCheck={setShowCheck}
              />
            )
          })}
        </Container>
      </Wrapper>
    </React.Fragment>
  )
}

export default ChangeProfileImg

const Wrapper = styled.div`
  width: 100vw;
  height: auto;
  position: relative;
  display: flex;
  background: ${Color.mainColor};
  box-sizing: border-box;
  padding-bottom: 100px;
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
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  box-sizing: border-box;

  @media ${props => props.theme.mobile} {
    padding: 80px 20px 0px 20px;
    width: 100%;
  }

  @media ${props => props.theme.tablet} {
    padding-top: 56px;
    width: 100%;
  }

  @media ${props => props.theme.desktop} {
    padding-top: 56px;
    width: 100%;
  }
`

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  align-items: center;
  background-color: ${Color.mainColor};
  position: fixed;
  top: 0px;

  font-family: "Noto Serif KR", serif;

  @media ${props => props.theme.mobile} {
    width: 420px;
    left: 0px;
  }

  @media ${props => props.theme.tablet} {
    width: 420px;
  }

  @media ${props => props.theme.desktop} {
    width: 420px;
  }
`
