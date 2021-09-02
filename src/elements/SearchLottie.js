import React, {useRef, useEffect } from 'react';
import lottie from "lottie-web-light"
import styled from "styled-components"

const SearchLottie = () => {
    const container = useRef(null)

    useEffect(() => {
        lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay:true,
        animationData : require("../img/49993-search.json")
        })
    },[])

    return (
            <Lottie ref={container}></Lottie>
    );
};

export default SearchLottie;

const Lottie = styled.div`
width:200px;
height:200px;
margin-bottom:150px;
`