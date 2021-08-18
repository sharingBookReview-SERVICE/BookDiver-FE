import React from "react";
import styled from "styled-components";
import Color from "../shared/Color";

import {images} from "../shared/Image"
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const FollowUser = (props) => {
    const dispatch = useDispatch();
    const {location, nickname, profileImage, id} = props
    // console.log(props);
    const unfollow = () => {
        if(location === "/follower"){
            dispatch(userActions.deleteFollowerSV(id))
        }else{
            dispatch(userActions.followSV(id))
        }
      }

    return(
        <React.Fragment>
            <Box>

                <ImgWrapper>
                    <ProfileImg src={images[profileImage]} />
                </ImgWrapper>

                <Container>
                    <Title>
                        {nickname}
                    </Title>
                    <CancelButton onClick={() => {unfollow()}}>
                        {location === "/follower" ? "삭제" : "팔로우취소"}
                    </CancelButton>
 
                </Container>
            </Box>
        </React.Fragment>
    )
}


export default FollowUser;

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
`;

const Box = styled.div`
width:100%;
height:auto;
display:flex;
justify-content:space-between;
margin-bottom:10px;
box-sizing:border-box;
`

const Container = styled.div`
width:70%;
height:auto;
display:flex;
justify-content:space-between;
align-items:center;
`

const Title = styled.p`
margin:0;
font-size:14px;
font-weight:bold;
`

const CancelButton = styled.button`
border: 1px solid ${Color.secondColor};
background:transparent;
border-radius:10px;
width:84px;
height:36px;
font-size:14px;
cursor:pointer;
`