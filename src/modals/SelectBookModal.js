//import 부분
import React, { useState } from "react";
import styled from "styled-components";


const SelectBookModal = (props) =>{
  //dispatch와 변수들

//useEffect
React.useEffect(()=>{
},[]);



//뷰

    return(
        <React.Fragment>
         <Container>
         <Input placeholder="책이름, 저자명 등으로 검색해보세요"></Input>
        
          
         </Container>
        </React.Fragment>
    )
}



//styled components
const Container = styled.div`
width: 320px;
height: 80vh;
border-radius: 12px;
justify-content: center;
align-items: center;
text-align: center;
border: solid 1px #eeeeee; 
background: #fff;
`;

const Input = styled.input`
border-radius: 12px;
width: 90%;
height: 48px;
border: none;
background-color: #f5f5f5;
margin: 16px;
`;


export default SelectBookModal;