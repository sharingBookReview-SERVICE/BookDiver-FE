import React, {useEffect} from "react";
import { history } from "../../redux/configStore";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Color from "../../shared/Color"

import { actionCreators as permitActions } from "../../redux/modules/permit";
import ErrorMessage from "../../img/1000.png"

const ErrorPage = () => {
    const dispatch = useDispatch();

    const goToHome = () => {
        history.push("/")
    }

    useEffect(() => {
        dispatch(permitActions.showNav(false));
        dispatch(permitActions.isPadding(false));  //패딩 값을 없애기 
    
        return () => {
          dispatch(permitActions.showNav(true));
        }
      }, []);

    return(
        <Container>
            <ContentsWrapper>
                <ErrorImg src={ErrorMessage}/>
                <ErrorGuide>
                    <ErrorTitle>페이지 오류 안내</ErrorTitle>
                    <ErrorContent>
                        지금 이 페이지와 연결할 수 없습니다.<br/>
                        더 나은 환경을 위해서 노력하고 있습니다.<br/>
                        잠시 후, 다시 확인해주세요.
                    </ErrorContent>
                </ErrorGuide>
                <HomeButton onClick={() => {goToHome()}}>홈 화면으로 돌아가기</HomeButton>
            </ContentsWrapper>
        </Container>
    )

}

export default ErrorPage;

const Container = styled.div`
width:100vw;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:${Color.black};
`

const ContentsWrapper = styled.div`
width:auto;
height:auto;
display:flex;
align-items:center;
flex-direction:column;

`

const ErrorImg = styled.img`
width:auto;
height:auto;
max-width:70vw;
max-height:70vh;
`

const ErrorGuide = styled.div`
display:flex;
flex-direction:column;
text-align:center;
margin:20px 0px;
`

const ErrorTitle = styled.span`
font-size:14px;
font-weight:bold;
color:${Color.white};
`

const ErrorContent = styled.p`
font-size: 14px;
color:${Color.white};
`

const HomeButton = styled.div`
width:50vw;
height:56px;
background:${Color.gray};
border-radius:20px;
display: flex;
justify-content:center;
align-items:center;
font-size:16px;
font-weight:bold;
color:white;
`