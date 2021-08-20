import React from "react";
import styled from "styled-components";
import Color from "../shared/Color";

import {images} from "../shared/Image"
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configStore";

const FollowUser = (props) => {
    const dispatch = useDispatch();
    const {location, nickname, profileImage, id} = props
    const my_id = useSelector(state=> state.user.user.id);

    //언팔로우
    const unfollow = () => {
        if(location === "/follower"){
            dispatch(userActions.deleteFollowerSV(id))
        }else{
            dispatch(userActions.followSV(id))
        }
      }

      //다른 유저의 피드에 들어가기
  const goToUserFeed = (user_id) => {

    if (my_id === user_id) {
      //내 프로필을 클릭하면 내 피드로 이동
      history.push("/myfeed");
    }else{
      //다른 유저피드이면 다른 유저 피드로 이동 
      history.push(`/otherUser/${user_id}`)
    }
  }

  if(location.includes('/follower/') || location.includes('/following/')){
    return(
        <React.Fragment>
            <Box>

                <ImgWrapper onClick={()=>{goToUserFeed(id)}}>
                    <ProfileImg src={images[profileImage]} />
                </ImgWrapper>

                <Container>
                    <Title>
                        {nickname}
                    </Title>
 
                </Container>
            </Box>
        </React.Fragment>
    )

  }
    return(
        <React.Fragment>
            <Box>

                <ImgWrapper onClick={()=>{goToUserFeed(id)}}>
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
width:90%;
height:auto;
display:flex;
justify-content:space-between;
margin: 0px 0px 10px 30px;
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