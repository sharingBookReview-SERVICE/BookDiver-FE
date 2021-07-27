//import 부분
import React from "react";
import styled from "styled-components"
import SearchIcon from '@material-ui/icons/Search';
import ReviewCard from "../components/ReviewCard"

const Home = (props) =>{
  //dispatch와 변수들

    return(
        <React.Fragment>
            <HomeBackGroundColor>
            <Header>
                <SearchBarBox>
                    <SearchIcon style={{width:"16px",height:"16px", position:"absolute", left:"10px", color:"#9e9e9e"}}/>
                    <SearchBar placeholder="내가 작성했던 리뷰를 찾을 수 있어요"/>
                </SearchBarBox>
                <FilterBox>
                    <Filter>최신순</Filter>
                </FilterBox>
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
grid-template-columns: 75% 25%;
box-sizing:border-box;
border-bottom:1px solid #f3f3f3;
background-color:#fff;
padding:0px 20px;
`

const SearchBarBox = styled.div`
width:100%;
height:100%;
padding:12px 0px 12px 0px;
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

const FilterBox = styled.div`
width:100%;
height:100%;
display:flex;
justify-content:center;
align-items:center;
`

const Filter = styled.div`
font-size:14px;
color:#1168d7;
font-weight:700;
`

export default Home;