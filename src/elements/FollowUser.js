import React from "react";
import styled from "styled-components";
import Color from "../shared/Color";

import example from "../img/alfons-morales-YLSwjSy7stw-unsplash.jpg"
import {images} from "../shared/Image"


const FollowUser = (props) => {

    const {location, nickname, profileImage} = props

    return(
        <React.Fragment>
            <Box>
                <Image url={images[profileImage]}>

                </Image>
                <Container>
                    <Title>
                        {nickname}
                    </Title>
                    <CancelButton>
                        {location === "/follower" ? "취소" : "팔로우취소"}
                    </CancelButton>
 
                </Container>
            </Box>
        </React.Fragment>
    )
}


export default FollowUser;


const Box = styled.div`
width:100%;
height:auto;
display:flex;
justify-content:flex-start;
margin-bottom:10px;
box-sizing:border-box;
`


const Image = styled.div`
width:60px;
height:60px;
background-image: url(${(props) => props.url});
border-radius:80px;
background-size: cover;
overflow:hidden;
margin-right:15px;
box-sizing:border-box;
`

const Container = styled.div`
width:80%;
height:auto;
display:flex;
justify-content:space-between;
align-items:center;
`

const Title = styled.p`
margin:0;
font-size:14px;
`

const CancelButton = styled.button`
border: 1px solid ${Color.secondColor};
background:transparent;
border-radius:10px;
width:84px;
height:36px;
font-size:14px;
`