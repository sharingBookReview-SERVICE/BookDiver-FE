import React , {useEffect, useRef} from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import Color from "../../shared/Color";
import { style } from "@material-ui/system";

const NomoreLottie = ()=>{
     //lottie
  const nomore = useRef();
  const arrow = useRef();
  useEffect(()=>{
    lottie.loadAnimation({
      container: nomore.current,
      renderer: 'svg',
      loop: false,
      autoplay:true,
      animationData:require("./Done.json")
     
    })
    lottie.loadAnimation({
        container: arrow.current,
        renderer: 'svg',
        loop: true,
        autoplay:true,
        animationData:require("./arrow.json")
       
      })
  },[])
    return(
        <Wrapper>
            <NoMore ref={nomore}></NoMore>
            <Text>소셜피드를 다 확인하셨네요!<br/>
            직접 리뷰를 써보는 건 어떨까요?
            </Text>
            <Arrow ref={arrow}></Arrow>
        </Wrapper>
    )
}

const Wrapper = styled.div`
width: 100%;
height: 70vh;
background: ${Color.mainColor};
justify-content: center;
display: flex;
text-align: center;
flex-direction: column;
padding-bottom: 100px;
`;
const NoMore = styled.div`
width: 80px;
height: 80px;
margin: 0 auto;
`;
const Arrow = styled.div`
position: absolute;
bottom: 100px;
left: 40%;
width: 80px;
height: 80px;
margin: 0 auto;
`;

const Text= styled.div`

`;


export default NomoreLottie;