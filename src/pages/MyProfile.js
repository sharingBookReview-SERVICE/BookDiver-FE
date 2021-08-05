//import 부분
import React, { useState } from "react";
import styled from "styled-components";
import {history} from "../redux/configStore";
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import LogoutModal from "../modals/LogoutModal";
import SignoutModal from "../modals/SignoutModal";
import { useSelector } from "react-redux";

//마이 페이지
const MyProfile = (props) =>{
    const[logooutPop, setLogOutPop] = useState(false);
    const[signoutPop , setSignOutPop] = useState(false);
    const nickname = useSelector(state=> state.user.user.nickname);
    

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
                    <ProfileBox>
                        <ImageBox>
                            <ProfileImg></ProfileImg>
                            <Name>{nickname}</Name>
                            <Activity>작성한 리뷰 12개  |  작성한 댓글 9개</Activity>
                        </ImageBox>
                        <MyActivityBox>
                            <MyActivity>
                                <CollectionsBookmarkOutlinedIcon style={{color:"#1168d7"}}/>
                                <Text>내 컬렉션</Text>
                            </MyActivity>
                            <MyActivity>
                                <BookmarkOutlinedIcon  style={{color:"#1168d7"}}/>
                                <Text>저장한 에세이</Text>
                            </MyActivity>
                            <MyActivity>
                            <Text style={{fontWeight:"bold",fontSize:"21px", margin: "-2px"}}>9,999</Text>
                            <Text>팔로워</Text>
                            </MyActivity>
                        </MyActivityBox>
                        <UserBtn onClick={()=>{history.push('/changename')}}>닉네임 변경</UserBtn>
                        <UserBtn onClick={()=>{ 
                            setLogOutPop(true);    
                        }}>로그 아웃</UserBtn>

                        <UserBtn onClick={()=>{
                            setSignOutPop(true);
                        }}>회원 탈퇴</UserBtn>
                    </ProfileBox>
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
align-items: center;
background: white;
position: relative;

`;

const ProfileBox = styled.div`
width: 360px;
height: 360px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

`;
const ImageBox = styled.div`
width: 216px;
height: 192px;
display: flex;
flex-direction:column;
justify-content: center;
align-items: center;
`;

const ProfileImg = styled.div`
width: 72px;
height: 72px;
border-radius: 72px;
background: tomato;
`;
const Name = styled.p`
font-weight: bold;
margin: 5px;
`;
const Activity = styled.p`
color: #9e9e9e;
margin: 5px;
font-size: 13px;
`;

const MyActivityBox = styled.div`
width: 312px;
height: 92px;
border-radius: 12px;
display: flex;
border: 1px solid #1168d7;
margin: 10px 0px;
`;

const MyActivity = styled.div`
width: 104px;
text-align: center;
font-size: 14px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;
const Text = styled.p`
color: #1168d7;
margin: 5px;
font-size: 13px;
`;
 

const UserBtn = styled.div`
width: 360px;
height: 56px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
font-weight: bold;
&:hover{
    color: #1168d7;
}
`;



export default MyProfile;