
//import 부분
import React, {useRef} from "react";
import {history} from "../../redux/configStore";

import styled from "styled-components";
import Color from "../../shared/Color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";
import instance from "../../shared/Request";

const useStyles = makeStyles((theme) => ({
    arrow: {
      color: Color.black,
      cursor:"pointer",
    },
  }));

const VoiceOfCustomer = () => {
    const classes = useStyles()
    const inputRef = useRef()

    const goBack = () => {
        history.goBack()
    }

    const postVOC = () => {
        instance.post("/suggestion", {content: inputRef.current.value}).then()
        console.log(inputRef.current.value)
        goBack()
    }


    return (
        <React.Fragment>

            <Container>
            <Header>
                <ArrowBackIcon 
                onClick={() => {
                    goBack()
                }} 
                className={classes.arrow}/>
                <HeaderText>고객의 소리</HeaderText>
                <Write onClick={() => {postVOC()}}>등록</Write>
            </Header>
            <Box>
            <GuideBox>
                <Guide>
                궁금한 점이나 불편한 점이 있으셨나요?<br/>
                저희에게 알려주세요:)
      
                </Guide>
            </GuideBox>
            <InputBox>
              
                <Input ref={inputRef} placeholder="다이버님의 소중한 의견을 남겨주세요."/>
            </InputBox>

            </Box>
            <FakeBox/>

            </Container>


    </React.Fragment>
    );
};

export default VoiceOfCustomer;

const Container = styled.div`
width:100vw;
height:100vh;
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-between;
box-sizing:border-box;
background: ${Color.mainColor};

@media ${(props) => props.theme.tablet} {
    width: 100%;
  }
  
  @media ${(props) => props.theme.desktop} {
    width: 100%;
  }
`

const Header = styled.div`
width: 100%;
height: 56px;
display:flex;
padding:0px 20px;
box-sizing:border-box;
justify-content:space-between;
align-items:center;


@media ${(props) => props.theme.tablet} {
    width: 420px;
  }
  
  @media ${(props) => props.theme.desktop} {
    width: 420px;
  }
`

const HeaderText = styled.div`
font-size:16px;
color:${Color.black};
font-family: "Noto Serif KR", serif;
`

const Write = styled.div`
font-size:16px;
color:${Color.black};
cursor:pointer;
`

const Box = styled.div`
width:100%;
height:auto;
display:flex;
flex-direction:column;
align-items:center;
margin-bottom:140px;
`

const GuideBox = styled.div`
width:20rem;
height:auto;
display:flex;
justify-content:flex-start;
margin-bottom:12px;
`

const Guide = styled.div`
font-weight:600;
letter-spacing:-0.5px;
`

const InputBox = styled.div`
width:auto;
height:auto;
`

const InputTitle = styled.div`
text-align:start;
font-size:14px;
font-weight:600;
`

const Input = styled.textarea`
margin-top:5px;
background: transparent;
font-family: 'Noto Sans KR', sans-serif;
border-radius:10px;
resize:none;
width:20rem;
height:20rem;
padding:16px;
box-sizing:border-box;
:focus{
    outline:none;
}
`

const FakeBox = styled.div`

`