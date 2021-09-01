import React, {useRef, useEffect } from 'react';
import lottie from "lottie-web-light"
import styled from "styled-components"

const LottieHeartEvent = () => {
    const container = useRef(null)

    useEffect(() => {
        lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay:true,
        animationData : require("../img/58137-heart-burst.json")
        })
    },[])

    return (
            <Lottie ref={container}></Lottie>
    );
};

export default LottieHeartEvent;

const Lottie = styled.div`
width:45px;
height:45px;
position:absolute;
z-index:0;
top:-8px;
right:-12px;
cursor:pointer;
`