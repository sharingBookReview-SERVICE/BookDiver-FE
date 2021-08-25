import React from "react";
import styled from 'styled-components';
import {backgroundimg, serviceDesc , main_person} from "../img";
import Color from "../shared/Color"


const Layout = (props) => {

        return(
        <>
            <BackgroundImg url={backgroundimg}>
                <BackgroundDesc>
                    <ServiceDesc src={serviceDesc}/>
                    <Person src={main_person}/>
                </BackgroundDesc>
                {props.children}
            </BackgroundImg>
        </>)
}

export default Layout;

const BackgroundImg = styled.div`
background-image:url(${(props) => props.url});
background-size:cover;
// position:fixed;
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
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:50px;
    color:${Color.white};
    margin-right:150px;
  }
`

const ServiceDesc = styled.img`
width:auto;
height:auto;
max-width:300px;
max-height:300px;
`

const Person = styled.img`
width:auto;
height:auto;
max-width:300px;
max-height:300px;
`

