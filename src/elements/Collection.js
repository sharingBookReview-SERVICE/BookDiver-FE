import React from "react";
import styled from "styled-components";
import Color from "../shared/Color";
import { history } from "../redux/configStore";

const Collection = (props) =>{
    return (
        <Outter onClick={()=>{history.push('/collectiondetail')}}>
            <Image>
                <Overlay>
                <CollectionTitle>
                    카페에서 가볍게 읽는 자기계발 에세이 모음
                </CollectionTitle>
                </Overlay>
            </Image>
        </Outter>
    )
}

export default Collection;

const Outter = styled.div`
`;
const Overlay = styled.div`
width: 160px;
height: 160px;
border-radius: 12px;
background: ${Color.overlay};
// position: absolute;
display:flex;
justify-content:center;
align-items:center;
`
const Image = styled.div`
width: 160px;
height: 160px;
border-radius: 12px;
background-image:URL(https://i.pinimg.com/564x/1d/56/07/1d5607356a13ae7f8eb493bc2510dbf9.jpg);
background-size: cover;
`;
const CollectionTitle = styled.p`
font-family: "Noto Serif KR", serif;
color: ${Color.white};
margin: 0px;
text-align:center;
// position: absolute;
// top: 35%;
// left: 2.5%;
// width: 80%;
`;