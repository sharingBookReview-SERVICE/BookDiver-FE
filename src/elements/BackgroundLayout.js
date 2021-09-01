import React from "react";
import styled from 'styled-components';
import {images} from "../shared/Image"
import Color from "../shared/Color"



const BackgroundLayout = (props) => {

        return(
        <>
            <BackgroundImg url={images["background_img"]}>
                <BackgroundDesc>
                    <ServiceDesc src={images["background_desc"]}/>
                </BackgroundDesc>
                {props.children}
            </BackgroundImg>
        </>)
}

export default BackgroundLayout;

const BackgroundImg = styled.div`
background-image:url(${(props) => props.url});
background-size:cover;
z-index:-20;

@media ${(props) => props.theme.mobile} {
    background-image:none;
  }

@media ${(props) => props.theme.tablet} {
    width: 100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
  }

  @media ${(props) => props.theme.desktop} {
    width: 100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
  }
`

const BackgroundDesc = styled.div`
@media ${(props) => props.theme.mobile} {
    display:none;
  }
@media ${(props) => props.theme.tablet} {
    display:none;
  }
@media ${(props) => props.theme.desktop} {
    color:${Color.white};
    margin-right:180px;
  }
`

const ServiceDesc = styled.img`
width:auto;
height:auto;
max-width:300px;
max-height:300px;
margin-bottom:80px;
`

