import React, {useRef, useEffect } from 'react';
import lottie from "lottie-web-light"
import styled from "styled-components"

const LottieCheck = () => {
    const container = useRef(null)

    useEffect(() => {
        lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: false,
        autoplay:true,
        animationData : require("./Done.json")
        })
    },[])

    return (
        <Wrapper>
            <Lottie ref={container}></Lottie>
        </Wrapper>
    );
};

export default LottieCheck;

const Wrapper = styled.div`
position:absolute;;
width:100%;
height:100vh;
top:0;
display:flex;
justify-content:center;
align-items:center;


`

const Lottie = styled.div`
width:100px;
height:100px;
`