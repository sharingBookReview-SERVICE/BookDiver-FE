//import 부분
import React from "react";
import styled from "styled-components"


const Home = (props) =>{
  //dispatch와 변수들

    return(
        <React.Fragment>
            <Header>
                <LogoBox>
                    <Logo>LOGO</Logo>
                </LogoBox>
                <SearchBarBox>
                    <SearchBar/>
                </SearchBarBox>
            </Header>
               
        
        </React.Fragment>
    )
}

const Header = styled.div`
height:72px;
width:100%;
display:grid;
flex-direction:row;
grid-template-columns: 1fr 1fr;
box-sizing:border-box;
border-bottom:1px solid #f3f3f3;
`

const LogoBox = styled.div`
box-sizing:border-box;
width:100%;
height:100%;
display:flex;
justify-content:flex-start;
align-items:center;
padding : 0px 0px 0px 12px;
`

const Logo = styled.div`
font-size:33px;
font-weight:800;
color:#1168d7;
`

const SearchBarBox = styled.div`
width:100%;
height:100%;
padding:12px 12px 12px 0px;
box-sizing:border-box;
`

const SearchBar = styled.input`
width:100%;
height:100%;
border:none;
border-radius:12px;
background-color:#f5f5f5;
:focus {
    outline:none;
}
`

export default Home;