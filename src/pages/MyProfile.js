//import 부분
import React, { useState } from "react";
import { useSelector } from "react-redux";

import LogoutModal from "../modals/LogoutModal";
import SignoutModal from "../modals/SignoutModal";

import styled from "styled-components";
import Color from "../shared/Color"
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { makeStyles } from "@material-ui/core/styles";
import Profile from "../img/christopher-campbell-rDEOVtE7vOs-unsplash.jpg"

import ProfileSwiper from "../elements/ProfileSwiper";

const useStyles = makeStyles((theme) => ({
    setting: {
        color:Color.white,
        padding:"10px",
    },
  }));

//마이 페이지
const MyProfile = (props) =>{
    const classes = useStyles();
    const[logooutPop, setLogOutPop] = useState(false);
    const[signoutPop , setSignOutPop] = useState(false);
    const nickname = useSelector(state=> state.user.user.nickname);
    const CollectionList = ["나만의 북 컬렉션", "내가 작성한 리뷰", "내가 스크랩한 리뷰"]

    
    return(
        <React.Fragment>
          {/* 로그아웃 */}
          {
              logooutPop && <LogoutModal logooutPop={logooutPop} setLogOutPop={setLogOutPop}/>
          }
          {/* 회원탈퇴 */}
          {
              signoutPop && <SignoutModal signoutPop={signoutPop} setSignOutPop={setSignOutPop}/>
          }
                <Background>
                  <ProfileWrapper>
                      <SettingBox>
                          <NotificationsNoneIcon className={classes.setting}/>
                          <SettingsIcon className={classes.setting}/>
                      </SettingBox>

                      <ProfileBox>
                          <ImgWrapper>
                            <ProfileImg src={Profile} />
                          </ImgWrapper>

                          <DetailBox>
                            <UserTitle>'천재적인 범고래 다이버'</UserTitle>
                            <UserName>독서하는 곰돌이</UserName>
                            <PostCount>작성한 에세이 12개 | 만든 컬렉션 20개</PostCount>
                          </DetailBox>

                      </ProfileBox>
                      
                      <LevelDetail>'수심 0m 잠수 중' 자세히보기</LevelDetail>  
                  </ProfileWrapper>
                  <CollectionWrapper>
                  {CollectionList.map((title, idx) => {
                      return(<ProfileSwiper title={title} key={idx}/>)
                  })}
                  </CollectionWrapper>

                </Background>
        
                        
        </React.Fragment>
    )
}

//styled components

const Background = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: flex-start;
background: ${Color.mainColor};
position: relative;
padding-top:20px;
flex-direction:column;
`;

const ProfileWrapper = styled.div`
width: 100%;
height: 35%;
background:${Color.black};
box-sizing:border-box;
padding: 0px 20px 40px 20px;
display:flex;
flex-direction:column;
justify-content:space-between;
`;

const SettingBox = styled.div`
width: 100%;
height:56px;
display:flex;
justify-content:flex-end;
align-items:center;
box-sizing:border-box;
`;


const ProfileBox = styled.div`
height:auto;
width:100%;
display:flex;
justify-content:flex-start;
box-sizing:border-box;
margin-top:20px;
`

const ImgWrapper = styled.div`
width:72px;
height:72px;
border-radius:70%;
overflow:hidden;
box-sizing:border-box;
`

const ProfileImg = styled.img`
width: 100%;
height: 100%;
object-fit:cover;
`;

const DetailBox = styled.div`
box-sizing:border-box;
width:80%;
height:auto;
margin-left:10px;
`
const UserTitle = styled.div`
width:100%;
height:auto;
color:${Color.white};
font-family: "Noto Serif KR", serif;
`
const UserName = styled.div`
width:100%;
height:auto;
color:${Color.white};
font-family: "Noto Serif KR", serif;
`
const PostCount = styled.div`
width:100%;
height:auto;
color:${Color.fontGray}
`

const LevelDetail = styled.div`
margin: 20px 10px 0px 0px;
width:100%;
height:36px;
border-radius:13px;
display:flex;
justify-content:center;
align-items:center;
box-sizing:border-box;
background:${Color.gray};
color:${Color.white};
`

const CollectionWrapper = styled.div`
height:100%;
width:100%;
padding: 20px 0px 20px 25px;
display:flex;
flex-direction:column;
justify-content:space-between;
align-items:space-between;
`





export default MyProfile;