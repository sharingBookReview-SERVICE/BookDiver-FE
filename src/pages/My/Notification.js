import React, {useEffect} from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Color from "../../shared/Color";
import { history } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as userActions } from "../../redux/modules/user";

const useStyles = makeStyles((theme) => ({
    goback: {
        padding: "0px 20px",
        cursor:"pointer",
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
    const dispatch = useDispatch()
    const notiList = useSelector(state => state.user.user.noti_list)

    useEffect(() => {
        dispatch(userActions.getNotiListSV())

        return() => {
            dispatch(userActions.getUserSV())
        }
    },[])

    const classes = useStyles();
    return(
        <Wrapper>
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
        </Wrapper>
        )
}

const Wrapper = styled.div`
width:100vw;
height:auto;
display:flex;
background: ${Color.mainColor};
box-sizing:border-box;

@media ${(props) => props.theme.tablet} {
    width: 100%;
}
  
@media ${(props) => props.theme.desktop} {
    width: 100%;
}

`

const Container = styled.div`
width:100vw;
height:auto;
min-height:100vh;
box-sizing:border-box;
padding-top:70px;

@media ${(props) => props.theme.tablet} {
    width: 100%;
  }
  
  @media ${(props) => props.theme.desktop} {
    width: 100%;
  }
`


const Head = styled.div`
width: 100%;
height: 56px;
align-items: center;
display: flex;
margin-bottom:16px;
top:0px;
position:fixed;
background:${Color.mainColor};

@media ${(props) => props.theme.tablet} {
    width: 420px;
  }
  
  @media ${(props) => props.theme.desktop} {
    width: 420px;
  }

`;
const Text = styled.div`
width: 70%;
text-align: center;
`;

const Outter= styled.div`
margin: 0 auto;
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