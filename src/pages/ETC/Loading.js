import { useEffect } from "react"
import spinner from "../../img/spinner.gif"
import styled from "styled-components"


import Color from "../../shared/Color"
import { useDispatch } from "react-redux"
import { actionCreators as permitActions } from "../../redux/modules/permit"

const Loading = () => {
    const dispatch = useDispatch();


    // useEffect(() => {
    //     dispatch(permitActions.showNav(false));
    //     dispatch(permitActions.isPadding(false));  //패딩 값을 없애기 
    
    //     return () => {
    //       dispatch(permitActions.showNav(true));
    //     }
    //   }, []);

return(
    <Container>
        <Spinner src={spinner}/>
    </Container>
)
}

const Container = styled.div`
width:100vw;
height:100vh;
background:${Color.mainColor};
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;

@media ${(props) => props.theme.tablet} {
  width:100%;
}
@media ${(props) => props.theme.desktop} {
  width:100%;
}
`

const Spinner = styled.img`
width:40vw;
height:40vw;
margin-bottom:30px;

@media ${(props) => props.theme.tablet} {
  width:110px;
  height:110px;
}

@media ${(props) => props.theme.desktop} {
  width:110px;
  height:110px;
}
`

export default Loading;