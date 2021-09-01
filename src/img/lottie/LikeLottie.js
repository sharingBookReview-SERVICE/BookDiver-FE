import React , {useEffect, useRef} from "react";
import styled from "styled-components";
import lottie from "lottie-web-light";

const LikeLottie = ()=>{
     //lottie
  const likecontainer = useRef();
  useEffect(()=>{
    lottie.loadAnimation({
      container: likecontainer.current,
      renderer: 'svg',
      loop: false,
      autoplay:true,
      animationData:require("./72348-like-animation.json")
     
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
top:0%;
z-index: 99;
`;

export default LikeLottie;