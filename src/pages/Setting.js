import React from "react";
import styled from "styled-components";
import Color from "../shared/Color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PolicyOutlinedIcon from '@material-ui/icons/PolicyOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    goback: {
        padding: "0px 20px"
    },
    icon: {
        position: "absolute",
        right: "20px"
    }
  }));
const Setting = (props) => {
    const classes = useStyles();
    return(
        <Container>
            <Head>
                <ArrowBackIcon className={classes.goback} />
                <Text>설정</Text>
            </Head>
            <Wrapper>
                <PolicyOutlinedIcon/>
                <Menu>공지사항</Menu>
                <ArrowForwardIosOutlinedIcon className={classes.icon}/>
            </Wrapper>
            <Wrapper>
                <PolicyOutlinedIcon/>
                <Menu>개인정보 처리방침</Menu>
                <ArrowForwardIosOutlinedIcon className={classes.icon}/>
            </Wrapper>
            <Wrapper>
                <PolicyOutlinedIcon/>
                <Menu>서비스 이용약관</Menu>
                <ArrowForwardIosOutlinedIcon className={classes.icon}/>
            </Wrapper>    
            <Wrapper>
                <CreateOutlinedIcon/>
                <Menu>닉네임 변경</Menu>
                <ArrowForwardIosOutlinedIcon className={classes.icon}/>
            </Wrapper>
            <Bottom>
                <Btn>로그아웃</Btn>
                <Btn>회원탈퇴</Btn>
            </Bottom>
        </Container>
    )
}

const Container = styled.div`
background: ${Color.mainColor};
width: 100vw;
height: 100vh;
`;
const Head = styled.div`
width: 100%;
height: 10%;
align-items: center;
display: flex;
margin: 16px 0px;
`;
const Text = styled.div`
width: 70%;
text-align: center;
`;
const Wrapper = styled.div`
display: flex;
padding: 0px 20px;
width: 100%;
height: 10%;
align-items: center;
`;
const Menu = styled.div`
font-weight: bold;
margin: 0px 0px 0px 10px;
`;
const Bottom = styled.div`
width: 100%;
padding: 60px 20px;
`;
const Btn = styled.div`
padding: 20px 0px;
`;
export default Setting;