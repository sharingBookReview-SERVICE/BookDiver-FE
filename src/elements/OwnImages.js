import React from "react";
import styled from "styled-components";
import Color from "../shared/Color";

import {images} from "../shared/Image"
import {titles} from "../shared/Titles"
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import {history} from "../redux/configStore";

const OwnImages = (props) => {
    const dispatch = useDispatch();
    const {image, level} = props

    const changeProfile = (image) => {
        dispatch(userActions.changeProfileSV(image))    
    }

    const goBack = () => {
        history.goBack();
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
                        <Level>수심{level*10}m</Level>
                        <Title>
                            {titles[image]}
                        </Title>
                    </InfoBox>
                    <CancelButton 
                    onClick={() => {
                        changeProfile(image);
                        goBack();}}>
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
height:15vh;
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:10px;
box-sizing:border-box;
border:1px solid ${Color.black};
border-radius:10px;
padding-left:20px;

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
background:${Color.black};
border: 1px solid ${Color.secondColor};
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

const Level = styled.div`

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
background:transparent;
border:none;
border-radius:10px;
width:84px;
height:36px;
font-size:16px;
font-weight:600;
cursor:pointer;
`