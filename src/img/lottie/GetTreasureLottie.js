import React , {useEffect, useRef} from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import Color from "../../shared/Color";
import { style } from "@material-ui/system";

const GetTreasureLottie = ()=>{
     //lottie
  const likecontainer = useRef();
  useEffect(()=>{
    lottie.loadAnimation({
      container: likecontainer.current,
      renderer: 'svg',
      loop: false,
      autoplay:true,
      animationData:require("./congratulation.json")
     
    })

  },[])
    return(
        <Wrapper>
            <NoMore ref={likecontainer}></NoMore>
          
        </Wrapper>
    )
}

const Wrapper = styled.div`

`;
const NoMore = styled.div`
width: 100%;
height: 100%;
margin: 0 auto;
position: absolute;
margin: 0 auto;
z-index: 1000;
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


export default GetTreasureLottie;