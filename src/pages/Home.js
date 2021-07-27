//import 부분
import React from "react";
import styled from "styled-components"
import SearchIcon from '@material-ui/icons/Search';
import ReviewCard from "../components/ReviewCard"
import Navigation from "../components/Navigation";


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


const CardBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 24px;
  padding-bottom:0px;
  box-sizing:border-box;
`

const CommentTitleBox = styled.div`
display:flex;
align-items:center;
`

const UserName = styled.p`
font-size:14px;
font-weight:bold;
margin:0px 8px 0px 0px;
`

const CreatedAt = styled.p`
font-size:10px;
color:#9e9e9e;
opacity:0.5;
margin:0px;
`


const ContentBox = styled.div`
width:100%;
box-sizing:border-box;
height:auto;
display:flex;
flex-direction:column;
justify-content:flex-start;
aligh-items:flex-start;
`

const BookTitle = styled.p`
margin:0px;
font-size:14px;
line-height:20px;
letter-spacing: -0.28px;
color:#1168d7;
font-weight:bold;
margin:7px 0px;
`

const Quote = styled.p`
font-size:14px;
font-weight: bold;
  line-height: 1.43;
  letter-spacing: -0.28px;
  margin:0px 0px 16px 0px;
`

const Content = styled.p`
font-size:14px;
  line-height: 1.43;
  letter-spacing: -0.28px;
  margin:0px;
`

const HashTag = styled.div`
padding:15px 0px;
color:#1168d7;
font-size:14px;
`



export default Home;