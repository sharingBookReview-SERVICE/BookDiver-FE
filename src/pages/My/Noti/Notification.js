import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Color from "../../../shared/Color";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as userActions } from "../../../redux/modules/user";
import { actionCreators as permitActions } from "../../../redux/modules/permit";
import { ArrowBack } from "../../../components/index";

import NotiCard from "./NotiCard"

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


const Notification = (props) =>{
    const dispatch = useDispatch()
    const notiList = useSelector(state => state.user.noti_list)

    let notiListReversed = new Array()
    
    notiList.forEach(content => 
        notiListReversed.unshift(content)
    )

    useEffect(() => {
        dispatch(userActions.getNotiListSV())
        dispatch(permitActions.showNav(true))
        return() => {
            dispatch(userActions.getUserSV());
        }
    },[])

    const classes = useStyles();
    return(
        <Wrapper>
        <Container>
            <Head>
                <ArrowBack/>
                <Title>알림</Title>
                <div></div>
            </Head>
           {notiListReversed.map((noti_info, idx) => {
               return(<NotiCard {...noti_info} key={idx}/>)
           }) }
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
padding-top:60px;

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
justify-content:space-between;
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
const Title = styled.div`
margin-right:40px;
`;



export default Notification;