//import 부분
import React, { useState } from "react";
import styled from "styled-components";
import {history} from "../redux/configStore";
import { useDispatch, userSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import jwt_decode from "jwt-decode";
import Color from "../shared/Color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";

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

  const userId = decoded.userId;
  const classes = useStyles();
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
                            <ProfileImg></ProfileImg>
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
width: 360px;
height: 56px;
margin: 0 0 4px;
display: flex;
justify-content: space-between;
align-items: center;
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

const ProfileImg = styled.div`
width: 100px;
height: 100px;
border-radius: 72px;
background: tomato;
margin: 10px;
background-image:URL(https://i.pinimg.com/564x/d1/87/71/d18771205132c86d030e6ebedcc2ba9f.jpg);
background-size: cover;
`;

const Input = styled.input`
width: 60%;
height: 36px;
border-radius: 8px;
margin: 16px 0px 0px 0px;
`;
const Activity = styled.p`
    color: ${Color.fontGray};
    margin: 5px;
    font-size: 15px;
    text-align: center;
  
`;

export default ChangeName;