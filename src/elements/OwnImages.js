import React from "react";
import styled from "styled-components";
import Color from "../shared/Color";

import {images} from "../shared/Image"
import {titleWord} from "../shared/Titles"
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import {history} from "../redux/configStore";

const OwnImages = (props) => {
    const dispatch = useDispatch();
    const {image, level, setCheck} = props

    const changeProfile = (image) => {
        dispatch(userActions.changeProfileSV(image))    
    }

    const goBack = () => {
        setTimeout(() => {
            history.goBack();
        },[1500])
    }

    const levelList = {
        0:0,
        1:2,
        2:5,
        3:10,
    }

    return(
        <React.Fragment>
            <Box>
                <ImgWrapper>
                    <ProfileImg  
                    src={images[image]}>                                
                    </ProfileImg>
                </ImgWrapper>
                <Container>
                    <InfoBox>
                        <LevelText>수심{level < 4 ? levelList[`${level}`] : (level -1)*5}m</LevelText>
                        <Title>
                            {titleWord[image]}
                        </Title>
                    </InfoBox>
                    <CancelButton 
                    onClick={() => {
                        changeProfile(image);
                        setCheck(true)
                        goBack()}}>
                        선택
                    </CancelButton>
 
                </Container>
            </Box>
        </React.Fragment>
    )
}


export default OwnImages;


const Box = styled.div`
width:100%;
height:100px;
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:10px;
box-sizing:border-box;

@media ${(props) => props.theme.mobile} {
    width: 100%;
}

@media ${(props) => props.theme.tablet} {
    margin:0px 20px 10px 20px;
    width: 90%;
}
  
@media ${(props) => props.theme.desktop} {
    margin:0px 20px 10px 20px;
    width: 90%;
}
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
cursor:pointer;
`;

const Container = styled.div`
width:80%;
height:auto;
display:flex;
justify-content:space-between;
align-items:center;
`

const LevelText = styled.div`

`

const InfoBox = styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;
font-size:16px;
padding-left:20px;
font-weight:600;
`

const Title = styled.p`
margin:0;
font-size:14px;
`

const CancelButton = styled.button`
font-family: 'Noto Sans KR', sans-serif;
background: #d7d3d3;
border:none;
border-radius:10px;
width:40px;
height:40px;
font-size:14px;
font-weight:600;
cursor:pointer;
transition:0.3s ease-in-out;
:hover{
    background:${Color.line};
}
`