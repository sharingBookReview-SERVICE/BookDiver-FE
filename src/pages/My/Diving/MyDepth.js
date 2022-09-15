//import 부분
import React, { useEffect } from "react"
import { history } from "../../../redux/configStore"
import ReactGA from "react-ga"
import styled from "styled-components"
import Color from "../../../shared/Color"

import { ArrowBack } from "../../../components"

import { TreasureBoxModal, TreasureModal } from "../../../modals"
import { treasure, person } from "../../../img"
import Loading from "../../ETC/Loading"

import { actionCreators as userActions } from "../../../redux/modules/user"
import { actionCreators as permitAction } from "../../../redux/modules/permit"
import { useDispatch, useSelector } from "react-redux"

import Level from "./Level"
import NotSupport from "../../../modals/NotSupport"

const MyDepth = props => {
  const dispatch = useDispatch()
  const is_open_treasure = useSelector(state => state.permit.is_modal)
  const is_treasure = useSelector(state => state.permit.is_treasure)
  const new_badge = useSelector(state => state.permit.new_badge)
  const is_loading = useSelector(state => state.permit.is_loading)
  const is_support_modal = useSelector(state => state.permit.is_support_modal)
  const my_level = useSelector(state => state.user.user?.level)

  //이 값은 treasure를 확인하는 값을 가져왔을 때, 입력시켜준다.
  // dispatch(permitAction.isTreasure(false))

  const openNotSupportModal = () => {
    dispatch(permitAction.showNotSupport(true))
  }

  const goLevelHelp = () => {
    history.push("/levelhelp")
  }

  const openTreasure = () => {
    dispatch(permitAction.showModal(true))
  }

  useEffect(() => {
    dispatch(userActions.getUserSV()) //수심페이지에서 유저정보 다시 불러오기
    dispatch(userActions.checkTreasureSV())
    dispatch(permitAction.showTreasureModal(false)) //보물 찾으러 가라는 모달 없애기
    dispatch(permitAction.showNav(true))
    setTimeout(() => {
      dispatch(permitAction.isLoading(false))
    }, 600)
    return () => {
      dispatch(permitAction.showModal(false)) // 나가면서 모달 닫아 놓기
      dispatch(permitAction.showNewBadge(null)) // 새로운 뱃지의 값을 null로 만들어놓기
    }
  }, [])

  return (
    <React.Fragment>
      <TreasureModal new_badge={new_badge} />
      <TreasureBoxModal is_open_treasure={is_open_treasure} />
      <NotSupport is_support_modal={is_support_modal} />

      {is_loading ? (
        <Loading />
      ) : (
        <>
          <Wrapper>
            <Header>
              <ArrowBack />
              <HeaderText>잠수상태</HeaderText>
              <div></div>
            </Header>

            <CategoryWrapper>
              <Depth>나의 잠수상태</Depth>
              <Ranking
                onClick={() => {
                  openNotSupportModal()
                  ReactGA.event({
                    category: "Button",
                    action: "click rank button",
                    label: "rank",
                  })
                }}
              >
                다이버 랭킹
              </Ranking>
              <Tutorial
                onClick={() => {
                  goLevelHelp()
                  ReactGA.event({
                    category: "Button",
                    action: "click howto diving button",
                    label: "diving",
                  })
                }}
              >
                잠수하는 법
              </Tutorial>
              <CategoryBar />
            </CategoryWrapper>
            <MyLevel>{my_level}m에서 잠수중</MyLevel>
            <Level />
            <Person src={person} />
          </Wrapper>
          {is_treasure && (
            <Treasure
              onClick={() => {
                openTreasure()
              }}
              src={treasure}
            />
          )}
        </>
      )}
      {/* {new_badge && <NewBadge src={depth_image[new_badge]} className="scale-up-down-center"/>}
        {new_badge && <GetNewBadge className="scale-up-down-center">{titleWord[new_badge]}를 획득하셨습니다.</GetNewBadge>} */}
    </React.Fragment>
  )
}

export default MyDepth

const CategoryWrapper = styled.div`
  width: 100%;
  height: 48px;
  background: ${Color.mainColor};
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
`

const CategoryBar = styled.hr`
  position: absolute;
  width: 23%;
  border: 1px solid black;
  border-radius: 1px;
  bottom: -8px;
  left: 6%;
  transition: 0.5s ease-in-out;
`
const MyLevel = styled.div`
  position: absolute;
  top: 120px;
  border: 1px solid #d7d3d3;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 1px 8px 0 rgb(0 0 0 / 12%);
`
const Depth = styled.div``

const Ranking = styled.div`
  color: ${Color.quote};
`

const Tutorial = styled.div`
  color: ${Color.quote};
`

const Wrapper = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  background: ${Color.black};
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 56px 0px 0px 0px;
  background-size: contain;
  background-repeat: no-repeat;

  @media ${props => props.theme.tablet} {
    width: 100%;
  }

  @media ${props => props.theme.desktop} {
    width: 100%;
  }
`

const Treasure = styled.img`
  width: auto;
  height: auto;
  max-width: 40vw;
  max-height: 40vh;
  position: fixed;
  bottom: 5vh;
  cursor: pointer;

  @media ${props => props.theme.mobile} {
    left: 20vw;
  }

  @media ${props => props.theme.tablet} {
    margin-left: 110px;
    max-width: 12rem;
    max-height: 12rem;
  }

  @media ${props => props.theme.desktop} {
    margin-left: 110px;
    max-width: 12rem;
    max-height: 12rem;
  }
`

const Person = styled.img`
  position: fixed;
  top: 20vh;

  @media ${props => props.theme.mobile} {
    width: auto;
    height: auto;
    max-width: 40vw;
    max-height: 40vh;
    left: 34vw;
  }

  @media ${props => props.theme.tablet} {
    width: auto;
    height: auto;
    max-width: 250px;
    max-height: 250px;
  }

  @media ${props => props.theme.desktop} {
    width: auto;
    height: auto;
    max-width: 250px;
    max-height: 250px;
  }
`

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${Color.mainColor};
  position: fixed;
  top: 0px;
  padding: 0px 10px 0px 0px;
  box-sizing: border-box;
  z-index: 10;

  @media ${props => props.theme.tablet} {
    width: 420px;
  }

  @media ${props => props.theme.desktop} {
    width: 420px;
  }
`

const HeaderText = styled.div`
  font-size: 16px;
  color: ${Color.black};
  margin-right: 25px;
`
