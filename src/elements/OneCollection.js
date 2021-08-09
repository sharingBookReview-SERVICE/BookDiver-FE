import React from "react";
import styled from "styled-components";
import Color from "../shared/Color";

import example from "../img/alfons-morales-YLSwjSy7stw-unsplash.jpg"


const OneCollection = () => {

    return(
        <React.Fragment>
            <Box>
                <Image url={example}>

                </Image>
                <DescriptionBox>
                    <Title>
                        일상의 공간에 소소하게 변화주는 책들
                    </Title>
                    <LikeComment>
                        좋아요 10개 | 댓글 10개
                    </LikeComment>

                </DescriptionBox>
            </Box>
        </React.Fragment>
    )
}


export default OneCollection;


const Box = styled.div`
width:100%;
height:auto;
display:flex;
justify-content:flex-start;
box-sizing:border-box;
margin-bottom:10px;
`


const Image = styled.div`
width:80px;
height:80px;
background-image: url(${(props) => props.url});
border-radius:10px;
background-size: cover;
overflow:hidden;
margin-right:15px;
box-sizing:border-box;
`

const DescriptionBox = styled.div`
height:auto;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:flex-start;
`

const Title = styled.div`
width:auto;
height:auto;
font-size:14px;
font-weight:bold;
margin-bottom:10px;
font-family: "Noto Serif KR", serif;
`

const LikeComment = styled.div`
color:${Color.fontGray};
height:auto;
font-size:13px;
`