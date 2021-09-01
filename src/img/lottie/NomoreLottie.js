import React , {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import lottie from "lottie-web-light";
import Color from "../../shared/Color";
import { style } from "@material-ui/system";
import { useDispatch, useSelector } from "react-redux";

const NomoreLottie = ()=>{
  const feedType = useSelector((state) => state.permit.feed_type)
  const [feedName, setFeedName] = useState("")
  
     //lottie
  const nomore = useRef();
  const arrow = useRef();
  
  useEffect(() => {
    if(feedType === "recent"){
      setFeedName("최신피드")
    }else {
      setFeedName("소셜피드") 
    }
  },[feedType])


  useEffect(()=>{
    lottie.loadAnimation({
      container: nomore.current,
      renderer: 'svg',
      loop: true,
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
      return () => {

      }
  },[])
    return(
        <Wrapper>
            <div></div>
            <div>
            <NoMore ref={nomore}></NoMore>
            <Text>{feedName}를 다 확인하셨네요!<br/>
            직접 리뷰를 써보는 건 어떨까요?
            </Text>
            </div>
            <Arrow ref={arrow}></Arrow>
        </Wrapper>
    )
}

const Wrapper = styled.div`
width: 100%;
height: 100%;
background: ${Color.mainColor};
justify-content: space-between;
display: flex;
text-align:center;
align-items: center;
flex-direction: column;
`;
const NoMore = styled.div`
width: 80px;
height: 80px;
margin: 0 auto;
`;
const Arrow = styled.div`
width: 80px;
height: 80px;
margin: 0 auto;
`;

const Text= styled.div`

`;


export default NomoreLottie;