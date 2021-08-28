import React from "react";
import styled from "styled-components";
import { history } from "../../../redux/configStore";

const MakeButton = (props) =>{

    const gotoMakeCollection = ()=>{
        history.push('/makeCollection')
    }
    return(
        <Button onClick={()=>{gotoMakeCollection()}}>북컬렉션 만들기</Button>
    )
}

const Button = styled.div`
border: 1px solid #d7d3d3;
    border-radius: 12px;
    width: 116px;
    height: 40px;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size:14px;
    font-family: 'Noto Sans KR', sans-serif;
    `;
    
export default MakeButton;