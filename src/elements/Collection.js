import React from "react";
import styled from "styled-components";
import Color from "../shared/Color";
import { history } from "../redux/configStore";
import { useSelector } from "react-redux";

const Collection = (props) =>{
    const is_login = useSelector(state=> state.user.is_login);
    return (
        <Outter
        onClick={()=>{
            is_login?
            history.push(`/collectiondetail/${props.id}`)
            : history.push('/login')
          }}>
        <Image url = {props.image}>
            <Overlay>
            <CollectionTitle>{props.is_tag? `#${props.name}`: `${props.name}`}</CollectionTitle>
            </Overlay>
        </Image>
    </Outter>
    )
}

Collection.defaultProps ={
    image:"https://i.pinimg.com/564x/c0/79/44/c07944cff5a97bfa3274236cabee29c7.jpg"
}



const Outter = styled.div`
width:auto;
height:auto;
box-sizing:border-box;
cursor:pointer;
`;

const Overlay = styled.div`
width: 180px;
height: 180px;
border-radius: 12px;
background: ${Color.overlay};
padding:10px;
display:flex;
justify-content:center;
align-items:center;
box-sizing:border-box;
`

const Image = styled.div`
width: 180px;
height: 180px;
border-radius: 12px;
background-image:URL( ${(props)=> (props.url)});
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


export default Collection;