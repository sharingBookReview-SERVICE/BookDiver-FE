//import 부분
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { history } from "../../redux/configStore"
import { actionCreators as userActions } from "../../redux/modules/user"

import styled from "styled-components"
import Color from "../../shared/Color"
import SettingsIcon from "@material-ui/icons/Settings"
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone"
import { makeStyles } from "@material-ui/core/styles"
import { images } from "../../shared/Image"
import { titles } from "../../shared/Titles"

const useStyles = makeStyles(theme => ({
  setting: {
    color: Color.white,
    padding: "10px",
  },
}))

//마이 페이지
const MyProfile = props => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const nickname = useSelector(state => state.user.user.nickname)
  const level = useSelector(state => state.user.user?.level)
  const profileImg = useSelector(state => state.user.user?.profileImage)
  const userId = useSelector(state => state.user.user._id)

  useEffect(() => {
    if (userId) {
      dispatch(userActions.getUserSV(userId))
    }
  }, [dispatch, userId])

  const goToMyDepth = () => {
    history.push("/mydepth")
  }

  return (
    <React.Fragment>
      <Background>
        <ProfileWrapper>
          <SettingBox>
            <NotificationsNoneIcon
              className={classes.setting}
              onClick={() => {
                history.push("/notification")
              }}
            />
            <SettingsIcon
              className={classes.setting}
              onClick={() => {
                history.push("/setting")
              }}
            />
          </SettingBox>

          <Wrapper>
            <ProfileBox>
              <ImgWrapper>
                <ProfileImg src={images[profileImg]} />
              </ImgWrapper>

              <DetailBox>
                <UserTitle>{titles[profileImg]}</UserTitle>
                <UserName>{nickname}</UserName>
                <PostCount>작성한 에세이 12개 | 만든 컬렉션 20개</PostCount>
              </DetailBox>
            </ProfileBox>

            <LevelDetail
              onClick={() => {
                goToMyDepth()
              }}
            >
              '수심 {level}m 잠수 중' 자세히보기
            </LevelDetail>
          </Wrapper>
        </ProfileWrapper>
        <CollectionWrapper>
          {/* {CollectionList.map((title, idx) => {
                      return(<ProfileSwiper title={title} key={idx}/>)
                  })} */}
        </CollectionWrapper>
      </Background>
    </React.Fragment>
  )
}

//styled components
const Wrapper = styled.div`
  width: 100%;
  height: 60%;
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: ${Color.mainColor};
  position: relative;
  flex-direction: column;
`

const ProfileWrapper = styled.div`
  width: 100vw;
  height: 40vh;
  background: ${Color.black};
  box-sizing: border-box;
  padding: 20px 20px 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const SettingBox = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
`

const ProfileBox = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  margin-top: 20px;
`

const ImgWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 70%;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid ${Color.secondColor};
`

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const DetailBox = styled.div`
  box-sizing: border-box;
  width: 80%;
  height: auto;
  margin-left: 10px;
`

const UserTitle = styled.div`
  width: 100%;
  height: auto;
  color: ${Color.white};
  font-family: "Noto Serif KR", serif;
`

const UserName = styled.div`
  width: 100%;
  height: auto;
  color: ${Color.white};
  font-family: "Noto Serif KR", serif;
`

const PostCount = styled.div`
  width: 100%;
  height: auto;
  color: ${Color.fontGray};
`

const LevelDetail = styled.div`
  margin: 20px 10px 0px 0px;
  width: 100%;
  height: 36px;
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: ${Color.gray};
  color: ${Color.white};
`

const CollectionWrapper = styled.div`
  height: 50vh;
  width: 100%;
  padding: 20px 0px 20px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
`

export default MyProfile
