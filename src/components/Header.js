//import 부분
import React,{useState, useEffect} from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import Color from "../shared/Color";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../img/Header-Main-Logo@3x.png";

//소켓
import io from "socket.io-client"

import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";

import { actionCreators as userAction } from "../redux/modules/user";

import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Badge from '@material-ui/core/Badge';
import ReactGA from "react-ga";
import LottieHeartEvent from "../elements/LottieHeartEvent"

const socket = io.connect("https://ohbin.shop")

const useStyles = makeStyles((theme) => ({
  icon: {
    width: "25px",
    height: "25px",
    color: Color.fontBlack,
    cursor:"pointer",
  },
}));

const Header = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles();

  //알림
  const is_alarm = useSelector((state) => state.user.user.check_alert)
  const [is_socket, setIsSocket] = useState(false)
  const is_login = useSelector((state) => state.user.is_login)
  console.log(is_alarm)


  const gotoSearch = () => {
    history.push("/search")
  }

  const gotoNoti = ()=> {
    history.push('/notification')
  }

  //알림 클릭시 읽었다는 데이터를 서버에 보내기 
  const setReaded = () => {
    dispatch(userAction.checkAlertSV())
  }

 
  useEffect(() => {
    //처음 들어오면, 접속한 유저의 토큰을 보내기
    const is_token = localStorage.getItem("token")
    if(is_token){
      socket.emit("token", `Bearer ${localStorage.getItem("token")}`)
    }
  },[])

  useEffect(() => {
    socket.on("alert", (payload) => {
      setIsSocket(payload)
      console.log(payload)
      //알람이 생기면, 유저 정보를 새로 불러오기 
      // dispatch(userAction.getUserSV())
    })
  })


  return (
    <React.Fragment>
      <Wrapper>
      <HeaderBox>
        <LogoBox><Logo alt="logo" src={logo}/></LogoBox>

        <SearchBarBox >
        <ToGoogle
        target="_blank"
        let="noopener"
        href="https://docs.google.com/forms/d/e/1FAIpQLSeDlVvfon6y7RBLZYcpR1Ea_-qYsXODOSa_dOXyvYcPMRVAfw/viewform"
        onClick={()=>{
          ReactGA.event({
            category: "Button",
            action: "survey",
            label: "survye",
          });
        }}
         >
          <LottieHeartEvent/>
            <SurveyIcon/>
          </ToGoogle>
          <IconBox>
            <SearchIcon
            onClick={()=>{
              gotoSearch()
              ReactGA.event({
                category: "Button",
                action: "search books",
                label: "search",
              });
            }} 
            className={classes.icon} />
          </IconBox>

{is_login && <IconBox>
          <Badge color="secondary" variant="dot" invisible={is_socket ? !is_socket : !is_alarm}>
            <NotificationsNoneIcon
            onClick={()=>{
              gotoNoti();
              setReaded();
            }}
            className={classes.icon}/>
        </Badge>
          </IconBox>}

        </SearchBarBox>
      </HeaderBox>
      </Wrapper>
    </React.Fragment>
  );
};


const ToGoogle = styled.a`
width:40px;
height:40px;
display:flex;
justify-content:center;
align-items:center;
transition:0.5s ease-in-out;
margin-left:5px;
position:relative;
:hover{
  border-radius:40px;
  background:${Color.line};
}
`

const IconBox = styled.div`
width:40px;
height:40px;
display:flex;
justify-content:center;
align-items:center;
transition:0.5s ease-in-out;
margin-left:5px;
position:relative;

:hover{
  border-radius:40px;
  background:${Color.line};
}
`

const Wrapper = styled.div`
background-color: ${Color.mainColor};
height:auto;
width:100%;
position:fixed;
top:0px;
z-index:100;
@media ${(props) => props.theme.tablet} {
  width:420px;
}
@media ${(props) => props.theme.desktop} {
  width:420px;
}
`

const HeaderBox = styled.div`
  height: 56px;
  width: 100%;
  display: grid;
  flex-direction: row;
  grid-template-columns: 1fr 1fr;
  box-sizing: border-box;

  @media ${(props) => props.theme.tablet} {
    width:420px;
    height:56px;
  }

  @media ${(props) => props.theme.desktop} {
    width:420px;
    height:56px;
  }

`;

const LogoBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 0px 0px 25px;
`;

const Logo = styled.img`
width:auto;
height:auto;
max-width:90px;
max-height:90px;

@media ${(props) => props.theme.tablet} {
  max-width:90px;
  max-height:90px;
}

@media ${(props) => props.theme.desktop} {
  max-width:90px;
  max-height:90px;
}
`;

const SearchBarBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px 20px 12px 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

const SurveyIcon = styled.div`
color: #252121;
width: 25px;
cursor: pointer;
height: 25px;
background-image:url("https://booknetworkservice.s3.ap-northeast-2.amazonaws.com/support_agent_black_24dp+1.svg");
`;

export default Header;
