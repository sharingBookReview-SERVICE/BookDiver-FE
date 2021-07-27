//import 부분
import React from "react";
import styled from "styled-components"
import SearchIcon from '@material-ui/icons/Search';
import ReviewCard from "../components/ReviewCard"
import Navigation from "../components/Navigation";
import AddIcon from '@material-ui/icons/Add';


const Home = (props) =>{
  //dispatch와 변수들

    return(
        <React.Fragment>
            <HomeBackGroundColor>
            <Header>
                <LogoBox>
                    <Logo>LOGO</Logo>
                </LogoBox>
                <SearchBarBox>
                    <SearchIcon style={{width:"16px",height:"16px", position:"absolute", left:"10px", color:"#9e9e9e"}}/>
                    <SearchBar placeholder="리뷰궁금한 책 검색"/>
                </SearchBarBox>
            </Header>

            <ReviewCard/>
            <ReviewCard/>
            <ReviewCard/>
            </HomeBackGroundColor>
            <FloatButton><AddIcon style={{color:"#fafafa", fontSize:"30px"}}/></FloatButton>
        </React.Fragment>
    )
}

const HomeBackGroundColor = styled.div`
background-color:#f5f5f5;
box-sizing:border-box;
width:100%;
height:auto;
display:flex;
flex-direction:column;
align-items:flex-start;
padding:15px 0px;
`

const Header = styled.div`
height:72px;
width:100%;
display:grid;
flex-direction:row;
grid-template-columns: 1fr 1fr;
box-sizing:border-box;
border-bottom:1px solid #f3f3f3;
background-color:#fff;
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
display:flex;
justify-content:center;
align-items:center;
position:relative;
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
padding:0px 0px 0px 30px;
`

const FloatButton = styled.div`
width:56px;
height:56px;
display:flex;
justify-content:center;
align-items:center;
border-radius:12px;
background-color:#1168d7;
position:fixed;
right:16px;
bottom:72px;
`


export default Home;