import React, {useState} from 'react';
import styled from "styled-components";
import {images, depth_image} from "../../../shared/Image"
import { useDispatch, useSelector } from "react-redux";

const Level = () => {
    const userBadges = useSelector(state => state.user.user.own_image)
    let badges = Array(6)
    
    userBadges?.forEach((badge,idx) => {
        badges[idx] = badge
    })

    return (
        <BackgroundImg url={images["sea"]}>
            <Badge src={depth_image[badges[0]]} style={{top:"150px", left:"40px", width:"120px", height:"120px"}}/>

            <Badge 
            src={badges[1] === "image_2" ? depth_image[badges[1]] : depth_image["흰동가리"]} 
            style={{top:"400px", left:"7%"}}/>

            <Badge 
            src={badges[1] === "image_3" ? depth_image[badges[1]] : depth_image["산호"]} 
            style={{top:"550px", left:"57%"}}/>

            <Badge 
            src={badges[1] === "image_4" ? depth_image[badges[1]] : depth_image["소라"]} 
            style={{top:"700px", left:"7%"}}/>

            <Badge 
            src={badges[2] === "image_5" ? depth_image[badges[2]] : depth_image["해마"]} 
            style={{top:"850px", left:"57%"}}/>

            <Badge 
            src={badges[2] === "image_6" ? depth_image[badges[2]] : depth_image["꽃게"]} 
            style={{top:"1000px", left:"7%"}}/>

            <Badge 
            src={badges[2] === "image_7" ? depth_image[badges[2]] : depth_image["나비물고기"]} 
            style={{top:"1150px", left:"57%"}}/>

            <Badge 
            src={badges[3] === "image_8" ? depth_image[badges[3]] : depth_image["돌고래"]} 
            style={{top:"1300px", left:"7%"}} />

            <Badge 
            src={badges[3] === "image_9" ? depth_image[badges[3]] : depth_image["불가사리"]} 
            style={{top:"1450px", left:"57%"}}/>

            <Badge 
            src={badges[3] === "image_10" ? depth_image[badges[3]] : depth_image["해파리"]} 
            style={{top:"1600px", left:"7%"}}/>

            <Badge 
            src={badges[4] === "image_11" ? depth_image[badges[4]] : depth_image["상어"]} 
            style={{top:"1750px", left:"57%"}}/>

            <Badge 
            src={badges[4] === "image_12" ? depth_image[badges[4]] : depth_image["거북이"]} 
            style={{top:"1900px", left:"7%"}}/>

            <Badge 
            src={badges[4] === "image_13" ? depth_image[badges[4]] : depth_image["가오리"]} 
            style={{top:"2050px", left:"57%"}}/>

            <Badge 
            src={badges[5] === "image_14" ? depth_image[badges[5]] : depth_image["범고래"]} 
            style={{top:"2200px", left:"7%"}}/>

            <Badge 
            src={badges[5] === "image_15" ? depth_image[badges[5]] : depth_image["망치상어"]} 
            style={{top:"2300px", left:"57%"}}/>

            <Whale 
            src={badges[5] === "image_16" ? depth_image[badges[5]] : depth_image["흰수염고래"]} />                                                                 
        </BackgroundImg>
    );
};

export default Level;

const BackgroundImg = styled.div`
width:100%;
height:2700px;
background-image:url(${(props) => props.url});
background-size:cover;

@media ${(props) => props.theme.tablet} {
    height:2600px;
  }
  @media ${(props) => props.theme.desktop} {
    height:2600px;
  }
`

const Badge = styled.img`
width:150px;
height:150px;
position:absolute;

@media screen and (max-width: 360px) { 
    width:120px;
    height:120px;
}

`

const Whale = styled.img`
width:250px;
height:250px;
top:2450px; 
left:80px;
position:absolute;

@media screen and (max-width: 360px) {
    left:60px; 
    width:200px;
    height:200px;
}


`