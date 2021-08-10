import React from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Color from "../shared/Color";
import { history } from "../redux/configStore";


const useStyles = makeStyles((theme) => ({
    goback: {
        padding: "0px 20px"
    },
    icon: {
        position: "absolute",
        right: "20px"
    }
  }));


const NotiCard = (props)=>{

    return(
    <Outter>
        <Title>
            <P>내가 쓴 에세이</P>
            <P>21분 전</P>
        </Title>
        <Noti>
            <b>독서하는 곰돌이</b>님이 댓글을 남겼습니다.
        </Noti>
        <Content>
        이 컬렉션 다 읽는 그날까지 독서 화이팅!
        </Content>
    </Outter>
    )
    
}

const Notification = (props) =>{
    const classes = useStyles();
    return(
        <Container>
            <Head>
            <ArrowBackIcon className={classes.goback} 
             onClick = {()=>{history.goBack()}}
            />
                <Text>알림</Text>
            </Head>
            <NotiCard/>
            <NotiCard/>
            <NotiCard/>
            <NotiCard/>
            <NotiCard/>
            <NotiCard/>

        </Container>
        )
}

const Container = styled.div`
background: ${Color.mainColor};
width: 100vw;
padding-bottom: 100px;
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

const Outter= styled.div`
width: 80%;
margin: 0 auto;
border-radius: 12px;
border: 1px solid ${Color.black};
padding: 16px;
margin-bottom: 16px;
`;

const Title = styled.div`
display: flex;
justify-content: space-between;
color: ${Color.fontGray};
padding: 4px 0px;
`;

const P = styled.p`
margin: 0px;
`;
const Noti = styled.div`
padding: 4px 0px;
`;
const Content = styled.div`
color: ${Color.fontGray};
padding: 4px 0px;
`;
export default Notification;