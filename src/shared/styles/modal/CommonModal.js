import styled from "styled-components"
import Color from "../../Color"

export const CommonContainer = styled.div`
position:fixed;
width: 85%;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
border-radius: 12px;
border: solid 1px #eeeeee; 
background: ${Color.mainColor};
z-index: 100;
transition: opacity 0.5s ease-in-out;
${(props) => props.is_show ? 
  `opacity:1;
  top: 38%;`
  :
  `opacity:0;
  top:-40%;`
  }
@media ${(props) => props.theme.mobile} {
  left: 7%;
}
@media ${(props) => props.theme.tablet} {
  width: 390px;
  margin-left:15px;
}
@media ${(props) => props.theme.desktop} {
  width: 390px;
  margin-left:15px;
}
` 

export const CommonOverlay = styled.div`
width: 100vw;
height: 100vh;
background-color:black;
z-index: 99;
position: fixed;
cursor:pointer;
transition: opacity 0.5s ease-in-out;
${(props) => props.is_show ? 
  `opacity:0.4;`
  :
  `opacity:0;
  display:none;`
  }
@media ${(props) => props.theme.tablet} {
  width: 420px;
}
@media ${(props) => props.theme.desktop} {
  width: 420px;
}
` 

export const CommonText = styled.p`
font-size: 14px;
line-height: 1.52;
text-align: center;
padding: 24px;
display: block;
letter-spacing: -0.42px;
font-size: 14px;
margin-bottom: 0px;
padding-bottom: 30px;
border-bottom: 1px solid ${Color.hashtag};
`

export const CommonBtn = styled.div`
width: 50%;
font-size: 14px;
font-weight: bold;
cursor:pointer;
`