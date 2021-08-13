//import 부분
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {history} from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import jwt_decode from "jwt-decode";
import Color from "../shared/Color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";

import {images} from "../shared/Image"

const useStyles = makeStyles((theme) => ({
  goback: {
      padding: "10px"
  },
}));

const ChangeName = (props) =>{
  const dispatch = useDispatch();
  const [nickname, setNickName] = useState("");
  const token =  localStorage.getItem('token');
  const decoded = jwt_decode(token);
  const profileImage = useSelector(state => state.user.user.profileImage)
  const goToChangeImg = () => {
    history.push("/changeprofileimg")
  }

  const userId = decoded.userId;
  const classes = useStyles();

  useEffect(() => {
    if(userId){
      dispatch(userActions.getUserSV(userId))
    }
  },[userId])

    return(
        <React.Fragment>
                <Background>
                  <HeadBar>
                    
                    <ArrowBackIcon className={classes.goback} 
                    onClick={()=>{history.goBack()}}></ArrowBackIcon>
                    <HeadBtn>변경완료</HeadBtn>
                  </HeadBar>
                    <ProfileBox>
    
                        <ImageBox>
                            <ImgWrapper>
                              <ProfileImg 
                                onClick={() => {goToChangeImg()}} 
                                src={images[profileImage]}>                                
                              </ProfileImg>
                            </ImgWrapper>
                            <ProfileChangeGuide 
                              onClick={() => {goToChangeImg()}}>
                              프로필 사진 변경
                            </ProfileChangeGuide>
                             <Input
                               onChange={(e)=>{
                                setNickName(e.target.value);
                              }}
                             
                             onKeyPress ={(e)=>{
                              if(e.key === "Enter"){
                                dispatch(userActions.setUserSV(userId, nickname))
                              }
                            }}
                             ></Input>
                          
                        </ImageBox>
                    </ProfileBox>
                    <Activity>작성한 리뷰 12개  |  작성한 댓글 9개</Activity>
                </Background>
        </React.Fragment>
    )
}

const Background = styled.div`
width: 100%;
height: 100%;
justify-content: top;
align-items: top;
background: ${Color.mainColor};
`;

const HeadBar = styled.div`
width: 100%;
height: 56px;
padding:0px 15px;
display: flex;
justify-content: space-between;
align-items: center;
box-sizing:border-box;
`;
const HeadBtn = styled.p`
padding: 0px 5px;
font-weight: bold;
&:hover{
  color: #1168d7;
}
`;
const ProfileBox = styled.div`
width: 100%;
height: 216px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

`;
const ImageBox = styled.div`
width: 80%;
height: 100%;
display: flex;
flex-direction:column;
justify-content: center;
align-items: center;
`;

const ProfileImg = styled.img`
width: 100%;
height: 100%;
object-fit:cover;
cursor:pointer;
`;

const ImgWrapper = styled.div`
width:72px;
height:72px;
border-radius:70%;
overflow:hidden;
box-sizing:border-box;
background:${Color.black};
border: 1px solid ${Color.secondColor};
`

const ProfileChangeGuide = styled.div`
color:${Color.fontGray};
font-size:15px;
margin:20px 0px;
cursor:pointer;
`


const Input = styled.input`
width: 60%;
height: 36px;
border-radius: 8px;
background:${Color.mainColor};
:focus{
  outline:none;
}
`;
const Activity = styled.p`
    color: ${Color.fontGray};
    margin: 5px;
    font-size: 15px;
    text-align: center;
  
`;

export default ChangeName;