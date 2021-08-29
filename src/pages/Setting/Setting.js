import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configStore";
import { actionCreators as permitActions } from "../../redux/modules/permit";

import {LogoutModal, SignoutModal, NotSupport} from "../../modals";

import Color from "../../shared/Color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PolicyOutlinedIcon from '@material-ui/icons/PolicyOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import CallIcon from '@material-ui/icons/Call';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { makeStyles } from "@material-ui/core/styles";




const useStyles = makeStyles((theme) => ({
    goback: {
        padding: "0px 20px",
        cursor:"pointer",
    },
    icon: {
        position: "absolute",
        right: "20px",
        cursor:"pointer",
    }
  }));
const Setting = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const logoutModal = useSelector(state=> state.permit.is_modal);
    const signoutModal = useSelector(state=> state.permit.is_modal2);
    const is_support_modal = useSelector((state) => state.permit.is_support_modal)

    const goToNoti = () => {
        history.push("/")
    }

    const openNotSupportModal = () => {
        dispatch(permitActions.showNotSupport(true))
      }

    useEffect(() => {
        dispatch(permitActions.isPadding(false));  //패딩 값을 없애기 
    })

    return(
     <React.Fragment>
        <Container>
            <LogoutModal logoutModal={logoutModal}/>
            <SignoutModal signoutModal={signoutModal}/>
            <NotSupport is_support_modal={is_support_modal}/>

            <Head>
                <ArrowBackIcon className={classes.goback}
                onClick = {()=>{history.goBack()}}
                />
                <Text>설정</Text>
            </Head>
            <Wrapper onClick={openNotSupportModal}>
                <PolicyOutlinedIcon/>
                <Menu>공지사항</Menu>
                <ArrowForwardIosOutlinedIcon className={classes.icon}/>
            </Wrapper>
            <Wrapper onClick={openNotSupportModal}>
                <PolicyOutlinedIcon/>
                <Menu>개인정보 처리방침</Menu>
                <ArrowForwardIosOutlinedIcon className={classes.icon}/>
            </Wrapper>
            <Wrapper onClick={openNotSupportModal}>
                <PolicyOutlinedIcon/>
                <Menu>서비스 이용약관</Menu>
                <ArrowForwardIosOutlinedIcon className={classes.icon}/>
            </Wrapper>   
            <Wrapper>
                <CallIcon/>
                <ToGoogleForm
                target="_blank" 
                href="https://docs.google.com/forms/d/e/1FAIpQLSeDlVvfon6y7RBLZYcpR1Ea_-qYsXODOSa_dOXyvYcPMRVAfw/viewform">
                    고객의 소리
                </ToGoogleForm>
                <TransparentAtag
                target="_blank" 
                href="https://docs.google.com/forms/d/e/1FAIpQLSeDlVvfon6y7RBLZYcpR1Ea_-qYsXODOSa_dOXyvYcPMRVAfw/viewform">
                <ArrowForwardIosOutlinedIcon className={classes.icon}/>
                </TransparentAtag>
            </Wrapper> 
            <Wrapper
             onClick={()=>{
                 history.push('/changename')
             }}
            >
                <CreateOutlinedIcon/>
                <Menu>프로필 변경</Menu>
                <ArrowForwardIosOutlinedIcon className={classes.icon}/>
            </Wrapper>
            <Bottom>
                <Btn
                    onClick = {()=>{ dispatch(permitActions.showModal(true)) }}
                >로그아웃</Btn>
                <Btn
                     onClick = {()=>{ dispatch(permitActions.showModal2(true)) }}
                >회원탈퇴</Btn>
            </Bottom>
        </Container>

        </React.Fragment>
    )
}

const Container = styled.div`
background: ${Color.mainColor};
width: 100vw;
height: 100vh;

@media ${(props) => props.theme.tablet} {
    width: 100%;
  }

  @media ${(props) => props.theme.desktop} {
    width: 100%;
  }

`;
const Head = styled.div`
width: 100%;
height: 56px;
align-items: center;
display: flex;
background:${Color.mainColor};
color:${Color.fontBlack};

@media ${(props) => props.theme.mobile} {
    padding: 20px 0 0 0;
}

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
cursor:pointer;
`;

const ToGoogleForm = styled.a`
color:${Color.fontBlack};
text-decoration:none;
font-weight: bold;
margin: 0px 0px 0px 10px;
cursor:pointer;
`

const TransparentAtag = styled.a`
padding:0px;
margin:0px;
display:flex;
justify-content:center;
align-items:center;
text-decoration:none;
color:${Color.fontBlack};
`

const Bottom = styled.div`
width: 100%;
padding: 60px 20px;
`;
const Btn = styled.div`
padding: 20px 0px;
cursor:pointer;
`;
export default Setting;